import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, BRAND } from "@/lib/site";
import { organizationSchema } from "@/lib/schema";

// Defaults for every page. Each page overrides title, description and canonical.
export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Lore: Viral Star Bano", template: "%s | Lore" },
  description: "Lore is an Android app that turns your photo into a share-ready video.",
  openGraph: { siteName: BRAND, locale: "en_IN", type: "website", images: ["/og.png"] },
  twitter: { card: "summary_large_image" },
};

export const viewport = { themeColor: "#a3322a" };

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body>
        <JsonLd data={organizationSchema()} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
