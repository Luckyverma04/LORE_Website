import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import { NAV, LOGO, PLAY_URL } from "@/lib/site";

// Floating maroon glass capsule. Logo comes from LOGO in lib/site.js
// (an image if LOGO.image is set, otherwise the text wordmark with a small gold star).
export default function Header() {
  return (
    <header className="header">
      <div className="header-bar">
        <Link prefetch={false} href="/" className="logo" aria-label="Lore home">
          {LOGO.image ? (
            <Image src={LOGO.image} alt="Lore" width={LOGO.width} height={LOGO.height} priority />
          ) : (
            <>
              {LOGO.text}
              <svg className="logo-star" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="currentColor" d="M12 1.5l2.6 7.9H23l-6.8 4.9 2.6 7.9L12 17.3l-6.8 4.9 2.6-7.9L1 9.4h8.4z" />
              </svg>
            </>
          )}
        </Link>
        <nav aria-label="Main">
          <ul className="nav">
            {NAV.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
            <li>
              <a href={PLAY_URL} rel="noopener" className="nav-cta">Get the app</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
