import PlayStoreButton from "@/components/PlayStoreButton";
import { STEPS } from "@/lib/site";

export const metadata = {
  title: "How Lore Works – Make a Video from Your Photo",
  description:
    "How to use Lore: install the app from Google Play, pick a template, add your photo and share your video on WhatsApp status. No editing needed.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <section className="section">
      <div className="wrap">
        <h1>How Lore works</h1>
        <p className="lead">
          Lore turns your photo into a video you can share. You do not need to edit anything. Here are the four steps.
        </p>
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
