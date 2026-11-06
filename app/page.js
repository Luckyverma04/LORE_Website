import Link from "next/link";
import PlayStoreButton from "@/components/PlayStoreButton";
import AppPreview from "@/components/AppPreview";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import CategoryCard from "@/components/CategoryCard";
import Marquee from "@/components/Marquee";
import HeroVisual from "@/components/HeroVisual";
import HomeAnimations from "@/components/HomeAnimations";
import StepJourney from "@/components/StepJourney";
import { WHAT_IS_LORE, CATEGORIES, PLAY_FACTS } from "@/lib/site";
import { FAQS } from "@/lib/faqs";
import { websiteSchema, mobileAppSchema, faqSchema } from "@/lib/schema";
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
const homeFaqs = FAQS.slice(1, 8);

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteSchema()} />
      <JsonLd data={mobileAppSchema()} />
      <JsonLd data={faqSchema(homeFaqs)} />
      <HomeAnimations />

      {/* Hero: H1 + 40–60 word answer + Play button (all in the first screen on mobile) */}
      <section className="hero stage">
        <div className="stage-bg" aria-hidden="true" />
        <div className="stage-floor" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="bubble"><span className="bubble-dot" aria-hidden="true" />Roz wahi purana photo status? 🙄</p>
            <h1>
              <span className="rise"><span>Apni photo se </span></span>
              <span className="rise"><span><em>viral</em> video </span></span>
              <span className="rise"><span>banao</span></span>
            </h1>
            <h2 className="kicker">What is Lore?</h2>
            <p className="lead">{WHAT_IS_LORE}</p>
            <div className="hero-actions">
              <PlayStoreButton />
              {PLAY_FACTS.rating && (
                <span className="rating-chip">
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="currentColor" d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7L2 9.2l7.1-.6z" /></svg>
                  <span><strong>{PLAY_FACTS.rating}</strong> on Google Play{PLAY_FACTS.ratingCount ? ` · ${PLAY_FACTS.ratingCount} ratings` : ""}</span>
                </span>
              )}
            </div>
          </div>
          {/* CSS 3D stage on every screen; WebGL stage on desktop after the first interaction */}
          <HeroVisual />
        </div>
        <div className="scroll-cue" aria-hidden="true">Scroll<span /></div>
      </section>

      {/* Real style examples from the app on a cinema film strip (images from public/showcase) */}
      <section className="section film cv">
        <div className="film-words" aria-hidden="true">Ek photo · Kai andaaz · Ek photo · Kai andaaz ·</div>
        <div className="wrap sec-head">
          <div>
            <span className="sec-num" aria-hidden="true">01 — Showcase</span>
            <h2>Ek photo, <em>kai andaaz</em></h2>
          </div>
          <p className="lead">Lore app ke asli examples: ek hi photo se 70s Polaroid, Low Poly Art ya Desi Superwoman.</p>
        </div>
        <div className="film-tilt">
          <Marquee />
        </div>
      </section>

      {/* App preview: real screenshots on a curved wall */}
      <section className="section showroom cv">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="sec-num" aria-hidden="true">02 — The app</span>
              <h2>App andar se <em>aisi</em> dikhti hai</h2>
            </div>
            <p className="lead">Asli app ke screens: Trending, Video aur Image templates, aur Devotion, Patriotic, Events, Friends jaisi categories.</p>
          </div>
          <AppPreview />
        </div>
      </section>

      {/* Kaise banta hai: 4-step visual journey (components/StepJourney.js) */}
      <StepJourney />

      {/* Categories: a scrollable row of template posters, like the app home screen */}
      <section className="section posters cv">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <span className="sec-num" aria-hidden="true">04 — Templates</span>
              <h2>Har mood ka <em>template</em></h2>
            </div>
            <div>
              <p className="lead">Family, dosti, pyaar, bhakti, desh-bhakti: app mein har category ka alag template hai.</p>
              <Link prefetch={false} href="/templates" className="link-arrow">See all templates <span aria-hidden="true">→</span></Link>
            </div>
          </div>
          <div className="cat-row">
            {CATEGORIES.filter((c) => c.image).map((c) => (
              <CategoryCard key={c.name} category={c} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ (5+ questions, matches FAQPage schema) on cream paper */}
      <section className="section paper cv">
        <div className="wrap faq-layout">
          <div className="faq-side">
            <span className="sec-num" aria-hidden="true">05 — FAQ</span>
            <h2>Lore ke baare mein <em>sawal</em></h2>
            <p>Seedhe, chhote jawab. Aur jaanna hai to saare sawal ek jagah padho.</p>
            <Link prefetch={false} href="/faq" className="link-arrow">Saare sawal dekho <span aria-hidden="true">→</span></Link>
          </div>
          <FaqList faqs={homeFaqs} />
        </div>
      </section>
    </>
  );
}
