import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().email().max(200),
});

export async function POST(request: Request) {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 422 });
  }
  const { email } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
// INTERIM MAIL ROUTING — see app/api/contact/route.ts. Unlike the other routes,
// the welcome send below goes to the SUBSCRIBER, so this from-address IS
// visitor-facing: they receive "Ben at DomiCare <website@domisearch.com>".
// Accepted deliberately while domicare.ai is unverified; the site states the
// DomiSearch parent relationship openly. Revert once Resend verifies.
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "website@domisearch.com";
  const notifyTo = process.env.CONTACT_TO_EMAIL ?? "hi@domisearch.com";

  if (!apiKey) {
    console.error("[newsletter] RESEND_API_KEY missing - signup not stored:", email);
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);
  let alreadySubscribed = false;

  // Add contact to audience (if configured)
  if (audienceId) {
    try {
      const { error } = await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });
      if (error) {
        if (/already exists/i.test(error.message ?? "")) {
          alreadySubscribed = true;
        } else {
          console.error("[newsletter] Resend audience error", error);
          return NextResponse.json({ error: "Could not subscribe. Try again." }, { status: 500 });
        }
      }
    } catch (err) {
      console.error("[newsletter] create failed", err);
      return NextResponse.json({ error: "Could not subscribe. Try again." }, { status: 500 });
    }
  } else {
    console.warn(`[newsletter] RESEND_AUDIENCE_ID not set - subscriber not stored: ${email}`);
  }

  // Send welcome email to subscriber + internal notification
  // Do not block the response if either fails.
  if (!alreadySubscribed) {
    const welcomeHtml = `
      <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; color: #1a1a1a;">
        <h2 style="margin: 0 0 16px; font-size: 22px; font-weight: 600;">You're in.</h2>
        <p style="line-height: 1.6; margin: 0 0 16px;">
          Thanks for subscribing. Once a month you'll get what we're seeing in AI search for care -
          what the assistants are saying about homes like yours, what's moving, and what's worth doing
          about it. No fluff, no filler.
        </p>
        <p style="line-height: 1.6; margin: 0 0 16px;">
          If you'd like me to run the check on your own home, <a href="${site.calendly}" style="color: #0f9b8c;">book a call</a>
          and I'll take a look personally beforehand.
        </p>
        <p style="line-height: 1.6; margin: 24px 0 0;">
          - Ben<br/>
          <span style="color: #666; font-size: 14px;">Founder, DomiCare</span>
        </p>
      </div>
    `;
    const welcomeText = `You're in.

Thanks for subscribing. Once a month you'll get what we're seeing in AI search for care - what the assistants are saying about homes like yours, what's moving, and what's worth doing about it. No fluff, no filler.

If you'd like me to run the check on your own home, book a call: ${site.calendly}

- Ben
Founder, DomiCare`;

    try {
      await resend.emails.send({
        from: `Ben at DomiCare <${fromEmail}>`,
        to: [email],
        replyTo: notifyTo,
        subject: "Welcome to DomiCare",
        html: welcomeHtml,
        text: welcomeText,
      });
    } catch (err) {
      console.error("[newsletter] welcome email failed", err);
    }

    try {
      await resend.emails.send({
        from: `DomiCare Website <${fromEmail}>`,
        to: [notifyTo],
        subject: `New newsletter subscriber: ${email}`,
        text: `${email} just signed up to the newsletter.`,
      });
    } catch (err) {
      console.error("[newsletter] internal notification failed", err);
    }
  }

  return NextResponse.json({ ok: true, duplicate: alreadySubscribed });
}
