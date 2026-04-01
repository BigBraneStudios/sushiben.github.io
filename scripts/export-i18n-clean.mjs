import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const FILES = [
  ["i18n/strings-main.csv", "i18n/strings-main-clean.csv"],
  ["i18n/strings-team-cast.csv", "i18n/strings-team-cast-clean.csv"],
  ["i18n/strings-presskit.csv", "i18n/strings-presskit-clean.csv"],
  ["i18n/strings-eula.csv", "i18n/strings-eula-clean.csv"],
  ["i18n/strings-privacy.csv", "i18n/strings-privacy-clean.csv"],
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
      rows.push(row);
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

  return rows;
}

function toCsvCell(value) {
  const normalized = String(value ?? "").replace(/\r\n/g, "\n");
  return `"${normalized.replace(/"/g, "\"\"")}"`;
}

for (const [inputRel, outputRel] of FILES) {
  const input = path.join(ROOT, inputRel);
  const outputPath = path.join(ROOT, outputRel);
  const rows = parseCsv(read(input));
  const output = rows.map((row) => row.map(toCsvCell).join(",")).join("\r\n") + "\r\n";
  fs.writeFileSync(outputPath, `\uFEFF${output}`, "utf8");
  console.log(`Wrote ${path.relative(ROOT, outputPath)}`);
}
