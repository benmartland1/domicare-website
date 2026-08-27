import Image from "next/image";
import fs from "node:fs";
import path from "node:path";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { site } from "@/lib/site";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  /** Hex brand colour used as a subtle accent bar */
  accent: string;
  /** Optional client logo path - shown on the featured card */
  logo?: string;
  /** Slug-style basename for headshot lookup (e.g. "eamon-shahir") */
  photoSlug?: string;
  featured?: boolean;
};

/**
 * DomiCare is new; DomiSearch is not. These are verbatim quotes from DomiSearch
 * clients, and the section says so plainly rather than implying they are care
 * homes. Replace with care-sector quotes as soon as we have them.
 *
 * Tom Lynch's quote is from Trustpilot and predates the rebrand — it says "BMAR
 * Digital" in the original. Renamed to DomiSearch so it matches the company the
 * reader can actually go and look up.
 *
 * Count matters: the featured card takes one, the rest sit in a two-column grid.
 * Keep this list at an odd length so the grid never leaves a hanging single.
 */
const testimonials: Testimonial[] = [
  {
    quote:
      "We have been working with Ben and DomiSearch for nearly 3 years. A true expert in his space. Taxd has grown a phenomenal customer base thanks to our fantastic search acquisition strategy.",
    name: "Eamon Shahir",
    role: "Co-Founder",
    company: "Taxd",
    accent: "#1E40FF",
    logo: "/clients/taxd.png",
    photoSlug: "eamon-shahir",
    featured: true,
  },
  {
    quote:
      "We brought Ben in to support not just with Google Ads, but also landing pages, copy, and AEO. This helped boost conversions at every stage of the funnel - more clicks from ads and more customers converting. What we value most is his ability to provide clear insights, suggest improvements, and execute independently.",
    name: "Arjun Kumar",
    role: "Founder",
    company: "Taxd",
    accent: "#1E40FF",
    photoSlug: "arjun-kumar",
  },
  {
    quote:
      "Ben from DomiSearch has made my life easy... Anything and I mean anything to do with google ads, this guy knows, no over complication, not focusing on 'getting you to buy' The guy tells you what works, makes it works and over delivers. Genuinely never had a better experience with anyone!",
    name: "Angellos Koulli",
    role: "CEO",
    company: "Alphaveata",
    accent: "#14C2B0",
    photoSlug: "angellos-koulli",
  },
  {
    quote:
      "It's been great to work with DomiSearch. Their level of competence in ads and understanding of wider SEO keeps us coming back month after month!",
    name: "Sam Barraclough",
    role: "CEO",
    company: "Rooftop Saunas",
    accent: "#B45309",
    logo: "/clients/rooftop_saunas.png",
    photoSlug: "sam-barraclough",
  },
  {
    quote:
      "Ben @ DomiSearch has helped my agency thrive via his work with Paid Google Search Ads bringing me in more and more high quality leads month on month. Continuing to work with DomiSearch really is a no brainer.",
    name: "Tom Lynch",
    role: "Founder",
    company: "Social Attom",
    accent: "#7C3AED",
    photoSlug: "tom-lynch",
  },
];

const TESTIMONIAL_EXTS = ["jpg", "jpeg", "png", "webp", "avif"] as const;

