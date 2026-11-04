# Lore website (SEO/AEO trial)

Redesigned marketing site for **Lore: Viral Star Bano**, an Android app on Google Play.
Built with Next.js (App Router, JavaScript). Every page is a Server Component and is
pre-rendered to static HTML at build time, so Google and AI crawlers can read the full
content without running JavaScript.

## Pages
- `/` Home: H1, 40–60 word "What is Lore?" answer, app preview, Play Store button, FAQ
- `/how-it-works`, `/templates`, `/faq`
- `/sitemap.xml`, `/robots.txt` (generated)

## Structured data (JSON-LD)
Organization (all pages), MobileApplication + FAQPage (Home), FAQPage (FAQ).

## Where things live
- `lib/site.js` – all facts and copy (single source of truth)
- `lib/faqs.js` – FAQ text, used by both the visible FAQ and the FAQPage schema
- `lib/schema.js` – JSON-LD builders
- `components/` – Header, Footer, PlayStoreButton, AppPreview, FaqList, JsonLd

## Run
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # every route should show ○ (Static)
```

## Deploy (Vercel)
Live preview: https://lore-website-rho.vercel.app (default in `lib/site.js`; override with `NEXT_PUBLIC_SITE_URL`).
