"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/lib/site";
import { Counter } from "./Counter";
import { VisibilityCheckForm } from "./VisibilityCheckForm";
import { GooglePartnerBadge } from "./ui/GooglePartnerBadge";
import { AISearchDemo } from "./verticals/AISearchDemo";

/**
 * The right-hand column is the argument, not decoration: a family typing the
 * question they actually type, and an answer in which the home is named. Kept
 * generic ("Your Home", "A local competitor") so no real provider is implied.
 */
const DEMO_QUERY = "best care home for dementia near Preston";

const DEMO_ANSWER = [
  { text: "For dementia care around Preston, the home that comes up most consistently is" },
  { text: "Your Home", brand: true },
  {
    text: ". They run a dedicated dementia unit with a settled staff team, take both residential and nursing residents, and families mention the same two nurses by name in reviews.",
  },
];

const DEMO_SOURCES = ["cqc.org.uk", "carehome.co.uk", "yourhome.co.uk"];

const DEMO_RESULTS = [
  { name: "Your Home", meta: "Dementia · nursing · Preston", you: true },
  { name: "A local competitor", meta: "Residential · Lancashire", you: false },
  { name: "A regional group", meta: "Multi-site · North West", you: false },
];

export function Hero() {
  const reduce = useReducedMotion();
  const word = (i: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: 0.12 * i, ease: [0.2, 0.8, 0.2, 1] as const },
  });

  return (
    <section className="relative isolate overflow-x-clip">
      <div className="absolute inset-0 grid-backdrop" aria-hidden />
      <div
        aria-hidden
        className="glow"
        style={{ width: 620, height: 620, background: "var(--color-mist)", top: -200, left: "-14%" }}
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 pb-8 pt-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:px-10 lg:pb-10 lg:pt-28">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap items-center gap-3"
          >
            <GooglePartnerBadge className="w-[178px]! sm:w-[210px]!" />
            <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-line)] px-3.5 py-2 text-xs font-medium tracking-tight text-[color:var(--color-slate)]">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-sky)]" />
              Care homes only
            </span>
          </motion.div>

          <h1 className="display mt-10 text-balance text-[clamp(2.5rem,5.4vw,4.5rem)]">
            <motion.span {...word(0)} className="block">
              Be the care home
            </motion.span>
            <motion.span {...word(1)} className="block">
              AI <span className="italic font-[500] text-[color:var(--color-sky)]">recommends</span>.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-[color:var(--color-slate)] sm:text-lg"
          >
            Families do not start with a phone call any more. They ask ChatGPT which home to
            look at, and they arrive at your door already decided. We make sure the home it
            names is{" "}
            <span className="text-[color:var(--color-navy)]">yours</span> — and run the
            Google Ads that catch the families still searching the old way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="mt-10"
          >
            <VisibilityCheckForm />
            <p className="mt-4 text-sm text-[color:var(--color-slate-2)]">
              Prefer to talk first?{" "}
              <Link
                href={site.calendly}
                target="_blank"
                rel="noopener"
                className="text-[color:var(--color-sky)] underline-offset-4 hover:underline"
              >
                Book a call
              </Link>
              .
            </p>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 grid max-w-xl grid-cols-2 gap-x-10 gap-y-10"
          >
            {[
              {
                value: 60,
                prefix: "£",
                suffix: "k+",
                label: "A year, one private resident",
              },
              { value: 3, prefix: "£", suffix: "M+", label: "Ad spend managed by our team" },
            ].map((item) => (
              <div key={item.label}>
                <dt className="display text-[2rem] text-[color:var(--color-sky)] sm:text-[2.75rem]">
                  <Counter value={item.value} prefix={item.prefix} suffix={item.suffix} />
                </dt>
                <dd className="mt-2 text-sm uppercase tracking-[0.18em] text-[color:var(--color-slate)]">
                  {item.label}
                </dd>
              </div>
            ))}
          </motion.dl>
          <p className="mt-5 max-w-xl text-xs leading-relaxed text-[color:var(--color-slate-2)]">
            Private residential fees in the UK typically run £1,200–£1,600 a week, so a single
            self-funded admission is worth more than most homes spend on marketing in a year.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="lg:justify-self-end"
        >
          <div className="mx-auto w-full max-w-[560px]">
            <AISearchDemo
              query={DEMO_QUERY}
              answerParts={DEMO_ANSWER}
              sources={DEMO_SOURCES}
              results={DEMO_RESULTS}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
