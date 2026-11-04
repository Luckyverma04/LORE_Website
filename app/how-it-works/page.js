import PlayStoreButton from "@/components/PlayStoreButton";
import Hero3DSlot from "@/components/Hero3DSlot";
import { STEPS } from "@/lib/site";
import { OG_DEFAULTS } from "@/lib/og";

export const metadata = {
  title: "How Lore Works – Make a Video from Your Photo",
  description:
    "How to use Lore: install the app from Google Play, pick a template, add your photo and share your video on WhatsApp status. No editing needed.",
  alternates: { canonical: "/how-it-works" },
  openGraph: { ...OG_DEFAULTS, url: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="hero-grid hero-big">
          <div>
            <h1>How Lore works</h1>
            <p className="lead">
              Lore turns your photo into a video you can share. You do not need to edit anything. Here are the four steps.
            </p>
            <PlayStoreButton />
          </div>
          {/* 3D step flow (desktop only): template cards hop through the 4 steps */}
          <Hero3DSlot model="flow" />
        </div>
        <ol className="steps grid">
          {STEPS.map((s) => (
            <li key={s.title} className="card">
              <h2 style={{ fontSize: "1.2rem" }}>{s.title}</h2>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <PlayStoreButton />
      </div>
    </section>
  );
}
