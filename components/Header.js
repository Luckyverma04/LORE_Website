import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";
import { NAV, LOGO } from "@/lib/site";

// Logo comes from LOGO in lib/site.js: an image if LOGO.image is set, otherwise the text wordmark.
export default function Header() {
  return (
    <header className="header">
      <div className="wrap header-bar">
        <Link prefetch={false} href="/" className="logo" aria-label="Lore home">
          {LOGO.image ? (
            <Image src={LOGO.image} alt="Lore" width={LOGO.width} height={LOGO.height} priority />
          ) : (
            LOGO.text
          )}
        </Link>
        <nav aria-label="Main">
          <ul className="nav">
            {NAV.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
