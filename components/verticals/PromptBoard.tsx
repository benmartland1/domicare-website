"use client";

import { useState } from "react";

/**
 * The "leaderboard" module — a stand-in for the live sales tables that make
 * proof-heavy agency sites feel alive. Here it shows what a firm's AI-visibility
 * audit actually looks like: the prompts their buyers ask, who gets named
 * today, and whether they appear at all.
 *
 * Framed explicitly as an example audit. Competitor slots are generic
 * descriptors, never real firm names.
 */

export type PromptRow = {
  prompt: string;
  /** Must match one of the tab labels (other than "All"). */
  sector: string;
  engine: string;
  named: string;
};

/* Defaults are the care-sector copy. Other pages pass their own. */

const DEFAULT_ROWS: PromptRow[] = [
  {
    prompt: "best dementia care home near Preston",
    sector: "Dementia",
    engine: "ChatGPT",
    named: "2 regional groups",
  },
  {
    prompt: "care homes with dementia nursing in Lancashire",
    sector: "Dementia",
    engine: "Perplexity",
    named: "1 directory, 1 group",
  },
  {
    prompt: "nursing home near me that takes complex needs",
    sector: "Nursing",
    engine: "Gemini",
    named: "3 national providers",
  },
  {
    prompt: "best rated nursing homes in Harrogate",
    sector: "Nursing",
    engine: "ChatGPT",
    named: "2 directories",
  },
  {
    prompt: "residential care home for mum near me",
    sector: "Residential",
    engine: "ChatGPT",
    named: "1 local home, 2 directories",
  },
  {
    prompt: "care home that offers two weeks respite Lancashire",
    sector: "Respite",
    engine: "Copilot",
    named: "nobody specific",
  },
];

const DEFAULT_TABS = ["All", "Dementia", "Nursing", "Residential", "Respite"];

export function PromptBoard({
  rows: ROWS = DEFAULT_ROWS,
  tabs: TABS = DEFAULT_TABS,
  subjectLabel = "Your home",
}: {
  rows?: PromptRow[];
  /** First entry is the "show everything" tab. */
  tabs?: string[];
  /** Heading for the final column — what the visitor is, in their words. */
  subjectLabel?: string;
} = {}) {
  const [tab, setTab] = useState<string>(TABS[0]);
  /** Mobile shows the first four prompts; the rest are one tap away. */
  const [showAll, setShowAll] = useState(false);
  const rows = tab === TABS[0] ? ROWS : ROWS.filter((r) => r.sector === tab);

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-black/[0.08] bg-white shadow-[0_30px_70px_-40px_rgba(20,17,13,0.4)]">
      {/* Header strip */}
      <div className="flex flex-wrap items-center gap-3 border-b border-black/[0.06] bg-[#fbfaf8] px-4 py-3.5 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-sky-2)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-ocean)]" />
          </span>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-ink)]">
            Example visibility audit
          </span>
        </div>
        <div className="ml-auto flex flex-wrap gap-1">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-full px-3 py-1.5 text-[12px] font-semibold tracking-tight transition-colors ${
                tab === t
                  ? "bg-[color:var(--color-ink)] text-[color:var(--color-paper)]"
                  : "text-[color:var(--color-ink-3)] hover:bg-black/[0.04]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[42rem] border-collapse text-left">
          <thead>
            <tr className="border-b border-black/[0.06] text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-ink-3)]">
              <th className="px-4 py-3 font-semibold sm:px-6">Buyer prompt</th>
              <th className="px-4 py-3 font-semibold">Engine</th>
              <th className="px-4 py-3 font-semibold">Who gets named</th>
              <th className="px-4 py-3 text-right font-semibold sm:px-6">{subjectLabel}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.prompt}
                className={`border-b border-black/[0.05] last:border-0 hover:bg-black/[0.015] ${
                  !showAll && i >= 4 ? "hidden sm:table-row" : ""
                }`}
              >
                <td className="px-4 py-3 text-[14px] font-medium tracking-tight text-[color:var(--color-ink)] sm:px-6">
                  {r.prompt}
                </td>
                <td className="px-4 py-3 text-[13px] text-[color:var(--color-ink-3)]">
                  {r.engine}
                </td>
                <td className="px-4 py-3 text-[13px] text-[color:var(--color-ink-3)]">
                  {r.named}
                </td>
                <td className="px-4 py-3 text-right sm:px-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fdeeee] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-[#b4342f]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d4453f]" />
                    Not cited
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length > 4 ? (
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          aria-expanded={showAll}
          className="w-full border-t border-black/[0.06] px-4 py-3 text-[13px] font-bold tracking-tight text-[color:var(--color-ocean)] sm:hidden"
        >
          {showAll ? "Show fewer prompts" : `Show all ${rows.length} prompts`}
        </button>
      ) : null}

      <div className="border-t border-black/[0.06] bg-[#fbfaf8] px-4 py-3 text-[11px] leading-relaxed text-[color:var(--color-ink-3)] sm:px-6">
        Illustrative example of the audit we run before any engagement. Competitor slots are
        described generically — we never publish another provider&apos;s ranking, and we have no
        involvement in CQC ratings.
      </div>
    </div>
  );
}
