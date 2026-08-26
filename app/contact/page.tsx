import type { Metadata } from "next";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { contactPageSchema, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to DomiCare about your home or your group. Email, phone, or book a free 30-minute call with Ben — we run the AI visibility check before we speak.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          contactPageSchema(),
          breadcrumbSchema([
            { name: "Home", url: site.url },
            { name: "Contact", url: `${site.url}/contact` },
          ]),
        ]}
      />
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 grid-backdrop" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-10 lg:pt-24">
          <ScrollReveal as="span" className="eyebrow">Get in touch</ScrollReveal>
          <ScrollReveal delay={60}>
            <h1 className="display mt-5 max-w-4xl text-balance text-[clamp(2.5rem,6vw,5rem)]">
              Tell us about
              <br />
              <span className="text-[color:var(--color-sky)]">your home.</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="mt-8 max-w-2xl text-lg text-[color:var(--color-slate)]">
              One home or twelve, we'd like to hear which towns you serve and what you are
              registered for. We reply to every enquiry within one working day.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-7xl px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <ScrollReveal>
            <ContactForm />
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <div className="flex flex-col gap-6">
              <div className="card p-8">
                <div className="eyebrow">Straight to Ben</div>
                <p className="mt-4 text-[color:var(--color-slate)]">
                  Prefer to skip the form? Book a free 30-minute call. We'll run the AI
                  visibility check on your home first, so we open with the actual answers.
                </p>
                <Link
                  href={site.calendly}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-primary mt-6"
                >
                  Book a call
                  <span aria-hidden>→</span>
                </Link>
              </div>

              <div className="card p-8">
                <div className="eyebrow">Direct</div>
                <dl className="mt-5 space-y-4 text-[color:var(--color-slate)]">
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-slate-2)]">Email</dt>
                    <dd className="mt-1">
                      <a className="text-[color:var(--color-navy)] hover:text-[color:var(--color-sky)]" href={`mailto:${site.email}`}>
                        {site.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-slate-2)]">Phone</dt>
                    <dd className="mt-1">
                      <a className="text-[color:var(--color-navy)] hover:text-[color:var(--color-sky)]" href={`tel:${site.phoneHref}`}>
                        {site.phone}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-[0.18em] text-[color:var(--color-slate-2)]">Where</dt>
                    <dd className="mt-1">{site.city}, {site.country}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="pb-32" />
    </>
  );
}
