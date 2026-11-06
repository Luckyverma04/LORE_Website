import Link from "next/link";
import PlayStoreButton from "./PlayStoreButton";
import styles from "./Footer.module.css";
import { NAV, APP_NAME, PLAY_URL, PLAY_FACTS } from "@/lib/site";

export default function Footer() {
  return (
    <>
      {/* Closing call to action: the maroon curtain with a gold spotlight */}
      <section className={`stage ${styles.cta}`}>
        <span className={styles.beam} aria-hidden="true" />
        <div className={`wrap ${styles.ctaText}`}>
          <p className={styles.kick}>Lights · Camera · Aap</p>
          <h2>Apne status ka <em>star</em> bano</h2>
          <p>Template chuno, photo daalo, video share karo.</p>
          <PlayStoreButton />
        </div>
      </section>

      <footer className={styles.footer}>
        {/* main area: the giant "Lore" fills its background and ends right above the copyright line */}
        <div className={styles.main}>
        <p className={styles.giant} aria-hidden="true">Lore</p>
        <div className={`wrap ${styles.cols}`}>
          <div>
            <p className={styles.brand}>LORE</p>
            <p className={styles.tag}>Ek photo. Viral video. Aap star.</p>
          </div>
          <nav aria-label="Footer">
            <p className={styles.head}>Pages</p>
            <ul className={styles.links}>
              <li><Link prefetch={false} href="/">Home</Link></li>
              {NAV.map((item) => (
                <li key={item.href}><Link prefetch={false} href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className={styles.head}>App</p>
            <ul className={styles.links}>
              <li><a href={PLAY_URL} rel="noopener">Get it on Google Play</a></li>
              <li className={styles.note}>Android app{PLAY_FACTS.rating ? ` · ${PLAY_FACTS.rating} ★ on Google Play` : ""}</li>
            </ul>
          </div>
        </div>
        </div>
        <div className={`wrap ${styles.bottom}`}>
          <p>© 2026 Lore. {APP_NAME} is available on Google Play for Android.</p>
        </div>
      </footer>

      {/* Mobile-only sticky install bar (pure CSS, no JavaScript) */}
      <div className="sticky-cta">
        <PlayStoreButton label="Install Lore" small />
      </div>
    </>
  );
}
