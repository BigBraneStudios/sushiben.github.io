import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SITE_URL = "https://www.sushiben.com";
const SITE_NAME = "Sushi Ben";
const SHARE_IMAGE_PATH = "/assets/images/share-card.jpg";
const SHARE_IMAGE_VERSION = "20260331-coverart";
const SHARE_IMAGE_URL = `${SITE_URL}${SHARE_IMAGE_PATH}?v=${SHARE_IMAGE_VERSION}`;
const TRAILER_EMBED_URL = "https://www.youtube.com/embed/FnIscA4M4rQ";
const SAME_AS_URLS = [
  "https://x.com/SushiBenGame",
  "https://www.youtube.com/watch?v=1lA0ssiHHxM",
  "https://discord.gg/sushiben",
  "https://store.steampowered.com/app/2419240/Sushi_Ben/",
  "https://store.playstation.com/concept/10010735",
  "https://www.meta.com/experiences/5459391390744272/",
  "https://www.viveport.com/apps/1e1eb547-c759-4266-89bb-64bcc6f6294e?hl=en-US",
  "https://store-global.picoxr.com/global/detail/1/7345233212618080262",
  "https://store.onstove.com/en/games/103625",
];
const LOCALES = ["en", "de", "es", "fr", "it", "pt-br", "ja", "ko", "zh-hans", "zh-hant"];
const DEFAULT_LOCALE = "en";
const SECONDARY_PAGES = ["team", "cast", "press-kit"];
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
const OG_LOCALE = {
  en: "en_US",
  de: "de_DE",
  es: "es_ES",
  fr: "fr_FR",
  it: "it_IT",
  "pt-br": "pt_BR",
  ja: "ja_JP",
  ko: "ko_KR",
  "zh-hans": "zh_CN",
  "zh-hant": "zh_TW",
};

function read(filePath) {
  return fs.readFileSync(path.join(ROOT, filePath), "utf8").replace(/^\uFEFF/, "");
}

function write(filePath, content) {
  const abs = path.join(ROOT, filePath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  const withBom = filePath.endsWith(".html") ? `\uFEFF${content}` : content;
  fs.writeFileSync(abs, withBom, "utf8");
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

function decodeHtmlEntities(value) {
  return String(value ?? "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
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

function formatHeroLedeHtml(value) {
  let html = escapeHtml(value);
  html = html.split("Moa").join("<strong>Moa</strong>");
  html = html.split("Hatoful Boyfriend").join("<em>Hatoful Boyfriend</em>");
  return html;
}

const csv = parseCsv(read("i18n/strings.csv"));
const dict = new Map();
csv.rows.forEach((r) => dict.set(r.key, r));

function t(key, locale) {
  const row = dict.get(key);
  if (!row) throw new Error(`Missing translation key: ${key}`);
  return decodeHtmlEntities(row[locale] || row[DEFAULT_LOCALE] || "");
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
    return `<link rel="alternate" hreflang="${hreflang}" href="${SITE_URL}/${loc}${suffix}">`;
  });
  items.push(`<link rel="alternate" hreflang="x-default" href="${SITE_URL}/${DEFAULT_LOCALE}${suffix}">`);
  return items.join("\n  ");
}

function htmlLang(locale) {
  return HREFLANG[locale] || locale;
}

function canonicalUrl(locale, page) {
  if (page === "home") return `${SITE_URL}/${locale}/`;
  return `${SITE_URL}/${locale}/${page}/`;
}

function jsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function organizationJsonLd() {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Big Brane Studios, Inc.",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/images/SushiBen_Logo_H.png`,
    sameAs: SAME_AS_URLS,
  });
}

function websiteJsonLd(locale) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: htmlLang(locale),
  });
}

function ogLocale(locale) {
  return OG_LOCALE[locale] || "en_US";
}

function ogLocaleAlternates(locale) {
  return LOCALES.filter((loc) => loc !== locale)
    .map((loc) => `<meta property="og:locale:alternate" content="${ogLocale(loc)}">`)
    .join("\n  ");
}

function webpageJsonLd(title, description, url) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url,
  });
}

