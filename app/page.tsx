import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ProcessSteps } from "@/components/ProcessSteps";
import { FounderSection } from "@/components/FounderSection";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { PricingTable } from "@/components/PricingTable";
import { SectionHeader } from "@/components/SectionHeader";
import { ScrollReveal } from "@/components/ScrollReveal";
import { PromptBoard } from "@/components/verticals/PromptBoard";
import { PromptTicker } from "@/components/verticals/PromptTicker";
import { FAQ } from "@/components/FAQ";
import { faqSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Search Visibility for Care Homes | DomiCare",
  description:
    "Families ask ChatGPT which care home to consider before they ring anyone. DomiCare makes your home the one AI names — and runs the Google Ads that fill the beds families are searching for today.",
  alternates: { canonical: "/" },
};

const homeFaqs = [
  {
    question: "How do families use AI to choose a care home?",
    answer:
      "They ask an assistant like ChatGPT, Gemini or Copilot a plain question — 'best dementia care home near Preston', 'how much does a nursing home cost in Kent', 'is this home any good'. The assistant answers by reading CQC records, carehome.co.uk listings and reviews, Google Business Profile and the home's own website, then names two or three homes. That shortlist is now often written before a family speaks to anybody.",
  },
  {
    question: "What is AEO, and why does it matter for a care home?",
    answer:
      "AEO — Answer Engine Optimisation — is the work of making sure AI assistants can read, trust and quote your home when they answer a family's question. For a care home it mostly means three things: your CQC record, your carehome.co.uk listing, your Google profile and your website all say the same thing about who you are and what you do; your specialisms are stated explicitly rather than implied; and the questions families ask are answered somewhere a machine can find them.",
  },
  {
    question: "What does DomiCare actually do?",
    answer:
      "Two things. Organic search visibility: auditing what assistants and Google currently say about your home, aligning your records across CQC, carehome.co.uk and Google, rebuilding your site so AI assistants and Google can read and quote it, publishing pages that answer real family questions, and reporting monthly on what the assistants say about you and your competitors. And paid search visibility: Google Ads campaigns built per home, per town and per specialism, aimed at private-pay enquiries and measured on enquiries and admissions rather than clicks.",
  },
  {
    question: "How much does DomiCare cost?",
    answer:
      "Organic search visibility for a single home is £950 a month. Paid search visibility (Google Ads) on its own is £1,500 a month plus your ad spend. The occupancy programme — organic plus paid search visibility, covering up to three homes — is £2,450 a month, the same as buying both channels for a single home. Groups of four or more homes are priced per home. Monthly retainers, three-month minimum, no setup fee.",
  },
  {
    question: "Is one extra resident really worth the fee?",
    answer:
      "Private residential fees in the UK typically run £1,200 to £1,600 a week, so one self-funded resident is worth roughly £60,000 to £83,000 a year. A single additional private admission covers a year of the entry retainer several times over. That is the whole commercial case, and it is why we report on admissions rather than impressions.",
  },
  {
    question: "Do you work with care groups as well as single homes?",
    answer:
      "Both. Single independent homes, small groups of two to ten, and regional groups. Groups get the bigger benefit, because the record-alignment work compounds across every location and the same content framework can be applied per home and per catchment.",
  },
  {
    question: "Are you affiliated with the CQC?",
    answer:
      "No. DomiCare is a marketing agency. We do not provide care, we do not place residents, and we have no affiliation with the Care Quality Commission or any other regulator. We work with what is already on the public record — we never alter or influence a rating.",
  },
  {
    question: "Who runs DomiCare?",
    answer:
      "DomiCare is led by Ben Martland and is the care-sector practice of DomiSearch, a Google Partner search agency based in Manchester with over £3M in managed ad spend. DomiCare works only with care homes and care groups.",
  },
];

/** Real questions families type, used for the ticker and for the FAQ framing. */
const FAMILY_PROMPTS = [
  { q: "best dementia care home near Preston", engine: "ChatGPT" as const },
  { q: "how much does a nursing home cost per week UK", engine: "Gemini" as const },
  { q: "care homes in Harrogate with good CQC ratings", engine: "ChatGPT" as const },
  { q: "residential vs nursing home — which does mum need", engine: "Perplexity" as const },
  { q: "care home that takes respite for two weeks near me", engine: "ChatGPT" as const },
  { q: "what questions should I ask when visiting a care home", engine: "Copilot" as const },
];

function stripContext<T extends { "@context"?: unknown }>(obj: T) {
  const { "@context": _context, ...rest } = obj;
  return rest;
}

const homeGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/brand/logo.png`,
        width: 1200,
        height: 300,
      },
      image: `${site.url}/brand/logo.png`,
      description:
        "DomiCare is a UK marketing agency working exclusively with care homes and care groups. Organic and paid search visibility, built to produce private-pay enquiries and admissions.",
      slogan: site.tagline,
      parentOrganization: {
        "@type": "Organization",
        name: site.parent.name,
        url: site.parent.url,
      },
      founder: {
        "@type": "Person",
        name: site.founder,
        url: `${site.url}/about`,
        jobTitle: "Founder",
        worksFor: { "@id": `${site.url}/#organization` },
      },
      foundingDate: "2026",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Manchester",
        addressRegion: "Greater Manchester",
        addressCountry: "GB",
      },
      areaServed: { "@type": "Country", name: "United Kingdom" },
      knowsAbout: [
        "Answer Engine Optimisation for care providers",
        "Care home occupancy and private-pay enquiry generation",
        "CQC and carehome.co.uk record consistency",
        "Google Ads for regulated care services",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: site.email,
          telephone: "+44-7980-920-659",
          url: `${site.url}/contact`,
          availableLanguage: "en-GB",
          areaServed: "GB",
        },
        {
          "@type": "ContactPoint",
          contactType: "sales",
          url: site.calendly,
          availableLanguage: "en-GB",
        },
      ],
      sameAs: [site.parent.url, site.social.linkedin],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "DomiCare Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Organic search visibility for care homes",
              url: `${site.url}/services/aeo`,
              description:
                "Entity clarity across CQC, carehome.co.uk and Google Business Profile, schema markup, machine-readable home and specialism pages, and monthly reporting on what AI assistants say about your home. £950/month.",
              provider: { "@id": `${site.url}/#organization` },
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              price: "950",
              priceCurrency: "GBP",
              unitText: "month",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Occupancy Programme",
              url: `${site.url}/pricing`,
              description:
                "Organic and paid search visibility run as one strategy across up to three homes, reported on enquiries and admissions. £2,450/month, covering up to three homes.",
              provider: { "@id": `${site.url}/#organization` },
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              price: "2450",
              priceCurrency: "GBP",
              unitText: "month",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Paid search visibility (Google Ads) for care homes",
              url: `${site.url}/services/google-ads`,
              description:
                "Google Ads built per home, per town and per specialism, prioritising private-pay enquiry intent and measured through to admission. £1,500/month plus ad spend.",
              provider: { "@id": `${site.url}/#organization` },
            },
            priceSpecification: {
              "@type": "PriceSpecification",
              price: "1500",
              priceCurrency: "GBP",
              unitText: "month",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: "Organic and paid search visibility for UK care homes and care groups.",
      publisher: { "@id": `${site.url}/#organization` },
      inLanguage: "en-GB",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${site.url}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${site.url}/#webpage`,
      url: site.url,
      name: "AI Search Visibility for Care Homes | DomiCare",
      description:
        "DomiCare makes your care home the one AI assistants name when a family asks where to place their mum or dad.",
      isPartOf: { "@id": `${site.url}/#website` },
      about: { "@id": `${site.url}/#organization` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${site.url}/brand/logo.png`,
      },
      inLanguage: "en-GB",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        ],
      },
    },
    stripContext(faqSchema(homeFaqs)),
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeGraph) }}
      />
      <Hero />

      <section className="relative mx-auto mt-24 max-w-7xl px-6 lg:mt-32 lg:px-10">
        <SectionHeader
          eyebrow="What families are asking"
          title="The shortlist is written before you hear from anyone."
          description="These are the questions being typed into assistants right now. Whichever homes get named in the answers are the ones that get the visit."
        />
        <div className="mt-12">
          <PromptBoard />
        </div>
        <ScrollReveal delay={120}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-[color:var(--color-slate-2)]">
            You cannot see any of this in Google Analytics. There is no click, no referrer and
            no impression — just a family that either heard your name or did not.
          </p>
        </ScrollReveal>
      </section>

      <ServicesGrid />
      <ProcessSteps />

      <section className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-10">
        <SectionHeader
          eyebrow="Pricing"
          title="Published rates. See the price before you book."
          description="Monthly retainers, three-month minimum, no setup fees. Priced so a single home can afford to start and a group gets the compounding benefit."
        />
        <div className="mt-14">
          <PricingTable />
        </div>
      </section>

      <FounderSection />
      <Testimonials showBookCall />
      <FAQ items={homeFaqs} heading="Questions care operators ask us." />
      {/* Fixed-position toast, shown once per session. Mounted last so it sits
          above the footer rather than inside a section. */}
      <PromptTicker prompts={FAMILY_PROMPTS} storageKey="domicare-prompt-ticker-seen" />
      <CTA
        heading="Find out what AI says about your home."
        sub="Book a free 30-minute call with Ben. Before it, we'll ask the assistants about your home the way a family would, and bring you the actual answers — including which of your competitors gets named instead of you."
      />
    </>
  );
}
