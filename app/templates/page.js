import PlayStoreButton from "@/components/PlayStoreButton";
import CategoryCard from "@/components/CategoryCard";
import Hero3DSlot from "@/components/Hero3DSlot";
import { CATEGORIES } from "@/lib/site";

export const metadata = {
  title: "Lore Templates – Family, Friends, Devotion & More",
  description:
    "Browse Lore's template categories: Family, Friends, Relationships, Devotion, Patriotic, Dance, Vlog and animated art styles. Pick one and add your photo.",
  alternates: { canonical: "/templates" },
};

export default function TemplatesPage() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <h1>Lore templates</h1>
            <p className="lead">
              A template is a ready-made video scene. Pick one, add your photo, and Lore makes the video with you in it.
              These are the categories in the app.
            </p>
          </div>
          {/* 3D ring of template categories (desktop only) */}
          <Hero3DSlot model="carousel" />
        </div>
        <div className="cat-grid">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.name} category={c} HeadingTag="h2" sizes="(max-width: 720px) 45vw, 230px" />
          ))}
        </div>
        <PlayStoreButton label="See all templates in the app" />
      </div>
    </section>
  );
}
