import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SpotlightCard } from "@/components/SpotlightCard";
import { Counter } from "@/components/Counter";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import { BookCallCTA } from "@/components/BookCallCTA";
import { Testimonials } from "@/components/Testimonials";
import { GooglePartnerBadge } from "@/components/ui/GooglePartnerBadge";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Google Ads for Care Homes",
  description:
    "Google Ads built per home, per town and per specialism — aimed at private-pay enquiries and measured on admissions, not clicks. Run by a Google Partner team.",
  alternates: { canonical: "/services/google-ads" },
  openGraph: {
    title: "Google Ads for Care Homes · DomiCare",
    url: "/services/google-ads",
  },
};

const pillars = [
  {
    tag: "Structure",
    title: "One campaign per home, not per group",
    body:
      "A group account with a single national campaign spends your Harrogate budget on Hull. Every home gets its own campaign, its own radius, its own budget and its own bid strategy — because a bed in one home is not interchangeable with a bed sixty miles away.",
  },
  {
    tag: "Intent",
    title: "Private-pay intent, prioritised",
    body:
      "\"Care home near me\" is a mix of families researching, people looking for jobs, and relatives of local-authority-funded residents. The searches that correlate with a self-funded enquiry look different — fee questions, specific specialisms, comparison language. We bid up on those and bid down on the rest.",
  },
  {
    tag: "Specialisms",
    title: "Built around what you are registered for",
    body:
      "Dementia, nursing, residential, respite, palliative, young physical disability. Each is a different search, a different family, a different urgency and a different ad. Homes that run one generic campaign compete with everybody; homes that run five specific ones compete with almost nobody.",
  },
  {
    tag: "Landing",
    title: "Pages that take an enquiry",
    body:
      "The most common reason a care home's ads underperform is that every click lands on a homepage with a phone number in the corner. We build pages per home and per specialism, with fees addressed, the visit booked in two clicks, and a form somebody can complete at midnight.",
  },
  {
    tag: "Response",
    title: "The unglamorous half",
    body:
      "An enquiry that arrives at 7pm on a Friday and gets a call back on Monday afternoon is usually already lost. We look at where the enquiries go, how fast they are answered and what happens next — because it is nearly always cheaper to fix that than to buy more clicks.",
  },
  {
    tag: "Measurement",
    title: "Reported on admissions",
    body:
      "Calls, form enquiries, visits booked, and where we can get the data, admissions. Cost per enquiry and cost per admission by home. Impressions and click-through rate are in the appendix, where they belong.",
  },
];

const faqs = [
  {
    question: "Is Google Ads even allowed for care homes?",
    answer:
      "Yes. Care services are advertised on Google routinely. There are sensible restrictions on how you can target and what you can claim — you cannot make clinical promises, and health-related audience targeting is limited — which is a reason to have someone who knows the rules running it, not a reason to avoid the channel.",
  },
  {
    question: "How much should we spend?",
    answer:
      "Most single homes we work with sit between £600 and £1,500 a month in ad spend, depending on catchment competitiveness. That is deliberately modest, because the maths does not need to be aggressive: at a typical private fee, one additional admission a year pays for several years of that budget. Groups scale it per home rather than pooling it.",
  },
  {
    question: "We tried Google Ads before and got nothing but job applicants.",
    answer:
      "That is the single most common failure we see, and it is a structural problem rather than a bad-luck one. \"Care home jobs\", \"care assistant\", \"carer vacancies\" and dozens of variants share vocabulary with family searches, and a broad-match campaign with no negative list will burn most of its budget on them. Fixing it is unglamorous, mechanical and usually the biggest single improvement in the first month.",
  },
  {
    question: "Do you need access to our existing account?",
    answer:
      "We ask for read access to whatever exists so we can see the history before we propose anything. If the account is salvageable we rebuild inside it and keep the learning; if it is not, we start clean and say so. Either way you own the account and keep it if we part ways — that is non-negotiable on our side.",
  },
  {
    question: "How does this work alongside the AI search side?",
    answer:
      "They cover different halves of the same decision. Ads reach the family who is searching today and ready to enquire this month. AI search work decides whether your home is on the shortlist that gets written before anybody searches at all. Running both means this quarter's enquiries and next year's, and the content built for one feeds the other.",
  },
  {
    question: "What is the minimum commitment?",
    answer:
      "Three months. Not because of a lock-in, but because a rebuilt account needs roughly that long to gather enough conversion data to optimise honestly. Monthly rolling after that.",
  },
];

