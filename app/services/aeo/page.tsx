import type { Metadata } from "next";
import Image from "next/image";
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
import { AIEnginesBadge } from "@/components/ui/AIEnginesBadge";
import { AISearchDemo } from "@/components/verticals/AISearchDemo";
import { serviceSchema, faqSchema, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Search Visibility for Care Homes",
  description:
    "Families ask ChatGPT, Gemini and Copilot which care home to consider. We make your home the one they name — by fixing your CQC, carehome.co.uk and Google records, and publishing what families actually search for.",
  alternates: { canonical: "/services/aeo" },
  openGraph: {
    title: "AI Search Visibility for Care Homes · DomiCare",
    url: "/services/aeo",
  },
};

/* -------------------------------------------------------------------------- */
/*  Content                                                                    */
/* -------------------------------------------------------------------------- */

const DEMO_QUERY = "care home in Harrogate that takes nursing and dementia";

const DEMO_ANSWER = [
  { text: "In Harrogate, the home most often mentioned for combined nursing and dementia care is" },
  { text: "Your Home", brand: true },
  {
    text: ". Their CQC report highlights a stable staff team, and recent family reviews single out the dementia unit specifically.",
  },
];

const DEMO_SOURCES = ["cqc.org.uk", "carehome.co.uk", "yourhome.co.uk"];

const DEMO_RESULTS = [
  { name: "Your Home", meta: "Nursing · dementia · Harrogate", you: true },
  { name: "A local independent", meta: "Residential · North Yorkshire", you: false },
  { name: "A national group", meta: "Multi-site · UK-wide", you: false },
];

/**
 * The six workstreams. Ordered by how much they move the needle for a care
 * home, which is not the same order as for a normal business — record
 * consistency comes first here because the regulator's data outranks yours.
 */
const whatWeDo = [
  {
    tag: "Records",
    title: "CQC and directory alignment",
    body:
      "An assistant answering a family's question trusts your CQC record and your carehome.co.uk listing more than it trusts your website. When those disagree with each other about your bed numbers, your registration or even the spelling of your name, the assistant hedges and names somebody else. We get all four sources — CQC, carehome.co.uk, Google Business Profile and your own site — telling one story.",
  },
  {
    tag: "Specialisms",
    title: "Saying what you actually do",
    body:
      "\"We provide person-centred care in a homely environment\" tells a machine nothing. Dementia, nursing, residential, respite, palliative, young physical disability, bariatric — if you take it, it needs to be stated in words a model can match to a family's question. This alone moves homes into answers they were never in.",
  },
  {
    tag: "Technical",
    title: "Schema and machine-readable pages",
    body:
      "Structured markup that states, in code, that you are a residential care facility at a specific address, with these registrations, these specialisms and these fees. Plus llms.txt, so assistants that look for a summary of your site find one you wrote rather than one they guessed.",
  },
  {
    tag: "Questions",
    title: "The midnight questions",
    body:
      "What does it cost. What happens to the house. What is the difference between residential and nursing. What should I ask when I visit. Can mum bring the cat. We research the questions families in your catchment actually ask, then answer them properly on your site — which is also exactly the content assistants quote.",
  },
  {
    tag: "Local",
    title: "Google Business Profile per home",
    body:
      "Google's AI answers pull heavily from Business Profiles. Wrong category, empty Q&A, no services listed, photos from 2019 — that is a home that does not exist as far as an AI recommendation is concerned. One profile per home, properly built, with a monthly post cadence.",
  },
  {
    tag: "Reviews",
    title: "Review substance, not review count",
    body:
      "Assistants quote what reviews say, not how many stars you have. A wall of \"lovely staff\" is invisible; a review that names the dementia unit and describes the transition is quotable. We help you ask for reviews in a way that produces the second kind — never incentivised, never written for families.",
  },
];

const engines = [
  { name: "ChatGPT", src: "/engines/chatgpt.png" },
  { name: "Gemini", src: "/engines/gemini.png" },
  { name: "Perplexity", src: "/engines/perplexity.png" },
  { name: "Claude", src: "/engines/claude.png" },
  { name: "Copilot", src: "/engines/copilot.png" },
  { name: "Google AI Overviews", src: "/engines/google.png" },
];

