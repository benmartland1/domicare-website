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
    bio: "Ben founded DomiSearch in 2023 and launched DomiCare, its care-sector practice, in 2026. Five years running Google Ads with over £3M in personally managed spend, Google Partner certified, and two years working on how AI assistants decide which businesses to name. Every client account is reviewed by him personally.",
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