/** Resolve a headshot file in /public/testimonials/<slug>.<ext>, trying common extensions. */
function resolvePhoto(slug?: string): string | null {
  if (!slug) return null;
  const dir = path.join(process.cwd(), "public", "testimonials");
  for (const ext of TESTIMONIAL_EXTS) {
    const filePath = path.join(dir, `${slug}.${ext}`);
    if (fs.existsSync(filePath)) return `/testimonials/${slug}.${ext}`;
  }
  return null;
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

function Avatar({
  testimonial,
  size,
}: {
  testimonial: Testimonial;
  size: "sm" | "md" | "lg";
}) {
  const photo = resolvePhoto(testimonial.photoSlug);
  const px = size === "lg" ? 52 : size === "md" ? 44 : 36;
  const className =
    size === "lg"
      ? "h-[52px] w-[52px]"
      : size === "md"
        ? "h-11 w-11"
        : "h-9 w-9";

  if (photo) {
    return (
      <Image
        src={photo}
        alt={testimonial.name}
        width={px}
        height={px}
        className={`${className} shrink-0 rounded-full object-cover object-center ring-1 ring-[color:var(--color-line)]`}
        sizes={`${px}px`}
      />
    );
  }

  return (
    <span
      className={`${className} grid shrink-0 place-items-center rounded-full border border-[color:var(--color-line)] text-sm font-[600]`}
      style={{ color: testimonial.accent }}
    >
      {initials(testimonial.name)}
    </span>
  );
}

type TestimonialsProps = {
  /** Render the "Book a call with Ben" button below the grid. Defaults to false. */
  showBookCall?: boolean;
};

export function Testimonials({ showBookCall = false }: TestimonialsProps = {}) {
  const featured = testimonials.find((t) => t.featured) ?? testimonials[0];
  const others = testimonials.filter((t) => t !== featured);

  return (
    <section className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-10">
      <SectionHeader
        eyebrow="Track record"
        title="New brand. Not a new team."
        description="DomiCare launched in 2026. The people running it have been doing this for years at DomiSearch — these are their clients, in their words. Care-sector results will be published here as they land."
      />

      {/* Featured testimonial */}
      <ScrollReveal className="mt-16">
        <figure className="card relative overflow-hidden p-10 sm:p-14">
          <span
            aria-hidden
            className="absolute inset-y-0 left-0 w-[3px]"
            style={{
              background: `linear-gradient(to bottom, ${featured.accent}, transparent)`,
            }}
          />
          <span
            aria-hidden
            className="absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-[0.08] blur-3xl"
            style={{ background: featured.accent }}
          />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div
                className="text-xs uppercase tracking-[0.28em]"
                style={{ color: featured.accent }}
              >
                Featured · {featured.company}
              </div>
              <blockquote
                className="mt-6 max-w-3xl text-balance text-2xl leading-snug text-[color:var(--color-navy)] sm:text-3xl lg:text-[2.1rem]"
                style={{ fontWeight: 500, letterSpacing: "-0.015em" }}
              >
                &ldquo;{featured.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <Avatar testimonial={featured} size="lg" />
                <div>
                  <div className="text-sm font-[600] text-[color:var(--color-navy)]">
                    {featured.name}
                  </div>
                  <div className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-slate-2)]">
                    {featured.role} · {featured.company}
                  </div>
                </div>
              </figcaption>
            </div>
            {featured.logo && (
              <div className="flex items-end justify-start lg:justify-end">
                <Image
                  src={featured.logo}
                  alt={featured.company}
                  width={120}
                  height={40}
                  className="h-8 w-auto opacity-75 brightness-0 invert"
                  sizes="120px"
                />
              </div>
            )}
          </div>
        </figure>
      </ScrollReveal>

      {/* Other testimonials - compact grid */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-2">
        {others.map((t, i) => (
          <ScrollReveal key={t.name} delay={(i % 2) * 100}>
            <figure className="card relative h-full overflow-hidden p-8">
              <span
                aria-hidden
                className="absolute inset-y-4 left-0 w-[2px] rounded-full"
                style={{ background: t.accent, opacity: 0.55 }}
              />
              <blockquote
                className="text-lg leading-snug text-[color:var(--color-navy)]"
                style={{ fontWeight: 500, letterSpacing: "-0.01em" }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <Avatar testimonial={t} size="md" />
                <div>
                  <div className="text-sm font-[600] text-[color:var(--color-navy)]">
                    {t.name}
                  </div>
                  <div className="text-xs uppercase tracking-[0.15em] text-[color:var(--color-slate-2)]">
                    {t.role} · {t.company}
                  </div>
                </div>
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>

      {showBookCall && (
        <ScrollReveal
          delay={80}
          className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
        >
          <a
            href={site.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-16 items-center justify-center gap-4 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-surface)] py-2.5 pl-2.5 pr-7 text-[15px] font-medium text-[color:var(--color-navy)] shadow-[0_12px_36px_-14px_rgba(0,0,0,0.5)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[color:var(--color-sky)]/50 hover:shadow-[0_18px_44px_-14px_color-mix(in_oklab,var(--color-sky)_38%,transparent)]"
          >
            <Image
              src="/brand/founder-cta.png"
              alt="Ben Martland"
              width={48}
              height={48}
              sizes="48px"
              className="h-11 w-11 shrink-0 rounded-full object-cover object-center ring-2 ring-[color:var(--color-sky)]/40"
              style={{ objectPosition: "center 15%" }}
            />
            <span className="whitespace-nowrap">Book a call with Ben</span>
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        </ScrollReveal>
      )}
    </section>
  );
}
