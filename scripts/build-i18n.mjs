import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const LOCALES = ["en", "de", "es", "fr", "it", "pt-br", "ja", "ko", "zh-hans", "zh-hant"];
const DEFAULT_LOCALE = "en";
const HREFLANG = {
  en: "en",
  de: "de",
  es: "es",
  fr: "fr",
  it: "it",
  "pt-br": "pt-BR",
  ja: "ja",
  ko: "ko",
  "zh-hans": "zh-Hans",
  "zh-hant": "zh-Hant",
};

function read(filePath) {
  return fs.readFileSync(path.join(ROOT, filePath), "utf8").replace(/^\uFEFF/, "");
}

function write(filePath, content) {
  const abs = path.join(ROOT, filePath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf8");
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
      obj[h] = (r[idx] ?? "").trim();
    });
    out.push(obj);
  }
  return { headers, rows: out };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function textToHtmlParagraphs(value) {
  return escapeHtml(value)
    .replace(/\r\n/g, "\n")
    .replace(/\n\n+/g, "<br><br>")
    .replace(/\n/g, "<br>");
}

function formatAboutHtml(value) {
  const cleaned = String(value ?? "")
    .replace(/\[img[^\]]*]\s*\[\/img]/gi, "")
    .replace(/\[img[^\]]*]/gi, "")
    .replace(/\[\/img]/gi, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  let html = textToHtmlParagraphs(cleaned);

  const people = ["Hato Moa", "Laura Post", "Ryan Colt Levy", "AJ Beckles"];
  const projects = ["Hatoful Boyfriend", "Little Witch Academia", "Chainsaw Man", "Dandadan"];

  for (const name of people) {
    html = html.split(name).join(`<strong>${name}</strong>`);
  }
  for (const project of projects) {
    html = html.split(project).join(`<em>${project}</em>`);
  }

  return html;
}

const csv = parseCsv(read("i18n/strings.csv"));
const dict = new Map();
csv.rows.forEach((r) => dict.set(r.key, r));

function t(key, locale) {
  const row = dict.get(key);
  if (!row) throw new Error(`Missing translation key: ${key}`);
  return row[locale] || row[DEFAULT_LOCALE] || "";
}

function currentLanguageName(locale) {
  return t(`locale.name.${locale}`, locale);
}

function languageItems(locale, page) {
  return LOCALES.map((loc) => {
    const label = escapeHtml(t(`locale.name.${loc}`, locale));
    const href = page === "home" ? `../${loc}/` : `../../${loc}/${page}/`;
    return `<li><a href="${href}">${label}</a></li>`;
  }).join("\n          ");
}

function hreflangLinks(page) {
  const suffix = page === "home" ? "/" : `/${page}/`;
  const items = LOCALES.map((loc) => {
    const hreflang = HREFLANG[loc] || loc;
    return `<link rel="alternate" hreflang="${hreflang}" href="https://www.sushiben.com/${loc}${suffix}">`;
  });
  items.push(`<link rel="alternate" hreflang="x-default" href="https://www.sushiben.com/${DEFAULT_LOCALE}${suffix}">`);
  return items.join("\n  ");
}

function htmlLang(locale) {
  return HREFLANG[locale] || locale;
}

function render(template, replacements) {
  let out = template;
  for (const [key, value] of Object.entries(replacements)) {
    out = out.split(`{{${key}}}`).join(value);
  }
  return out;
}

const homeTemplate = read("templates/home.tpl");
const legalTemplate = read("templates/legal.tpl");

