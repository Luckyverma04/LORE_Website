import Image from "next/image";

// One template category, styled as a film poster.
// Data comes from CATEGORIES in lib/site.js. HeadingTag lets each page keep a correct heading order.
// sizes = how wide the card is on screen (Home row default; the Templates grid passes its own).
// Categories without an image become a typographic poster (big italic initial).
// lcp: true only for the first card on /templates (its image is the LCP element on phones).
export default function CategoryCard({ category, HeadingTag = "h3", sizes = "(min-width: 900px) 250px, 210px", lcp = false }) {
  return (
    <div className={category.image ? "cat-card" : "cat-card no-img"} data-initial={category.name.charAt(0)}>
      {category.image && (
        <Image
          src={category.image}
          alt={`${category.name} template in the Lore app`}
          width={230}
          height={325}
          sizes={sizes}
          quality={60}
          loading={lcp ? "eager" : "lazy"}
          fetchPriority={lcp ? "high" : undefined}
          className="cat-img"
        />
      )}
      <HeadingTag className="cat-name">{category.name}</HeadingTag>
      <p>{category.text}</p>
    </div>
  );
}
