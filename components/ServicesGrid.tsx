"use client";

import Link from "next/link";
import { useRef } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";
import { GooglePartnerBadge } from "./ui/GooglePartnerBadge";
import { AIEnginesBadge } from "./ui/AIEnginesBadge";

const services = [
  {
    href: "/services/aeo",
    title: "Organic search visibility",
    outcome:
      "Get found when families search — on Google and in AI answers — without paying for every click.",
    body:
      "Families ask ChatGPT, Gemini and Perplexity which home to consider before they ring anyone. We make yours the one they name — and the same work lifts you in normal Google search too. Most agencies do one or the other. We do both, from the same foundation.",
    bullets: [
      "What ChatGPT, Gemini and Perplexity say about you, aligned across CQC, carehome.co.uk and Google",
      "A page per home, per specialism and per town — written to be found by families and quoted by AI",
      "The questions families search at midnight (costs, funding, what to ask) answered on your site",
      "Monthly report of what AI and Google say about you and your rivals",
    ],
    badge: "ai-engines" as const,
  },
  {
    href: "/services/google-ads",
    title: "Paid search visibility",
    outcome: "Show up instantly for the families ready to enquire this week.",
    body:
      "The families who still search the old way are ready to enquire now. We build and run Google Ads per home, per town and per specialism — measured on enquiries and admissions, not clicks.",
    bullets: [
      "Campaigns per home, per town, per specialism",
      "Private-pay intent prioritised over LA-funded",
      "Enquiry tracking through to admission",
      "Transparent reporting your board can read",
    ],
    badge: "google" as const,
  },
];

function ServiceCard({
  service,
  idx,
}: {
  service: (typeof services)[number];
  idx: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <ScrollReveal delay={idx * 120}>
      <Link
        href={service.href}
        ref={ref}
        onMouseMove={onMouseMove}
        className="card spotlight group relative block h-full overflow-hidden p-10"
      >
        {/* Badge sits where the eyebrow tag used to live */}
        <div className="pointer-events-none">
          {service.badge === "google" ? (
            <GooglePartnerBadge className="w-[180px]! sm:w-[210px]!" />
          ) : (
            <AIEnginesBadge className="w-[240px]! sm:w-[280px]!" />
          )}
        </div>

        <h3 className="display mt-6 text-3xl sm:text-4xl">{service.title}</h3>
        <p className="mt-4 max-w-lg text-[15px] font-[500] leading-relaxed text-[color:var(--color-navy)]">
          {service.outcome}
        </p>
        <p className="mt-4 max-w-lg text-[color:var(--color-slate)]">{service.body}</p>
        <ul className="mt-8 space-y-2 text-sm text-[color:var(--color-slate)]">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-center gap-3">
              <span className="h-1 w-1 rounded-full bg-[color:var(--color-sky)]" />
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-10 flex items-center gap-2 text-sm font-medium text-[color:var(--color-sky)] transition-transform duration-300 group-hover:translate-x-1">
          Explore service →
        </div>
      </Link>
    </ScrollReveal>
  );
}

export function ServicesGrid() {
  return (
    <section className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-10">
      <SectionHeader
        eyebrow="Our services"
        title="Two ways families find you."
        description="AI answers and Google rankings are where the shortlist gets written. Paid ads are where the ready-to-enquire families are today. Run either on its own — they compound when you run both."
      />
      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-2">
        {services.map((service, idx) => (
          <ServiceCard key={service.href} service={service} idx={idx} />
        ))}
      </div>
    </section>
  );
}
