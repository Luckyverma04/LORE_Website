import fs from "node:fs";
import path from "node:path";

// Reads every image in a /public sub-folder at BUILD time (the page stays static).
// To add an image: drop the file in the folder and rebuild. No code change needed.
// The file name becomes the alt text: "desi-superwoman.webp" -> "Desi superwoman".
export function getImages(folder) {
  const dir = path.join(process.cwd(), "public", folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(webp|png|jpe?g|avif)$/i.test(f))
    .sort()
    .map((file) => {
      const name = file.replace(/\.[^.]+$/, "").replace(/^\d+[-_]/, "").replace(/[-_]+/g, " ");
      return {
        src: `/${folder}/${file}`,
        alt: `${name.charAt(0).toUpperCase()}${name.slice(1)} – Lore app example`,
      };
    });
}
