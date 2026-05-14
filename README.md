# Lata Yog Routine Guide

A React + Vite yoga routine guide based on the v4 specification.

The app supports:

- English/Hindi interface labels
- Hindi/English spoken audio using browser speech synthesis
- Step names displayed in three lines where available:
  - Devanagari original name
  - Roman transliteration
  - English equivalent/common name
- Patanjali Yogic Jogging Part 1 as the default routine
- Patanjali Part 2 and Phase 3 routines
- Health support routines
- Timer, repetitions, sequence handling, progress tracking, safety notes, media placeholders, and breathing animation

## Health disclaimer

This application is for gentle yoga guidance and educational use only. It is not medical advice. Users with medical conditions, recent surgery, pregnancy, hypertension, severe pain, dizziness, mobility limitations, or any health concern should consult a qualified health professional before practising.

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Open the Vite localhost URL shown in the terminal.

## Build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Architecture

```text
src/
  components/
    ui/
    layout/
    practice/
  data/
    routines.js
    stepNames.js
    sequences.js
    uiText.js
    safety.js
    audioPrompts.js
    illustrations.js
    breathing.js
  lib/
    audio.js
    breathing.js
    routineEngine.js
    time.js
```

Routine content, step names, audio prompts, UI text, safety notes, and illustrations are data-driven and separated from UI components.

## GitHub Pages deployment

This project includes a GitHub Actions workflow:

```text
.github/workflows/deploy.yml
```

To deploy:

1. Push the project to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. Go to **Actions** and run/deploy the workflow.

The Vite config uses:

```js
base: "./"
```

This is intended to support simple static hosting on GitHub Pages, Netlify, or Vercel.

## Restore notes

This project is self-contained. A clean checkout can be restored with:

```bash
npm install
npm run dev
```

The source specification is stored at:

```text
docs/lata-yog-spec-v4.md
```
