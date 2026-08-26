import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";

const steps = [
  {
    n: "01",
    title: "Ask",
    body: "We ask ChatGPT, Gemini, Perplexity and Copilot the questions a family in your catchment actually asks, and record what comes back. Usually it names three homes. Usually one of them is yours by accident, or none of them are.",
  },
  {
    n: "02",
    title: "Fix the record",
    body: "Assistants answer from CQC, carehome.co.uk, Google Business Profile and your own site. When those four disagree about your bed count, your specialisms or even your name, you get left out. We make them agree.",
  },
  {
    n: "03",
    title: "Publish",
    body: "A readable page per home, per specialism and per town, plus the answers families search for at midnight — costs, funding, what to ask on a visit, how a move actually works. Written to be quotable by a machine and useful to a human.",
  },
  {
    n: "04",
    title: "Capture",
    body: "Google Ads on the searches that mean somebody is enquiring this month, pointed at pages built to take an enquiry. Plus the unglamorous part: making sure the enquiry that arrives at 7pm on a Friday still gets answered.",
  },
  {
    n: "05",
    title: "Report",
    body: "Monthly: what the assistants said about you and your competitors, enquiries by home, and where they came from. Tied to admissions, never to impressions.",
  },
];

export function ProcessSteps() {
  return (
    <section className="relative mx-auto mt-32 max-w-7xl px-6 lg:px-10">
      <SectionHeader
        eyebrow="The occupancy loop"
        title="Five stages. One feedback loop."
        description="The same five stages on every engagement, whether you run one home or twelve. What comes out of them is specific to your homes and your catchments."
      />
      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, i) => (
          <ScrollReveal key={step.n} delay={i * 80}>
            <div className="card h-full p-7">
              <span className="display text-5xl text-[color:var(--color-sky)]/80">
                {step.n}
              </span>
              <h3 className="mt-6 text-xl font-[600] text-[color:var(--color-navy)]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-slate)]">
                {step.body}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={420}>
        <p className="mt-10 max-w-2xl text-sm text-[color:var(--color-slate-2)]">
          Stage 2 is the one nobody else does, and it is usually where the biggest jump comes
          from. Most homes are invisible to AI for a boring reason, not a competitive one.
        </p>
      </ScrollReveal>
    </section>
  );
}
