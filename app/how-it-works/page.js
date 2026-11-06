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
    <>
      <section className="stage page-hero">
        <div className="stage-bg" aria-hidden="true"><span className="stage-glow" /></div>
        <div className="wrap hero-big">
          <div>
            <p className="eyebrow">4 steps · No editing</p>
            <h1>How <em>Lore</em> works</h1>
            <p className="lead">
              Lore turns your photo into a video you can share. You do not need to edit anything. Here are the four steps.
            </p>
            <PlayStoreButton />
          </div>
          {/* 3D step flow (desktop only): template cards hop through the 4 steps */}
          <Hero3DSlot model="flow" />
        </div>
      </section>
      <section className="section" aria-label="The four steps">
        <div className="wrap">
          {/* The 4 steps on a line with a forward-moving light (components/LightSteps.js) */}
          <LightSteps />
          <PlayStoreButton />
        </div>
      </section>
    </>
  );
}
