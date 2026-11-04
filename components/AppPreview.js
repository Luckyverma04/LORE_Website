import Image from "next/image";
import { getImages } from "@/lib/images";

// "Short preview of the app" (PDF). Shows every image in /public/screens, in a phone frame.
// To add a screenshot: put it in public/screens (e.g. 03-lore-app-share-screen.webp) and rebuild.
export default function AppPreview() {
  const screens = getImages("screens", "");
  return (
    <div className="preview" aria-label="Lore app screenshots">
      {screens.map((s) => (
        <div key={s.src} className="phone-frame">
          <Image src={s.src} alt={s.alt} width={540} height={900} sizes="(max-width: 720px) 62vw, 230px" className="screen" />
        </div>
      ))}
    </div>
  );
}
