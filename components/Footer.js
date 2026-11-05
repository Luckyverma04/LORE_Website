import Link from "next/link";
import PlayStoreButton from "./PlayStoreButton";
import styles from "./Footer.module.css";
import { NAV, APP_NAME, PLAY_URL, PLAY_FACTS } from "@/lib/site";


export default function Footer() {
  return (
    <>
      {/* Closing call to action: light band, so it stands apart from the maroon header */}
      <section className={styles.cta}>
        <div className={`wrap ${styles.ctaText}`}>
          <h2>Apne status ka <span>star</span> bano</h2>
          <p>Template chuno, photo daalo, video share karo.</p>
          <PlayStoreButton />
        </div>
      </section>

      <footer className={styles.footer}>
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
