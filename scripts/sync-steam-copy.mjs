import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CSV_PATH = path.join(ROOT, "i18n/strings.csv");
const STEAM_JSON_PATH = "C:/Users/Brian/Downloads/storepage_564018_all (1).json";

const LOCALE_TO_STEAM = {
  en: "english",
  de: "german",
  es: "spanish",
  fr: "french",
  it: "italian",
  "pt-br": "brazilian",
  ja: "japanese",
  ko: "koreana",
  "zh-hans": "schinese",
  "zh-hant": "tchinese",
};

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

  const headers = rows[0];
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

function toCsvCell(value) {
  const s = String(value ?? "");
  return `"${s.replace(/"/g, '""')}"`;
}

function writeCsv(filePath, headers, rows) {
  const lines = [];
  lines.push(headers.map((h) => toCsvCell(h)).join(","));
  for (const row of rows) {
    lines.push(headers.map((h) => toCsvCell(row[h] ?? "")).join(","));
  }
  fs.writeFileSync(filePath, `${lines.join("\n")}\n`, "utf8");
}

function cleanTagText(value) {
  return value
    .replace(/\r\n/g, "\n")
    .replace(/\[img[^]]*]\s*\[\/img]/gi, "")
    .replace(/\[img[^]]*]/gi, "")
    .replace(/\[\/img]/gi, "")
    .replace(/\[\/?b]/gi, "")
    .replace(/\[\/?i]/gi, "")
    .replace(/\[\/?u]/gi, "")
    .replace(/\[\/?h[1-6]]/gi, "")
    .replace(/\[\/?p]/gi, "\n\n")
    .replace(/\[br]/gi, "\n")
    .replace(/\[[^]]+]/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractAbout(rawAbout) {
  const beforeList = rawAbout.split("[list]")[0];
  return cleanTagText(beforeList);
}

function extractBullets(rawAbout) {
  const listMatch = rawAbout.match(/\[list]([\s\S]*?)\[\/list]/i);
  if (!listMatch) return [];
  return listMatch[1]
    .split("[*]")
    .slice(1)
    .map((item) => cleanTagText(item))
    .filter(Boolean);
}

const csv = parseCsv(read(CSV_PATH));
const rowByKey = new Map(csv.rows.map((r) => [r.key, r]));

const steam = JSON.parse(read(STEAM_JSON_PATH));
const steamLangs = steam.languages || {};

for (const [locale, steamKey] of Object.entries(LOCALE_TO_STEAM)) {
  const langData = steamLangs[steamKey];
  if (!langData) {
    throw new Error(`Missing Steam locale data: ${steamKey}`);
  }

  const shortDesc = (langData["app[content][short_description]"] || "").trim();
  const aboutRaw = langData["app[content][about]"] || "";
  const aboutBody = extractAbout(aboutRaw);
  const bullets = extractBullets(aboutRaw);

  rowByKey.get("home.hero.lede")[locale] = shortDesc;
  rowByKey.get("home.about.body")[locale] = aboutBody;

  for (let i = 1; i <= 9; i += 1) {
    const key = `home.highlights.item${i}`;
    const row = rowByKey.get(key);
    if (!row) continue;
    row[locale] = bullets[i - 1] || row[locale] || "";
  }
}

writeCsv(CSV_PATH, csv.headers, csv.rows);
console.log("Updated Steam-derived localized copy in i18n/strings.csv");
