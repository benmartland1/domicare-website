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
    title: "AI Search",
    body:
      "Families ask ChatGPT and Gemini which home to consider before they ring anyone. We make your home the one the assistants name, and we show you every month what they actually said.",
    bullets: [
      "Entity clarity across CQC, carehome.co.uk and Google",
      "A machine-readable page per home and per specialism",
      "Content that answers what families actually ask",
      "Monthly report of what AI says about you and your rivals",
    ],
    badge: "ai-engines" as const,
  },
  {
    href: "/services/google-ads",
    title: "Google Ads",
    body:
      "The families who still search the old way are the ones ready to enquire this week. Campaigns built per home and per specialism, measured on enquiries and admissions, not clicks.",
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
        <p className="mt-5 max-w-lg text-[color:var(--color-slate)]">{service.body}</p>
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
        description="AI search is where the shortlist gets made. Google Ads is where the ready-to-enquire families are today. Run either on its own — they compound when you run both."
      />
      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-2">
        {services.map((service, idx) => (
          <ServiceCard key={service.href} service={service} idx={idx} />
        ))}
      </div>
    </section>
  );
}
