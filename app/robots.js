import { SITE_URL } from "@/lib/site";

// Generates /robots.txt. Allows Google and AI answer-engine crawlers.
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
