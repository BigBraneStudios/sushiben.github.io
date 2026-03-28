# Sushi Ben Static Site (GitHub Pages)

This repo contains a plain HTML/CSS/JS site scaffolded for GitHub Pages with path-based localization.

## Files

- `index.html`: Root redirect to `/en/`
- `styles.css`: Styling
- `script.js`: Minimal client behavior
- `.nojekyll`: Disables Jekyll processing on GitHub Pages
- `CNAME`: Optional custom domain file
- `<locale>/`: Localized pages for `en`, `de`, `es`, `fr`, `it`, `pt-br`, `ja`, `ko`, `zh-hans`, `zh-hant`
- `eula/` and `privacy/`: Backward-compatible redirects to `/en/*`
- `i18n/strings.csv`: Translation table (source of truth for UI copy)
- `i18n/legal/<locale>/*.txt`: Legal body text per locale/page
- `templates/`: Shared page templates for consistent formatting
- `scripts/build-i18n.mjs`: Generator that builds localized pages from table/text sources

## Localization Workflow

1. Edit `i18n/strings.csv`.
2. Edit legal files in `i18n/legal/<locale>/`:
   - `eula.txt`
   - `privacy.txt`
3. Regenerate localized pages:

```powershell
node scripts/build-i18n.mjs
```

English (`en`) is the default/fallback source language when a translation value is missing.

Supported languages:
- English (`en`)
- German (`de`)
- Spanish (`es`)
- French (`fr`)
- Italian (`it`)
- Portuguese (Brazil) (`pt-br`)
- Japanese (`ja`)
- Korean (`ko`)
- Chinese Simplified (`zh-hans`)
- Chinese Traditional (`zh-hant`)

## Deploy To GitHub Pages

1. Push this repo to GitHub.
2. In GitHub: `Settings` -> `Pages`.
3. Under `Build and deployment`, choose `Deploy from a branch`.
4. Select branch `main` and folder `/ (root)`.
5. Save.

## Custom Domain

1. Put your domain in `CNAME` (example: `www.sushiben.com`).
2. In your DNS provider:
   - `www` CNAME -> `<your-github-username>.github.io`
   - Apex domain (`sushiben.com`) use ALIAS/ANAME (or A records per GitHub docs)
3. Enable `Enforce HTTPS` in GitHub Pages settings after DNS resolves.

## Contact Form

Current form points to Formspree placeholder:

`https://formspree.io/f/REPLACE_WITH_YOUR_FORM_ID`

Replace with your actual Formspree form endpoint.

## Content Still Needed

- Final logo and hero art
- Final screenshots
- Final social URLs
- Final support/contact email and policy links
