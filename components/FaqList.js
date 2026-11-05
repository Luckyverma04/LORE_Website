import styles from "./FaqList.module.css";

// Visible FAQ as an accordion. Same data as the FAQPage schema (lib/faqs.js).
// Uses native <details>/<summary>: no JavaScript, and every answer stays in the HTML,
// so Google and AI crawlers read all of it. The first question starts open.
// HeadingTag keeps the heading order right on each page (h3 on Home, h2 on /faq).
export default function FaqList({ faqs, HeadingTag = "h3" }) {
  return (
    <div className={styles.list}>
      {faqs.map((f, i) => (
        <details key={f.q} className={styles.item} open={i === 0}>
          <summary className={styles.q}>
            <HeadingTag className={styles.qText}>{f.q}</HeadingTag>
            <span className={styles.icon} aria-hidden="true" />
          </summary>
          <p className={styles.a}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
