# Harsh Takalkar — Creative + Technical Portfolio

A complete React, TypeScript and Vite portfolio for Harsh Takalkar. The site brings together visual design, short-form video, Marathi/Hindi devotional creative work, AI-generated art, photo grading, digital product concepts, web development, applied AI/ML, skills and achievements.

All artwork, fonts, posters, project-preview SVGs, video files and caption tracks are stored locally in this project. The site has no required API keys, paid service, external image URL or backend.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```

Vite prints the local development URL. To create and preview a production build:

```bash
npm run build
npm run preview
```

The production-ready static website is written to `dist/`. Upload the contents of `dist/` to a static host such as Netlify, Cloudflare Pages, Vercel Static or a root-domain web host. `404.html` is included for hosts that support a static custom 404 page. If deploying below a URL subpath (for example, a GitHub Pages project path), configure Vite's `base` and update root-relative asset paths accordingly; the supplied configuration is ready for a domain root.

## What's included

- Responsive one-page portfolio with semantic section landmarks, skip link, accessible navigation, reduced-motion support and keyboard-operable dialogs.
- Selected-work cards with project detail dialogs, downloadable artwork and clear concept labels.
- A filterable poster gallery with **30 original poster/quote/event/product/carousel graphics plus additional campaign and photo-editing studies**: 4 Marathi satsang posters, 4 Hindi satsang posters, 3 spiritual quote cards, 3 event concepts, 3 product posters and 3 carousel covers.
- Correctly typeset Devanagari using a bundled Noto Sans Devanagari font. Poster text is rendered separately from the generated backgrounds; it is not AI-generated lettering.
- Four original playable 9:16 MP4 motion-graphics concept reels plus seven additional uploaded final edits (H.264 video + AAC audio), each with responsive native playback controls, a poster frame, burned-in open captions, a sidecar WebVTT caption track and an MP4 download link.
- Original, locally generated AI visual assets, brand-identity concept imagery, code-made product interface illustrations and a draggable photo-grade comparison.
- Product previews for GateMemory, Study Sphere / PICT Notes, NeuroSight, SilentGuard and DisasterMesh. Project screens are illustrative concept previews; no unverified repository or demo URL is invented.
- Skills, factual achievement labels, about and contact sections. Contact uses the supplied email, LinkedIn and GitHub URLs; there is deliberately no nonfunctional contact form or invented Instagram profile.
- Local DM Sans, DM Serif Display and Noto Sans Devanagari fonts; custom favicon; Open Graph image; page metadata; custom 404 document.

## Asset validation and production checks

`npm run build` first runs `npm run check:assets`, which checks literal `/assets/...` paths used by source files against files in `public/`, then runs TypeScript and Vite production builds. A GitHub Actions workflow runs this check on pushes and pull requests.

## Asset-generation scripts (optional)

All generated outputs are already included; you do not need Python or FFmpeg to run the website. To regenerate assets, install Python 3 with Pillow and NumPy, plus FFmpeg built with H.264 (`libx264`) and AAC support:

```bash
npm run assets:posters
npm run assets:projects
python3 scripts/generate_photo_study.py
python3 scripts/generate_branding.py
npm run assets:videos
```

The four reels are original programmatic motion graphics made from local original artwork, animated crop/pan, designed title cards and separately typeset captions. Their gentle background sound is synthesized specifically for this portfolio. They are not filmed client footage or AI-generated video footage. Video rendering is CPU-intensive and may take several minutes.

## Add or update work

- **Selected work:** edit `selectedWork` in `src/data/portfolio.ts`. Supply an existing local image, a specific alt description, concise context and a truthful detail note. Concept projects should keep a concept label.
- **Digital projects:** edit `digitalProjects` in the same data file. Add verified public URLs only after confirming them. The current previews intentionally avoid guessed links and unverified technical claims.
- **Poster concepts:** place a local image in `public/assets/posters/`, add its metadata to `posters` in `src/data/portfolio.ts`, and include its category in the relevant `PosterGallery` section. The supplied poster-render script and data are in `scripts/generate_assets.py`.
- **Videos:** place an H.264 MP4, poster image and UTF-8 WebVTT caption file in `public/assets/videos/`. Prefer H.264/AAC MP4 for cross-browser playback; MOV support depends on browser and codec support. Then add a `Reel` entry in `src/data/portfolio.ts`. Keep native `controls`, `playsInline`, a poster frame and a caption track.
- **Social/contact:** update the exact links in `ContactSection` in `src/sections/PortfolioSections.tsx`; also update the mailto link in `src/components/ProjectDialog.tsx` if the email changes.
- **Design system:** edit `src/styles.css`; local fonts live under `public/assets/fonts/`.

## Accuracy notes

- The Satsang work is one creative category among several, not the site's only focus.
- Every generated poster, motion reel, visual identity, generated artwork and illustrative UI mockup is presented as a self-initiated portfolio concept where appropriate.
- No testimonials, client commissions, professional tenure, product performance numbers, launch status, certificates or award dates were fabricated.
- “DigiTwin.AI — first place at UpXGen Hackathon,” iQOO Hackathon 2026 participation, Honeywell Future Skills Edge AI (80 hours), and the E&TC academic background are shown using only the details supplied.
- The only contact/social links included are the ones supplied for Harsh. Verify or update them before a public launch.

## Project structure

```text
harsh-creative-portfolio/
├── public/
│   ├── 404.html             # Custom static-host 404 page
│   ├── robots.txt
│   └── assets/
│       ├── fonts/            # Bundled local font files
│       ├── icons/            # Favicon
│       ├── posters/          # 20 original poster JPGs
│       ├── projects/         # Local project-preview SVGs
│       ├── videos/           # 4 MP4s, poster JPGs and WebVTT tracks
│       └── ...               # Original generated images + photo studies
├── scripts/                  # Asset validation + optional asset-generation scripts
│   └── check-assets.mjs      # Checks literal local asset paths
├── src/
│   ├── components/           # Navigation, project dialog, poster gallery
│   ├── data/                 # Portfolio content and project metadata
│   ├── sections/             # Portfolio sections
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── index.html
├── LICENSES.md
├── package.json
└── package-lock.json
```
