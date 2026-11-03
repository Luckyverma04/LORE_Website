import { SITE_URL } from "@/lib/site";

// Generates /sitemap.xml at build time.
export default function sitemap() {
  return ["", "/how-it-works", "/templates", "/faq"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
