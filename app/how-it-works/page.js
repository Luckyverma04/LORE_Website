import PlayStoreButton from "@/components/PlayStoreButton";
import Hero3DSlot from "@/components/Hero3DSlot";
import LightSteps from "@/components/LightSteps";
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
        {/* The 4 steps on a line with a forward-moving light (components/LightSteps.js) */}
        <LightSteps />
        <PlayStoreButton />
      </div>
    </section>
  );
}
