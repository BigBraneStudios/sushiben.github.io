# Sushi Ben Website Handoff

Last updated: March 28, 2026

## Objective
Migrate from Wix (`www.sushiben.com`) to a low-cost static site hosted on GitHub Pages, with an easy future path to Cloudflare Pages.

## Hosting Decisions Made
- Chosen approach: plain static site (`HTML5 + CSS + minimal JS`)
- Initial hosting target: GitHub Pages
- Future portability: keep stack host-agnostic so migration to Cloudflare Pages is easy
- Custom domain required: `www.sushiben.com`
- No ads / no host branding required
- Contact form: intentionally deferred until after visual/content polish

## Traffic Context (from Wix analytics)
- 3,445 sessions last year
- about 9 sessions/day average
- about 2% returning traffic

This confirmed that GitHub Pages is sufficient for current needs.

## Current Site Scaffold (Implemented)
A full one-page static scaffold was created with real platform links and placeholders for final assets.

### Implemented sections
- Sticky header navigation
- Hero section
- About section
- Feature highlights
- Platform/store links
- Trailer embed + screenshot grid placeholders
- Contact section (Formspree placeholder endpoint)
- Footer + social placeholders

### Files created/updated in scaffold
- `index.html`
- `styles.css`
- `script.js`
- `README.md`
- `.nojekyll`
- `CNAME` (set to `www.sushiben.com`)

## Content/Brand Inputs Used
Base copy and structure were derived from:
- Existing Sushi Ben site
- Sushi Ben Steam page
- Sushi Ben PlayStation listing

Real links currently used in scaffold:
- Meta Quest: `https://www.meta.com/experiences/5459391390744272/`
- PlayStation VR2: `https://store.playstation.com/concept/10010735`
- Steam: `https://store.steampowered.com/app/2419240/Sushi_Ben/`
- VIVEPORT: `https://www.viveport.com/6176039d-bff1-4bf4-95cb-4e5d369e4679`

Trailer embed currently set to:
- `https://www.youtube.com/embed/FnIscA4M4rQ`

## What Was Deferred On Purpose
- Final visual polish
- Final production assets
- Contact form backend activation
- DNS cutover from Wix

## Asset/Content Gaps To Fill
- Final logo
- Hero key art
- Final screenshots
- Final social links
- Final copy pass (headline, about text, feature bullets)
- Formspree form ID (or alternative form backend)

## Local Development Notes (WebStorm)
Two simple ways to preview locally:

1. Open `index.html` directly in browser via WebStorm context menu.
2. Run a local server in terminal:

```powershell
cd <repo-path>
py -m http.server 8080
```

Then open `http://localhost:8080`.

## GitHub Pages Deployment Notes
Intended deployment model:
- Branch: `main`
- Folder: `/ (root)`
- `.nojekyll` included to avoid Jekyll processing issues
- `CNAME` file set to `www.sushiben.com`

DNS should remain on Wix until final cutover.

## Migration Approach Used
Recommended process (safe + reversible) for replacing an older Pages repo:
1. Tag backup on old repo
2. Create migration branch
3. Copy new static files into old repo root
4. Remove obsolete legacy site files
5. Commit + push migration branch
6. Validate
7. Merge to `main`

## Suggested Next Sequence
1. Finish look-and-feel refinements
2. Replace placeholders with final assets/copy
3. Verify mobile + desktop quality
4. Enable GitHub Pages serving the new version
5. Configure/verify contact form backend
6. Run final QA on links/media/form
7. Cut DNS from Wix to GitHub Pages
8. Monitor for issues after cutover

## Cutover Checklist (When Ready)
- [ ] New site deployed and visible on GitHub Pages URL
- [ ] `CNAME` is `www.sushiben.com`
- [ ] DNS updated at registrar/host
- [ ] HTTPS enforced in GitHub Pages
- [ ] All store/social links tested
- [ ] Form submission tested end-to-end
- [ ] Mobile layout verified
- [ ] Old Wix plan cancellation timing confirmed

## Future Cloudflare Migration Readiness
Current stack remains portable because:
- No WordPress/CMS coupling
- No GitHub-only runtime dependencies
- Static file structure is generic

Migration to Cloudflare Pages later should mostly be:
- connect repo
- deploy
- switch DNS

## Notes For New Chat Context
If starting a new chat in another repo/project, provide this summary:
- Objective: Replace Wix site with static GitHub Pages version for Sushi Ben
- Current stack: plain static HTML/CSS/JS
- Domain target: `www.sushiben.com`
- DNS cutover intentionally deferred
- Contact form intentionally deferred
- Immediate next step: visual polish and asset integration

