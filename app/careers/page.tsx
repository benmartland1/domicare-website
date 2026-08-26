import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "DomiCare hires slowly and rarely. If you know the care sector, or you know AI search, and you want to work on something with an obvious point, we'd like to talk.",
  alternates: { canonical: "/careers" },
};

const principles = [
  {
    title: "Senior only, by design",
    body: "No junior pools. Everyone here owns client work end-to-end. If you want to hide inside a process, this won't fit.",
  },
  {
    title: "Sector knowledge is the edge",
    body: "We would rather teach AI search to someone who has run a home than teach the care sector to a marketer. If you've worked in care and you're curious about the marketing side, talk to us.",
  },
  {
    title: "Remote-first, Manchester-rooted",
    body: "Work from wherever you think best. We meet in Manchester for strategy days every quarter, and we visit clients' homes in person — you cannot write about a home you have never walked into.",
  },
  {
    title: "Fair and transparent pay",
    body: "Fixed bands by role, published internally. No silly bonuses. We share the upside when the business grows.",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 grid-backdrop" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-10 lg:pt-24">
          <ScrollReveal as="span" className="eyebrow">Careers</ScrollReveal>
          <ScrollReveal delay={60}>
            <h1 className="display mt-5 max-w-4xl text-balance text-[clamp(2.5rem,6vw,5rem)]">
Work on something with an obvious point.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="mt-8 max-w-3xl text-lg text-[color:var(--color-slate)] sm:text-xl">
              We hire slowly and rarely. Two kinds of people fit here: operators who know the
              care sector from the inside — a former registered manager, a group marketing lead,
              a placement adviser — and specialists who know AI search, paid media or technical
              SEO and want a single sector to go deep on.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="relative mx-auto mt-16 max-w-7xl px-6 lg:px-10">
        <SectionHeader eyebrow="How we work" title="Four non-negotiables." />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {principles.map((p, i) => (
            <ScrollReveal key={p.title} delay={(i % 2) * 100}>
              <article className="card p-8">
                <h3 className="text-2xl font-[600] text-[color:var(--color-navy)]">{p.title}</h3>
                <div className="hairline mt-4" />
                <p className="mt-4 text-[color:var(--color-slate)]">{p.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-10">
        <div className="card p-10 lg:p-14">
          <ScrollReveal>
            <div className="eyebrow">Current openings</div>
            <h2 className="display mt-4 text-3xl sm:text-4xl">No public roles right now.</h2>
            <p className="mt-5 max-w-2xl text-[color:var(--color-slate)]">
              We hire opportunistically. If you're exceptional at Google Ads, AEO, or you
              think you'd be a great fit for a small senior team, email Ben directly.
              Include work you're proud of.
            </p>
            <div className="mt-8">
              <Link
                href={`mailto:${site.email}?subject=Careers - introduction`}
                className="btn btn-primary"
              >
                Introduce yourself
                <span aria-hidden>→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="pb-32" />
    </>
  );
}
