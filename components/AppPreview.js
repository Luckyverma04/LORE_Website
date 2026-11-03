import Image from "next/image";

// "Short preview of the app" (PDF). Real app screenshots go in public/screens/.
// Save them as WebP, about 540x900, under 80 KB each. Crop out any personal profile photo.
const SCREENS = [
  { src: "/screens/screen-1.webp", alt: "Lore app home screen showing Girl, Guy and Friends templates" },
  { src: "/screens/screen-2.webp", alt: "Lore app templates in Family, Relationships and Vlog categories" },
];

export default function AppPreview() {
  return (
    <div className="preview" aria-label="Lore app screenshots">
      {SCREENS.map((s) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          width={540}
          height={900}
          sizes="(max-width: 720px) 60vw, 240px"
          className="screen"
        />
      ))}
    </div>
  );
}
