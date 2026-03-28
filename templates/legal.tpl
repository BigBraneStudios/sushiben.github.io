<!doctype html>
<html lang="{{HTML_LANG}}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{LEGAL_TITLE}} | Sushi Ben</title>
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
  <main class="legal-wrap">
    <div class="legal-top-row">
      <a class="legal-back" href="../">{{LEGAL_BACK_HOME}}</a>
      <details class="lang-switcher">
        <summary aria-label="{{LANG_ARIA_LABEL}}">{{LANG_CURRENT_NAME}}</summary>
        <ul>
          {{LANG_ITEMS_LEGAL}}
        </ul>
      </details>
    </div>
    <h1>{{LEGAL_TITLE}}</h1>
    <pre class="legal-text">{{LEGAL_BODY}}</pre>
  </main>
</body>
</html>
