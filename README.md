# StuPDT — Stupid. Fast. Wrong.

A satirical multi-department AI bureaucracy simulator built with React, Vite, Tailwind CSS, and optional Gemini API integration.

## Project Structure

```text
├── api/
│   └── gemini.js                      # Vercel Serverless proxy for GEMINI_API_KEY
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── RetroDarkLogo.jsx          # Glowing retro wordmark
│   │   └── SampleIllustrationSVG.jsx  # Built-in SVG samples for Vision AI
│   ├── data/
│   │   └── constants.js               # Quotes, departments, CAPTCHA, math & samples
│   ├── services/
│   │   └── gemini.js                  # Gemini chat & vision client with offline fallback
│   ├── utils/
│   │   ├── braille.js                 # Unicode Grade-1 Braille translator
│   │   └── soundEngine.js             # Synthesized Web Audio sound effects
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── vercel.json
└── vite.config.js
```

## Local Development

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
npm run preview
```

## Deploying to Vercel

1. Import `https://github.com/nimssbeep/StuPDT` in the [Vercel Dashboard](https://vercel.com/new).
2. Vercel auto-detects Vite using `vercel.json` (`npm run build` → `dist`).
3. **(Optional)** To enable live Gemini chat & Vision AI responses, add `GEMINI_API_KEY` under **Project Settings → Environment Variables** in Vercel. The serverless function at `api/gemini.js` keeps your API key private on the server. Without an API key, StuPDT runs seamlessly with its built-in deterministic responses.
