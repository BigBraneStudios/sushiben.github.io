<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="darkreader-lock">
  <meta name="robots" content="noindex">
  <meta name="color-scheme" content="light dark">
  <script>try{const t=localStorage.getItem("sb_theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t);}}catch(_err){}</script>
  <title>{{DEFAULT_404_TITLE}}</title>
  <meta name="description" content="{{DEFAULT_404_DESCRIPTION}}">
  <script>
    (function () {
      var projectBase = "/sushiben.github.io/";
      var isProjectPages =
        location.hostname.endsWith(".github.io") &&
        location.pathname.indexOf(projectBase) === 0;
      var base = isProjectPages ? projectBase : "/";
      window.__SB_BASE_PATH__ = base;
      document.write('<base href="' + base + '">');
    })();
  </script>
  <link rel="icon" type="image/x-icon" href="./assets/images/favicon.ico">
  <link rel="canonical" href="{{DEFAULT_404_CANONICAL}}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700&family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./styles.css">
  <link rel="stylesheet" href="./secondary.css">
  <script type="application/ld+json">{{ORG_JSON_LD}}</script>
</head>
<body class="secondary-page secondary-404-page">
  <header class="site-header">
    <div class="wrap nav-row">
      <a class="brand" id="not-found-brand" href="en/" aria-label="Sushi Ben Home">
        <img class="brand-logo" src="./assets/images/SushiBen_Logo_H.png" alt="">
      </a>
      <nav class="nav-links" aria-label="Primary">
        <a id="not-found-nav-buy" href="en/index.html#buy"></a>
        <a id="not-found-nav-media" href="en/index.html#media"></a>
        <a id="not-found-nav-about" href="en/index.html#about"></a>
        <a id="not-found-nav-cast" href="en/cast/"></a>
        <a id="not-found-nav-press-kit" href="en/press-kit/"></a>
        <a id="not-found-nav-contact" href="en/index.html#contact"></a>
      </nav>
      <div class="header-controls">
        <details class="nav-menu">
          <summary id="not-found-nav-menu-summary"></summary>
          <ul>
            <li><a id="not-found-nav-menu-buy" href="en/index.html#buy"></a></li>
            <li><a id="not-found-nav-menu-media" href="en/index.html#media"></a></li>
            <li><a id="not-found-nav-menu-about" href="en/index.html#about"></a></li>
            <li><a id="not-found-nav-menu-cast" href="en/cast/"></a></li>
            <li><a id="not-found-nav-menu-press-kit" href="en/press-kit/"></a></li>
            <li><a id="not-found-nav-menu-contact" href="en/index.html#contact"></a></li>
          </ul>
        </details>
        <details class="lang-switcher">
          <summary id="not-found-lang-summary" aria-label=""></summary>
          <ul id="not-found-lang-items"></ul>
        </details>
        <button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch to dark theme" aria-pressed="false" title="Switch to dark theme">&#9790;</button>
      </div>
    </div>
  </header>

  <main class="legal-wrap">
    <section class="secondary-group secondary-panel not-found-panel">
      <div class="not-found-copy">
        <p class="kicker" id="not-found-kicker"></p>
        <p class="not-found-code">404</p>
        <h2 id="not-found-heading"></h2>
        <p id="not-found-body-1"></p>
        <p id="not-found-body-2"></p>
        <div class="cta-row">
          <a class="btn btn-primary" id="not-found-cta-home" href="en/"></a>
          <a class="btn btn-secondary" id="not-found-cta-press-kit" href="en/press-kit/"></a>
          <a class="btn btn-secondary" id="not-found-cta-contact" href="en/index.html#contact"></a>
        </div>
      </div>
      <div class="not-found-art">
        <img id="not-found-art-image" src="./assets/images/SushiBen_Sticker_Botan.png" alt="">
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="wrap footer-row">
      <div class="footer-main">
        <div class="social-row" aria-label="Social links">
          <a href="https://x.com/SushiBenGame" target="_blank" rel="noopener noreferrer">{{SOCIAL_X}}</a>
          <a href="https://www.youtube.com/watch?v=1lA0ssiHHxM" target="_blank" rel="noopener noreferrer">{{SOCIAL_YOUTUBE}}</a>
          <a href="https://discord.gg/sushiben" target="_blank" rel="noopener noreferrer">{{SOCIAL_DISCORD}}</a>
        </div>
        <div class="legal-row" aria-label="Legal links">
          <a id="not-found-footer-eula" href="en/eula/"></a>
          <a id="not-found-footer-fan-content" href="en/fan-content/"></a>
          <a id="not-found-footer-privacy" href="en/privacy/"></a>
        </div>
        <div class="meta-row" aria-label="More links">
          <a id="not-found-footer-team" href="en/team/"></a>
          <a id="not-found-footer-press-kit" href="en/press-kit/"></a>
          <a href="https://open.spotify.com/album/0d3HqxaVExA5LMOFDsAotM" target="_blank" rel="noopener noreferrer" id="not-found-footer-soundtrack"></a>
        </div>
      </div>
      <p class="footer-copy">&copy; <span id="year"></span> Big Brane Studios, Inc. All rights reserved.</p>
    </div>
  </footer>

  <script>
    (function () {
      var localeData = {{NOT_FOUND_I18N_JSON}};
      var locales = {{LOCALES_JSON}};
      var siteUrl = {{SITE_URL_JSON}};
      var basePath = window.__SB_BASE_PATH__ || "/";
      var legacyRouteMap = {
        "about": "index.html#about",
        "buy": "index.html#buy",
        "media": "index.html#media",
        "contact": "index.html#contact",
        "presskit": "press-kit/",
        "press-kit": "press-kit/",
        "voice-actors": "cast/",
        "fan-content": "fan-content/",
        "fan-content-policy": "fan-content/"
      };

      function setText(id, value) {
        var el = document.getElementById(id);
        if (el) el.textContent = value;
      }

      function setHref(id, value) {
        var el = document.getElementById(id);
        if (el) el.setAttribute("href", value);
      }

      function localizedPath(locale, suffix) {
        return "" + basePath + locale + "/" + suffix;
      }

      function normalizedLocalePreference(raw) {
        var value = String(raw || "").toLowerCase();
        if (!value) return "en";
        if (locales.indexOf(value) !== -1) return value;
        if (value === "pt") return "pt-br";
        if (value === "zh" || value === "zh-cn" || value === "zh-sg" || value === "zh-hans") return "zh-hans";
        if (value === "zh-tw" || value === "zh-hk" || value === "zh-mo" || value === "zh-hant") return "zh-hant";
        var short = value.split("-")[0];
        if (short === "pt") return "pt-br";
        if (short === "zh") return value.indexOf("hant") !== -1 || value.indexOf("tw") !== -1 || value.indexOf("hk") !== -1 ? "zh-hant" : "zh-hans";
        if (locales.indexOf(short) !== -1) return short;
        return "en";
      }

      function detectLocale() {
        var relative = window.location.pathname || "/";
        if (relative.indexOf(basePath) === 0) {
          relative = relative.slice(basePath.length);
        }
        relative = relative.replace(/^\/+/, "");
        var first = relative.split("/")[0].toLowerCase();
        if (locales.indexOf(first) !== -1) return first;

        var prefs = Array.isArray(window.navigator.languages) && window.navigator.languages.length
          ? window.navigator.languages
          : [window.navigator.language || "en"];

        for (var i = 0; i < prefs.length; i += 1) {
          var match = normalizedLocalePreference(prefs[i]);
          if (match) return match;
        }
        return "en";
      }

      function detectLegacyTarget() {
        var relative = window.location.pathname || "/";
        if (relative.indexOf(basePath) === 0) {
          relative = relative.slice(basePath.length);
        }
        relative = relative.replace(/^\/+|\/+$/g, "").toLowerCase();
        if (!relative) return "";

        var segments = relative.split("/");
        if (locales.indexOf(segments[0]) !== -1) {
          segments.shift();
        }
        if (!segments.length) return "";

        var mapped = legacyRouteMap[segments.join("/")];
        return mapped || "";
      }

      function redirectLegacyRoute(locale) {
        var target = detectLegacyTarget();
        if (!target) return false;
        window.location.replace(localizedPath(locale, target));
        return true;
      }

      function applyLocale(locale) {
        var copy = localeData[locale] || localeData.en;
        if (!copy) return;

        document.documentElement.lang = copy.html_lang;
        document.title = copy.full_title;

        var description = document.querySelector('meta[name="description"]');
        if (description) description.setAttribute("content", copy.page_description);

        var canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) canonical.setAttribute("href", siteUrl + "/" + locale + "/");

        setText("not-found-page-title", copy.page_title);
        setText("not-found-kicker", copy.kicker);
        setText("not-found-heading", copy.heading);
        setText("not-found-body-1", copy.body_1);
        setText("not-found-body-2", copy.body_2);

        setText("not-found-nav-buy", copy.nav_buy);
        setText("not-found-nav-media", copy.nav_media);
        setText("not-found-nav-about", copy.nav_about);
        setText("not-found-nav-cast", copy.nav_cast);
        setText("not-found-nav-press-kit", copy.nav_press_kit);
        setText("not-found-nav-contact", copy.nav_contact);
        setText("not-found-nav-menu-summary", copy.nav_menu);
        setText("not-found-nav-menu-buy", copy.nav_buy);
        setText("not-found-nav-menu-media", copy.nav_media);
        setText("not-found-nav-menu-about", copy.nav_about);
        setText("not-found-nav-menu-cast", copy.nav_cast);
        setText("not-found-nav-menu-press-kit", copy.nav_press_kit);
        setText("not-found-nav-menu-contact", copy.nav_contact);
        setText("not-found-cta-home", copy.cta_home);
        setText("not-found-cta-press-kit", copy.nav_press_kit);
        setText("not-found-cta-contact", copy.nav_contact);
        setText("not-found-footer-eula", copy.footer_eula);
        setText("not-found-footer-fan-content", copy.footer_fan_content);
        setText("not-found-footer-privacy", copy.footer_privacy);
        setText("not-found-footer-team", copy.nav_team);
        setText("not-found-footer-press-kit", copy.nav_press_kit);
        setText("not-found-footer-soundtrack", copy.footer_soundtrack);

        var brand = document.getElementById("not-found-brand");
        if (brand) {
          brand.setAttribute("href", localizedPath(locale, ""));
          brand.setAttribute("aria-label", copy.cta_home);
        }

        var logo = brand ? brand.querySelector(".brand-logo") : null;
        if (logo) logo.setAttribute("alt", copy.logo_alt);

        var art = document.getElementById("not-found-art-image");
        if (art) art.setAttribute("alt", copy.botan_alt);

        setHref("not-found-nav-buy", localizedPath(locale, "index.html#buy"));
        setHref("not-found-nav-media", localizedPath(locale, "index.html#media"));
        setHref("not-found-nav-about", localizedPath(locale, "index.html#about"));
        setHref("not-found-nav-cast", localizedPath(locale, "cast/"));
        setHref("not-found-nav-press-kit", localizedPath(locale, "press-kit/"));
        setHref("not-found-nav-contact", localizedPath(locale, "index.html#contact"));
        setHref("not-found-nav-menu-buy", localizedPath(locale, "index.html#buy"));
        setHref("not-found-nav-menu-media", localizedPath(locale, "index.html#media"));
        setHref("not-found-nav-menu-about", localizedPath(locale, "index.html#about"));
        setHref("not-found-nav-menu-cast", localizedPath(locale, "cast/"));
        setHref("not-found-nav-menu-press-kit", localizedPath(locale, "press-kit/"));
        setHref("not-found-nav-menu-contact", localizedPath(locale, "index.html#contact"));
        setHref("not-found-cta-home", localizedPath(locale, ""));
        setHref("not-found-cta-press-kit", localizedPath(locale, "press-kit/"));
        setHref("not-found-cta-contact", localizedPath(locale, "index.html#contact"));
        setHref("not-found-footer-eula", localizedPath(locale, "eula/"));
        setHref("not-found-footer-fan-content", localizedPath(locale, "fan-content/"));
        setHref("not-found-footer-privacy", localizedPath(locale, "privacy/"));
        setHref("not-found-footer-team", localizedPath(locale, "team/"));
        setHref("not-found-footer-press-kit", localizedPath(locale, "press-kit/"));

        var langSummary = document.getElementById("not-found-lang-summary");
        if (langSummary) {
          langSummary.textContent = copy.language_name;
          langSummary.setAttribute("aria-label", copy.lang_aria_label);
        }

        var langItems = document.getElementById("not-found-lang-items");
        if (langItems) {
          langItems.innerHTML = locales.map(function (loc) {
            var item = localeData[loc] || localeData.en;
            return '<li><a href="' + localizedPath(loc, "") + '">' + item.language_name + "</a></li>";
          }).join("");
        }
      }

      var activeLocale = detectLocale();
      if (!redirectLegacyRoute(activeLocale)) {
        applyLocale(activeLocale);
      }
    })();
  </script>
  <script src="./script.js?v=20260331-theme3"></script>
</body>
</html>
