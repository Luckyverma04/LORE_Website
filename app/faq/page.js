import PlayStoreButton from "@/components/PlayStoreButton";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import { FAQS } from "@/lib/faqs";
import { faqSchema } from "@/lib/schema";

export const metadata = {
  title: "Lore FAQ – Questions About the Lore Video App",
  description:
    "Answers about Lore: what it is, how to make a video, how many photos you need, WhatsApp sharing, privacy and which phones it works on.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <section className="section">
      <JsonLd data={faqSchema(FAQS)} />
      <div className="wrap">
        <h1>Lore FAQ</h1>
        <p className="lead">Short, direct answers about Lore: Viral Star Bano.</p>
        <FaqList faqs={FAQS} />
        <p style={{ marginTop: 24 }}><PlayStoreButton /></p>
      </div>
    </section>
  );
}
