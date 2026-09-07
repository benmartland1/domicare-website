import type { Metadata } from "next";
import { ScrollReveal } from "@/components/ScrollReveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How DomiCare collects, uses and protects your information.",
  alternates: { canonical: "/privacy" },
};

/**
 * LEGAL — "Last updated" is HARDCODED ON PURPOSE. Update it by hand, and only
 * when the policy actually changes. See the matching note in app/terms/page.tsx
 * for why a rendered `new Date()` here would be a false statement of fact and
 * would destroy the version record.
 */
const LAST_UPDATED = "2026-09-07";

export default function PrivacyPage() {
  return (
    <section className="relative mx-auto max-w-3xl px-6 py-20 lg:px-10">
      <ScrollReveal as="span" className="eyebrow">Legal</ScrollReveal>
      <ScrollReveal delay={60}>
        <h1 className="display mt-4 text-4xl sm:text-5xl">Privacy Policy</h1>
      </ScrollReveal>
      <ScrollReveal delay={140}>
        <div className="prose-dsrc mt-10">
          <p>
            This policy explains how DomiCare collects and uses personal data. We take
            your privacy seriously and only collect what we need to respond to enquiries,
            deliver our services and run our website.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>Information you submit via our contact form, our AI visibility check form, our newsletter form, or via lead forms on platforms such as Facebook and Instagram (name, email, phone number, company, website, message).</li>
            <li>Basic analytics data (pages visited, device type, referrer) via Vercel Analytics and Vercel Speed Insights. These do not set cookies and do not identify you individually.</li>
            <li>If, and only if, you accept advertising cookies: data collected by the Meta pixel about your visit, described in the cookies section below.</li>
            <li>Information exchanged during client engagements, held securely in our internal systems.</li>
          </ul>

          {/* LEGAL: this warning exists because care-sector enquiry forms invite
              people to describe a relative's condition, which is special
              category health data under UK GDPR Art 9. We have no Art 9
              condition for processing it and no systems built to hold it, so the
              site must actively discourage it rather than silently collect it.
              Do not remove this, and do not add form fields that invite it. */}
          <h2>Please do not send us health information</h2>
          <p>
            Our forms are for business enquiries from care providers. Please do not use them
            to send us medical or care details about a named individual — a resident,
            a relative, or a prospective resident. We do not need that information to answer
            an enquiry, we do not ask for it, and we are not set up to hold it. If you send it
            to us anyway, we will delete it once we have dealt with your enquiry.
          </p>

          <h2>How we use it</h2>
          <ul>
            <li>To respond to enquiries and provide proposals.</li>
            <li>To contact you by email or phone about your enquiry.</li>
            <li>To deliver services contracted between us and our clients.</li>
            <li>To send marketing communications, including our monthly newsletter, to people who have subscribed or who have previously enquired about our services.</li>
            <li>To improve our website and understand how visitors use it (in aggregate).</li>
            <li>Where you have accepted advertising cookies, to measure the performance of our advertising.</li>
          </ul>

          <h2>Lawful bases</h2>
          <ul>
            <li><strong>Legitimate interests</strong> — responding to enquiries, marketing our services to past enquirers, and understanding how visitors use our website. You can object to any processing we do on this basis.</li>
            <li><strong>Contract</strong> — delivering the services agreed between us and our clients.</li>
            <li><strong>Consent</strong> — subscribing you to our newsletter, and setting advertising cookies. You can withdraw consent at any time, and withdrawing it is as easy as giving it.</li>
            <li><strong>Legal obligation</strong> — keeping records we are required by law to retain.</li>
          </ul>

          {/* LEGAL: this section must describe the tags that are actually in the
              code. The Meta pixel is in components/MetaPixel.tsx, gated by
              components/CookieConsent.tsx. If a tag is added, removed or
              un-gated, change this section in the same commit. The policy
              previously stated "We do not use third-party tracking cookies"
              while the pixel was loading unconditionally on every page. */}
          <h2>Cookies and similar technologies</h2>
          <p>
            <strong>Essential.</strong> We store your cookie choice on your own device so we do
            not have to ask again. Nothing else is set unless you accept.
          </p>
          <p>
            <strong>Advertising — only with your consent.</strong> If you accept, we load the
            Meta pixel. It sets cookies on your device (including <code>_fbp</code>) and sends
            Meta information about your visit, such as the pages you viewed and whether you
            submitted a form, along with your IP address and browser details. We use it to
            measure whether our advertising works. Nothing is loaded before you accept, and if
            you reject, nothing is loaded at all.
          </p>
          <p>
            You can change your choice at any time using the cookie settings link in the
            footer, or by clearing this site&rsquo;s data in your browser.
          </p>

          <h2>Marketing communications</h2>
          <p>
            We may send marketing emails, including a monthly newsletter, to people who have
            subscribed and to people who have enquired about our services. For subscribers we
            rely on consent; for past enquirers we rely on the &ldquo;soft opt-in&rdquo; under
            PECR and on legitimate interests under UK GDPR.
          </p>
          <p>
            These emails contain AI search industry news, case studies, and information about our
            services.
          </p>
          <p>
            Every email includes an unsubscribe link. Opting out is free and takes effect promptly.
            You can also opt out at any time by emailing {site.email} and we will remove you from
            our marketing list.
          </p>

          <h2>Who we share it with</h2>
          <p>
            We use the following providers. They process data on our behalf under written terms,
            except Meta, which acts as an independent controller for the data the pixel and its
            lead forms collect.
          </p>
          <ul>
            <li><strong>Resend</strong> (Resend, Inc., United States) — delivering contact-form emails, newsletter emails, and storing newsletter subscriber lists.</li>
            <li><strong>Vercel</strong> (Vercel, Inc., United States) — website hosting and cookieless analytics.</li>
            <li><strong>Meta Platforms Ireland Ltd</strong> (Ireland) — the Meta pixel, and lead forms run on Facebook and Instagram. Meta processes this data under its own privacy policy and for its own purposes as well as ours.</li>
            <li><strong>Calendly</strong> (Calendly LLC, United States) — if you book a call with us using the booking link.</li>
          </ul>
          <p>
            Some of these providers are outside the UK. Where personal data is transferred
            internationally, it is protected by the UK International Data Transfer Addendum to
            the EU Standard Contractual Clauses, or by UK adequacy regulations. We do not sell
            personal data.
          </p>

          <h2>Your rights</h2>
          <p>
            Under UK GDPR you have the right to be told what personal data we hold about you and
            to receive a copy of it; to have inaccurate data corrected; to have data erased; to
            restrict or object to how we use it; to receive data you gave us in a portable
            format; and, where we rely on consent, to withdraw that consent at any time. You are
            never required to pay for any of this.
          </p>
          <p>
            Email {site.email} to exercise any of these. We will respond within one month, which
            is the deadline UK GDPR sets.
          </p>
          <p>
            If you are unhappy with how we have handled your data you can complain to the
            Information Commissioner&rsquo;s Office at{" "}
            <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer">
              ico.org.uk/make-a-complaint
            </a>
            , or on 0303 123 1113. We would rather you came to us first, but you do not have to.
          </p>

          <h2>Retention</h2>
          <p>
            We keep contact-form and visibility-check enquiries for 24 months from your last
            contact with us, or longer if they lead to an ongoing client relationship. Newsletter
            subscriber records are kept until you unsubscribe. Client records are kept for six
            years after the engagement ends, which is the period we are required to retain
            business and tax records for. Advertising cookie data is retained by Meta under
            its own retention periods.
          </p>

          <h2>Contact</h2>
          <p>
            The data controller is {site.founder}, trading as {site.name}, a sole trader based in{" "}
            {site.city}, {site.country}.
          </p>
          {/* CONFIRM BEFORE LAUNCH: a full postal address for service is
              required and "Manchester, United Kingdom" is not one. See the
              matching note in app/terms/page.tsx. */}
          <p>
            Questions about privacy? Email {site.email} or write to {site.name}, {site.city},{" "}
            {site.country}.
          </p>

          <p className="text-sm opacity-70">Last updated: {LAST_UPDATED}</p>
        </div>
      </ScrollReveal>
    </section>
  );
}
