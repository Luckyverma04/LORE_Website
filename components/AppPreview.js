import Image from "next/image";
import { SCREENSHOTS } from "@/lib/site";

// "Short preview of the app" (PDF). To change screenshots, edit SCREENSHOTS in lib/site.js.
export default function AppPreview() {
  return (
    <div className="preview" aria-label="Lore app screenshots">
      {SCREENSHOTS.map((s) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          width={540}
          height={790}
          sizes="240px"
          quality={60}
          className="screen"
        />
      ))}
    </div>
  );
}
