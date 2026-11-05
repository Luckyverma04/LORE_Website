// All facts used on the website live here (source: 00-facts.md).
// Rule from the brief: no made-up numbers, ratings or features.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lore-website-rho.vercel.app";

export const APP_NAME = "Lore: Viral Star Bano";
export const BRAND = "Lore";
export const PLAY_URL = "https://play.google.com/store/apps/details?id=com.flippit";

// ───────── EASY TO CHANGE: logo and images ─────────
// Logo in the header. Put your logo file in /public and set image: "/your-logo.png".
// Leave image: null to show the text wordmark instead.
export const LOGO = {
  text: "LORE",
  image: null,
  width: 96,
  height: 32,
};

// App screenshots shown in "See the app" (files in /public/screens).
export const SCREENSHOTS = [
  { src: "/screens/app-screen-1.webp", alt: "Lore app home screen with Trending, Video and Image templates" },
  { src: "/screens/app-screen-2.webp", alt: "Lore app templates in Devotion, Patriotic, Dance and Events" },
  { src: "/screens/app-screen-3.webp", alt: "Lore app templates in Events, Swag, Girl and Guy" },
  { src: "/screens/app-screen-4.webp", alt: "Lore app templates in Friends, Family, Relationships and Vlog" },
];

// Fill these ONLY from the live Play Store page. Leave null if not shown there.
// price: "0" if the Play page shows "Install" (free). rating/ratingCount: exact numbers from the page.
export const PLAY_FACTS = {
  price: "0",        // Free to download on Google Play
  rating: "4.5",     // Play Store rating (checked 4 Nov 2026)
  ratingCount: "36", // Number of ratings on Play Store (checked 4 Nov 2026)
};

// 40–60 words, answer-first (PDF requirement). Currently 52 words.
export const WHAT_IS_LORE =
  "Lore: Viral Star Bano is an Android app that turns your photo into a share-ready video. " +
  "Pick a template from categories like Family, Friends, Devotion or Patriotic, add your photo, " +
  "and Lore's AI makes a video where you are the star, ready for your WhatsApp status. " +
  "It is made for Hindi and Hinglish-speaking users in India.";

// Steps: from the Play Store listing ("Kaise banta hai") + app home screen.
export const STEPS = [
  { title: "Install Lore", text: "Download Lore: Viral Star Bano from Google Play on your Android phone." },
  { title: "Pick a template", text: "Choose a category like Family, Friends or Patriotic, then pick a template you like." },
  { title: "Add your photo", text: "Choose a photo from your gallery or take a new one. No editing needed." },
  { title: "Download your video", text: "Lore's AI makes the video. Download it, then post it on your WhatsApp status or send it to groups and friends." },
];

// Category rows seen on the app home screen (3 Nov 2026).
// Third-party brand names (art-style names) are deliberately not used.
// Template categories from the app home screen. image = a template card from that row
// (files in /public/templates). image: null shows a text-only card.
export const CATEGORIES = [
  { name: "Family", image: "/templates/family.webp", text: "Videos for family moments, celebrations and memories." },
  { name: "Friends", image: "/templates/friends.webp", text: "Fun videos to share with your friends' group." },
  { name: "Relationships", image: "/templates/relationships.webp", text: "Videos for couples and the people closest to you." },
  { name: "Devotion", image: "/templates/devotion.webp", text: "Devotional videos to share with family." },
  { name: "Patriotic", image: "/templates/patriotic.webp", text: "Desh-bhakti videos, for example in front of India Gate." },
  { name: "Girl", image: "/templates/girl.webp", text: "Looks and scenes made for girls, from desi to royal." },
  { name: "Guy", image: "/templates/guy.webp", text: "Looks and scenes made for guys, from desi superhero to royal." },
  { name: "Vlog", image: "/templates/vlog.webp", text: "Vlog-style videos about your day." },
  { name: "Dance", image: null, text: "Dance videos with you as the dancer." },
  { name: "Art styles", image: null, text: "Turn yourself into animated and cartoon-style art." },
];

export const NAV = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/templates", label: "Templates" },
  { href: "/faq", label: "FAQ" },
];