function videoGameJsonLd(locale, description) {
  return jsonLd({
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: SITE_NAME,
    description,
    url: canonicalUrl(locale, "home"),
    image: SHARE_IMAGE_URL,
    genre: ["Narrative Adventure"],
    playMode: "SinglePlayer",
    gamePlatform: ["Steam", "PlayStation 5", "Meta Quest", "HTC VIVEPORT", "PICO", "STOVE"],
    publisher: {
      "@type": "Organization",
      name: "Big Brane Studios, Inc.",
    },
    trailer: {
      "@type": "VideoObject",
      name: "Sushi Ben Trailer",
      embedUrl: TRAILER_EMBED_URL,
      thumbnailUrl: SHARE_IMAGE_URL,
    },
  });
}

function render(template, replacements) {
  let out = template;
  for (const [key, value] of Object.entries(replacements)) {
    out = out.split(`{{${key}}}`).join(value);
  }
  return out;
}

function readSecondaryBody(locale, page) {
  const localized = `i18n/secondary/${locale}/${page}.html`;
  const fallback = `i18n/secondary/${DEFAULT_LOCALE}/${page}.html`;
  const localizedAbs = path.join(ROOT, localized);
  const fallbackAbs = path.join(ROOT, fallback);

  // Secondary source partials live under i18n/secondary/<locale>/ and use
  // "../../../assets/..." so editor path resolution works there. Generated
  // pages live at "<locale>/<page>/index.html" and need "../../assets/...".
  const normalizeSecondaryPaths = (html) =>
    html
      .replace(/\.\.\/\.\.\/\.\.\/assets\//g, "../../assets/")
      .replace(/\.\.\/\.\.\/\.\.\/en\/index\.html#contact/g, "../index.html#contact");

  if (fs.existsSync(localizedAbs)) return normalizeSecondaryPaths(read(localized).trim());
  if (fs.existsSync(fallbackAbs)) return normalizeSecondaryPaths(read(fallback).trim());

  return `<p class="secondary-stub">${escapeHtml(t(`page.${page}.stub_body`, locale))}</p>`;
}

const homeTemplate = read("templates/home.tpl");
const legalTemplate = read("templates/legal.tpl");
const secondaryTemplate = read("templates/secondary.tpl");

for (const locale of LOCALES) {
  const orgJson = organizationJsonLd();
  const translationNote = t("home.translation_note", locale)
    ? `<section class="translation-note">\n      <div class="wrap">\n        <p>${escapeHtml(t("home.translation_note", locale))}</p>\n      </div>\n    </section>`
    : "";
  const siteTitle = t("site.title", locale);
  const siteDescription = t("site.description", locale);
  const homeCanonical = canonicalUrl(locale, "home");

  const homeHtml = render(homeTemplate, {
    LANG: locale,
    HTML_LANG: htmlLang(locale),
    SITE_TITLE: escapeHtml(siteTitle),
    SITE_DESCRIPTION: escapeHtml(siteDescription),
    OG_LOCALE: ogLocale(locale),
    OG_LOCALE_ALTERNATES: ogLocaleAlternates(locale),
    CANONICAL_URL: homeCanonical,
    SHARE_IMAGE_URL: SHARE_IMAGE_URL,
    ORG_JSON_LD: orgJson,
    WEBSITE_JSON_LD: websiteJsonLd(locale),
    WEBPAGE_JSON_LD: webpageJsonLd(siteTitle, siteDescription, homeCanonical),
    VIDEOGAME_JSON_LD: videoGameJsonLd(locale, siteDescription),
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
    HOME_HERO_LEDE: formatHeroLedeHtml(t("home.hero.lede", locale)),
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
    HOME_SOUNDTRACK_TITLE: escapeHtml(t("home.soundtrack.title", locale)),
    HOME_SOUNDTRACK_BODY_BLOCK: t("home.soundtrack.body", locale)
      ? `<p>${escapeHtml(t("home.soundtrack.body", locale))}</p>`
      : "",
    HOME_SOUNDTRACK_CTA: escapeHtml(t("home.soundtrack.cta", locale)),
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
    FOOTER_SOUNDTRACK: escapeHtml(t("footer.soundtrack", locale)),
    SOCIAL_X: escapeHtml(t("footer.social.x", locale)),
    SOCIAL_YOUTUBE: escapeHtml(t("footer.social.youtube", locale)),
    SOCIAL_DISCORD: escapeHtml(t("footer.social.discord", locale)),
    NAV_TEAM: escapeHtml(t("nav.team", locale)),
    NAV_CAST: escapeHtml(t("nav.cast", locale)),
    NAV_PRESS_KIT: escapeHtml(t("nav.press_kit", locale)),
    HOME_REVIEWS_TITLE: escapeHtml(t("home.reviews.title", locale)),
    HOME_REVIEW_QUOTE_1: escapeHtml(t("home.reviews.quote1", locale)),
    HOME_REVIEW_SOURCE_1: escapeHtml(t("home.reviews.source1", locale)),
    HOME_REVIEW_URL_1: escapeHtml(t("home.reviews.url1", locale)),
    HOME_REVIEW_QUOTE_2: escapeHtml(t("home.reviews.quote2", locale)),
    HOME_REVIEW_SOURCE_2: escapeHtml(t("home.reviews.source2", locale)),
    HOME_REVIEW_URL_2: escapeHtml(t("home.reviews.url2", locale)),
    HOME_REVIEW_QUOTE_3: escapeHtml(t("home.reviews.quote3", locale)),
    HOME_REVIEW_SOURCE_3: escapeHtml(t("home.reviews.source3", locale)),
    HOME_REVIEW_URL_3: escapeHtml(t("home.reviews.url3", locale)),
    HOME_REVIEW_QUOTE_4: escapeHtml(t("home.reviews.quote4", locale)),
    HOME_REVIEW_SOURCE_4: escapeHtml(t("home.reviews.source4", locale)),
    HOME_REVIEW_URL_4: escapeHtml(t("home.reviews.url4", locale)),
    HOME_FINAL_CTA_TITLE: escapeHtml(t("home.final_cta.title", locale)),
    HOME_FINAL_CTA_BODY: escapeHtml(t("home.final_cta.body", locale)),
    HOME_FINAL_CTA_BUY: escapeHtml(t("home.final_cta.buy", locale)),
    HOME_FINAL_CTA_WATCH: escapeHtml(t("home.final_cta.watch", locale)),
  });

  write(`${locale}/index.html`, homeHtml);

  for (const page of ["eula", "privacy"]) {
    const legalBodyPath = `i18n/legal/${locale}/${page}.txt`;
    const fallbackBodyPath = `i18n/legal/${DEFAULT_LOCALE}/${page}.txt`;
    const legalBody = fs.existsSync(path.join(ROOT, legalBodyPath))
      ? read(legalBodyPath)
      : read(fallbackBodyPath);
    const legalTitle = t(`legal.${page}.title`, locale);
    const legalDescription = t(`legal.${page}.description`, locale);
    const fullLegalTitle = `${SITE_NAME} | ${legalTitle}`;
    const legalCanonical = canonicalUrl(locale, page);

    const legalHtml = render(legalTemplate, {
      LANG: locale,
      HTML_LANG: htmlLang(locale),
      LEGAL_SLUG: page,
      LEGAL_TITLE: escapeHtml(legalTitle),
      FULL_TITLE: escapeHtml(fullLegalTitle),
      LEGAL_DESCRIPTION: escapeHtml(legalDescription),
      OG_LOCALE: ogLocale(locale),
      OG_LOCALE_ALTERNATES: ogLocaleAlternates(locale),
      CANONICAL_URL: legalCanonical,
      SHARE_IMAGE_URL: SHARE_IMAGE_URL,
      ORG_JSON_LD: orgJson,
      WEBPAGE_JSON_LD: webpageJsonLd(fullLegalTitle, legalDescription, legalCanonical),
      LEGAL_BACK_HOME: escapeHtml(t("legal.back_home", locale)),
      LANG_CURRENT_NAME: escapeHtml(currentLanguageName(locale)),
      LANG_ARIA_LABEL: escapeHtml(t("lang.aria_label", locale)),
      LANG_ITEMS_LEGAL: languageItems(locale, page),
      HREFLANG_LINKS: hreflangLinks(page),
      LEGAL_BODY: escapeHtml(legalBody),
      NAV_ABOUT: escapeHtml(t("nav.about", locale)),
      NAV_BUY: escapeHtml(t("nav.buy", locale)),
      NAV_MEDIA: escapeHtml(t("nav.media", locale)),
      NAV_CONTACT: escapeHtml(t("nav.contact", locale)),
      NAV_MENU: escapeHtml(t("nav.menu", locale)),
      NAV_TEAM: escapeHtml(t("nav.team", locale)),
      NAV_CAST: escapeHtml(t("nav.cast", locale)),
      NAV_PRESS_KIT: escapeHtml(t("nav.press_kit", locale)),
      LEGAL_EULA_LABEL: escapeHtml(t("footer.legal.eula", locale)),
      LEGAL_PRIVACY_LABEL: escapeHtml(t("footer.legal.privacy", locale)),
      FOOTER_SOUNDTRACK: escapeHtml(t("footer.soundtrack", locale)),
      LEGAL_EULA_BUTTON_CLASS: page === "eula" ? "btn btn-primary" : "btn btn-secondary",
      LEGAL_PRIVACY_BUTTON_CLASS: page === "privacy" ? "btn btn-primary" : "btn btn-secondary",
      LEGAL_EULA_CURRENT_ATTR: page === "eula" ? ' aria-current="page"' : "",
      LEGAL_PRIVACY_CURRENT_ATTR: page === "privacy" ? ' aria-current="page"' : "",
      SOCIAL_X: escapeHtml(t("footer.social.x", locale)),
      SOCIAL_YOUTUBE: escapeHtml(t("footer.social.youtube", locale)),
      SOCIAL_DISCORD: escapeHtml(t("footer.social.discord", locale)),
    });

    write(`${locale}/${page}/index.html`, legalHtml);
  }

  for (const page of SECONDARY_PAGES) {
    const pageTitle = t(`page.${page}.title`, locale);
    const pageDescription = t(`page.${page}.description`, locale);
    const fullPageTitle = `${SITE_NAME} | ${pageTitle}`;
    const pageCanonical = canonicalUrl(locale, page);
    const pageHtml = render(secondaryTemplate, {
      LANG: locale,
      HTML_LANG: htmlLang(locale),
      PAGE_SLUG: page,
      PAGE_TITLE: escapeHtml(pageTitle),
      FULL_TITLE: escapeHtml(fullPageTitle),
      PAGE_DESCRIPTION: escapeHtml(pageDescription),
      OG_LOCALE: ogLocale(locale),
      OG_LOCALE_ALTERNATES: ogLocaleAlternates(locale),
      CANONICAL_URL: pageCanonical,
      SHARE_IMAGE_URL: SHARE_IMAGE_URL,
      ORG_JSON_LD: orgJson,
      WEBPAGE_JSON_LD: webpageJsonLd(fullPageTitle, pageDescription, pageCanonical),
      PAGE_BODY: readSecondaryBody(locale, page),
      LEGAL_BACK_HOME: escapeHtml(t("legal.back_home", locale)),
      LANG_CURRENT_NAME: escapeHtml(currentLanguageName(locale)),
      LANG_ARIA_LABEL: escapeHtml(t("lang.aria_label", locale)),
      LANG_ITEMS_PAGE: languageItems(locale, page),
      HREFLANG_LINKS: hreflangLinks(page),
      NAV_ABOUT: escapeHtml(t("nav.about", locale)),
      NAV_BUY: escapeHtml(t("nav.buy", locale)),
      NAV_MEDIA: escapeHtml(t("nav.media", locale)),
      NAV_CONTACT: escapeHtml(t("nav.contact", locale)),
      NAV_MENU: escapeHtml(t("nav.menu", locale)),
      NAV_TEAM: escapeHtml(t("nav.team", locale)),
      NAV_CAST: escapeHtml(t("nav.cast", locale)),
      NAV_PRESS_KIT: escapeHtml(t("nav.press_kit", locale)),
      LEGAL_EULA_LABEL: escapeHtml(t("footer.legal.eula", locale)),
      LEGAL_PRIVACY_LABEL: escapeHtml(t("footer.legal.privacy", locale)),
      FOOTER_SOUNDTRACK: escapeHtml(t("footer.soundtrack", locale)),
      SOCIAL_X: escapeHtml(t("footer.social.x", locale)),
      SOCIAL_YOUTUBE: escapeHtml(t("footer.social.youtube", locale)),
      SOCIAL_DISCORD: escapeHtml(t("footer.social.discord", locale)),
    });
    write(`${locale}/${page}/index.html`, pageHtml);
  }
}

const sitemapUrls = [];
for (const locale of LOCALES) {
  sitemapUrls.push(canonicalUrl(locale, "home"));
  sitemapUrls.push(canonicalUrl(locale, "eula"));
  sitemapUrls.push(canonicalUrl(locale, "privacy"));
  for (const page of SECONDARY_PAGES) {
    sitemapUrls.push(canonicalUrl(locale, page));
  }
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>
`;

write("sitemap.xml", sitemapXml);

console.log("Localized pages generated:", LOCALES.join(", "));