const faqs = [
  {
    question: "Do families really use ChatGPT to choose a care home?",
    answer:
      "Enough of them that it changes your enquiry mix, and the number rises every quarter. The people placing a parent are typically 45 to 65, already use assistants at work, and are researching under time pressure — often after a hospital discharge with days rather than months to decide. That is exactly the situation where someone asks a machine to narrow it down rather than reading fourteen websites.",
  },
  {
    question: "Where do AI assistants get their information about my home?",
    answer:
      "Mostly from your CQC provider and location records, your carehome.co.uk listing and its reviews, your Google Business Profile and reviews, local press, and your own website if it is readable to a machine. Your website is usually the weakest of those, which is why fixing it in isolation rarely works.",
  },
  {
    question: "Can you improve our CQC rating?",
    answer:
      "No, and anyone who says they can is lying to you. We have no involvement in ratings and no affiliation with the CQC. What we do is make sure the record that already exists is complete, consistent with your other listings, and readable — and that your genuine strengths are stated somewhere an assistant can find them.",
  },
  {
    question: "How is this different from SEO?",
    answer:
      "Perhaps 70% of the underlying work overlaps — clean site structure, real content, accurate local data. The difference is what you are optimising for. SEO tries to place a link on a results page. This tries to get your home named inside a conversational answer, where there is no page of ten options to scroll. It also means working on sources you do not own, like your CQC and carehome.co.uk records, which classic SEO ignores.",
  },
  {
    question: "How long before we see anything?",
    answer:
      "Record and schema fixes tend to show up in assistant answers within four to eight weeks, because they are corrections rather than reputation building. Content-driven movement takes three to six months. We report what the assistants say every month from month one, so you can see the direction well before the enquiries change.",
  },
  {
    question: "How do you measure it?",
    answer:
      "We track a set of prompts a real family in your catchment would type — by town, by specialism, by funding type — and re-run them monthly across ChatGPT, Gemini, Perplexity, Copilot, Claude and Google AI Overviews. You get how often you were named, what was said about you, which competitors were named instead, and which sources the assistant cited to get there.",
  },
  {
    question: "We are a group with twelve homes. Does this scale?",
    answer:
      "It works better at group scale. The record-alignment work is largely mechanical and compounds across every location, the content framework is built once and applied per home and per catchment, and the reporting gives you a like-for-like visibility comparison between your own homes — which usually tells you something about the homes themselves, not just the marketing.",
  },
  {
    question: "Is any of this something we could do ourselves?",
    answer:
      "Some of it, genuinely. Auditing your own CQC and Google listings for accuracy costs nothing but an afternoon, and it is worth doing whether or not you hire anybody. The parts that need us are the cross-engine tracking, the schema work, and knowing which of the fifty possible fixes are the three that matter for your homes.",
  },
];

