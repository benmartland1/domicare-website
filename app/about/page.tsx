import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SectionHeader } from "@/components/SectionHeader";
import { CTA } from "@/components/CTA";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

const aboutGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: "DomiCare",
      url: site.url,
      logo: `${site.url}/brand/logo.png`,
      foundingDate: "2026",
      description:
        "DomiCare is a UK marketing agency working exclusively with care homes, nursing homes and care groups. It is the care-sector practice of DomiSearch, a Google Partner search agency founded by Ben Martland in Manchester. DomiCare does two things: organic search visibility, so assistants like ChatGPT and Gemini — and Google itself — name a home when a family asks for care in that area, and paid search visibility through Google Ads aimed at private-pay enquiries.",
      areaServed: { "@type": "Country", name: "United Kingdom" },
      parentOrganization: {
        "@type": "Organization",
        name: site.parent.name,
        url: site.parent.url,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Manchester",
        addressCountry: "GB",
      },
      sameAs: [site.parent.url, site.social.linkedin],
      founder: { "@type": "Person", name: "Ben Martland" },
    },
    {
      "@type": "Person",
      "@id": `${site.url}/about#ben-martland`,
      name: "Ben Martland",
      jobTitle: "Founder",
      worksFor: { "@type": "Organization", name: "DomiCare" },
      url: `${site.url}/about`,
      sameAs: ["https://www.linkedin.com/in/benmartland/"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Manchester",
        addressCountry: "GB",
      },
      description:
        "Ben Martland founded DomiSearch in 2023 and launched DomiCare, its care-sector practice, in 2026. Five years managing Google Ads with over £3M in personally managed spend, Google Partner certified, and two years working on AI search visibility.",
    },
    {
      "@type": "AboutPage",
      name: "About DomiCare",
      url: `${site.url}/about`,
      description:
        "DomiCare is a UK marketing agency for care homes and care groups, specialising in AI search visibility and Google Ads for private-pay enquiries.",
      mainEntity: { "@type": "Organization", name: "DomiCare" },
    },
  ],
};

