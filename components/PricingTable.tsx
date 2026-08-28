"use client";

import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";
import { site } from "@/lib/site";

type Tier = {
  name: string;
  tagline?: string;
  /** Small label above the name on the two single-channel tiers. */
  tag?: string;
  price: number;
  /** Sits under the price — scope of what the flat figure covers. */
  priceNote?: string;
  /** The comparison that makes the programme the obvious buy. */
  decoy?: string;
  /** The commercial case for the retainer, kept next to the number it justifies. */
  maths?: string;
  hero?: boolean;
  badge?: string;
  features: string[];
  cta: { label: string; href: string; external?: boolean };
};

/**
 * PROVISIONAL PRICING — confirm before launch.
 *
 * These rates are set below the DomiCare parent rates on purpose: a single
 * independent home cannot carry a £2,950 retainer, but a group can. If the
 * numbers change, change them here — the pricing page, the homepage and the
 * FAQ all read from this array.
 *
 * Order matters: organic and paid flank the programme, which sits in the
 * middle on desktop and first on mobile so the eye lands on it either way.
 */
const tiers: Tier[] = [
  {
    tag: "Start with one channel",
    name: "Organic search visibility",
    tagline: "One home, one catchment.",
    price: 950,
    features: [
      "Full AI visibility audit for your home and your town",
      "CQC, carehome.co.uk and Google Business Profile alignment",
      "Your site rebuilt so AI assistants and Google can read and quote it",
      "Two AI-citable pages a month",
      "Monthly report of what ChatGPT, Gemini and Perplexity say about you",
    ],
    cta: { label: "Book a call", href: site.calendly, external: true },
  },
  {
    badge: "Most operators start here",
    name: "Occupancy programme",
    tagline: "Organic and paid search, one strategy. Up to three homes.",
    price: 2450,
    priceNote: "Covers up to three homes.",
    decoy:
      "Both channels bought on their own come to £2,450 for a single home. The programme is the same price — across up to three.",
    maths:
      "One additional private resident is worth roughly £60,000–£83,000 a year. That is the number this retainer is measured against.",
    hero: true,
    features: [
      "Everything in both services",
      "Up to three homes included, then priced per home",
      "Google Ads built per home, per town, per specialism",
      "Enquiry tracking from first click through to admission",
      "One monthly report covering both channels",
    ],
    cta: { label: "Book a call", href: site.calendly, external: true },
  },
  {
    tag: "Start with one channel",
    name: "Paid search visibility",
    tagline: "One home. Google Ads for the families ready to enquire this week.",
    price: 1500,
    features: [
      "Account build or rebuild, run by a Google Partner",
      "Private-pay intent prioritised over LA-funded searches",
      "Landing pages built to take an enquiry, not a click",
      "Monthly performance report and strategy call",
    ],
    cta: { label: "Book a call", href: site.calendly, external: true },
  },
];

function Check({ muted = false }: { muted?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden
      className={`mt-[3px] shrink-0 ${muted ? "text-[color:var(--color-slate-2)]" : "text-[color:var(--color-sky)]"}`}
    >
      <path
        d="M3.5 9.5l3.2 3.2 7.8-7.8"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PricingTable() {
  return (
    <div className="relative grid items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_minmax(0,1fr)] lg:gap-5">
      {tiers.map((tier, idx) => {
        const hero = !!tier.hero;
        return (
          <ScrollReveal
            key={tier.name}
            delay={hero ? 0 : 120}
            className={
              hero
                ? "order-first h-full lg:order-none lg:z-10"
                : "h-full lg:py-10"
            }
          >
            <div
              className={`relative flex h-full flex-col rounded-[1.5rem] transition-colors ${
                hero
                  ? "border-2 border-[color:var(--color-sky)] bg-[color:color-mix(in_oklab,var(--color-sky)_6%,transparent)] p-8 shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--color-sky)_60%,transparent)] sm:p-11"
                  : "border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-7 hover:border-[color:var(--color-line-strong)] sm:p-8"
              }`}
            >
              {hero && (
                <>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-10 -z-10 rounded-[2.5rem] opacity-70"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--color-sky) 35%, transparent), transparent 65%)",
                      filter: "blur(40px)",
                    }}
                  />
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[color:var(--color-sky)]/50 bg-[color:var(--color-canvas)] px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-sky)]">
                    {tier.badge}
                  </span>
                </>
              )}

              {tier.tag && (
                <div className="mb-4">
                  <span className="inline-block rounded-full border border-[color:var(--color-line)] px-3 py-1 text-[9px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-slate-2)]">
                    {tier.tag}
                  </span>
                </div>
              )}

              <div
                className={`font-medium uppercase tracking-[0.24em] ${
                  hero
                    ? "text-[13px] text-[color:var(--color-sky)]"
                    : "text-[11px] text-[color:var(--color-slate-2)]"
                }`}
              >
                {tier.name}
              </div>

              {tier.tagline && (
                <p
                  className={`mt-3 text-[color:var(--color-slate)] ${
                    hero ? "text-[0.95rem]" : "text-sm"
                  }`}
                >
                  {tier.tagline}
                </p>
              )}

              <div className={hero ? "mt-9" : "mt-8"}>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`display leading-none ${
                      hero
                        ? "text-[3.75rem] text-[color:var(--color-sky)] sm:text-[4.5rem]"
                        : "text-[2.5rem] text-[color:var(--color-navy)] sm:text-[2.75rem]"
                    }`}
                  >
                    £{tier.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-[color:var(--color-slate)]">
                    / month
                  </span>
                </div>

                {tier.priceNote && (
                  <p className="mt-3 text-sm font-medium text-[color:var(--color-slate)]">
                    {tier.priceNote}
                  </p>
                )}

                {tier.decoy && (
                  <p className="mt-3 text-[0.8125rem] leading-relaxed text-[color:var(--color-slate-2)]">
                    {tier.decoy}
                  </p>
                )}

                {tier.maths && (
                  <p className="mt-5 border-l-2 border-[color:var(--color-sky)]/40 pl-4 text-[0.8125rem] leading-relaxed text-[color:var(--color-slate)]">
                    {tier.maths}
                  </p>
                )}
              </div>

              <div className={hero ? "hairline mt-9" : "hairline mt-8"} />

              <ul
                className={`flex-1 space-y-4 leading-relaxed text-[color:var(--color-slate)] ${
                  hero ? "mt-8 text-[0.95rem]" : "mt-7 text-[0.9rem]"
                }`}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Check muted={!hero} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className={hero ? "mt-10" : "mt-8"}>
                <Link
                  href={tier.cta.href}
                  target={tier.cta.external ? "_blank" : undefined}
                  rel={tier.cta.external ? "noopener" : undefined}
                  className={`btn w-full justify-center ${hero ? "btn-primary" : "btn-ghost"}`}
                >
                  {tier.cta.label}
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
