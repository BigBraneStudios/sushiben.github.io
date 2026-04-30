import fs from "node:fs";
import path from "node:path";
import {
  FIXED_TEXT,
  LANGUAGE_NAMES_NATIVE,
  PLACEHOLDER_VALUES,
  PUBLISHER_NAME,
  REVIEW_QUOTES,
  REVIEW_SOURCES,
  REVIEW_URLS,
  SAME_AS_URLS,
  SHARE_IMAGE_PATH,
  SHARE_IMAGE_VERSION,
  SITE_NAME,
  SITE_URL,
  SOCIAL_LABELS,
  TRAILER_EMBED_URL,
  TURNSTILE_SITE_KEY,
} from "./i18n-constants.mjs";

const ROOT = process.cwd();
const CSV_FILES = [
  "i18n/strings-main.csv",
  "i18n/strings-team-cast.csv",
  "i18n/strings-presskit.csv",
  "i18n/strings-eula.csv",
  "i18n/strings-fan-content.csv",
  "i18n/strings-privacy.csv",
];
const SHARE_IMAGE_URL = `${SITE_URL}${SHARE_IMAGE_PATH}?v=${SHARE_IMAGE_VERSION}`;
const LOCALES = ["en", "de", "es", "fr", "it", "pt-br", "ja", "ko", "zh-hans", "zh-hant"];
const DEFAULT_LOCALE = "en";
const SECONDARY_PAGES = ["team", "cast", "press-kit", "shop"];
const LEGAL_PAGES = [
  { slug: "eula", key: "eula" },
  { slug: "fan-content", key: "fan_content" },
  { slug: "privacy", key: "privacy" },
];
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

function redirectHtml(targetHref, canonicalUrlValue) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=${targetHref}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Redirecting | ${SITE_NAME}</title>
  <link rel="canonical" href="${canonicalUrlValue}">
</head>
<body>
  <p>Redirecting to <a href="${targetHref}">${targetHref}</a>...</p>
</body>
</html>
`;
}

function localeRedirectHtml(targetSuffix, canonicalUrlValue) {
  const fallbackHref = `../${DEFAULT_LOCALE}/${targetSuffix}`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=${fallbackHref}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Redirecting | ${SITE_NAME}</title>
  <link rel="canonical" href="${canonicalUrlValue}">
  <script>
    (function () {
      var locales = ${jsonLd(LOCALES)};
      var prefs = Array.isArray(window.navigator.languages) && window.navigator.languages.length
        ? window.navigator.languages
        : [window.navigator.language || "${DEFAULT_LOCALE}"];

      function normalizeLocale(raw) {
        var value = String(raw || "").toLowerCase();
        if (!value) return "${DEFAULT_LOCALE}";
        if (locales.indexOf(value) !== -1) return value;
        if (value === "pt") return "pt-br";
        if (value === "zh" || value === "zh-cn" || value === "zh-sg" || value === "zh-hans") return "zh-hans";
        if (value === "zh-tw" || value === "zh-hk" || value === "zh-mo" || value === "zh-hant") return "zh-hant";
        var short = value.split("-")[0];
        if (short === "pt") return "pt-br";
        if (short === "zh") {
          return value.indexOf("hant") !== -1 || value.indexOf("tw") !== -1 || value.indexOf("hk") !== -1
            ? "zh-hant"
            : "zh-hans";
        }
        if (locales.indexOf(short) !== -1) return short;
        return "${DEFAULT_LOCALE}";
      }

      var locale = "${DEFAULT_LOCALE}";
      for (var i = 0; i < prefs.length; i += 1) {
        locale = normalizeLocale(prefs[i]);
        if (locale) break;
      }

      window.location.replace("../" + locale + "/${targetSuffix}");
    })();
  </script>
</head>
<body>
  <p>Redirecting to <a href="${fallbackHref}">${fallbackHref}</a>...</p>
</body>
</html>
`;
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