export default function GoogleAdsPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "Google Ads for care homes",
            description:
              "Google Ads built per home, per town and per specialism, prioritising private-pay enquiry intent, with landing pages built to take an enquiry and reporting measured on enquiries and admissions.",
            url: `${site.url}/services/google-ads`,
            serviceType: "Google Ads management for care providers",
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Google Ads", url: `${site.url}/services/google-ads` },
          ]),
        ]}
      />

      {/* -------------------- HERO -------------------- */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 grid-backdrop" aria-hidden />
        <div
          aria-hidden
          className="glow"
          style={{ width: 520, height: 520, background: "var(--color-sky)", top: -160, left: -120 }}
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 lg:px-10 lg:pt-24">
          <ScrollReveal>
            <GooglePartnerBadge className="w-[200px]! sm:w-[230px]!" />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h1 className="display mt-10 text-balance text-[clamp(2.4rem,5.6vw,4.5rem)]">
              Fill the beds
              <br />
              <span className="text-[color:var(--color-sky)]">you can fill this month.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={140}>
            <p className="mt-8 max-w-2xl text-lg text-[color:var(--color-slate)]">
              Campaigns built per home, per town and per specialism, aimed at the families
              ready to enquire now — and measured on enquiries and admissions rather than
              clicks.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={site.calendly} target="_blank" rel="noopener" className="btn btn-primary">
                Book a call
                <span aria-hidden>→</span>
              </Link>
              <Link href="/pricing" className="btn btn-ghost">
                See pricing
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={260}>
            <div className="mt-16 grid max-w-3xl gap-4 border-t border-[color:var(--color-line)] pt-10 sm:grid-cols-3">
              {[
                { value: 3, prefix: "£", suffix: "M+", label: "Ad spend managed by our team" },
                { value: 5, suffix: " yrs", label: "Running Google Ads accounts" },
                { value: 60, prefix: "£", suffix: "k+", label: "Value of one private resident" },
              ].map((s, i) => (
                <div key={s.label} className="border-l border-[color:var(--color-line)] pl-5">
                  <div className="display text-[2rem] text-[color:var(--color-sky)] sm:text-[2.5rem]">
                    <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[color:var(--color-slate-2)]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* -------------------- PILLARS -------------------- */}
      <section className="relative mx-auto mt-24 max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="How we run it"
          title="Six things we do differently."
          description="None of it is clever. It is the difference between an account built for a care home and an account built from a template."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {pillars.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 70}>
              <SpotlightCard className="card h-full p-8 sm:p-10">
                <span className="inline-flex rounded-full border border-[color:var(--color-line)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[color:var(--color-sky)]">
                  {item.tag}
                </span>
                <h3 className="mt-6 text-2xl font-[600] text-[color:var(--color-navy)]">
                  {item.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--color-slate)]">
                  {item.body}
                </p>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <BookCallCTA eyebrow="Want a second opinion on your account?" label="Book a free review" />

      {/* -------------------- WHY BOTH -------------------- */}
      <section className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Ads and AI search"
          title="Two halves of one decision."
          description="A family does not choose a home in a single session. Ads reach them at the point of enquiry. AI search decides whether you were on the list they started with."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          <ScrollReveal>
            <div className="card h-full p-8 sm:p-10">
              <h3 className="display text-2xl">Google Ads</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--color-slate)]">
                Reaches the family searching this week. Works immediately, costs money every
                month, and stops the day you switch it off. Right answer when you have beds to
                fill now.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={90}>
            <div className="card h-full p-8 sm:p-10">
              <h3 className="display text-2xl">AI search</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--color-slate)]">
                Decides whether you appear in the shortlist an assistant writes before anybody
                searches. Slower to move, compounds, and keeps working. Right answer when you
                want next year to be easier than this one.
              </p>
              <Link
                href="/services/aeo"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-sky)]"
              >
                How the AI search side works
                <span aria-hidden>→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Testimonials />
      <FAQ items={faqs} heading="Google Ads, answered plainly." />
      <CTA
        heading="Get a second opinion on your account."
        sub="Send us read access and we'll tell you what we'd change, whether or not you hire us. Most care home accounts have one structural problem worth more than everything else combined — usually job-seeker traffic."
      />
    </>
  );
}
