/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Hide the round "N" Next.js badge shown during `npm run dev` (it never appears on the live site).
  devIndicators: false,
  // Put the CSS straight into the HTML instead of separate render-blocking files,
  // so the first screen can paint without waiting for extra requests (faster FCP/LCP on mobile).
  experimental: { inlineCss: true },
  images: {
    // AVIF first (smallest files; Vercel encodes each size once and caches it), WebP as fallback.
    formats: ["image/avif", "image/webp"],
    // Only the widths our images really use on screen (70px step thumbs, 140px, 160px cards,
    // 200px marquee, 210px hero phone, 240px screenshots) and their 2x/3x versions.
    // Every width here is written into each image's srcset, so a short list keeps the HTML small.
    imageSizes: [72, 140, 160, 200, 210, 240, 320, 420, 480],
    // Widths for "vw" sizes (templates grid on phones). Our largest source image is 1200px wide.
    deviceSizes: [640, 750, 828, 1080, 1200],
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
