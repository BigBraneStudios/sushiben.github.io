import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CSV_PATHS = [
  path.join(ROOT, "i18n/strings-main.csv"),
  path.join(ROOT, "i18n/strings-team-cast.csv"),
  path.join(ROOT, "i18n/strings-presskit.csv"),
  path.join(ROOT, "i18n/strings-eula.csv"),
  path.join(ROOT, "i18n/strings-fan-content.csv"),
  path.join(ROOT, "i18n/strings-privacy.csv"),
];

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
    { code: "replacement-char", regex: /\uFFFD/, note: "contains replacement character (???)" },
    { code: "control-char", regex: /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/, note: "contains control character" },
    {
      code: "mojibake-c3",
      regex: /\u00C3[\u0080-\u00BF]/,
      note: "possible UTF-8 mojibake sequence (? + Latin-1 supplement byte)",
    },
    {
      code: "mojibake-c2",
      regex: /\u00C2[\u0080-\u00BF]/,
      note: "possible UTF-8 mojibake sequence (? + Latin-1 supplement byte)",
    },
    {
      code: "mojibake-e2",
      regex: /\u00E2[\u0080-\u00BF]{1,2}/,
      note: "possible UTF-8 mojibake punctuation (? + continuation bytes)",
    },
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
  const findings = [];
  for (const csvPath of CSV_PATHS) {
    if (!fs.existsSync(csvPath)) {
      console.error(`Missing file: ${csvPath}`);
      process.exit(1);
    }

    const parsed = parseCsv(read(csvPath));
    if (!parsed.headers.length || !parsed.headers.includes("key")) {
      console.error(`Invalid CSV format in ${path.basename(csvPath)}: missing header row or key column.`);
      process.exit(1);
    }

    const localeColumns = parsed.headers.filter((h) => h !== "key" && h !== "context");
    for (const row of parsed.rows) {
      const key = row.key || "(missing key)";
      for (const locale of localeColumns) {
        const value = row[locale] ?? "";
        if (!value) continue;
        const issues = findCellIssues(value);
        for (const issue of issues) {
          findings.push({ file: path.basename(csvPath), key, locale, ...issue });
        }
      }
    }
  }

  if (!findings.length) {
    console.log("i18n validation passed: no suspicious encoding/markup patterns found.");
    return;
  }

  console.error(`i18n validation failed: ${findings.length} issue(s) found in i18n CSV files`);
  findings.forEach((f, idx) => {
    console.error(
      `${idx + 1}. file=${f.file} key=${f.key} locale=${f.locale} type=${f.code} :: ${f.note}\n   snippet: ${JSON.stringify(f.snippet)}`
    );
  });
  process.exit(1);
}

main();
