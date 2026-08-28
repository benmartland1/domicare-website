# DomiCare

Marketing site for **DomiCare** (domicare.ai) — AI search visibility (AEO) and Google
Ads for UK care homes and care groups. DomiCare is the care-sector practice of
[DomiSearch](https://www.domisearch.com).

Next.js 15 (App Router) · React 19 · Tailwind CSS v4 · deployed on Vercel.

## Relationship to the DomiSearch site

This codebase started as a copy of the DomiSearch site and shares its component
vocabulary, but it is a **separate repository and a separate Vercel project**.
The two do not share code at runtime. A fix to a shared-looking component in one
repo does not reach the other — apply it twice, deliberately.

If a third Domi\* brand ever appears, that is the point to stop copying and
extract a shared package.

## Brand

The palette is sampled directly from the logo files, not approximated:

| Token | Value | Use |
| --- | --- | --- |
| `--color-canvas` | `#f7fbfd` | Page ground — the logo's own background |
| `--color-navy` | `#1f3a5f` | Wordmark, headings, dark bands |
| `--color-sky` | `#29a8e0` | Primary accent — the brightest dot in the mark |
| `--color-ocean` | `#2e6da8` | Links, eyebrows |
| `--color-slate` | `#445b76` | Body text |
| `--color-line` | `rgba(31,58,95,.13)` | Every hairline and divider |

The site is light throughout with a small number of navy bands (`.on-navy`),
currently the closing CTA, the newsletter card and the footer.

> **`.on-navy` gotcha:** the class redefines `--color-navy` for its children, so
> it must paint its own background with a literal hex. A custom property
> redefined in a rule resolves to its *new* value inside that same rule.

Logo artwork lives in `public/brand/`. `logo.png` is for pale surfaces;
`logo-reverse.png` steps the orbit ramp up so the mark still reads on navy.
Both are generated from the source files in `DomiCare Branding` — regenerate
rather than hand-editing.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
```

Copy `.env.example` to `.env.local` and fill in what you need. Everything is
optional for local development; the contact form and the visibility tool just
degrade rather than crash.

## Content

Blog posts are MDX files in `content/blog/`, with frontmatter matching
`PostFrontmatter` in `lib/blog.ts`. `status: published` is required for a post to
appear. There is no CMS on this deployment — the DomiSearch CMS was deliberately
left out to keep the first release simple.

## Things to set before launch

- [ ] **Confirm pricing.** The tiers in `components/PricingTable.tsx` are marked
      provisional. They are referenced from the homepage FAQ, the pricing page
      FAQ and the homepage JSON-LD — change all four together.
- [ ] Point `domicare.ai` at a new Vercel project and set `NEXT_PUBLIC_SITE_URL`.
- [x] **Email decided.** Website mail sends from and delivers to the
      `domisearch.com` domain, which is verified in Resend and has MX records.
      The `domicare.ai` domain has neither, so no address on it is used or
      published anywhere — `site.email` carries the reasoning.
- [ ] Create a DomiCare Calendly link (currently pointing at the DomiSearch one
      via `site.calendly`).
- [ ] Replace the DomiSearch testimonials in `components/Testimonials.tsx` with
      care-sector ones as soon as there are any.
- [ ] Decide whether `/visibility` (internal, noindex) should stay on this
      deployment.
