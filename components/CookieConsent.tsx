"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * LEGAL — THIS IS A COMPLIANCE CONTROL, NOT A UI FLOURISH. DO NOT REMOVE IT,
 * AND DO NOT MAKE THE PIXEL LOAD WITHOUT IT.
 *
 * PECR regulation 6 requires prior, informed consent before storing or reading
 * anything on a visitor's device that is not strictly necessary to provide the
 * service they asked for. The Meta Pixel is not strictly necessary — it is
 * advertising measurement — so it may only load after the visitor has actively
 * agreed. Before this component existed the pixel fired on every page load for
 * every visitor, which is the single most commonly enforced cookie breach the
 * ICO deals with.
 *
 * Rules this implements, all of which are requirements rather than preferences:
 *   - Nothing non-essential runs until "Accept" is clicked. Default is refusal.
 *   - Reject is as easy as accept: same prominence, same number of clicks. A
 *     banner with a prominent "Accept" and a buried "Reject" is not valid
 *     consent. Do not restyle these two buttons so one dominates.
 *   - No pre-ticked boxes, and closing the banner is not consent.
 *   - The choice is stored so it can be evidenced, and can be changed later —
 *     see the "Cookie settings" control in the footer.
 *
 * Consent is stored in localStorage rather than a cookie because storing the
 * record itself is permitted as strictly necessary, and localStorage keeps it
 * out of every request.
 */

const STORAGE_KEY = "domicare-cookie-consent";
/** Bump when the set of non-essential tags changes, to re-ask for consent. */
const CONSENT_VERSION = "1";

export type ConsentState = "granted" | "denied" | null;

/** Fired on the window when consent changes, so tag components can react. */
export const CONSENT_EVENT = "domicare:consent";

export function readConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { state?: string; version?: string };
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed.state === "granted" ? "granted" : parsed.state === "denied" ? "denied" : null;
  } catch {
    // Private mode or storage blocked. No stored consent means no consent.
    return null;
  }
}

function writeConsent(state: Exclude<ConsentState, null>) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ state, version: CONSENT_VERSION, at: new Date().toISOString() }),
    );
  } catch {
    // If we cannot record it we still honour it for this page view.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: state }));
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readConsent() === null) setVisible(true);
    // Re-open when the footer control asks for it.
    const reopen = () => setVisible(true);
    window.addEventListener("domicare:consent-reopen", reopen);
    return () => window.removeEventListener("domicare:consent-reopen", reopen);
  }, []);

  if (!visible) return null;

  function choose(state: "granted" | "denied") {
    writeConsent(state);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie choices"
      className="fixed inset-x-0 bottom-0 z-[200] border-t border-[color:var(--color-line)] bg-[color:var(--color-canvas)]/95 backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p className="text-sm leading-relaxed text-[color:var(--color-slate)]">
          We use essential cookies to run this site. We would also like to set advertising
          cookies via the Meta pixel, which shares data with Meta Platforms Ireland Ltd, to
          measure our ads. These only load if you accept.{" "}
          <Link
            href="/privacy"
            className="text-[color:var(--color-sky)] underline underline-offset-4"
          >
            Privacy policy
          </Link>
          .
        </p>
        {/* LEGAL: equal prominence. Reject must be exactly as easy as accept —
            same size, same weight, same number of clicks. Do not make one of
            these a primary button and the other a text link. */}
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="btn btn-ghost justify-center whitespace-nowrap"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="btn btn-ghost justify-center whitespace-nowrap"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

/** Re-opens the banner so a visitor can change their mind. Used in the footer. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("domicare:consent-reopen"))}
      className={className}
    >
      Cookie settings
    </button>
  );
}
