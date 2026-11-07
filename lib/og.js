import { BRAND } from "./site";

// Shared OpenGraph fields for every page.
// Next.js does NOT merge a page's `openGraph` with the layout's: a page that sets `openGraph`
// replaces it completely. So each page spreads these defaults and adds its own `url`.
// The image is public/og.jpg (1200x630, ~105 KB: small enough for WhatsApp previews), in the site's
// "Spotlight Stage" design with the real app screen and template cards. metadataBase in app/layout.js makes it absolute.
export const OG_DEFAULTS = {
  type: "website",
  siteName: BRAND,
  locale: "en_IN",
  images: [{ url: "/og.jpg", width: 1200, height: 630, type: "image/jpeg", alt: "Lore: Viral Star Bano – turn your photo into a viral video" }],
};
