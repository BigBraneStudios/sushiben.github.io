# Sushi Ben Site

Static marketing site for Sushi Ben, built from HTML templates and CSV-based localization data.

## Main Files

- `templates/`
  Source templates for home, legal, and secondary pages.
- `i18n/strings-main.csv`
  Shared site/UI/homepage copy.
- `i18n/strings-team-cast.csv`
  Team and Cast page copy.
- `i18n/strings-presskit.csv`
  Press Kit copy.
- `i18n/strings-eula.csv`
  EULA copy.
- `i18n/strings-fan-content.csv`
  Fan Content Policy copy.
- `i18n/strings-privacy.csv`
  Privacy Policy copy.
- `scripts/build-i18n.mjs`
  Generates the localized pages.
- `scripts/validate-i18n.mjs`
  Checks the CSV files for suspicious encoding/markup issues.
- `scripts/i18n-constants.mjs`
  Shared non-localized constants and branding.

## Build

```powershell
node scripts/validate-i18n.mjs
node scripts/build-i18n.mjs
```

## Localization

Translate these files directly:

- `i18n/strings-main.csv`
- `i18n/strings-team-cast.csv`
- `i18n/strings-presskit.csv`
- `i18n/strings-eula.csv`
- `i18n/strings-fan-content.csv`
- `i18n/strings-privacy.csv`

Then regenerate:

```powershell
node scripts/validate-i18n.mjs
node scripts/build-i18n.mjs
```

## Notes

- `context` columns are translator guidance only. Do not edit keys.
- Some shared non-localized strings live in `scripts/i18n-constants.mjs`.
- Generated locale pages live under `en/`, `de/`, `es/`, `fr/`, `it/`, `pt-br/`, `ja/`, `ko/`, `zh-hans/`, and `zh-hant/`.
