import Link from "next/link";
import PlayStoreButton from "./PlayStoreButton";
import { NAV, APP_NAME, PLAY_URL, PLAY_FACTS } from "@/lib/site";

export default function Footer() {
  return (
    <>
      {/* Closing call to action: the maroon curtain with a gold spotlight */}
      <section className="stage ft-cta">
        <span className="ft-beam" aria-hidden="true" />
        <div className="wrap ft-ctaText">
          <p className="ft-kick">Lights · Camera · Aap</p>
          <h2>Apne status ka <em>star</em> bano</h2>
          <p>Template chuno, photo daalo, video share karo.</p>
          <PlayStoreButton />
        </div>
      </section>

      <footer className="ft-footer">
        {/* main area: the giant "Lore" fills its background and ends right above the copyright line */}
        <div className="ft-main">
        <p className="ft-giant" aria-hidden="true">Lore</p>
        <div className="wrap ft-cols">
          <div>
            <p className="ft-brand">LORE</p>
            <p className="ft-tag">Ek photo. Viral video. Aap star.</p>
          </div>
          <nav aria-label="Footer">
            <p className="ft-head">Pages</p>
            <ul className="ft-links">
              <li><Link prefetch={false} href="/">Home</Link></li>
              {NAV.map((item) => (
                <li key={item.href}><Link prefetch={false} href={item.href}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="ft-head">App</p>
            <ul className="ft-links">
              <li><a href={PLAY_URL} rel="noopener">Get it on Google Play</a></li>
              <li className="ft-note">Android app{PLAY_FACTS.rating ? ` · ${PLAY_FACTS.rating} ★ on Google Play` : ""}</li>
            </ul>
          </div>
        </div>
        </div>
        <div className="wrap ft-bottom">
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
