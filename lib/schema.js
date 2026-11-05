import { SITE_URL, APP_NAME, BRAND, PLAY_URL, WHAT_IS_LORE, PLAY_FACTS } from "./site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: BRAND,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [PLAY_URL],
  };
}

// WebSite: tells Google the site's name ("Lore") so results show it instead of the host name.
// Google reads this on the homepage only.
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: BRAND,
    alternateName: APP_NAME,
    url: `${SITE_URL}/`,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-IN",
  };
}

export function mobileAppSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    "@id": `${SITE_URL}/#app`,
    name: APP_NAME,
    alternateName: BRAND,
    description: WHAT_IS_LORE,
    operatingSystem: "ANDROID",
    applicationCategory: "MultimediaApplication",
    installUrl: PLAY_URL,
    url: SITE_URL,
    inLanguage: ["en-IN", "hi-IN"],
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
  // Added only when the value is copied from the live Play Store page.
  if (PLAY_FACTS.price !== null) {
    schema.offers = { "@type": "Offer", price: PLAY_FACTS.price, priceCurrency: "INR" };
  }
  if (PLAY_FACTS.rating !== null && PLAY_FACTS.ratingCount !== null) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: PLAY_FACTS.rating,
      ratingCount: PLAY_FACTS.ratingCount,
    };
  }
  return schema;
}

export function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
