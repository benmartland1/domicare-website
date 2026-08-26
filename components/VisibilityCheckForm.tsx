"use client";

import { useEffect, useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { trackMeta } from "@/lib/meta";

type Step = "lead" | "booking";

export function VisibilityCheckForm() {
  const [url, setUrl] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [done, setDone] = useState(false);

  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("lead");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function close() {
    setOpen(false);
  }

  // Lock scroll + escape-to-close while the modal is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // When a Calendly booking completes inside the embed, Calendly posts a
  // `calendly.event_scheduled` message to the parent window.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== "https://calendly.com") return;
      const data = e.data as { event?: string } | null;
      if (data && typeof data === "object" && data.event === "calendly.event_scheduled") {
        setOpen(false);
        setDone(true);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  function openModal(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Honeypot
    if (honeypot) {
      setDone(true);
      return;
    }
    const value = url.trim();
    if (value.length < 3 || !value.includes(".")) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    setName("");
    setEmail("");
    setPhone("");
    setError(null);
    setStep("lead");
    setOpen(true);
  }

  async function submitLead(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      const res = await fetch("/api/audit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      trackMeta("Lead", { content_name: "Care Home AI Visibility Check" });
      setStep("booking");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setSending(false);
    }
  }

  function skipBooking() {
    setOpen(false);
    setDone(true);
  }

  if (done) {
    return (
      <div className="max-w-xl rounded-2xl border border-[color:var(--color-sky)]/40 bg-[color:var(--color-sky)]/10 px-5 py-4 text-sm text-[color:var(--color-navy)]">
        Got it - Ben will run the check on your home personally and follow up with what the AI
        assistants said.
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <form onSubmit={openModal} className="flex flex-col gap-3 sm:flex-row" noValidate>
        {/* Honeypot */}
        <input
          type="text"
          name="hp_company"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          aria-hidden
        />
        <label htmlFor="visibility-url" className="sr-only">
          Your website
        </label>
        <input
          id="visibility-url"
          name="url"
          type="text"
          inputMode="url"
          required
          autoComplete="url"
          aria-invalid={invalid}
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (invalid) setInvalid(false);
          }}
          placeholder="yourcarehome.co.uk"
          className={`flex-1 rounded-full border bg-[color:var(--color-surface)] px-5 py-3 text-base text-[color:var(--color-navy)] outline-none transition-colors placeholder:text-[color:var(--color-slate-2)] focus:border-[color:var(--color-sky)] ${invalid ? "border-red-400" : "border-[color:var(--color-line)]"}`}
        />
        <button type="submit" className="btn btn-primary justify-center whitespace-nowrap">
          See What AI Says About Your Home
          <span aria-hidden>→</span>
        </button>
      </form>

      <p className="mt-3 text-xs text-[color:var(--color-slate-2)]">
        We&apos;ll ask ChatGPT, Gemini and Perplexity for care in your area and send back what they
        actually said about you.
      </p>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-stretch justify-center overflow-y-auto bg-black/55 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Get your care home AI visibility check"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="relative my-auto w-full bg-[color:var(--color-paper)] text-[color:var(--color-ink)] shadow-2xl sm:max-w-lg sm:rounded-[1.5rem]">
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-[color:var(--color-ink-3)] transition-colors hover:bg-black/5 hover:text-[color:var(--color-ink)]"
            >
              <span aria-hidden className="text-xl leading-none">
                ×
              </span>
            </button>

            {step === "lead" ? (
              <div className="p-7 sm:p-9">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ocean)]">
                  Almost there
                </div>
                <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-[1.7rem]">
                  Where should we send your audit?
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-ink-2)]">
                  Ben will personally ask the AI assistants about{" "}
                  <span className="font-semibold text-[color:var(--color-ink)]">{url}</span> the way a
                  family would. Add your details and we&apos;ll send the answers over.
                </p>

                <form onSubmit={submitLead} className="mt-6 space-y-3">
                  <div>
                    <label htmlFor="visibility-name" className="sr-only">
                      Your name
                    </label>
                    <input
                      id="visibility-name"
                      type="text"
                      required
                      autoFocus
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-base text-[color:var(--color-ink)] outline-none transition-colors placeholder:text-black/35 focus:border-[color:var(--color-ocean)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="visibility-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="visibility-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@yourcarehome.co.uk"
                      className="w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-base text-[color:var(--color-ink)] outline-none transition-colors placeholder:text-black/35 focus:border-[color:var(--color-ocean)]"
                    />
                  </div>
                  <div>
                    <label htmlFor="visibility-phone" className="sr-only">
                      Phone number
                    </label>
                    <input
                      id="visibility-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number"
                      className="w-full rounded-xl border border-black/15 bg-white px-4 py-3.5 text-base text-[color:var(--color-ink)] outline-none transition-colors placeholder:text-black/35 focus:border-[color:var(--color-ocean)]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-ocean)] px-6 py-3.5 text-base font-semibold text-[color:var(--color-paper)] transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {sending ? "Sending…" : "Get My Audit"}
                    <span aria-hidden>→</span>
                  </button>
                </form>

                {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

                <p className="mt-4 text-xs text-[color:var(--color-ink-3)]">
                  No spam. We use your details only to send the audit and arrange your call.
                </p>
              </div>
            ) : (
              <div className="p-7 sm:p-9">
                <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--color-ocean)]">
                  Audit on its way
                </div>
                <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-[1.7rem]">
                  Want to skip the wait?
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-ink-2)]">
                  Ben&apos;s reviewing{" "}
                  <span className="font-semibold text-[color:var(--color-ink)]">{url}</span> now.
                  Grab a slot below if you&apos;d rather talk it through directly with him.
                </p>

                {/* Calendly inline embed. Swap site.calendly in lib/site.ts to change the booking link. */}
                <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-white">
                  <iframe
                    src={`${site.calendly}?hide_gdpr_banner=1&background_color=f5f2ec&primary_color=14c2b0`}
                    title="Book a call with DomiCare"
                    className="h-[560px] w-full"
                    loading="lazy"
                  />
                </div>

                <button
                  type="button"
                  onClick={skipBooking}
                  className="mt-4 text-sm font-medium text-[color:var(--color-ink-3)] underline-offset-4 hover:underline"
                >
                  No thanks, just email me the audit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
