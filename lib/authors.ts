import { site } from "./site";

export type Author = {
  name: string;
  role: string;
  image: string;
  bio: string;
  url: string;
  sameAs: string[];
};

export const authors: Record<string, Author> = {
  "Ben Martland": {
    name: "Ben Martland",
    role: "Founder, DomiCare",
    image: "/brand/founder.png",
    // LEGAL: "Google Partner" is DomiSearch's, never DomiCare's, and is never
    // written as "certified" — see the note on site.parent in lib/site.ts.
    // LEGAL: no claims about how long Ben has worked on AI search. The site
    // previously said both "two years" and "since 2024", which cannot both be
    // true, and neither is evidenced. Describe what DomiCare does, not how long
    // he has been doing it. Do not reintroduce a duration here.
    bio: "Ben founded DomiSearch in 2023 and launched DomiCare, its care-sector practice, in 2026. Five years running Google Ads with over £3M in personally managed spend, through DomiSearch, a Google Partner agency. Every client account is reviewed by him personally.",
    url: `${site.url}/about`,
    sameAs: [site.social.linkedin],
  },
  "DomiCare Team": {
    name: "DomiCare Team",
    role: "AI search visibility for care homes",
    image: "/brand/logo.png",
    bio: "DomiCare works with care homes, nursing homes and care groups across the UK on AI search visibility and Google Ads. It is the care-sector practice of DomiSearch, a Google Partner search agency.",
    url: site.url,
    sameAs: [site.social.linkedin],
  },
};

export function getAuthor(name: string): Author {
  return authors[name] ?? authors["DomiCare Team"];
}
