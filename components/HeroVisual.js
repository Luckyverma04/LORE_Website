import Image from "next/image";
import HeroStageSlot from "./HeroStageSlot";

// The four Polaroids are real Lore template cards (files in /public/templates).
const PRINTS = [
  { src: "/templates/patriotic.webp", label: "Patriotic", cls: "pol-1" },
  { src: "/templates/girl.webp", label: "Girl", cls: "pol-2" },
  { src: "/templates/family.webp", label: "Family", cls: "pol-3" },
  { src: "/templates/devotion.webp", label: "Devotion", cls: "pol-4" },
];

/**
 * Right side of the Home hero.
 * 1. CSS 3D stage (server HTML, every screen size): the real app screen in a tilted phone,
 *    (that phone image is the LCP element on desktop: eager + fetchpriority="high"; nothing else is prioritised)
 *    with Polaroid template prints floating around it. Costs no JavaScript.
 * 2. On desktop, after the first interaction, HeroStageSlot loads the WebGL version of the
 *    same stage and cross-fades to it.
 */
export default function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="stage-ring" aria-hidden="true" />
      <div className="css-stage" aria-hidden="true">
        <div className="phone3d">
          <Image src="/screens/app-screen-1.webp" alt="" width={540} height={834} sizes="(min-width: 1024px) 250px, 214px" quality={60} loading="eager" fetchPriority="high" />
        </div>
        {PRINTS.map((p) => (
          <figure key={p.src} className={`polaroid ${p.cls}`}>
            <Image src={p.src} alt="" width={230} height={325} sizes="(min-width: 1024px) 128px, 104px" quality={60} fetchPriority="low" />
            <figcaption>{p.label}</figcaption>
          </figure>
        ))}
      </div>
      <HeroStageSlot />
    </div>
  );
}
