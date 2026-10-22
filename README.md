# NoteAlarm — showcase site

Public showcase website for the NoteAlarm Android app.

**Live:** <https://dietherfernandez.github.io/note-alarm-site/>

This repository contains **only the public website**. The Android app source lives in a private
repository, and the APK is never published here — trial builds are sent by email on request
(see the "Request a trial" section on the site).

## Structure

- `website/` — the static site (HTML/CSS/JS, no build step)
- `.github/workflows/deploy-pages.yml` — publishes `website/` to GitHub Pages

## Local preview

```powershell
cd website
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Deployment

Pushing to `main` deploys the site with GitHub Pages (Settings → Pages → Source: GitHub Actions).

Do not add `*.apk` or `website/download/` to this repository.
