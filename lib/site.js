// All facts used on the website live here (source: 00-facts.md).
// Rule from the brief: no made-up numbers, ratings or features.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://lore-website.vercel.app";

export const APP_NAME = "Lore: Viral Star Bano";
export const BRAND = "Lore";
export const PLAY_URL = "https://play.google.com/store/apps/details?id=com.flippit";

// Fill these ONLY from the live Play Store page. Leave null if not shown there.
// price: "0" if the Play page shows "Install" (free). rating/ratingCount: exact numbers from the page.
export const PLAY_FACTS = {
  price: null,
  rating: null,
  ratingCount: null,
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
  { title: "Share your video", text: "Lore's AI makes the video. Post it on WhatsApp status or send it to groups and friends." },
];

// Category rows seen on the app home screen (3 Nov 2026).
// Third-party brand names (art-style names) are deliberately not used.
export const CATEGORIES = [
  { name: "Family", text: "Videos for family moments, celebrations and memories." },
  { name: "Friends", text: "Fun videos to share with your friends' group." },
  { name: "Relationships", text: "Videos for couples and the people closest to you." },
  { name: "Devotion", text: "Devotional videos to share with family." },
  { name: "Patriotic", text: "Desh-bhakti videos, for example in front of India Gate." },
  { name: "Dance", text: "Dance videos with you as the dancer." },
  { name: "Girl", text: "Looks and scenes made for girls, from desi to royal." },
  { name: "Guy", text: "Looks and scenes made for guys, from desi superhero to royal." },
  { name: "Vlog", text: "Vlog-style videos about your day." },
  { name: "Art styles", text: "Turn yourself into animated and cartoon-style art." },
];

export const NAV = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/templates", label: "Templates" },
  { href: "/faq", label: "FAQ" },
];
