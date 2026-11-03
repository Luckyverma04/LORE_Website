import Image from "next/image";
import { getImages } from "@/lib/images";

// Continuous right-to-left strip of images. Pure CSS animation, no JavaScript.
// Images come from the folder (default: public/showcase). Add or remove files there.
export default function Marquee({ folder = "showcase" }) {
  const images = getImages(folder);
  if (images.length === 0) return null;

  // Repeat short lists so one set is wide enough for big screens, then draw the set twice
  // so the loop has no gap. Only the very first copy is read by screen readers.
  const repeat = Math.ceil(8 / images.length);
  const set = Array.from({ length: repeat }, () => images).flat();
  return (
    <div className="marquee">
      <div className="marquee-track" style={{ "--count": set.length }}>
        {[0, 1].map((copy) =>
          set.map((img, i) => (
            <Image
              key={`${copy}-${i}`}
              src={img.src}
              alt={copy === 0 && i < images.length ? img.alt : ""}
              aria-hidden={copy === 0 && i < images.length ? undefined : true}
              width={320}
              height={379}
              sizes="200px"
              className="marquee-img"
            />
          ))
        )}
      </div>
    </div>
  );
}