export default function AEOPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            name: "AI Search Visibility for care homes",
            description:
              "Entity clarity across CQC, carehome.co.uk and Google Business Profile, schema markup, machine-readable home and specialism pages, and monthly reporting on what ChatGPT, Gemini, Perplexity, Copilot, Claude and Google AI Overviews say about your home.",
            url: `${site.url}/services/aeo`,
            serviceType: "AI search optimisation for care providers",
          }),
          faqSchema(faqs),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "AI Search", url: `${site.url}/services/aeo` },
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
        <div
          aria-hidden
          className="glow"
          style={{
            width: 480,
            height: 480,
            background: "var(--color-ocean)",
            bottom: -220,
            right: -140,
            opacity: 0.45,
          }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:pt-24">
          <div>
            <ScrollReveal>
              <AIEnginesBadge className="w-[240px]! sm:w-[280px]!" />
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h1 className="display mt-10 text-balance text-[clamp(2.4rem,5.4vw,4.25rem)]">
                Be the home
                <br />
                <span className="text-[color:var(--color-sky)]">AI recommends.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <p className="mt-8 max-w-2xl text-lg text-[color:var(--color-slate)]">
                A family sits down at eleven at night and asks an assistant which home to look
                at. It answers from{" "}
                <strong className="text-[color:var(--color-navy)]">
                  your CQC record, your carehome.co.uk listing, your Google profile
                </strong>{" "}
                and your website — and names two or three homes. We make sure one of them is
                yours.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href={site.calendly} target="_blank" rel="noopener" className="btn btn-primary">
                  Book a call
                  <span aria-hidden>→</span>
                </Link>
                <Link href="/contact" className="btn btn-ghost">
                  Get a free visibility check
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={260}>
              <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[color:var(--color-slate-2)]">
                Care homes only · UK · Google Partner team
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={160}>
            <div className="mx-auto w-full max-w-[560px] lg:justify-self-end">
              <AISearchDemo
                query={DEMO_QUERY}
                answerParts={DEMO_ANSWER}
                sources={DEMO_SOURCES}
                results={DEMO_RESULTS}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* -------------------- THE SHIFT -------------------- */}
      <section className="relative mx-auto mt-16 max-w-7xl px-6 lg:px-10">
        <ScrollReveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-[color:var(--color-sky)]/70" />
            <span className="eyebrow">Why this is happening now</span>
          </div>
        </ScrollReveal>
        <div className="mt-10 grid gap-4 border-t border-[color:var(--color-line)] pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              value: 60,
              suffix: "%+",
              label: "Of searches now end without a click",
              source: "Digital Bloom, 2025",
            },
            {
              value: 61,
              prefix: "−",
              suffix: "%",
              label: "Organic click-through where an AI Overview appears",
              source: "Dataslayer, 2026",
            },
            {
              value: 60,
              prefix: "£",
              suffix: "k+",
              label: "Annual value of one private resident",
              source: "Typical UK private fee",
            },
            {
              value: 3,
              label: "Homes named in a typical assistant answer",
              source: "Our own prompt testing",
            },
          ].map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 80}>
              <div className="h-full border-l border-[color:var(--color-line)] pl-5">
                <div className="display text-[2.25rem] text-[color:var(--color-sky)] sm:text-[2.75rem]">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-slate)]">
                  {s.label}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-slate-2)]">
                  {s.source}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={340}>
          <p className="mt-10 max-w-3xl text-[15px] leading-relaxed text-[color:var(--color-slate)]">
            None of this shows up in your analytics. There is no click to attribute and no
            keyword to report. The only visible symptom is that enquiries arrive already
            comparing you to two homes you have never heard a family mention before.
          </p>
        </ScrollReveal>
      </section>

      {/* -------------------- WHAT WE DO -------------------- */}
      <section className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="The work"
          title="Six workstreams, in this order."
          description="Ordered by what actually moves a care home into an AI answer. Most agencies start at the bottom of this list. The regulator's data outranks your website, so we start there."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {whatWeDo.map((item, i) => (
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

      <BookCallCTA eyebrow="Not sure where you stand?" label="Get a free visibility check" />

      {/* -------------------- COVERAGE -------------------- */}
      <section className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Coverage"
          title="Six engines, tracked monthly."
          description="We ask each of these the questions a family in your catchment would ask, record what comes back, and show you the answer verbatim — including which competitor was named instead of you."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {engines.map((engine, i) => (
            <ScrollReveal key={engine.name} delay={i * 60}>
              <div className="card flex items-center gap-4 p-6">
                <Image
                  src={engine.src}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 shrink-0 object-contain"
                />
                <span className="text-[15px] font-[500] text-[color:var(--color-navy)]">
                  {engine.name}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={260}>
          <div className="mt-10 grid gap-4 sm:grid-cols-4">
            {[
              { label: "Prompts tracked / month", value: "60–120" },
              { label: "Engines covered", value: "6" },
              { label: "Re-runs per prompt", value: "20+" },
              { label: "Competitors benchmarked", value: "3 local" },
            ].map((m) => (
              <div key={m.label} className="border-l border-[color:var(--color-line)] pl-5">
                <div className="display text-2xl text-[color:var(--color-navy)]">{m.value}</div>
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-[color:var(--color-slate-2)]">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* -------------------- BOUNDARIES -------------------- */}
      <section className="relative mx-auto mt-32 max-w-4xl px-6 lg:px-10">
        <ScrollReveal>
          <div className="card p-8 sm:p-12">
            <span className="eyebrow">What we will not do</span>
            <h2 className="display mt-4 text-3xl sm:text-4xl">The lines we hold.</h2>
            <ul className="mt-8 space-y-5 text-[15px] leading-relaxed text-[color:var(--color-slate)]">
              {[
                "We do not touch CQC ratings, and we have no relationship with the regulator. We work with the record as published.",
                "We do not write or incentivise reviews, and we will not help you get around a directory's review policy.",
                "We do not claim outcomes for your residents, and we will not write copy that implies clinical results.",
                "We do not run campaigns aimed at people in crisis in a way we would be uncomfortable explaining to the family involved.",
              ].map((line) => (
                <li key={line} className="flex gap-4">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-sky)]" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-[color:var(--color-slate-2)]">
              This is a regulated sector selling to people at the worst point of their year.
              The marketing has to be able to survive being read aloud by the family.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <Testimonials />
      <FAQ items={faqs} heading="AI search, answered plainly." />
      <CTA
        heading="See what AI says about your home."
        sub="We'll run the check before we speak — the same questions a family in your area would ask — and bring you the answers, including which homes get named instead of yours."
      />
    </>
  );
}
