import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you use the DomiCare website.",
  alternates: { canonical: "/terms" },
};

/**
 * LEGAL — "Last updated" is HARDCODED ON PURPOSE. UPDATE IT BY HAND, AND ONLY
 * WHEN THE TERMS ACTUALLY CHANGE.
 *
 * This previously rendered `new Date()`, which restamped the document to the
 * current date on every single page load. That is a false statement of fact on
 * every day the terms did not change, and it destroys the only record of which
 * version of the terms applied on the date a given client agreed to them —
 * exactly the question that matters in a dispute. Do not reintroduce a dynamic
 * date here or on /privacy.
 */
const LAST_UPDATED = "2026-09-07";

export default function TermsPage() {
  return (
    <section className="relative mx-auto max-w-3xl px-6 py-20 lg:px-10">
      <ScrollReveal as="span" className="eyebrow">Legal</ScrollReveal>
      <ScrollReveal delay={60}>
        <h1 className="display mt-4 text-4xl sm:text-5xl">Terms of Service</h1>
      </ScrollReveal>
      <ScrollReveal delay={140}>
        <div className="prose-dsrc mt-10">
          <p>
            These terms apply to your use of domicare.ai. Client engagements are governed by a
            separate Master Services Agreement.
          </p>

          <h2>Use of this site</h2>
          <p>
            You may use this site to learn about DomiCare, request information, and read our
            publications. You may not attempt to interfere with the site, scrape content at scale
            without permission, or misuse any form on the site.
          </p>

          <h2>Content</h2>
          <p>
            Content on this site is © DomiCare unless credited otherwise. You may quote
            short excerpts with attribution and a link back. Commercial republication requires
            our written consent.
          </p>

          <h2>No warranty on editorial content</h2>
          <p>
            Our blog and marketing content is for general information. It is not a substitute for
            tailored advice for your specific business.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, DomiCare's liability for use of this
            website is limited to £100. Nothing in these terms excludes liability for death,
            personal injury or fraud.
          </p>

          <h2>Governing law</h2>
          <p>These terms are governed by the laws of England and Wales.</p>

          <h2>Who you are contracting with</h2>
          {/* LEGAL: required disclosure, not decoration. The Electronic Commerce
              (EC Directive) Regulations 2002 reg 6 require a service provider to
              give its name, geographic address and email address in a form that
              is easily and permanently accessible. Where a sole trader trades
              under a business name, Companies Act 2006 s.1202-1204 additionally
              require the individual's name and an address at which documents can
              be served. "Manchester, United Kingdom" is not an address for
              service — the full one still needs to go in below. */}
          {/* LEGAL: VAT position confirmed — not VAT-registered, so fees carry
              no VAT. Stated here and on /pricing. If registration becomes
              compulsory (£90,000 rolling turnover) both have to change. */}
          <p>
            This site is operated by {site.founder}, trading as {site.name}, a sole trader
            established in the United Kingdom. {site.name} is not registered for VAT, so no
            VAT is charged on our fees.
          </p>
          <p>
            Email {site.email} · {site.city}, {site.country}
          </p>

          <p className="text-sm opacity-70">Last updated: {LAST_UPDATED}</p>
        </div>
      </ScrollReveal>
    </section>
  );
}
