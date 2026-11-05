/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Hide the round "N" Next.js badge shown during `npm run dev` (it never appears on the live site).
  devIndicators: false,
  images: {
    // AVIF first (smallest files; Vercel encodes each size once and caches it), WebP as fallback.
    formats: ["image/avif", "image/webp"],
    // Extra widths that match how big our images really are on screen
    // (160px cards, 200px marquee, 210px hero phone, 240px screenshots, and their 2x versions),
    // so the browser never has to pick a much larger file.
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 200, 210, 240, 256, 320, 384, 420, 480],
    qualities: [60, 75],
  },
  turbopack: {
    // Drop Next.js's legacy polyfills: every browser in our browserslist has these features natively.
    resolveAlias: {
      "next/dist/build/polyfills/polyfill-module": "./lib/empty-polyfill.js",
      "../build/polyfills/polyfill-module": "./lib/empty-polyfill.js",
    },
  },
};

export default nextConfig;
