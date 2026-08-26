import Image from "next/image";
import Link from "next/link";

/**
 * The DomiCare lockup, straight from the brand files.
 *
 * Two artworks, not one recoloured with CSS: the mark is an eight-dot orbit
 * with a navy-to-sky gradient, so on a navy surface it needs the ramp stepped
 * up rather than simply inverted. `tone` picks the right file.
 */
export function Wordmark({
  tone = "light",
  className = "",
  href = "/",
  height = 30,
}: {
  /** "light" = on the pale canvas. "navy" = inside a dark band. */
  tone?: "light" | "navy";
  className?: string;
  /** Pass null to render the lockup without wrapping it in a link. */
  href?: string | null;
  height?: number;
}) {
  // Source artwork is 805 x 141.
  const width = Math.round((height * 805) / 141);

  const img = (
    <Image
      src={tone === "navy" ? "/brand/logo-reverse.png" : "/brand/logo.png"}
      alt="DomiCare"
      width={width}
      height={height}
      priority={tone === "light"}
      className={`w-auto ${className}`}
      style={{ height }}
    />
  );

  if (!href) return img;

  return (
    <Link href={href} aria-label="DomiCare home" className="inline-flex items-center">
      {img}
    </Link>
  );
}
