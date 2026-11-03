import { NAV } from "@/lib/site";

export default function Header() {
  return (
    <header className="header">
      <div className="wrap header-bar">
        <a href="/" className="logo">LORE</a>
        <nav aria-label="Main">
          <ul className="nav">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
