import Image from "next/image";
import { SCREENSHOTS } from "@/lib/site";

// "Short preview of the app" (PDF): the real screenshots on a curved wall (desktop),
// a swipeable row on phones. To change screenshots, edit SCREENSHOTS in lib/site.js.
// quality 55 (not 60 like the hero phone) also gives these a different URL from the hero image,
// so Next.js does not mistake this lazy copy of app-screen-1 for the (eager) LCP image.
export default function AppPreview() {
  return (
    <div className="preview" aria-label="Lore app screenshots">
      {SCREENSHOTS.map((s) => (
        <figure key={s.src} className="shot">
          <Image src={s.src} alt={s.alt} width={540} height={834} sizes="(min-width: 900px) 260px, 60vw" quality={55} className="screen" />
          <figcaption><b>{s.title}</b></figcaption>
        </figure>
      ))}
    </div>
  );
}
