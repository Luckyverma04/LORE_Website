import Image from "next/image";

// One template category, styled like the template cards in the Lore app.
// Data comes from CATEGORIES in lib/site.js. HeadingTag lets each page keep a correct heading order.
// sizes = how wide the card is on screen (160px in the Home row; the Templates grid passes its own).
export default function CategoryCard({ category, HeadingTag = "h3", sizes = "160px" }) {
  return (
    <div className="cat-card">
      {category.image && (
        <Image
          src={category.image}
          alt={`${category.name} template in the Lore app`}
          width={230}
          height={325}
          sizes={sizes}
          className="cat-img"
        />
      )}
      <HeadingTag className="cat-name">{category.name}</HeadingTag>
      <p>{category.text}</p>
    </div>
  );
}
