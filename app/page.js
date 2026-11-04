import Link from "next/link";
import PlayStoreButton from "@/components/PlayStoreButton";
import AppPreview from "@/components/AppPreview";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import CategoryCard from "@/components/CategoryCard";
import Marquee from "@/components/Marquee";
import HeroVisual from "@/components/HeroVisual";
import { WHAT_IS_LORE, STEPS, CATEGORIES } from "@/lib/site";
import { FAQS } from "@/lib/faqs";
import { mobileAppSchema, faqSchema } from "@/lib/schema";
import { OG_DEFAULTS } from "@/lib/og";

export const metadata = {
  title: { absolute: "Lore: Viral Star Bano – Turn Your Photo into a Viral Video" },
  description:
    "Lore is an Android app that turns your photo into a share-ready video. Pick a template, add your photo and post it on WhatsApp status. Get it on Google Play.",
  alternates: { canonical: "/" },
  openGraph: {
    ...OG_DEFAULTS,
    title: "Lore: Viral Star Bano – Turn Your Photo into a Viral Video",
    description: "Pick a template, add your photo, and share a video where you are the star.",
    url: "/",
  },
};

// FAQ #1 ("What is Lore?") is already answered at the top, so the home FAQ starts from #2.
const homeFaqs = FAQS.slice(1);

export default function HomePage() {
  return (
    <>
      <JsonLd data={mobileAppSchema()} />
      <JsonLd data={faqSchema(homeFaqs)} />

      {/* Hero: H1 + 40–60 word answer + Play button (all in the first screen on mobile) */}
      <section className="section section-cream">
        <div className="wrap hero-grid">
          <div>
            <h1>Turn your photo into a viral video</h1>
            <h2 style={{ fontSize: "1.1rem" }}>What is Lore?</h2>
            <p className="lead">{WHAT_IS_LORE}</p>
            <PlayStoreButton />
          </div>
          {/* 3D phone: desktop only, loaded after the page is ready (components/Hero3D.js) */}
          <HeroVisual />
        </div>
      </section>

      {/* Real style examples from the app, scrolling right to left (images from public/showcase) */}
      <section className="section">
        <div className="wrap">
          <h2>Ek photo, kai andaaz</h2>
          <p className="lead">Real examples from the Lore app: the same person as a 70s Polaroid, as Low Poly Art, or as a Desi Superwoman.</p>
        </div>
        <Marquee />
      </section>

      {/* App preview */}
      <section className="section">
        <div className="wrap">
          <h2>See the app</h2>
          <AppPreview />
        </div>
      </section>

      {/* How it works */}
      <section className="section section-cream">
        <div className="wrap">
          <h2>How Lore works</h2>
          <ol className="steps grid grid-4">
            {STEPS.map((s) => (
              <li key={s.title} className="card">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <Link prefetch={false} href="/how-it-works">Read the full guide →</Link>
        </div>
      </section>

      {/* Categories: a scrollable row of template cards, like the app home screen */}
      <section className="section">
        <div className="wrap">
          <div className="row-head">
            <h2>Templates for every mood</h2>
            <Link prefetch={false} href="/templates">See all</Link>
          </div>
          <p className="lead">Lore groups its templates into categories, so you can find the right video fast.</p>
          <div className="cat-row">
            {CATEGORIES.filter((c) => c.image).map((c) => (
              <CategoryCard key={c.name} category={c} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (5+ questions, matches FAQPage schema) */}
      <section className="section section-cream">
        <div className="wrap">
          <h2>Questions about Lore</h2>
          <FaqList faqs={homeFaqs} />
          <p style={{ marginTop: 16 }}><Link prefetch={false} href="/faq">All questions →</Link></p>
        </div>
      </section>
    </>
  );
}
