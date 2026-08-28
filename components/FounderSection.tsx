import Link from "next/link";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { site } from "@/lib/site";

const credentials = [
  "Five years running Google Ads, £3M+ managed spend",
  "Google Partner",
  "Built the AI search practice at DomiSearch from 2024",
  "Care homes and care groups only — no other verticals",
  "Manchester-based, working across the UK",
];

export function FounderSection() {
  return (
    <section className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
        {/* Portrait / initial slab */}
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
                opacity: 0.25,
              }}
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--color-line)] bg-gradient-to-br from-[color:var(--color-surface)] via-[color:var(--color-surface)] to-transparent p-2">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.6rem] bg-[color:var(--color-canvas)]">
                <Image
                  src="/brand/founder.png"
                  alt="Ben Martland, Founder of DomiCare"
                  fill
                  priority={false}
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover"
                  style={{ objectPosition: "center 15%" }}
                />
                {/* Soft bottom gradient so the caption reads on any photo */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0d1c2e]/90 via-[#0d1c2e]/45 to-transparent"
                />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-[0.22em] text-[#5bbce8]">
                      Founder
                    </div>
                    <div className="mt-1 text-xl font-[600] text-white">
                      Ben Martland
                    </div>
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/70">
                    Manchester, UK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Bio */}
        <div>
          <ScrollReveal as="span" className="eyebrow">
            Meet the founder
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="display mt-4 text-balance text-4xl sm:text-5xl lg:text-[3.25rem]">
              Ben Martland.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[color:var(--color-slate)]">
              I'm Ben. I run DomiSearch, a Google Partner search agency, and I built DomiCare
              because the care sector has a problem the rest of my clients don't: the decision is
              made by a stressed adult child at eleven at night, three weeks before they ever ring
              you. Every account here is personally reviewed by me, every month. No junior pool.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={220}>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[color:var(--color-slate)]">
              I've spent five years running Google Ads and the last two on AI search visibility.
              What changed for care is that the shortlist now gets written by an assistant, from
              CQC records and carehome.co.uk reviews, before a human ever compares two homes. If
              you are not in that answer, you are not in the running.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={280}>
            <ul className="mt-7 grid gap-2 sm:grid-cols-2">
              {credentials.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-3 text-sm text-[color:var(--color-slate)]"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--color-sky)]" />
                  {c}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={340}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={site.calendly} target="_blank" rel="noopener" className="btn btn-primary">
                Book a call
                <span aria-hidden>→</span>
              </Link>
              <Link href="/about" className="btn btn-ghost">
                More about the agency
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
