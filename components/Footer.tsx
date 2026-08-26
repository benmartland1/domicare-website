import Link from "next/link";
import { site } from "@/lib/site";
import { Wordmark } from "./brand/Wordmark";
import { GooglePartnerBadge } from "./ui/GooglePartnerBadge";

/**
 * The footer is the site's largest navy band — the page runs pale all the way
 * down and then lands on it, which is what stops a light site feeling
 * unfinished at the bottom.
 */
export function Footer() {
  return (
    <footer className="on-navy relative z-10 mt-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-10">
        <div>
          <Wordmark tone="navy" height={32} />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-[color:var(--color-slate)]">
            AI search visibility and Google Ads for care homes and care groups — so the
            families searching for care in your area find you, not the home down the road.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <GooglePartnerBadge className="w-[150px]! sm:w-[150px]!" />
          </div>
          <p className="mt-7 max-w-sm text-xs leading-relaxed text-[color:var(--color-slate-2)]">
            {site.parent.blurb}{" "}
            <a
              href={site.parent.url}
              target="_blank"
              rel="noopener"
              className="underline underline-offset-2 hover:text-[color:var(--color-sky)]"
            >
              Visit {site.parent.name}
            </a>
            .
          </p>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Services</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/services/aeo" className="hover:text-[color:var(--color-sky)]">AI Search (AEO)</Link></li>
            <li><Link href="/services/google-ads" className="hover:text-[color:var(--color-sky)]">Google Ads</Link></li>
            <li><Link href="/pricing" className="hover:text-[color:var(--color-sky)]">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-[color:var(--color-sky)]">About</Link></li>
            <li><Link href="/blog" className="hover:text-[color:var(--color-sky)]">Blog</Link></li>
            <li><Link href="/careers" className="hover:text-[color:var(--color-sky)]">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-[color:var(--color-sky)]">Contact</Link></li>
            <li><Link href="/privacy" className="hover:text-[color:var(--color-sky)]">Privacy</Link></li>
            <li><Link href="/terms" className="hover:text-[color:var(--color-sky)]">Terms</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4">Reach us</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a className="hover:text-[color:var(--color-sky)]" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </li>
            <li>
              <a className="hover:text-[color:var(--color-sky)]" href={`tel:${site.phoneHref}`}>
                {site.phone}
              </a>
            </li>
            <li className="text-[color:var(--color-slate-2)]">{site.city}, {site.country}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[color:var(--color-line)]">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 px-6 py-6 text-xs text-[color:var(--color-slate-2)] sm:flex-row sm:items-center lg:px-10">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>
            We are a marketing agency. We do not provide care, and we are not affiliated
            with the CQC.
          </span>
        </div>
      </div>
    </footer>
  );
}
