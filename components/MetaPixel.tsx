"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, readConsent, type ConsentState } from "./CookieConsent";

/**
 * Meta Pixel base code (PageView on every page).
 *
 * LEGAL — CONSENT-GATED. DO NOT MAKE THIS RENDER UNCONDITIONALLY.
 *
 * The pixel sets and reads cookies on the visitor's device (_fbp, and _fbc where
 * a click ID is present) for advertising measurement. That is not "strictly
 * necessary" for providing the site, so PECR regulation 6 requires the
 * visitor's prior consent before any of it loads — including the <noscript>
 * tracking pixel, which fires just as surely as the script does.
 *
 * This component therefore renders nothing at all until CookieConsent has
 * recorded an explicit "granted". It also honours NEXT_PUBLIC_META_PIXEL_ID:
 * the ID used to be hardcoded here, so the documented kill switch in
 * .env.example did nothing. Leave the variable unset and no pixel loads.
 *
 * Data flows to Meta Platforms Ireland Ltd as an independent/joint controller.
 * If you add events, or add another advertising or analytics tag, the privacy
 * policy has to be updated to match before it ships.
 */

/**
 * Fallback ID, retained so the pixel keeps working in the existing Vercel
 * deployment where the env var is not yet set. Set NEXT_PUBLIC_META_PIXEL_ID in
 * the environment and delete this.
 */
const FALLBACK_PIXEL_ID = "2787701231587527";

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ?? FALLBACK_PIXEL_ID;

export function MetaPixel() {
  const [consent, setConsent] = useState<ConsentState>(null);

  useEffect(() => {
    setConsent(readConsent());
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent<ConsentState>).detail;
      setConsent(detail ?? readConsent());
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (consent !== "granted" || !META_PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
