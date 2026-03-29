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
        <a href="#buy">{{NAV_BUY}}</a>
        <a href="#media">{{NAV_MEDIA}}</a>
        <a href="#about">{{NAV_ABOUT}}</a>
        <a href="./press-kit/">{{NAV_PRESS_KIT}}</a>
        <a href="#contact">{{NAV_CONTACT}}</a>
      </nav>
      <div class="header-controls">
        <details class="nav-menu">
          <summary>{{NAV_MENU}}</summary>
          <ul>
            <li><a href="#buy">{{NAV_BUY}}</a></li>
            <li><a href="#media">{{NAV_MEDIA}}</a></li>
            <li><a href="#about">{{NAV_ABOUT}}</a></li>
            <li><a href="./press-kit/">{{NAV_PRESS_KIT}}</a></li>
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
        <h2 id="buy">{{HOME_BUY_TITLE}}</h2>
        <div class="store-grid" role="list">
          <a role="listitem" class="store-link" href="https://store.steampowered.com/app/2419240/Sushi_Ben/" target="_blank" rel="noopener noreferrer">
            <img src="../assets/images/Linktree_Logo_Steam.png" alt="Steam logo">
            <span>Steam</span>
          </a>
          <a role="listitem" class="store-link" href="https://store.playstation.com/en-us/concept/10007924/" target="_blank" rel="noopener noreferrer">
            <img src="../assets/images/Linktree_Logo_PS.png" alt="PlayStation logo">
            <span>PlayStation 5</span>
          </a>
          <a role="listitem" class="store-link" href="https://www.meta.com/experiences/5459391390744272/" target="_blank" rel="noopener noreferrer">
            <img src="../assets/images/Linktree_Logo_Meta.png" alt="Meta Quest logo">
            <span>Meta Quest</span>
          </a>
          <a role="listitem" class="store-link" href="https://www.viveport.com/apps/1e1eb547-c759-4266-89bb-64bcc6f6294e?hl=en-US" target="_blank" rel="noopener noreferrer">
            <img src="../assets/images/Linktree_Logo_Viveport.png" alt="HTC VIVEPORT logo">
            <span>HTC VIVEPORT</span>
          </a>
          <a role="listitem" class="store-link" href="https://store-global.picoxr.com/global/detail/1/7345233212618080262" target="_blank" rel="noopener noreferrer">
            <img src="../assets/images/Linktree_Logo_Pico.png" alt="PICO logo">
            <span>PICO</span>
          </a>
          <a role="listitem" class="store-link" href="https://store.onstove.com/en/games/103625" target="_blank" rel="noopener noreferrer">
            <img src="../assets/images/Linktree_Logo_Stove.png" alt="STOVE logo">
            <span>STOVE</span>
          </a>
        </div>
      </div>
    </section>

    <section class="section">
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
            <button class="shot" type="button" data-shot="../assets/images/SushiBen_ScreenShot_1.png" aria-label="Open screenshot 1">
              <img src="../assets/images/SushiBen_ScreenShot_1.png" alt="Sushi Ben screenshot 1">
            </button>
            <button class="shot" type="button" data-shot="../assets/images/SushiBen_ScreenShot_2.png" aria-label="Open screenshot 2">
              <img src="../assets/images/SushiBen_ScreenShot_2.png" alt="Sushi Ben screenshot 2">
            </button>
            <button class="shot" type="button" data-shot="../assets/images/SushiBen_ScreenShot_4.png" aria-label="Open screenshot 4">
              <img src="../assets/images/SushiBen_ScreenShot_4.png" alt="Sushi Ben screenshot 4">
            </button>
            <button class="shot" type="button" data-shot="../assets/images/SushiBen_ScreenShot_5.png" aria-label="Open screenshot 5">
              <img src="../assets/images/SushiBen_ScreenShot_5.png" alt="Sushi Ben screenshot 5">
            </button>
          </div>
        </div>
        <div class="cta-row media-cta-row">
          <a class="btn btn-primary" href="#buy">{{HOME_CTA_BUY}}</a>
          <a class="btn btn-secondary" href="./press-kit/">{{NAV_PRESS_KIT}}</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap narrow soft-panel">
        <h2 id="about">{{HOME_ABOUT_TITLE}}</h2>
        <p>{{HOME_ABOUT_BODY}}</p>
        <ul class="about-bullets">
          <li>{{HIGHLIGHT_1}}</li>
          <li>{{HIGHLIGHT_2}}</li>
          <li>{{HIGHLIGHT_5}}</li>
          <li>{{HIGHLIGHT_6}}</li>
          <li>{{HIGHLIGHT_8}}</li>
        </ul>
        <div class="cta-row about-cta-row">
          <a class="btn btn-primary" href="./cast/">{{NAV_CAST}}</a>
          <a class="btn btn-secondary" href="./team/">{{NAV_TEAM}}</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap narrow soft-panel">
        <h2>{{HOME_REVIEWS_TITLE}}</h2>
        <div class="review-grid">
          <blockquote class="review-card">
            <p>"{{HOME_REVIEW_QUOTE_1}}"</p>
            <cite><a href="{{HOME_REVIEW_URL_1}}" target="_blank" rel="noopener noreferrer">{{HOME_REVIEW_SOURCE_1}}</a></cite>
          </blockquote>
          <blockquote class="review-card">
            <p>"{{HOME_REVIEW_QUOTE_2}}"</p>
            <cite><a href="{{HOME_REVIEW_URL_2}}" target="_blank" rel="noopener noreferrer">{{HOME_REVIEW_SOURCE_2}}</a></cite>
          </blockquote>
          <blockquote class="review-card">
            <p>"{{HOME_REVIEW_QUOTE_3}}"</p>
            <cite><a href="{{HOME_REVIEW_URL_3}}" target="_blank" rel="noopener noreferrer">{{HOME_REVIEW_SOURCE_3}}</a></cite>
          </blockquote>
          <blockquote class="review-card">
            <p>"{{HOME_REVIEW_QUOTE_4}}"</p>
            <cite><a href="{{HOME_REVIEW_URL_4}}" target="_blank" rel="noopener noreferrer">{{HOME_REVIEW_SOURCE_4}}</a></cite>
          </blockquote>
        </div>
        <div class="cta-row reviews-cta-row">
          <a class="btn btn-primary" href="./press-kit/">{{NAV_PRESS_KIT}}</a>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap soft-panel">
        <h2 id="contact">{{HOME_CONTACT_TITLE}}</h2>
        <div class="support-grid">
          <aside class="support-card" aria-label="{{SUPPORT_DISCORD_TITLE}}">
            <h3>{{SUPPORT_DISCORD_TITLE}}</h3>
            <p>{{SUPPORT_DISCORD_BODY}}</p>
            <a class="btn btn-primary support-discord-btn" href="https://discord.gg/sushiben" target="_blank" rel="noopener noreferrer">{{SUPPORT_DISCORD_CTA}}</a>
            <div class="discord-widget-wrap">
              <iframe
                src="https://discord.com/widget?id=1102657848393093152&theme=light"
                title="Sushi Ben Discord Server"
                loading="lazy"
                sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
            </div>
          </aside>

          <div class="support-card">
            <h3>{{SUPPORT_EMAIL_TITLE}}</h3>
            <p>{{SUPPORT_EMAIL_BODY}}</p>
            <form id="support-form" class="contact-form" action="https://REPLACE_WITH_YOUR_WORKER.workers.dev/contact" method="POST" novalidate>
              <label for="name">{{FORM_NAME}}</label>
              <input id="name" name="name" type="text" autocomplete="name" required>

              <label for="email">{{FORM_EMAIL}}</label>
              <input id="email" name="email" type="email" autocomplete="email" required>

              <label for="category">{{FORM_CATEGORY}}</label>
              <select id="category" name="category" required>
                <option value="">{{FORM_CATEGORY_PLACEHOLDER}}</option>
                <option value="general">{{FORM_CATEGORY_GENERAL}}</option>
                <option value="press">{{FORM_CATEGORY_PRESS}}</option>
                <option value="technical">{{FORM_CATEGORY_TECH}}</option>
              </select>

              <label for="message">{{FORM_MESSAGE}}</label>
              <textarea id="message" name="message" rows="6" required></textarea>

              <div class="hp-wrap" aria-hidden="true">
                <label for="website">Website</label>
                <input id="website" name="website" type="text" tabindex="-1" autocomplete="off">
              </div>

              <input type="hidden" name="page" value="support">
              <input type="hidden" name="locale" value="{{LANG}}">

              <p id="form-status" class="form-status" role="status" aria-live="polite"></p>
              <button class="btn btn-primary" type="submit">{{FORM_SUBMIT}}</button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-final-cta">
      <div class="wrap narrow soft-panel">
        <h2>{{HOME_FINAL_CTA_TITLE}}</h2>
        <div class="cta-row">
          <a class="btn btn-primary" href="#buy">{{HOME_FINAL_CTA_BUY}}</a>
        </div>
      </div>
    </section>
  </main>

  <dialog id="shot-lightbox" class="shot-lightbox" aria-label="Screenshot viewer">
    <button class="shot-lightbox-close" type="button" aria-label="Close screenshot">×</button>
    <img id="shot-lightbox-image" src="" alt="Expanded screenshot">
  </dialog>

  <footer class="site-footer">
    <div class="wrap footer-row">
      <p>© <span id="year"></span> Big Brane Studios. All rights reserved.</p>
      <div class="legal-row" aria-label="Legal links">
        <a href="./eula/">{{LEGAL_EULA_LABEL}}</a>
        <a href="./privacy/">{{LEGAL_PRIVACY_LABEL}}</a>
      </div>
      <div class="meta-row" aria-label="More links">
        <a href="./team/">{{NAV_TEAM}}</a>
        <a href="./cast/">{{NAV_CAST}}</a>
        <a href="./press-kit/">{{NAV_PRESS_KIT}}</a>
      </div>
      <div class="social-row" aria-label="Social links">
        <a href="https://x.com/SushiBenGame" target="_blank" rel="noopener noreferrer">{{SOCIAL_X}}</a>
        <a href="https://www.youtube.com/watch?v=1lA0ssiHHxM" target="_blank" rel="noopener noreferrer">{{SOCIAL_YOUTUBE}}</a>
        <a href="https://discord.gg/sushiben" target="_blank" rel="noopener noreferrer">{{SOCIAL_DISCORD}}</a>
      </div>
    </div>
  </footer>

  <script src="../script.js"></script>
</body>
</html>
