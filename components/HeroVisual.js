import { getImageProps } from "next/image";
import Hero3DSlot from "./Hero3DSlot";

// 1x1 transparent GIF: what phones "load" for the hidden desktop-only image (no network request).
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/**
 * Right side of the Home hero (desktop only).
 * - The static phone image is in the server HTML, so the browser finds it immediately
 *   (it is the LCP element on desktop). It loads eagerly with fetchpriority="high".
 * - <picture> + media query: only screens 1024px+ download it; phones get the blank GIF.
 * - After the first interaction, Hero3DSlot swaps in the 3D phone (CSS hides the static one).
 */
export default function HeroVisual({ screen = "/screens/app-screen-1.webp", cards }) {
  const { props } = getImageProps({ src: screen, alt: "", width: 540, height: 834, sizes: "210px" });
  return (
    <div className="hero-visual">
      <div className="hero3d-static-phone" aria-hidden="true">
        <picture>
          <source media="(min-width: 1024px)" srcSet={props.srcSet} sizes={props.sizes} />
          <img src={BLANK} alt="" width={540} height={834} fetchPriority="high" loading="eager" decoding="async" />
        </picture>
      </div>
      <Hero3DSlot model="phone" screen={screen} cards={cards} />
    </div>
  );
}
