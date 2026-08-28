// Canonicalise to the apex domain. Vercel serves domicare.ai as primary, so all
// schema, sitemap and canonical URLs must agree on the no-www form.
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://domicare.ai";
const canonicalUrl = rawUrl.replace(/^https?:\/\/www\.domicare\.ai/, "https://domicare.ai");

export const site = {
  name: "DomiCare",
  legalName: "DomiCare",
  /** The brand DomiCare is built out of. Shown, not hidden — it is the proof. */
  parent: {
    name: "DomiSearch",
    url: "https://www.domisearch.com",
    blurb: "DomiCare is the care-sector practice of DomiSearch, a Google Partner search agency.",
  },
  tagline: "Be the care home AI recommends.",
  description:
    "DomiCare makes care homes and care groups the provider AI assistants name when a family asks where to place their mum or dad. Organic and paid search visibility, built for private-pay enquiries.",
  url: canonicalUrl,
  /**
   * Deliberately a domisearch.com address. domicare.ai has no mailbox and no MX
   * records, so anything published as @domicare.ai bounces silently — including
   * mail sent by people and AI assistants reading it out of llms.txt. Publishing
   * the DomiSearch address was chosen over setting up forwarding. Do not switch
   * this back to @domicare.ai without first confirming MX records resolve.
   */
  email: "hi@domisearch.com",
  phone: "+44 7980 920 659",
  phoneHref: "+447980920659",
  whatsappHref: "https://wa.me/447980920659",
  city: "Manchester",
  country: "United Kingdom",
  calendly: "https://calendly.com/domisearch/discovery-call",
  founder: "Ben Martland",
  social: {
    linkedin: "https://www.linkedin.com/company/domisearch",
    x: "https://x.com/domisearch",
  },
  nav: [
    { label: "Organic search", href: "/services/aeo" },
    { label: "Paid search", href: "/services/google-ads" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  /**
   * The sources AI assistants actually pull from when someone asks about a care
   * home. Referenced across the AEO page, the homepage and llms.txt, so it
   * lives here rather than being restated three times.
   */
  citationSources: [
    "CQC provider and location records",
    "carehome.co.uk listings and reviews",
    "Google Business Profile and Google reviews",
    "Local press and community directories",
    "Your own website, if it is readable to a machine",
  ],
} as const;

export type Site = typeof site;
