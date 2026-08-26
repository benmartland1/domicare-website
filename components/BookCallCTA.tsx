import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { ScrollReveal } from "./ScrollReveal";

type Props = {
  /** Main call-to-action label */
  label?: string;
  /** Small uppercase eyebrow above the label */
  eyebrow?: string;
  /** Top margin class - tune when placing between sections with lots of surrounding whitespace */
  className?: string;
};

/**
 * A compact, inline booking CTA featuring Ben's headshot.
 * Designed to be dropped between major sections without fighting the section rhythm.
 */
export function BookCallCTA({
  label = "Book a call",
  eyebrow = "Meet Ben",
  className = "mt-24",
}: Props) {
  return (
    <ScrollReveal
      className={`relative mx-auto flex justify-center px-6 lg:px-10 ${className}`}
    >
      <Link
        href={site.calendly}
        target="_blank"
        rel="noopener"
        className="group relative flex items-center gap-4 rounded-full border border-[color:var(--color-line)] bg-gradient-to-br from-[color:var(--color-surface)] to-transparent py-2 pl-2 pr-3 shadow-[0_12px_40px_-14px_rgba(0,0,0,0.6)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[color:var(--color-sky)]/40 hover:shadow-[0_20px_50px_-12px_color-mix(in_oklab,var(--color-sky)_38%,transparent)] sm:pr-4"
      >
        {/* Headshot */}
        <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-[color:var(--color-sky)]/40 transition-[ring-color,transform] duration-300 group-hover:ring-[color:var(--color-sky)] sm:h-12 sm:w-12">
          <Image
            src="/brand/founder-cta.png"
            alt="Ben Martland"
            fill
            sizes="48px"
            className="object-cover"
            style={{ objectPosition: "center 15%" }}
          />
        </span>

        {/* Copy */}
        <span className="flex flex-col pr-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-sky)]">
            {eyebrow}
          </span>
          <span className="text-sm font-[500] text-[color:var(--color-navy)] sm:text-[15px]">
            {label}
          </span>
        </span>

        {/* Arrow chip */}
        <span
          aria-hidden
          className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-[color:var(--color-sky)] text-[color:var(--color-canvas)] transition-transform duration-300 group-hover:translate-x-0.5 sm:ml-2"
        >
          →
        </span>
      </Link>
    </ScrollReveal>
  );
}
