import PlayStoreButton from "./PlayStoreButton";
import { NAV, APP_NAME } from "@/lib/site";

export default function Footer() {
  return (
    <>
      <section className="cta">
        <div className="wrap">
          <h2>Apne status ka star bano</h2>
          <p>Pick a template, add your photo, share your video.</p>
          <PlayStoreButton />
        </div>
      </section>

      <footer className="footer">
        <div className="wrap">
          <ul className="nav">
            <li><a href="/">Home</a></li>
            {NAV.map((item) => (
              <li key={item.href}><a href={item.href}>{item.label}</a></li>
            ))}
          </ul>
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
