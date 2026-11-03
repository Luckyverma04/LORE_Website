import Link from "next/link";
import { NAV } from "@/lib/site";

export default function Header() {
  return (
    <header className="header">
      <div className="wrap header-bar">
        <Link prefetch={false} href="/" className="logo">LORE</Link>
        <nav aria-label="Main">
          <ul className="nav">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link prefetch={false} href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
