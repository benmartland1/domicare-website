import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PricingTable } from "@/components/PricingTable";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Published monthly retainers for care homes and care groups. AI search visibility from £950, the combined occupancy programme from £2,450. Three-month minimum, no setup fees.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing · DomiCare",
    description:
      "Monthly retainers from £950. AI search visibility, Google Ads, or both — priced so a single home can start.",
    url: "/pricing",
  },
};

const faqs = [
  {
    question: "Is there a minimum commitment?",
    answer:
      "Three months. Not a lock-in — it is simply how long the record-alignment work takes to show up in AI answers and how long a rebuilt Ads account needs to gather honest conversion data. Rolling after that, 30 days' notice either way.",
  },
  {
    question: "How does pricing work for a group?",
    answer:
      "The occupancy programme covers up to three homes. Beyond that we price per home, and the per-home rate falls as the count rises — the record-alignment and content framework work is largely built once and applied repeatedly. Tell us the number of homes and the catchments and we will give you a flat monthly figure.",
  },
  {
    question: "What is not included?",
    answer:
      "Ad spend, which you pay Google directly. Directory listing fees such as carehome.co.uk, which stay in your name. Photography and video, though we will tell you what you need. And any tools you already pay for.",
  },
  {
    question: "Do you take a percentage of ad spend?",
    answer:
      "No. Percentage-of-spend pricing gives an agency a reason to recommend spending more, which is the wrong incentive when the honest answer for a care home is usually a modest budget spent precisely. Flat monthly fee, whatever you spend.",
  },
  {
    question: "How do we know it is working?",
    answer:
      "From month one you get a monthly report showing what each AI assistant said when asked about care in your catchment, which homes were named, and which sources they quoted. On the Ads side, enquiries and cost per enquiry by home, and cost per admission where you can give us the outcome data. If it is not moving by month three, we will say so before you do.",
  },
  {
    question: "Can we talk before committing?",
    answer:
      "Yes, and most operators do. Book a 30-minute call with Ben. We run the AI visibility check on your home beforehand, so the call starts with what the assistants actually said rather than a slide deck.",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Pricing", url: `${site.url}/pricing` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative isolate overflow-x-clip">
        <div className="absolute inset-0 grid-backdrop" aria-hidden />
        <div
          aria-hidden
          className="glow"
          style={{
            width: 520,
            height: 520,
            background: "var(--color-sky)",
            top: -180,
            left: "-10%",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-6 pb-14 pt-16 lg:px-10 lg:pt-24">
          <ScrollReveal as="span" className="eyebrow">
            Pricing
          </ScrollReveal>
          <ScrollReveal delay={60}>
            <h1 className="display mt-5 text-balance text-[clamp(2.5rem,6vw,5rem)]">
              Published rates.{" "}
              <span className="text-[color:var(--color-sky)]">
                No reveal on the call.
              </span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="mt-8 max-w-2xl text-lg text-[color:var(--color-slate)] sm:text-xl">
              Monthly retainers, three-month minimum, no setup fees. Priced so a single
              independent home can afford to start, and so a group gets the compounding
              benefit of doing it across every location.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing table */}
      <section className="relative mx-auto mt-10 max-w-7xl px-6 pb-6 lg:px-10">
        <PricingTable />
      </section>

      {/* Trust strip under the table */}
      <section className="relative mx-auto mt-6 max-w-7xl px-6 lg:px-10">
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] uppercase tracking-[0.22em] text-[color:var(--color-slate-2)]">
            <span>3-month minimum</span>
            <span className="hidden h-1 w-1 rounded-full bg-[color:var(--color-slate)]/30 sm:block" />
            <span>No setup fees</span>
            <span className="hidden h-1 w-1 rounded-full bg-[color:var(--color-slate)]/30 sm:block" />
            <span>No % of ad spend</span>
            <span className="hidden h-1 w-1 rounded-full bg-[color:var(--color-slate)]/30 sm:block" />
            <span>Rolling after month 3</span>
          </div>
        </ScrollReveal>
      </section>

      {/* Custom quote nudge */}
      <section className="relative mx-auto mt-32 max-w-4xl px-6 lg:px-10">
        <ScrollReveal>
          <div className="rounded-[1.5rem] border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-10 text-center">
            <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-[color:var(--color-sky)]">
              Beyond the ranges
            </div>
            <h2 className="display mt-4 text-balance text-2xl sm:text-3xl">
              Four homes or more? Priced per home.
            </h2>
            <p className="mt-5 text-[color:var(--color-slate)]">
              Groups are quoted as a flat monthly figure based on the number of homes and
              how many distinct catchments they sit in. Tell us the portfolio and we will
              come back within 48 hours with a scope and a number.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href={site.calendly}
                target="_blank"
                rel="noopener"
                className="btn btn-primary"
              >
                Book a call
                <span aria-hidden>→</span>
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Ask a question
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <FAQ items={faqs} heading="The practical stuff." />

      <div className="pb-32" />
    </>
  );
}