function replacePlaceholders(value) {
  let out = String(value ?? "");
  for (const [token, replacement] of Object.entries(PLACEHOLDER_VALUES)) {
    out = out.split(token).join(replacement);
  }
  return out;
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

const dict = new Map();
for (const csvFile of CSV_FILES) {
  const csv = parseCsv(read(csvFile));
  csv.rows.forEach((r) => {
    if (dict.has(r.key)) throw new Error(`Duplicate translation key: ${r.key} in ${csvFile}`);
    dict.set(r.key, r);
  });
}

function t(key, locale) {
  const row = dict.get(key);
  if (!row) throw new Error(`Missing translation key: ${key}`);
  return replacePlaceholders(decodeHtmlEntities(row[locale] || row[DEFAULT_LOCALE] || ""));
}

function currentLanguageName(locale) {
  return LANGUAGE_NAMES_NATIVE[locale] || locale;
}

function languageItems(locale, page) {
  return LOCALES.map((loc) => {
    const label = escapeHtml(currentLanguageName(loc));
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
    name: PUBLISHER_NAME,
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
      name: PUBLISHER_NAME,
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

function notFoundTranslations() {
  const out = {};
  for (const locale of LOCALES) {
    out[locale] = {
      html_lang: htmlLang(locale),
      language_name: currentLanguageName(locale),
      lang_aria_label: t("lang.aria_label", locale),
      full_title: `${SITE_NAME} | ${t("page.404.title", locale)}`,
      page_title: t("page.404.title", locale),
      page_description: t("page.404.description", locale),
      kicker: t("404.kicker", locale),
      heading: t("404.heading", locale),
      body_1: t("404.body1", locale),
      body_2: t("404.body2", locale),
      cta_home: t("legal.back_home", locale),
      nav_buy: t("nav.buy", locale),
      nav_media: t("nav.media", locale),
      nav_about: t("nav.about", locale),
      nav_cast: t("nav.cast", locale),
      nav_press_kit: t("nav.press_kit", locale),
      nav_contact: t("nav.contact", locale),
      nav_menu: t("nav.menu", locale),
      nav_team: t("nav.team", locale),
      footer_eula: t("footer.legal.eula", locale),
      footer_fan_content: t("footer.legal.fan_content", locale),
      footer_privacy: t("footer.legal.privacy", locale),
      footer_soundtrack: t("footer.soundtrack", locale),
      logo_alt: t("image.logo.horizontal.alt", locale),
      botan_alt: t("image.sticker.botan.alt", locale),
    };
  }
  return jsonLd(out);
}

function reviewSummary(summaryKey, locale) {
  if (locale === DEFAULT_LOCALE) return "";
  const summary = t(summaryKey, locale);
  if (!summary) return "";
  return `${t("home.reviews.summary_label", locale)} ${summary}`;
}

function renderSecondaryTokens(template, locale) {
  return template.replace(/{{\s*([a-z0-9._-]+)\s*}}/gi, (_match, key) => {
    if (key === "home.about.body.html") {
      return formatAboutHtml(t("home.about.body", locale));
    }
    if (key === "home.hero.lede.html") {
      return formatHeroLedeHtml(t("home.hero.lede", locale));
    }
    if (FIXED_TEXT[key]) {
      return escapeHtml(FIXED_TEXT[key]);
    }
    const reviewQuoteMatch = key.match(/^home\.reviews\.quote([1-4])$/);
    if (reviewQuoteMatch) {
      return escapeHtml(REVIEW_QUOTES[Number(reviewQuoteMatch[1]) - 1]);
    }
    const reviewSummaryMatch = key.match(/^home\.reviews\.summary([1-4])$/);
    if (reviewSummaryMatch) {
      return escapeHtml(reviewSummary(key, locale));
    }
    return escapeHtml(t(key, locale));
  });
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

  if (fs.existsSync(localizedAbs)) {
    return renderSecondaryTokens(normalizeSecondaryPaths(read(localized).trim()), locale);
  }
  if (fs.existsSync(fallbackAbs)) {
    return renderSecondaryTokens(normalizeSecondaryPaths(read(fallback).trim()), locale);
  }

  return `<p class="secondary-stub">${escapeHtml(t(`page.${page}.stub_body`, locale))}</p>`;
}

const homeTemplate = read("templates/home.tpl");
const legalTemplate = read("templates/legal.tpl");
const secondaryTemplate = read("templates/secondary.tpl");
const notFoundTemplate = read("templates/404.tpl");

for (const locale of LOCALES) {
  const orgJson = organizationJsonLd();
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
    SHARE_IMAGE_ALT: escapeHtml(t("image.share_card.alt", locale)),
    ORG_JSON_LD: orgJson,
    WEBSITE_JSON_LD: websiteJsonLd(locale),
    WEBPAGE_JSON_LD: webpageJsonLd(siteTitle, siteDescription, homeCanonical),
    VIDEOGAME_JSON_LD: videoGameJsonLd(locale, siteDescription),
    NAV_ABOUT: escapeHtml(t("nav.about", locale)),
    NAV_FEATURES: escapeHtml(t("nav.features", locale)),
    NAV_BUY: escapeHtml(t("nav.buy", locale)),
    NAV_MERCH: escapeHtml(t("nav.merch", locale)),
    NAV_MEDIA: escapeHtml(t("nav.media", locale)),
    NAV_CONTACT: escapeHtml(t("nav.contact", locale)),
    NAV_MENU: escapeHtml(t("nav.menu", locale)),
    LANG_CURRENT_NAME: escapeHtml(currentLanguageName(locale)),
    LANG_ARIA_LABEL: escapeHtml(t("lang.aria_label", locale)),
    LANG_ITEMS_HOME: languageItems(locale, "home"),
    HREFLANG_LINKS: hreflangLinks("home"),
    IMAGE_LOGO_HORIZONTAL_ALT: escapeHtml(t("image.logo.horizontal.alt", locale)),
    IMAGE_LOGO_PRIMARY_ALT: escapeHtml(t("image.logo.primary.alt", locale)),
    IMAGE_HERO_MINAMI_ALT: escapeHtml(t("image.hero.minami.alt", locale)),
    IMAGE_STORE_STEAM_ALT: escapeHtml(t("image.store.steam.alt", locale)),
    IMAGE_STORE_PLAYSTATION_ALT: escapeHtml(t("image.store.playstation.alt", locale)),
    IMAGE_STORE_META_ALT: escapeHtml(t("image.store.meta.alt", locale)),
    IMAGE_STORE_VIVEPORT_ALT: escapeHtml(t("image.store.viveport.alt", locale)),
    IMAGE_STORE_PICO_ALT: escapeHtml(t("image.store.pico.alt", locale)),
    IMAGE_STORE_STOVE_ALT: escapeHtml(t("image.store.stove.alt", locale)),
    IMAGE_SCREENSHOT_OPEN_1: escapeHtml(t("image.screenshot.1.open", locale)),
    IMAGE_SCREENSHOT_ALT_1: escapeHtml(t("image.screenshot.1.alt", locale)),
    IMAGE_SCREENSHOT_OPEN_2: escapeHtml(t("image.screenshot.2.open", locale)),
    IMAGE_SCREENSHOT_ALT_2: escapeHtml(t("image.screenshot.2.alt", locale)),
    IMAGE_SCREENSHOT_OPEN_4: escapeHtml(t("image.screenshot.4.open", locale)),
    IMAGE_SCREENSHOT_ALT_4: escapeHtml(t("image.screenshot.4.alt", locale)),
    IMAGE_SCREENSHOT_OPEN_5: escapeHtml(t("image.screenshot.5.open", locale)),
    IMAGE_SCREENSHOT_ALT_5: escapeHtml(t("image.screenshot.5.alt", locale)),
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
    HOME_MEDIA_TITLE: escapeHtml(t("home.media.title", locale)),
    HOME_CONTACT_TITLE: escapeHtml(t("home.contact.title", locale)),
    HOME_CONTACT_SUBTITLE: escapeHtml(t("home.contact.subtitle", locale)),
    HOME_SOUNDTRACK_TITLE: escapeHtml(t("home.soundtrack.title", locale)),
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
    FORM_WEBSITE: escapeHtml(t("home.form.website", locale)),
    FORM_SUBMIT: escapeHtml(t("home.form.submit", locale)),
    TURNSTILE_SITE_KEY: escapeHtml(TURNSTILE_SITE_KEY),
    LEGAL_EULA_LABEL: escapeHtml(t("footer.legal.eula", locale)),
    LEGAL_FAN_CONTENT_LABEL: escapeHtml(t("footer.legal.fan_content", locale)),
    LEGAL_PRIVACY_LABEL: escapeHtml(t("footer.legal.privacy", locale)),
    FOOTER_SOUNDTRACK: escapeHtml(t("footer.soundtrack", locale)),
    SOCIAL_X: SOCIAL_LABELS.x,
    SOCIAL_YOUTUBE: SOCIAL_LABELS.youtube,
    SOCIAL_DISCORD: SOCIAL_LABELS.discord,
    NAV_TEAM: escapeHtml(t("nav.team", locale)),
    NAV_CAST: escapeHtml(t("nav.cast", locale)),
    NAV_PRESS_KIT: escapeHtml(t("nav.press_kit", locale)),
    HOME_REVIEWS_TITLE: escapeHtml(t("home.reviews.title", locale)),
    HOME_REVIEW_QUOTE_1: escapeHtml(REVIEW_QUOTES[0]),
    HOME_REVIEW_SUMMARY_1: escapeHtml(reviewSummary("home.reviews.summary1", locale)),
    HOME_REVIEW_SOURCE_1: REVIEW_SOURCES[0],
    HOME_REVIEW_URL_1: REVIEW_URLS[0],
    HOME_REVIEW_QUOTE_2: escapeHtml(REVIEW_QUOTES[1]),
    HOME_REVIEW_SUMMARY_2: escapeHtml(reviewSummary("home.reviews.summary2", locale)),
    HOME_REVIEW_SOURCE_2: REVIEW_SOURCES[1],
    HOME_REVIEW_URL_2: REVIEW_URLS[1],
    HOME_REVIEW_QUOTE_3: escapeHtml(REVIEW_QUOTES[2]),
    HOME_REVIEW_SUMMARY_3: escapeHtml(reviewSummary("home.reviews.summary3", locale)),
    HOME_REVIEW_SOURCE_3: REVIEW_SOURCES[2],
    HOME_REVIEW_URL_3: REVIEW_URLS[2],
    HOME_REVIEW_QUOTE_4: escapeHtml(REVIEW_QUOTES[3]),
    HOME_REVIEW_SUMMARY_4: escapeHtml(reviewSummary("home.reviews.summary4", locale)),
    HOME_REVIEW_SOURCE_4: REVIEW_SOURCES[3],
    HOME_REVIEW_URL_4: REVIEW_URLS[3],
    HOME_FINAL_CTA_TITLE: escapeHtml(t("home.final_cta.title", locale)),
    HOME_FINAL_CTA_BODY: escapeHtml(t("home.final_cta.body", locale)),
    HOME_FINAL_CTA_BUY: escapeHtml(t("home.cta.buy", locale)),
    HOME_FINAL_CTA_WATCH: escapeHtml(t("home.cta.watch", locale)),
  });

  write(`${locale}/index.html`, homeHtml);

  for (const page of LEGAL_PAGES) {
    const legalBody = t(`legal.${page.key}.body`, locale);
    const legalTitle = t(`legal.${page.key}.title`, locale);
    const legalDescription = t(`legal.${page.key}.description`, locale);
    const fullLegalTitle = `${SITE_NAME} | ${legalTitle}`;
    const legalCanonical = canonicalUrl(locale, page.slug);

    const legalHtml = render(legalTemplate, {
      LANG: locale,
      HTML_LANG: htmlLang(locale),
      LEGAL_SLUG: page.slug,
      LEGAL_TITLE: escapeHtml(legalTitle),
      FULL_TITLE: escapeHtml(fullLegalTitle),
      LEGAL_DESCRIPTION: escapeHtml(legalDescription),
      OG_LOCALE: ogLocale(locale),
      OG_LOCALE_ALTERNATES: ogLocaleAlternates(locale),
      CANONICAL_URL: legalCanonical,
      SHARE_IMAGE_URL: SHARE_IMAGE_URL,
      SHARE_IMAGE_ALT: escapeHtml(t("image.share_card.alt", locale)),
      ORG_JSON_LD: orgJson,
      WEBPAGE_JSON_LD: webpageJsonLd(fullLegalTitle, legalDescription, legalCanonical),
      LEGAL_BACK_HOME: escapeHtml(t("legal.back_home", locale)),
      LANG_CURRENT_NAME: escapeHtml(currentLanguageName(locale)),
      LANG_ARIA_LABEL: escapeHtml(t("lang.aria_label", locale)),
      LANG_ITEMS_LEGAL: languageItems(locale, page.slug),
      HREFLANG_LINKS: hreflangLinks(page.slug),
      IMAGE_LOGO_HORIZONTAL_ALT: escapeHtml(t("image.logo.horizontal.alt", locale)),
      LEGAL_BODY: escapeHtml(legalBody),
      NAV_ABOUT: escapeHtml(t("nav.about", locale)),
      NAV_BUY: escapeHtml(t("nav.buy", locale)),
      NAV_MERCH: escapeHtml(t("nav.merch", locale)),
      NAV_MEDIA: escapeHtml(t("nav.media", locale)),
      NAV_CONTACT: escapeHtml(t("nav.contact", locale)),
      NAV_MENU: escapeHtml(t("nav.menu", locale)),
      NAV_TEAM: escapeHtml(t("nav.team", locale)),
      NAV_CAST: escapeHtml(t("nav.cast", locale)),
      NAV_PRESS_KIT: escapeHtml(t("nav.press_kit", locale)),
      LEGAL_EULA_LABEL: escapeHtml(t("footer.legal.eula", locale)),
      LEGAL_FAN_CONTENT_LABEL: escapeHtml(t("footer.legal.fan_content", locale)),
      LEGAL_PRIVACY_LABEL: escapeHtml(t("footer.legal.privacy", locale)),
      FOOTER_SOUNDTRACK: escapeHtml(t("footer.soundtrack", locale)),
      LEGAL_EULA_BUTTON_CLASS: page.slug === "eula" ? "btn btn-primary" : "btn btn-secondary",
      LEGAL_FAN_CONTENT_BUTTON_CLASS: page.slug === "fan-content" ? "btn btn-primary" : "btn btn-secondary",
      LEGAL_PRIVACY_BUTTON_CLASS: page.slug === "privacy" ? "btn btn-primary" : "btn btn-secondary",
      LEGAL_EULA_CURRENT_ATTR: page.slug === "eula" ? ' aria-current="page"' : "",
      LEGAL_FAN_CONTENT_CURRENT_ATTR: page.slug === "fan-content" ? ' aria-current="page"' : "",
      LEGAL_PRIVACY_CURRENT_ATTR: page.slug === "privacy" ? ' aria-current="page"' : "",
      SOCIAL_X: SOCIAL_LABELS.x,
      SOCIAL_YOUTUBE: SOCIAL_LABELS.youtube,
      SOCIAL_DISCORD: SOCIAL_LABELS.discord,
    });

    write(`${locale}/${page.slug}/index.html`, legalHtml);
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
      SHARE_IMAGE_ALT: escapeHtml(t("image.share_card.alt", locale)),
      ORG_JSON_LD: orgJson,
      WEBPAGE_JSON_LD: webpageJsonLd(fullPageTitle, pageDescription, pageCanonical),
      PAGE_BODY: readSecondaryBody(locale, page),
      LEGAL_BACK_HOME: escapeHtml(t("legal.back_home", locale)),
      LANG_CURRENT_NAME: escapeHtml(currentLanguageName(locale)),
      LANG_ARIA_LABEL: escapeHtml(t("lang.aria_label", locale)),
      LANG_ITEMS_PAGE: languageItems(locale, page),
      HREFLANG_LINKS: hreflangLinks(page),
      IMAGE_LOGO_HORIZONTAL_ALT: escapeHtml(t("image.logo.horizontal.alt", locale)),
      NAV_ABOUT: escapeHtml(t("nav.about", locale)),
      NAV_BUY: escapeHtml(t("nav.buy", locale)),
      NAV_MERCH: escapeHtml(t("nav.merch", locale)),
      NAV_MEDIA: escapeHtml(t("nav.media", locale)),
      NAV_CONTACT: escapeHtml(t("nav.contact", locale)),
      NAV_MENU: escapeHtml(t("nav.menu", locale)),
      NAV_TEAM: escapeHtml(t("nav.team", locale)),
      NAV_CAST: escapeHtml(t("nav.cast", locale)),
      NAV_PRESS_KIT: escapeHtml(t("nav.press_kit", locale)),
      LEGAL_EULA_LABEL: escapeHtml(t("footer.legal.eula", locale)),
      LEGAL_FAN_CONTENT_LABEL: escapeHtml(t("footer.legal.fan_content", locale)),
      LEGAL_PRIVACY_LABEL: escapeHtml(t("footer.legal.privacy", locale)),
      FOOTER_SOUNDTRACK: escapeHtml(t("footer.soundtrack", locale)),
      SOCIAL_X: SOCIAL_LABELS.x,
      SOCIAL_YOUTUBE: SOCIAL_LABELS.youtube,
      SOCIAL_DISCORD: SOCIAL_LABELS.discord,
    });
    write(`${locale}/${page}/index.html`, pageHtml);
  }
}

