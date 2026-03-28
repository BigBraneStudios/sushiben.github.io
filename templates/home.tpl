<!doctype html>
<html lang="{{HTML_LANG}}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{SITE_TITLE}}</title>
  <meta name="description" content="{{SITE_DESCRIPTION}}">
  <link rel="icon" type="image/x-icon" href="../assets/images/favicon.ico">
  <link rel="canonical" href="https://www.sushiben.com/{{LANG}}/">
  {{HREFLANG_LINKS}}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles.css">
</head>
<body>
  <header class="site-header">
    <div class="wrap nav-row">
      <a class="brand" href="#top" aria-label="Sushi Ben Home">
        <img class="brand-logo" src="../assets/images/SushiBen_Logo_H.png" alt="Sushi Ben">
      </a>
      <nav class="nav-links" aria-label="Primary">
        <a href="#about">{{NAV_ABOUT}}</a>
        <a href="#features">{{NAV_FEATURES}}</a>
        <a href="#buy">{{NAV_BUY}}</a>
        <a href="#media">{{NAV_MEDIA}}</a>
        <a href="#contact">{{NAV_CONTACT}}</a>
      </nav>
      <div class="header-controls">
        <details class="nav-menu">
          <summary>{{NAV_MENU}}</summary>
          <ul>
            <li><a href="#about">{{NAV_ABOUT}}</a></li>
            <li><a href="#features">{{NAV_FEATURES}}</a></li>
            <li><a href="#buy">{{NAV_BUY}}</a></li>
            <li><a href="#media">{{NAV_MEDIA}}</a></li>
            <li><a href="#contact">{{NAV_CONTACT}}</a></li>
          </ul>
        </details>
        <details class="lang-switcher">
          <summary aria-label="{{LANG_ARIA_LABEL}}">{{LANG_CURRENT_NAME}}</summary>
          <ul>
            {{LANG_ITEMS_HOME}}
          </ul>
        </details>
      </div>
    </div>
  </header>

  <main id="top">
    {{TRANSLATION_NOTE}}

    <section class="hero">
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <p class="kicker">{{HOME_KICKER}}</p>
          <h1>{{HOME_HERO_TITLE}}</h1>
          <p class="lede">{{HOME_HERO_LEDE}}</p>
          <div class="cta-row">
            <a class="btn btn-primary" href="#buy">{{HOME_CTA_BUY}}</a>
            <a class="btn btn-secondary" href="#media">{{HOME_CTA_WATCH}}</a>
          </div>
        </div>
        <div class="hero-art">
          <img src="../assets/images/Minami_Hero.png" alt="Minami from Sushi Ben">
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap narrow soft-panel">
        <h2 id="about">{{HOME_ABOUT_TITLE}}</h2>
        <p>{{HOME_ABOUT_BODY}}</p>
      </div>
    </section>

    <section class="section section-soft">
      <div class="wrap">
        <h2 id="features">{{HOME_FEATURES_TITLE}}</h2>
        <div class="feature-grid">
          <article class="card"><p>{{HIGHLIGHT_1}}</p></article>
          <article class="card"><p>{{HIGHLIGHT_2}}</p></article>
          <article class="card"><p>{{HIGHLIGHT_3}}</p></article>
          <article class="card"><p>{{HIGHLIGHT_4}}</p></article>
          <article class="card"><p>{{HIGHLIGHT_5}}</p></article>
          <article class="card"><p>{{HIGHLIGHT_6}}</p></article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap narrow soft-panel">
        <h2 id="buy">{{HOME_BUY_TITLE}}</h2>
        <p>{{HOME_BUY_SUBTITLE}}</p>
        <div class="store-grid" role="list">
          <a role="listitem" class="store-link" href="https://www.meta.com/experiences/5459391390744272/" target="_blank" rel="noopener noreferrer">Meta Quest</a>
          <a role="listitem" class="store-link" href="https://store.playstation.com/concept/10010735" target="_blank" rel="noopener noreferrer">PlayStation VR2</a>
          <a role="listitem" class="store-link" href="https://store.steampowered.com/app/2419240/Sushi_Ben/" target="_blank" rel="noopener noreferrer">Steam</a>
          <a role="listitem" class="store-link" href="https://www.viveport.com/6176039d-bff1-4bf4-95cb-4e5d369e4679" target="_blank" rel="noopener noreferrer">VIVEPORT</a>
        </div>
      </div>
    </section>

    <section class="section section-soft">
      <div class="wrap soft-panel">
        <h2 id="media">{{HOME_MEDIA_TITLE}}</h2>
        <div class="media-grid">
          <div class="video-wrap">
            <iframe
              src="https://www.youtube.com/embed/1lA0ssiHHxM"
              title="Sushi Ben Trailer"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen></iframe>
          </div>
          <div class="shots-grid">
            <div class="shot">Screenshot 1</div>
            <div class="shot">Screenshot 2</div>
            <div class="shot">Screenshot 3</div>
            <div class="shot">Screenshot 4</div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap narrow soft-panel">
        <h2 id="contact">{{HOME_CONTACT_TITLE}}</h2>
        <p>{{HOME_CONTACT_SUBTITLE}}</p>

        <form class="contact-form" action="https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID" method="POST">
          <label for="name">{{FORM_NAME}}</label>
          <input id="name" name="name" type="text" autocomplete="name" required>

          <label for="email">{{FORM_EMAIL}}</label>
          <input id="email" name="email" type="email" autocomplete="email" required>

          <label for="message">{{FORM_MESSAGE}}</label>
          <textarea id="message" name="message" rows="6" required></textarea>

          <button class="btn btn-primary" type="submit">{{FORM_SUBMIT}}</button>
        </form>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="wrap footer-row">
      <p>© <span id="year"></span> Big Brane Studios. All rights reserved.</p>
      <div class="legal-row" aria-label="Legal links">
        <a href="./eula/">{{LEGAL_EULA_LABEL}}</a>
        <a href="./privacy/">{{LEGAL_PRIVACY_LABEL}}</a>
      </div>
      <div class="social-row" aria-label="Social links">
        <a href="https://x.com" target="_blank" rel="noopener noreferrer">{{SOCIAL_X}}</a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">{{SOCIAL_YOUTUBE}}</a>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer">{{SOCIAL_DISCORD}}</a>
      </div>
    </div>
  </footer>

  <script src="../script.js"></script>
</body>
</html>
