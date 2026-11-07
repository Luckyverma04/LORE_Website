import PlayStoreButton from "@/components/PlayStoreButton";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import { FAQS } from "@/lib/faqs";
import { faqSchema } from "@/lib/schema";
import { OG_DEFAULTS } from "@/lib/og";

export const metadata = {
  title: "Lore FAQ – Questions About the Lore Video App",
  description:
    "Answers about Lore: what it is, how to make a video, how many photos you need, WhatsApp sharing, privacy and which phones it works on.",
  alternates: { canonical: "/faq" },
  openGraph: { ...OG_DEFAULTS, url: "/faq" },
};

export default function FaqPage() {
  return (
    <section className="section paper page-faq">
      <JsonLd data={faqSchema(FAQS)} />
      <div className="wrap faq-layout">
        <div className="faq-side">
          <p className="eyebrow">{FAQS.length} questions · English + Hinglish</p>
          <h1>Lore <em>FAQ</em></h1>
          <p className="lead">Short, direct answers about Lore: Viral Star Bano.</p>
          <PlayStoreButton />
        </div>
        <div>
          <FaqList faqs={FAQS} HeadingTag="h2" />
          <div className="faq-cta">
            <p><strong>Aur sawal?</strong> Sabse aasaan jawab: app khud try karke dekho.</p>
            <PlayStoreButton />
          </div>
        </div>
      </div>
    </section>
  );
}
