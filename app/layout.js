import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ScrollReveal from "@/components/ScrollReveal";
import StageLight from "@/components/StageLight";
import { SITE_URL } from "@/lib/site";
import { organizationSchema } from "@/lib/schema";
import { OG_DEFAULTS } from "@/lib/og";

// Display font: Instrument Serif (SIL Open Font License), self-hosted in app/fonts and cut down to the
// characters the site uses (about 15 KB per style), so there is no request to Google Fonts.
// Body text uses the phone's own system font (no download), which keeps the first paint fast on mobile.
// next/font adds a size-matched fallback font, so swapping to the real font does not shift the layout.
const serif = localFont({
  src: [
    { path: "./fonts/instrument-serif-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-serif-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});


// Defaults for every page. Each page overrides title, description and canonical.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Lore: Viral Star Bano", template: "%s | Lore" },
  description: "Lore is an Android app that turns your photo into a share-ready video.",
  openGraph: OG_DEFAULTS,
  twitter: { card: "summary_large_image" },
};

export const viewport = { themeColor: "#0d0807", colorScheme: "dark" };

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={serif.variable}>
      <body>
        <JsonLd data={organizationSchema()} />
        <Header />
        <main>{children}</main>
        <Footer />
        <ScrollReveal />
        <StageLight />
      </body>
    </html>
  );
}
