import { SITE_URL, CONTENT_UPDATED } from "@/lib/site";

// Generates /sitemap.xml at build time.
// lastModified = CONTENT_UPDATED in lib/site.js. Change that date when page content really changes.
export default function sitemap() {
  const lastModified = CONTENT_UPDATED;
  return ["", "/how-it-works", "/templates", "/faq"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
