// Visible FAQ. Same data as the FAQPage schema (lib/faqs.js).
export default function FaqList({ faqs }) {
  return (
    <div className="faq">
      {faqs.map((f) => (
        <div key={f.q} className="faq-item">
          <h3>{f.q}</h3>
          <p>{f.a}</p>
        </div>
      ))}
    </div>
  );
}
