<!doctype html>
<html lang="{{HTML_LANG}}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="darkreader-lock">
  <meta name="color-scheme" content="light dark">
  <script>try{const t=localStorage.getItem("sb_theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t);}}catch(_err){}</script>
  <title>Sushi Ben | {{PAGE_TITLE}}</title>
  <meta name="description" content="{{PAGE_DESCRIPTION}}">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <meta property="og:site_name" content="Sushi Ben">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{{FULL_TITLE}}">
  <meta property="og:description" content="{{PAGE_DESCRIPTION}}">
  <meta property="og:url" content="{{CANONICAL_URL}}">
  <meta property="og:image" content="{{SHARE_IMAGE_URL}}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Sushi Ben promotional artwork">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{{FULL_TITLE}}">
  <meta name="twitter:description" content="{{PAGE_DESCRIPTION}}">
  <meta name="twitter:image" content="{{SHARE_IMAGE_URL}}">
  <link rel="icon" type="image/x-icon" href="../../assets/images/favicon.ico">
  <link rel="canonical" href="{{CANONICAL_URL}}">
  {{HREFLANG_LINKS}}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700&family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../styles.css">
  <link rel="stylesheet" href="../../secondary.css">
  <script type="application/ld+json">{{ORG_JSON_LD}}</script>
  <script type="application/ld+json">{{WEBPAGE_JSON_LD}}</script>
</head>
<body class="secondary-page secondary-{{PAGE_SLUG}}-page">
  <header class="site-header">
    <div class="wrap nav-row">
      <a class="brand" href="../" aria-label="Sushi Ben Home">
        <img class="brand-logo" src="../../assets/images/SushiBen_Logo_H.png" alt="Sushi Ben">
      </a>
      <nav class="nav-links" aria-label="Primary">
        <a href="../index.html#buy">{{NAV_BUY}}</a>
        <a href="../index.html#media">{{NAV_MEDIA}}</a>
        <a href="../index.html#about">{{NAV_ABOUT}}</a>
        <a href="../press-kit/">{{NAV_PRESS_KIT}}</a>
        <a href="../index.html#contact">{{NAV_CONTACT}}</a>
      </nav>
      <div class="header-controls">
        <details class="nav-menu">
          <summary>{{NAV_MENU}}</summary>
          <ul>
            <li><a href="../index.html#buy">{{NAV_BUY}}</a></li>
            <li><a href="../index.html#media">{{NAV_MEDIA}}</a></li>
            <li><a href="../index.html#about">{{NAV_ABOUT}}</a></li>
            <li><a href="../press-kit/">{{NAV_PRESS_KIT}}</a></li>
            <li><a href="../index.html#contact">{{NAV_CONTACT}}</a></li>
          </ul>
        </details>
        <details class="lang-switcher">
          <summary aria-label="{{LANG_ARIA_LABEL}}">{{LANG_CURRENT_NAME}}</summary>
          <ul>
            {{LANG_ITEMS_PAGE}}
          </ul>
        </details>
        <button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch to dark theme" aria-pressed="false" title="Switch to dark theme">&#9790;</button>
      </div>
    </div>
  </header>

  <main class="legal-wrap">
    <h1>{{PAGE_TITLE}}</h1>
    {{PAGE_BODY}}
  </main>

  <footer class="site-footer">
    <div class="wrap footer-row">
      <p>&copy; <span id="year"></span> Big Brane Studios, Inc. All rights reserved.</p>
      <div class="legal-row" aria-label="Legal links">
        <a href="../eula/">{{LEGAL_EULA_LABEL}}</a>
        <a href="../privacy/">{{LEGAL_PRIVACY_LABEL}}</a>
      </div>
      <div class="meta-row" aria-label="More links">
        <a href="../team/">{{NAV_TEAM}}</a>
        <a href="../cast/">{{NAV_CAST}}</a>
        <a href="../press-kit/">{{NAV_PRESS_KIT}}</a>
      </div>
      <div class="social-row" aria-label="Social links">
        <a href="https://x.com/SushiBenGame" target="_blank" rel="noopener noreferrer">{{SOCIAL_X}}</a>
        <a href="https://www.youtube.com/watch?v=1lA0ssiHHxM" target="_blank" rel="noopener noreferrer">{{SOCIAL_YOUTUBE}}</a>
        <a href="https://discord.gg/sushiben" target="_blank" rel="noopener noreferrer">{{SOCIAL_DISCORD}}</a>
      </div>
    </div>
  </footer>
  <script src="../../script.js?v=20260331-theme3"></script>
</body>
</html>

