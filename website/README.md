# NoteAlarm website

A static showcase site for the NoteAlarm Android app. No build step, no framework, no external
network requests: plain HTML, CSS and a small JavaScript file.

The APK is **not** published here. Distribution is gated behind a trial request, so every build is
sent personally with the owner's permission.

**Live:** <https://dietherfernandez.github.io/note-alarm-site/> — this public repository contains
only the website; the app source lives in a private repository.

## Preview locally

Open `website/index.html` directly, or serve the folder:

```powershell
cd website
python -m http.server 8000
```

Then open <http://localhost:8000>. Keep the path relative (`assets/...`) so the site works from any
host or subpath.

## Publish with GitHub Pages

Pages is already enabled for this repository with **Source: GitHub Actions**. The workflow in
`.github/workflows/deploy-pages.yml` uploads the `website/` folder as the Pages artifact. Pushing
to `main` (or running the **Deploy website to GitHub Pages** workflow manually) publishes it at:

```text
https://dietherfernandez.github.io/note-alarm-site/
```

Notes:

- This public repository contains only the website; the app source stays in a private repository.
- GitHub Pages on a private repository requires a paid GitHub plan. A public repository is free.
- Do not add a custom domain until the owner has decided on one; the site uses relative paths only.
- Every `*.apk` is gitignored, and `website/download/` is ignored on purpose. Never publish the APK
  through the site or the repository.

## Optional: Vercel

Vercel is not required for this site. If it is used later (for example, to add a real request form
with a serverless function), import the repository with:

- **Root Directory:** `website`
- **Framework Preset:** Other
- **Build Command:** empty
- **Output Directory:** `.` (the `website` root)

Without a backend, a static request form cannot approve or gate downloads. That is why the current
flow uses email: it guarantees the owner approves each trial.

## Trial requests

The request section is in `index.html` under `id="trial"`. It uses a pre-filled `mailto:` link.
The contact address appears in three places, all in `index.html`:

1. the `mailto:` on the primary button,
2. the visible `#trial` address link,
3. the `data-copy` attribute on the "Copy address" button.

Change all three together. The email template asks for intended use, phone model and Android
version; keep it short so people actually send it.

## What to update when the app changes

- `index.html`: version strings (`1.0.0`), feature copy, FAQ, trial text.
- `assets/shots/`: screenshots. The phone captures (`reminder.png`, `voice.png`, `settings.png`) are 720 × 1600 PNGs and sit in the `.device` frame; `about.png` is a 648 × 440 crop used as a detail card. Keep the aspect ratios or adjust the frames in `assets/styles.css`.
- `assets/icon-192.png`, `assets/icon-512.png`, `assets/og.png`: icon and social preview.
- `assets/styles.css`: the design tokens are at the top (`:root`). The visual language follows the
  app: near-black violet surfaces, `#C4B4FF` accent, system fonts.
- `assets/script.js`: header hide-on-scroll, reveal animations, copy-address button, footer year.

## Checks before publishing

- Open at 390 px, 768 px and 1440 px widths; no horizontal scrolling.
- Keyboard: Tab through the nav, buttons, FAQ and copy button; focus rings stay visible.
- `prefers-reduced-motion: reduce` disables the header hiding, reveal transitions and equalizer.
- The trial button opens a mail app with the pre-filled subject/body; the copy button copies the
  address.
- No APK links: search the folder for `.apk`.
