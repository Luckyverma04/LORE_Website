import { BRAND } from "./site";

// Shared OpenGraph fields for every page.
// Next.js does NOT merge a page's `openGraph` with the layout's: a page that sets `openGraph`
// replaces it completely. So each page spreads these defaults and adds its own `url`.
// The image is public/og.png (1200x630 LORE banner); metadataBase in app/layout.js makes it absolute.
export const OG_DEFAULTS = {
  type: "website",
  siteName: BRAND,
  locale: "en_IN",
  images: [{ url: "/og.png", width: 1200, height: 630, alt: "Lore: Viral Star Bano – turn your photo into a viral video" }],
};
