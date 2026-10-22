import { NextResponse } from "next/server";
import { Resend } from "resend";
import { BRAND } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmedString(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getRecipients() {
  const fromEnv = process.env.CONTACT_TO_EMAIL?.trim();
  const primary = fromEnv
    ? fromEnv.split(",").map((email) => email.trim()).filter(Boolean)
    : [BRAND.email];
  const testing = "contact@geeslane.com";
  return Array.from(new Set([...primary, testing]));
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:12px 16px;border-bottom:1px solid #efe8f3;width:34%;font-size:13px;line-height:1.4;color:#6b6474;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:12px 16px;border-bottom:1px solid #efe8f3;font-size:14px;line-height:1.5;color:#100b17;font-weight:600;vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const name = asTrimmedString(body.name, 120);
  const email = asTrimmedString(body.email, 200);
  const phone = asTrimmedString(body.phone ?? "", 40);
  const message = asTrimmedString(body.message, 4000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and message." },
      { status: 400 },
    );
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email is not configured. Please try again later." },
      { status: 503 },
    );
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    "",
    "Message:",
    message,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  const html = `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f6f3f8;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f6f3f8;">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <table role="presentation" align="center" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin:0 auto;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #efe8f3;font-family:Arial,Helvetica,sans-serif;">
            <tr>
              <td style="padding:28px 32px;background:#4d0d57;">
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#f3d7f8;">Ultimate Solutions</p>
                <h1 style="margin:0;font-size:26px;line-height:1.25;color:#ffffff;">New contact message</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #efe8f3;border-radius:16px;">
                  ${row("Name", name)}
                  ${row("Email", email)}
                  ${phone ? row("Phone", phone) : ""}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 28px;">
                <p style="margin:16px 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#7a1a88;font-weight:700;">Message</p>
                <div style="padding:16px 18px;border-radius:16px;background:#f7f3fa;border:1px solid #efe8f3;font-size:14px;line-height:1.6;color:#100b17;white-space:pre-wrap;">${escapeHtml(message)}</div>
                <p style="margin:18px 0 0;font-size:13px;line-height:1.5;color:#6b6474;">Reply to this email to respond directly to ${escapeHtml(name)}.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from:
      process.env.RESEND_FROM_EMAIL?.trim() ||
      "Ultimate Solutions <onboarding@resend.dev>",
    to: getRecipients(),
    replyTo: email,
    subject: `New message from ${name}`,
    html,
    text,
  });

  if (error) {
    console.error("[contact] Resend error", error);
    return NextResponse.json(
      { error: error.message || "Could not send your message. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
