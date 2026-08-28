import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  url: z.string().min(3).max(300),
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(5).max(40),
  // Honeypot - must be empty.
  hp_company: z.string().optional(),
});

function normaliseUrl(raw: string): string | null {
  const trimmed = raw.trim();
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const u = new URL(withScheme);
    if (!u.hostname.includes(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please enter your name, a valid email, phone number and website." },
      { status: 422 },
    );
  }
  const { url, name, email, phone, hp_company } = parsed.data;

  // Honeypot - pretend success, do nothing.
  if (hp_company) {
    return NextResponse.json({ ok: true });
  }

  const website = normaliseUrl(url);
  if (!website) {
    return NextResponse.json({ error: "Please enter a valid website." }, { status: 422 });
  }

  const cleanHost = website.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const apiKey = process.env.RESEND_API_KEY;
// INTERIM MAIL ROUTING. domicare.ai is not yet verified in Resend and has no
// mailbox, so website mail is sent from and delivered to the DomiSearch domain,
// which is already verified. Vercel sets CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL
// explicitly; these fallbacks only matter locally or if a var goes missing, and
// pointing them at domicare.ai would fail to send rather than fail loudly.
// Revert both to @domicare.ai once Resend verifies the domain.
// Note: `from` is internal-only for this route — the visitor sees `replyTo`.
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "website@domisearch.com";
  const notifyTo = process.env.CONTACT_TO_EMAIL ?? "hi@domisearch.com";

  if (!apiKey) {
    // Fail loudly. Returning ok here showed the visitor "Got it" while the lead
    // went nowhere but a log — the worst outcome, because nobody finds out.
    // Same contract as /api/contact.
    console.error("[audit-request] RESEND_API_KEY missing - request not delivered:", { website, email });
    return NextResponse.json(
      { error: `Could not submit. Please email ${site.email} directly.` },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  // Internal notification to Ben - the lead.
  try {
    await resend.emails.send({
      from: `DomiCare Website <${fromEmail}>`,
      to: [notifyTo],
      replyTo: email,
      subject: `AI visibility check request: ${name} (${cleanHost})`,
      text: `New AI visibility audit request (from the homepage).

Name:    ${name}
Website: ${website}
Email:   ${email}
Phone:   ${phone}

Run the check and reach out with their audit. Reply to this email to reach them.`,
      html: `
        <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; color: #1a1a1a;">
          <h2 style="margin: 0 0 16px; font-size: 20px; font-weight: 600;">New AI visibility audit request</h2>
          <p style="line-height: 1.6; margin: 0 0 8px;"><strong>Name:</strong> ${name}</p>
          <p style="line-height: 1.6; margin: 0 0 8px;"><strong>Website:</strong> <a href="${website}" style="color: #0f9b8c;">${website}</a></p>
          <p style="line-height: 1.6; margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0f9b8c;">${email}</a></p>
          <p style="line-height: 1.6; margin: 0 0 16px;"><strong>Phone:</strong> <a href="tel:${phone}" style="color: #0f9b8c;">${phone}</a></p>
          <p style="line-height: 1.6; margin: 0; color: #666; font-size: 14px;">From the homepage. Run the check and reach out with their audit.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("[audit-request] internal notification failed", err);
    return NextResponse.json({ error: "Could not submit. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
