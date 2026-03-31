import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const INPUT = path.join(ROOT, "i18n/strings.csv");
const OUTPUT = path.join(ROOT, "i18n/strings-clean.csv");

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

const rows = parseCsv(read(INPUT));
const output = rows.map((row) => row.map(toCsvCell).join(",")).join("\r\n") + "\r\n";
fs.writeFileSync(OUTPUT, `\uFEFF${output}`, "utf8");
console.log(`Wrote ${path.relative(ROOT, OUTPUT)}`);
