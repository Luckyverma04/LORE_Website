
// Visible FAQ as an accordion. Same data as the FAQPage schema (lib/faqs.js).
// Uses native <details>/<summary>: no JavaScript, and every answer stays in the HTML,
// so Google and AI crawlers read all of it. The first question starts open.
// HeadingTag keeps the heading order right on each page (h3 on Home, h2 on /faq).
export default function FaqList({ faqs, HeadingTag = "h3" }) {
  return (
    <div className="faq-list">
      {faqs.map((f, i) => (
        <details key={f.q} className="faq-item" open={i === 0}>
          <summary className="faq-q">
            <HeadingTag className="faq-qText">{f.q}</HeadingTag>
            <span className="faq-icon" aria-hidden="true" />
          </summary>
          <p className="faq-a">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
