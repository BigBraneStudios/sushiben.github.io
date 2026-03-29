<!doctype html>
<html lang="{{HTML_LANG}}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sushi Ben | {{LEGAL_TITLE}}</title>
  <meta name="description" content="{{LEGAL_DESCRIPTION}}">
  <link rel="icon" type="image/x-icon" href="../../assets/images/favicon.ico">
  <link rel="canonical" href="https://www.sushiben.com/{{LANG}}/{{LEGAL_SLUG}}/">
  {{HREFLANG_LINKS}}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700&family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../styles.css">
  <link rel="stylesheet" href="../../legal.css">
</head>
<body>
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
            {{LANG_ITEMS_LEGAL}}
          </ul>
        </details>
      </div>
    </div>
  </header>

  <main class="legal-wrap">
    <h1>{{LEGAL_TITLE}}</h1>
    <pre class="legal-text">{{LEGAL_BODY}}</pre>
  </main>

  <footer class="site-footer">
    <div class="wrap footer-row">
      <p>© <span id="year"></span> Big Brane Studios. All rights reserved.</p>
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
  <script src="../../script.js"></script>
</body>
</html>
