"use client";

import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";
import { site } from "@/lib/site";

type Tier = {
  name: string;
  tagline?: string;
  price: number;
  recommended?: boolean;
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
 */
const tiers: Tier[] = [
  {
    name: "Organic search visibility",
    tagline: "Single home, one catchment.",
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
    name: "Occupancy programme",
    tagline: "Organic and paid search, one strategy.",
    price: 2450,
    recommended: true,
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
    name: "Paid search visibility",
    tagline: "Google Ads for the families ready to enquire this week.",
    price: 1200,
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
    <div className="relative grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
      {tiers.map((tier, idx) => {
        const rec = !!tier.recommended;
        return (
          <ScrollReveal key={tier.name} delay={idx * 100}>
            <div
              className={`relative flex h-full flex-col rounded-[1.5rem] border p-8 transition-colors sm:p-10 ${
                rec
                  ? "border-[color:var(--color-sky)]/50 bg-[color:color-mix(in_oklab,var(--color-sky)_6%,transparent)]"
                  : "border-[color:var(--color-line)] bg-[color:var(--color-surface)] hover:border-[color:var(--color-line-strong)]"
              }`}
            >
              {rec && (
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
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--color-sky)]/50 bg-[color:var(--color-canvas)] px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-sky)]">
                    ★ Recommended
                  </span>
                </>
              )}

              <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-[color:var(--color-slate-2)]">
                {tier.name}
              </div>

              {tier.tagline && (
                <p className="mt-3 text-sm text-[color:var(--color-slate)]">
                  {tier.tagline}
                </p>
              )}

              <div className="mt-10">
                <div className="text-[10px] font-medium uppercase tracking-[0.28em] text-[color:var(--color-slate-2)]">
                  From
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span
                    className={`display leading-none text-[3.25rem] sm:text-[3.75rem] ${
                      rec
                        ? "text-[color:var(--color-sky)]"
                        : "text-[color:var(--color-navy)]"
                    }`}
                  >
                    £{tier.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-[color:var(--color-slate)]">
                    / month
                  </span>
                </div>
              </div>

              <div className="hairline mt-10" />

              <ul className="mt-8 flex-1 space-y-4 text-[0.95rem] leading-relaxed text-[color:var(--color-slate)]">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Check muted={!rec} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link
                  href={tier.cta.href}
                  target={tier.cta.external ? "_blank" : undefined}
                  rel={tier.cta.external ? "noopener" : undefined}
                  className={`btn w-full justify-center ${rec ? "btn-primary" : "btn-ghost"}`}
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
