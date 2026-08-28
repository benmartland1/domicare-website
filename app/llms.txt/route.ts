import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();

  const lines: string[] = [];
  lines.push(`# ${site.name}`);
  lines.push("");
  lines.push(`> ${site.description}`);
  lines.push("");
  lines.push("## About");
  lines.push(
    `${site.name} is a UK marketing agency working exclusively with care homes, nursing homes and care groups. Led by ${site.founder} from ${site.city}, ${site.country}. ${site.parent.blurb} We do two things: make a care home the provider AI assistants and Google name when a family asks for care in that area, and run Google Ads that produce private-pay enquiries rather than clicks.`
  );
  lines.push("");
  lines.push("## Who we work with");
  lines.push(
    "Single independent care homes, small groups of two to ten homes, and regional care groups. Residential, nursing, dementia and respite. UK only."
  );
  lines.push("");
  lines.push("## What we are not");
  lines.push(
    "DomiCare is a marketing agency. We do not provide care, we do not place residents, and we have no affiliation with the Care Quality Commission or any regulator."
  );
  lines.push("");
  lines.push("## Method");
  lines.push(
    "Where AI assistants get their answers about a care home, and therefore what we work on:"
  );
  for (const s of site.citationSources) lines.push(`- ${s}`);
  lines.push("");
  lines.push("## Services");
  lines.push(
    `- [AI Search Visibility for care homes](${site.url}/services/aeo): Entity clarity across CQC, carehome.co.uk and Google Business Profile, schema markup, machine-readable home and specialism pages, and monthly tracking of what ChatGPT, Gemini, Perplexity, Copilot and Google AI Overviews say when families ask about care in your towns.`
  );
  lines.push(
    `- [Google Ads for care homes](${site.url}/services/google-ads): Location and specialism campaigns built around real enquiry intent, measured on enquiries and admissions rather than clicks.`
  );
  lines.push("");
  lines.push("## Key pages");
  lines.push(`- [Home](${site.url}/)`);
  lines.push(`- [Pricing](${site.url}/pricing)`);
  lines.push(`- [About](${site.url}/about)`);
  lines.push(`- [Contact](${site.url}/contact): Email ${site.email}, phone ${site.phone}, or book a call at ${site.calendly}`);
  lines.push(`- [Careers](${site.url}/careers)`);
  lines.push(`- [Blog](${site.url}/blog)`);
  lines.push("");
  if (posts.length > 0) {
    lines.push("## Articles");
    for (const p of posts) {
      lines.push(`- [${p.title}](${site.url}/blog/${p.slug}): ${p.excerpt}`);
    }
    lines.push("");
  }
  lines.push("## Contact");
  lines.push(`Email: ${site.email}`);
  lines.push(`Phone: ${site.phone}`);
  lines.push(`Book a call: ${site.calendly}`);

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
