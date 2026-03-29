import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CSV_PATH = path.join(ROOT, "i18n/strings.csv");

function read(filePath) {
  return fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
}

function parseCsv(content) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < content.length; i += 1) {
    const ch = content[i];
    const next = content[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') {
        cell += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === "," && !inQuotes) {
      row.push(cell);
      cell = "";
      continue;
    }

    if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (ch === "\r" && next === "\n") i += 1;
      row.push(cell);
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
      cell = "";
      continue;
    }

    cell += ch;
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  const headers = rows[0] || [];
  const out = [];
  for (let i = 1; i < rows.length; i += 1) {
    const r = rows[i];
    const obj = {};
    headers.forEach((h, idx) => {
      obj[h] = r[idx] ?? "";
    });
    out.push(obj);
  }
  return { headers, rows: out };
}

function findCellIssues(value) {
  const issues = [];
  const checks = [
    { code: "replacement-char", regex: /\uFFFD/, note: "contains replacement character (�)" },
    { code: "control-char", regex: /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/, note: "contains control character" },
    { code: "mojibake-c3", regex: /Ã./, note: "possible UTF-8 mojibake sequence (Ãx)" },
    { code: "mojibake-c2", regex: /Â./, note: "possible UTF-8 mojibake sequence (Âx)" },
    { code: "mojibake-e2", regex: /â[\u0080-\u00BF]/, note: "possible UTF-8 mojibake punctuation (â...)" },
    { code: "steam-img-markup", regex: /\[img\s+src=/i, note: "contains Steam [img] markup" },
  ];

  for (const check of checks) {
    const match = value.match(check.regex);
    if (match) {
      issues.push({
        code: check.code,
        note: check.note,
        snippet: value.slice(Math.max(0, match.index - 24), Math.min(value.length, match.index + 48)),
      });
    }
  }
  return issues;
}

function main() {
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`Missing file: ${CSV_PATH}`);
    process.exit(1);
  }

  const parsed = parseCsv(read(CSV_PATH));
  if (!parsed.headers.length || !parsed.headers.includes("key")) {
    console.error("Invalid CSV format: missing header row or key column.");
    process.exit(1);
  }

  const localeColumns = parsed.headers.filter((h) => h !== "key");
  const findings = [];

  for (const row of parsed.rows) {
    const key = row.key || "(missing key)";
    for (const locale of localeColumns) {
      const value = row[locale] ?? "";
      if (!value) continue;
      const issues = findCellIssues(value);
      for (const issue of issues) {
        findings.push({ key, locale, ...issue });
      }
    }
  }

  if (!findings.length) {
    console.log("i18n validation passed: no suspicious encoding/markup patterns found.");
    return;
  }

  console.error(`i18n validation failed: ${findings.length} issue(s) found in i18n/strings.csv`);
  findings.forEach((f, idx) => {
    console.error(
      `${idx + 1}. key=${f.key} locale=${f.locale} type=${f.code} :: ${f.note}\n   snippet: ${JSON.stringify(f.snippet)}`
    );
  });
  process.exit(1);
}

main();