export const metadata: Metadata = {
  title: "About DomiCare",
  description:
    "DomiCare is a UK marketing agency working only with care homes and care groups. The care-sector practice of DomiSearch, a Google Partner agency founded by Ben Martland in Manchester.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Honest before clever",
    body: "We tell operators what is not working before we tell them what we would do about it. If your problem is a stale Google listing and a phone nobody answers on a Saturday, we will say that rather than sell you a content programme.",
  },
  {
    title: "Nothing that embarrasses you",
    body: "Everything we publish on your behalf should be something you would be comfortable with a resident's daughter reading, and something your registered manager would sign off. Care marketing that oversells is a complaint waiting to happen.",
  },
  {
    title: "Care only",
    body: "We work with care homes, nursing homes and care groups, and nothing else. It is a small market with its own regulator, its own directories and its own buyer, and none of that transfers from another sector.",
  },
  {
    title: "Measured on beds",
    body: "Impressions, rankings and citation counts are diagnostics. The number that matters is enquiries that turn into admissions, and it is the one at the top of the report.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutGraph) }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "About", url: `${site.url}/about` },
        ])}
      />

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 grid-backdrop" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-10 lg:pt-24">
          <ScrollReveal as="span" className="eyebrow">About</ScrollReveal>
          <ScrollReveal delay={60}>
            <h1 className="display mt-5 max-w-4xl text-balance text-[clamp(2.5rem,6vw,5rem)]">
              One sector. The one where the search behaviour changed first.
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="mt-8 max-w-3xl text-lg text-[color:var(--color-slate)] sm:text-xl">
              DomiCare works with care homes, nursing homes and care groups across the UK, and
              with nobody else. We are the care-sector practice of{" "}
              <a
                href={site.parent.url}
                target="_blank"
                rel="noopener"
                className="text-[color:var(--color-navy)] underline underline-offset-4 decoration-[color:var(--color-sky)]/50"
              >
                DomiSearch
              </a>
              , a Google Partner search agency in Manchester.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* -------------------- WHY CARE -------------------- */}
      <section className="relative mx-auto mt-24 max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <ScrollReveal>
            <div className="eyebrow">Why care homes</div>
            <h2 className="display mt-4 text-balance text-4xl sm:text-5xl lg:text-[3.25rem]">
              The decision moved.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div className="space-y-5 text-[color:var(--color-slate)]">
              <p>
                Almost nobody chooses a care home the way the sector's marketing assumes they
                do. The person deciding is usually an adult child in their fifties, often
                working, often at a distance, and frequently doing the research in the days
                after a hospital says their parent cannot go home.
              </p>
              <p>
                That person does not read fourteen websites. They ask an assistant to narrow it
                down, they check the CQC report, they read the reviews on carehome.co.uk, and
                they end up with a shortlist of two or three homes before they ring anyone. If
                you are not on that list, none of your marketing gets a chance to work.
              </p>
              <p>
                We built DomiCare because that shortlist is now written by software reading
                public records — and because the records most homes are being judged on are
                incomplete, inconsistent, or silent about the things they are actually good at.
              </p>
              <p className="text-[color:var(--color-navy)]">
                Fixing that is unglamorous, specific work. It is also the highest-return
                marketing available to most care homes right now.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* -------------------- FOUNDER -------------------- */}
      <section className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <ScrollReveal>
            <div className="relative">
              <div
                aria-hidden
                className="glow"
                style={{
                  width: 360,
                  height: 360,
                  background: "var(--color-sky)",
                  top: -40,
                  left: -40,
                  opacity: 0.22,
                }}
              />
              <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--color-line)] bg-gradient-to-br from-[color:var(--color-surface)] via-[color:var(--color-surface)] to-transparent p-2">
                <div className="relative aspect-square w-full overflow-hidden rounded-[1.6rem] bg-[color:var(--color-canvas)]">
                  <Image
                    src="/brand/founder.png"
                    alt="Ben Martland, Founder of DomiCare"
                    fill
                    sizes="(max-width: 1024px) 100vw, 520px"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal as="span" className="eyebrow">Founder</ScrollReveal>
            <ScrollReveal delay={60}>
              <h2 className="display mt-4 text-3xl sm:text-4xl">Ben Martland</h2>
            </ScrollReveal>
            <ScrollReveal delay={140}>
              <p className="mt-6 max-w-xl text-[color:var(--color-slate)]">
                Ben founded DomiSearch in 2023 after five years running Google Ads in-house and
                agency-side, with over £3M in personally managed spend and Google Partner
                certification. Since 2024 he has worked almost entirely on AI search visibility
                — the question of what assistants say about a business, and why.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="mt-4 max-w-xl text-[color:var(--color-slate)]">
                DomiCare exists because care turned out to be the clearest case he had seen of
                the shift: a high-value, low-frequency, emotionally loaded decision, made under
                time pressure, from public data that most providers have never looked at.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={260}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={site.calendly} target="_blank" rel="noopener" className="btn btn-primary">
                  Book a call →
                </Link>
                <Link href={site.social.linkedin} target="_blank" rel="noopener" className="btn btn-ghost">
                  LinkedIn
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* -------------------- CREDENTIALS + HONESTY -------------------- */}
      <section className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-10">
        <ScrollReveal delay={120}>
          <div className="card p-10">
            <div className="eyebrow">Where we stand today</div>
            <p className="mt-6 max-w-3xl text-[color:var(--color-slate)]">
              DomiCare launched in 2026. We are not going to pretend to a decade of care-sector
              case studies we do not have. What we do have is a team that has been doing this
              work in other sectors for years, and a service designed specifically around how
              care is actually bought.
            </p>
            <ul className="mt-8 grid gap-5 text-[color:var(--color-slate)] sm:grid-cols-2">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-sky)]" />
                <span>
                  <strong className="text-[color:var(--color-navy)]">Google Partner.</strong>{" "}
                  Certified, with £3M+ managed spend behind the team.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-sky)]" />
                <span>
                  <strong className="text-[color:var(--color-navy)]">Two years on AI search.</strong>{" "}
                  Working on assistant visibility since before it had a settled name.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-sky)]" />
                <span>
                  <strong className="text-[color:var(--color-navy)]">Flat monthly fees.</strong>{" "}
                  No percentage of ad spend, no setup fee, no lock-in past month three.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-sky)]" />
                <span>
                  <strong className="text-[color:var(--color-navy)]">No regulator claims.</strong>{" "}
                  We have no affiliation with the CQC and no influence over ratings.
                </span>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium text-[color:var(--color-sky)]">
              <Link
                href="/services/aeo"
                className="inline-flex items-center gap-2 transition-transform duration-300 hover:translate-x-0.5"
              >
                How the AI search work runs <span aria-hidden>→</span>
              </Link>
              <Link
                href="/services/google-ads"
                className="inline-flex items-center gap-2 transition-transform duration-300 hover:translate-x-0.5"
              >
                How we run Google Ads <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-10">
        <SectionHeader eyebrow="How we operate" title="Four things we actually mean." />
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={(i % 2) * 120}>
              <article className="card p-8">
                <h3 className="text-2xl font-[600] text-[color:var(--color-navy)]">{v.title}</h3>
                <div className="hairline mt-4" />
                <p className="mt-4 text-[color:var(--color-slate)]">{v.body}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CTA
        heading="Start with what AI already says about you."
        sub="Book a 30-minute call. We'll run the check on your home beforehand and open with the actual answers — then tell you honestly whether we can improve them."
      />
    </>
  );
}
