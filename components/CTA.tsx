import Link from "next/link";
import { site } from "@/lib/site";
import { ScrollReveal } from "./ScrollReveal";

export function CTA({
  heading = "Ready to be the brand AI recommends?",
  sub = "Book a free 30-minute audit with Ben. We'll show you exactly where your brand is winning - and where it's invisible.",
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
