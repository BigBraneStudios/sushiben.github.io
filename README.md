# Sushi Ben Static Site (GitHub Pages)

This repo contains a plain HTML/CSS/JS site scaffolded for GitHub Pages.

## Files

- `index.html`: Main one-page website
- `styles.css`: Styling
- `script.js`: Minimal client behavior
- `.nojekyll`: Disables Jekyll processing on GitHub Pages
- `CNAME`: Optional custom domain file

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