for (const locale of LOCALES) {
  const translationNote = t("home.translation_note", locale)
    ? `<section class="translation-note">\n      <div class="wrap">\n        <p>${escapeHtml(t("home.translation_note", locale))}</p>\n      </div>\n    </section>`
    : "";

  const homeHtml = render(homeTemplate, {
    LANG: locale,
    HTML_LANG: htmlLang(locale),
    SITE_TITLE: escapeHtml(t("site.title", locale)),
    SITE_DESCRIPTION: escapeHtml(t("site.description", locale)),
    NAV_ABOUT: escapeHtml(t("nav.about", locale)),
    NAV_FEATURES: escapeHtml(t("nav.features", locale)),
    NAV_BUY: escapeHtml(t("nav.buy", locale)),
    NAV_MEDIA: escapeHtml(t("nav.media", locale)),
    NAV_CONTACT: escapeHtml(t("nav.contact", locale)),
    NAV_MENU: escapeHtml(t("nav.menu", locale)),
    LANG_CURRENT_NAME: escapeHtml(currentLanguageName(locale)),
    LANG_ARIA_LABEL: escapeHtml(t("lang.aria_label", locale)),
    LANG_ITEMS_HOME: languageItems(locale, "home"),
    HREFLANG_LINKS: hreflangLinks("home"),
    TRANSLATION_NOTE: translationNote,
    HOME_KICKER: escapeHtml(t("home.kicker", locale)),
    HOME_HERO_TITLE: escapeHtml(t("home.hero.title", locale)),
    HOME_HERO_LEDE: escapeHtml(t("home.hero.lede", locale)),
    HOME_CTA_BUY: escapeHtml(t("home.cta.buy", locale)),
    HOME_CTA_WATCH: escapeHtml(t("home.cta.watch", locale)),
    HOME_ABOUT_TITLE: escapeHtml(t("home.about.title", locale)),
    HOME_ABOUT_BODY: formatAboutHtml(t("home.about.body", locale)),
    HOME_FEATURES_TITLE: escapeHtml(t("home.features.title", locale)),
    HIGHLIGHT_1: escapeHtml(t("home.highlights.item1", locale)),
    HIGHLIGHT_2: escapeHtml(t("home.highlights.item2", locale)),
    HIGHLIGHT_3: escapeHtml(t("home.highlights.item3", locale)),
    HIGHLIGHT_4: escapeHtml(t("home.highlights.item4", locale)),
    HIGHLIGHT_5: escapeHtml(t("home.highlights.item5", locale)),
    HIGHLIGHT_6: escapeHtml(t("home.highlights.item6", locale)),
    HIGHLIGHT_7: escapeHtml(t("home.highlights.item7", locale)),
    HIGHLIGHT_8: escapeHtml(t("home.highlights.item8", locale)),
    HIGHLIGHT_9: escapeHtml(t("home.highlights.item9", locale)),
    HOME_BUY_TITLE: escapeHtml(t("home.buy.title", locale)),
    HOME_BUY_SUBTITLE: escapeHtml(t("home.buy.subtitle", locale)),
    HOME_MEDIA_TITLE: escapeHtml(t("home.media.title", locale)),
    HOME_CONTACT_TITLE: escapeHtml(t("home.contact.title", locale)),
    HOME_CONTACT_SUBTITLE: escapeHtml(t("home.contact.subtitle", locale)),
    SUPPORT_DISCORD_TITLE: escapeHtml(t("home.support.discord.title", locale)),
    SUPPORT_DISCORD_BODY: escapeHtml(t("home.support.discord.body", locale)),
    SUPPORT_DISCORD_CTA: escapeHtml(t("home.support.discord.cta", locale)),
    SUPPORT_EMAIL_TITLE: escapeHtml(t("home.support.email.title", locale)),
    SUPPORT_EMAIL_BODY: escapeHtml(t("home.support.email.body", locale)),
    FORM_CATEGORY: escapeHtml(t("home.form.category", locale)),
    FORM_CATEGORY_PLACEHOLDER: escapeHtml(t("home.form.category.placeholder", locale)),
    FORM_CATEGORY_GENERAL: escapeHtml(t("home.form.category.general", locale)),
    FORM_CATEGORY_PRESS: escapeHtml(t("home.form.category.press", locale)),
    FORM_CATEGORY_TECH: escapeHtml(t("home.form.category.tech", locale)),
    FORM_NAME: escapeHtml(t("home.form.name", locale)),
    FORM_EMAIL: escapeHtml(t("home.form.email", locale)),
    FORM_MESSAGE: escapeHtml(t("home.form.message", locale)),
    FORM_SUBMIT: escapeHtml(t("home.form.submit", locale)),
    LEGAL_EULA_LABEL: escapeHtml(t("footer.legal.eula", locale)),
    LEGAL_PRIVACY_LABEL: escapeHtml(t("footer.legal.privacy", locale)),
    SOCIAL_X: escapeHtml(t("footer.social.x", locale)),
    SOCIAL_YOUTUBE: escapeHtml(t("footer.social.youtube", locale)),
    SOCIAL_DISCORD: escapeHtml(t("footer.social.discord", locale)),
  });

  write(`${locale}/index.html`, homeHtml);

  for (const page of ["eula", "privacy"]) {
    const legalBodyPath = `i18n/legal/${locale}/${page}.txt`;
    const fallbackBodyPath = `i18n/legal/${DEFAULT_LOCALE}/${page}.txt`;
    const legalBody = fs.existsSync(path.join(ROOT, legalBodyPath))
      ? read(legalBodyPath)
      : read(fallbackBodyPath);

    const legalHtml = render(legalTemplate, {
      LANG: locale,
      HTML_LANG: htmlLang(locale),
      LEGAL_SLUG: page,
      LEGAL_TITLE: escapeHtml(t(`legal.${page}.title`, locale)),
      LEGAL_DESCRIPTION: escapeHtml(t(`legal.${page}.description`, locale)),
      LEGAL_BACK_HOME: escapeHtml(t("legal.back_home", locale)),
      LANG_CURRENT_NAME: escapeHtml(currentLanguageName(locale)),
      LANG_ARIA_LABEL: escapeHtml(t("lang.aria_label", locale)),
      LANG_ITEMS_LEGAL: languageItems(locale, page),
      HREFLANG_LINKS: hreflangLinks(page),
      LEGAL_BODY: escapeHtml(legalBody),
    });

    write(`${locale}/${page}/index.html`, legalHtml);
  }
}

console.log("Localized pages generated:", LOCALES.join(", "));