const sitemapUrls = [];
for (const locale of LOCALES) {
  sitemapUrls.push(canonicalUrl(locale, "home"));
  for (const page of LEGAL_PAGES) {
    sitemapUrls.push(canonicalUrl(locale, page.slug));
  }
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

const notFoundHtml = render(notFoundTemplate, {
  DEFAULT_404_TITLE: escapeHtml(`${SITE_NAME} | ${t("page.404.title", DEFAULT_LOCALE)}`),
  DEFAULT_404_DESCRIPTION: escapeHtml(t("page.404.description", DEFAULT_LOCALE)),
  DEFAULT_404_CANONICAL: `${SITE_URL}/${DEFAULT_LOCALE}/`,
  ORG_JSON_LD: organizationJsonLd(),
  SOCIAL_X: SOCIAL_LABELS.x,
  SOCIAL_YOUTUBE: SOCIAL_LABELS.youtube,
  SOCIAL_DISCORD: SOCIAL_LABELS.discord,
  NOT_FOUND_I18N_JSON: notFoundTranslations(),
  LOCALES_JSON: jsonLd(LOCALES),
  SITE_URL_JSON: jsonLd(SITE_URL),
});

write("404.html", notFoundHtml);

write("press-kit/index.html", redirectHtml("../en/press-kit/", `${SITE_URL}/en/press-kit/`));
write("presskit/index.html", redirectHtml("../en/press-kit/", `${SITE_URL}/en/press-kit/`));
write("voice-actors/index.html", redirectHtml("http://www.sushiben.com/cast", `${SITE_URL}/en/cast/`));
write("fan-content/index.html", localeRedirectHtml("fan-content/", `${SITE_URL}/en/fan-content/`));
write("shop/index.html", localeRedirectHtml("shop/", `${SITE_URL}/en/shop/`));
write("merch/index.html", redirectHtml("../en/shop/", `${SITE_URL}/en/shop/`));

for (const locale of LOCALES) {
  write(`${locale}/presskit/index.html`, redirectHtml("../press-kit/", canonicalUrl(locale, "press-kit")));
  write(`${locale}/fan-content-policy/index.html`, redirectHtml("../fan-content/", canonicalUrl(locale, "fan-content")));
  write(`${locale}/merch/index.html`, redirectHtml("../shop/", canonicalUrl(locale, "shop")));
}

console.log("Localized pages generated:", LOCALES.join(", "));
