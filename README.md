# StuPDT — Stupid. Fast. Wrong.

A satirical multi-department AI bureaucracy simulator built with React, Vite, Tailwind CSS, and optional Gemini API integration.

## Project Structure

```text
├── api/
│   ├── core/                          # Configuration & environment variable resolution
│   ├── schemas/                       # Request payload builders & response schemas
│   ├── services/                      # Upstream Gemini integration
│   ├── tests/                         # Backend tests (node:test)
│   ├── utils/                         # HTTP response helpers
│   └── gemini.js                      # Vercel Serverless proxy for GEMINI_API_KEY
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── accessibility/         # Sign language floating widget
│   │   │   ├── chat/                  # Chat window, messages, inputs, starters
│   │   │   ├── common/                # Shared logos, SVGs, and brand assets
│   │   │   ├── layout/                # Header, banners, status pills, quotes
│   │   │   └── modals/                # Modular modal dialogs (Bureaucracy, Vision, etc.)
│   │   ├── constants/                 # Organized constants (quotes, captcha, depts, etc.)
│   │   ├── contexts/                  # Application state context (StuPDTContext)
│   │   ├── hooks/                     # Custom React hooks (chat, vision, audio, metrics)
│   │   ├── services/                  # Frontend API client & offline fallbacks
│   │   ├── styles/                    # Tailwind stylesheet
│   │   ├── utils/                     # Sound engine & Braille translator
│   │   ├── App.jsx                    # Main application orchestrator
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── package.json                       # Root scripts (proxies to frontend & api tests)
└── vercel.json
```

## Local Development

```bash
# Run from repository root:
npm install
npm run dev

# Or directly in frontend:
cd frontend
npm install
npm run dev
```

To run backend tests:

```bash
npm test
```

To build for production:

```bash
npm run build
```

## Deploying to Vercel

1. Import `https://github.com/nimssbeep/StuPDT` in the [Vercel Dashboard](https://vercel.com/new).
2. Vercel auto-detects Vite using `vercel.json` (`npm run build` → `dist`).
3. **(Optional)** To enable live Gemini chat & Vision AI responses, add `GEMINI_API_KEY` under **Project Settings → Environment Variables** in Vercel. The serverless function at `api/gemini.js` keeps your API key private on the server. Without an API key, StuPDT runs seamlessly with its built-in deterministic responses.
