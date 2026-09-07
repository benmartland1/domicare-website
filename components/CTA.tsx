import Link from "next/link";
import { site } from "@/lib/site";
import { ScrollReveal } from "./ScrollReveal";

export function CTA({
  // These defaults are unused today (every caller passes its own copy) but they
  // were leftover DomiSearch wording offering a "free 30-minute audit", where
  // the rest of this site offers a free 30-minute call. Kept aligned so an
  // accidental default render does not promise a different thing.
  heading = "Ready to be the care home AI recommends?",
  sub = "Book a free 30-minute call with Ben. We'll show you where your home already shows up in AI answers - and where it does not.",
}: { heading?: string; sub?: string } = {}) {
  return (
    <section className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-10">
      <div className="on-navy relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2a4e7d] via-[#1f3a5f] to-[#162e4d] p-10 sm:p-16">
        <div
          aria-hidden
          className="glow"
          style={{ width: 460, height: 460, background: "#29a8e0", top: -110, right: -90 }}
        />
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <ScrollReveal>
            <h2 className="display text-balance text-4xl sm:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="mt-5 max-w-xl text-lg text-[color:var(--color-slate)]">{sub}</p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href={site.calendly} target="_blank" rel="noopener" className="btn btn-primary">
                Book a call
                <span aria-hidden>→</span>
              </Link>
              <Link href="/contact" className="btn btn-ghost">Contact us</Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
