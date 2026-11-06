import Link from "next/link";
import PlayStoreButton from "@/components/PlayStoreButton";
import CategoryCard from "@/components/CategoryCard";
import Hero3DSlot from "@/components/Hero3DSlot";
import { CATEGORIES } from "@/lib/site";
import { OG_DEFAULTS } from "@/lib/og";

export const metadata = {
  title: "Lore Templates – Family, Friends, Devotion & More",
  description:
    "Browse Lore's template categories: Family, Friends, Relationships, Devotion, Patriotic, Dance, Vlog and animated art styles. Pick one and add your photo.",
  alternates: { canonical: "/templates" },
  openGraph: { ...OG_DEFAULTS, url: "/templates" },
};

export default function TemplatesPage() {
  return (
    <>
      <section className="stage page-hero">
        <div className="stage-bg" aria-hidden="true"><span className="stage-glow" /></div>
        <div className="wrap hero-big">
          <div>
            <p className="eyebrow">{CATEGORIES.length} categories in the app</p>
            <h1>Lore <em>templates</em></h1>
            <p className="lead">
              A template is a ready-made video scene. Pick one, add your photo, and Lore makes the video with you in it.
              These are the categories in the app.
            </p>
            <PlayStoreButton />
          </div>
          {/* 3D ring of template categories (desktop only) */}
          <Hero3DSlot model="carousel" />
        </div>
      </section>
      <section className="section posters">
        <div className="wrap">
          <div className="cat-grid">
            {CATEGORIES.map((c, i) => (
              <CategoryCard key={c.name} category={c} lcp={i === 0} HeadingTag="h2" sizes="(min-width: 1100px) 270px, (min-width: 720px) 30vw, 45vw" />
            ))}
          </div>
          <div className="note-card">
            <h2>Template kaise <em>use</em> karein?</h2>
            <p>
              Category kholo, ek template chuno aur apni ek clear photo daalo. Lore ka AI video bana deta hai, jise aap
              download karke WhatsApp status pe laga sakte ho. Poore steps ke liye{" "}
              <Link prefetch={false} href="/how-it-works">How it works</Link> dekho, aur koi sawal ho to{" "}
              <Link prefetch={false} href="/faq">FAQ</Link> padho.
            </p>
          </div>
          <PlayStoreButton label="See all templates in the app" />
        </div>
      </section>
    </>
  );
}
