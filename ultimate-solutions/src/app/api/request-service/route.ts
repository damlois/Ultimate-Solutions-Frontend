import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  BRAND,
  BUSINESS_REGISTRATION_SERVICE,
  REQUEST_SERVICES,
} from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_SERVICES = new Set<string>(REQUEST_SERVICES);
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
]);

type Attachment = {
  filename: string;
  content: Buffer;
  contentType?: string;
};

type Payload = {
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string;
  message: string | null;
  readyToFillDetails: string | null;
  business: Record<string, string> | null;
  attachments: Attachment[];
};

function asTrimmedString(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

function getString(form: FormData, key: string, max: number) {
  return asTrimmedString(form.get(key), max);
}

async function readFile(
  form: FormData,
  key: string,
  label: string,
  required: boolean,
): Promise<{ file: Attachment | null; error: string | null }> {
  const value = form.get(key);
  if (!(value instanceof File) || value.size === 0) {
    if (required) return { file: null, error: `${label} is required.` };
    return { file: null, error: null };
  }
  if (value.size > MAX_FILE_BYTES) {
    return { file: null, error: `${label} must be under 5MB.` };
  }
  if (value.type && !ALLOWED_FILE_TYPES.has(value.type)) {
    return {
      file: null,
      error: `${label} must be an image or PDF.`,
    };
  }

  const buffer = Buffer.from(await value.arrayBuffer());
  return {
    file: {
      filename: value.name || `${key}.bin`,
      content: buffer,
      contentType: value.type || undefined,
    },
    error: null,
  };
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function detailRow(label: string, value: string) {
  const missing = value === "Not provided";
  return `<tr>
    <td style="padding:12px 16px;border-bottom:1px solid #efe8f3;width:42%;font-size:13px;line-height:1.4;color:#6b6474;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:12px 16px;border-bottom:1px solid #efe8f3;font-size:14px;line-height:1.5;color:${missing ? "#9a93a3" : "#100b17"};font-weight:${missing ? "400" : "600"};vertical-align:top;">${escapeHtml(value)}</td>
  </tr>`;
}

function section(title: string, rows: string) {
  return `<tr>
    <td style="padding:8px 32px 0;">
      <p style="margin:18px 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#7a1a88;font-weight:700;">${escapeHtml(title)}</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #efe8f3;border-radius:16px;overflow:hidden;background:#ffffff;">
        ${rows}
      </table>
    </td>
  </tr>`;
}

function buildEmailText(payload: Payload) {
  const lines: Array<string | null> = [
    `Service: ${payload.service}`,
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    payload.company ? `Company: ${payload.company}` : null,
  ];

  if (payload.readyToFillDetails === "no") {
    lines.push("Ready to fill details: No — follow-up requested");
  }

  if (payload.business) {
    lines.push("", "Business registration details:");
    for (const [key, value] of Object.entries(payload.business)) {
      lines.push(`${key}: ${value}`);
    }
  }

  if (payload.message) {
    lines.push("", "Message:", payload.message);
  }

  if (payload.attachments.length) {
    lines.push(
      "",
      `Attachments: ${payload.attachments.map((a) => a.filename).join(", ")}`,
    );
  }

  return lines.filter((line): line is string => line !== null).join("\n");
}

function buildEmailHtml(payload: Payload) {
  const contactRows = [
    detailRow("Name", payload.name),
    detailRow("Email", payload.email),
    payload.phone ? detailRow("Phone", payload.phone) : "",
    payload.company ? detailRow("Company", payload.company) : "",
    payload.readyToFillDetails === "no"
      ? detailRow("Ready to fill details", "No — follow-up requested")
      : "",
  ].join("");

  const businessRows = payload.business
    ? Object.entries(payload.business)
        .map(([label, value]) => detailRow(label, value))
        .join("")
    : "";

  const messageBlock = payload.message
    ? `<tr>
        <td style="padding:8px 32px 0;">
          <p style="margin:18px 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#7a1a88;font-weight:700;">Message</p>
          <div style="padding:16px 18px;border-radius:16px;background:#f7f3fa;border:1px solid #efe8f3;font-size:14px;line-height:1.6;color:#100b17;white-space:pre-wrap;">${escapeHtml(payload.message)}</div>
        </td>
      </tr>`
    : "";

  const attachmentBlock = payload.attachments.length
    ? `<tr>
        <td style="padding:8px 32px 0;">
          <p style="margin:18px 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#7a1a88;font-weight:700;">Attachments</p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#100b17;">${payload.attachments.map((file) => escapeHtml(file.filename)).join("<br />")}</p>
        </td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f6f3f8;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f6f3f8;">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <table role="presentation" align="center" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin:0 auto;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #efe8f3;font-family:Arial,Helvetica,sans-serif;">
            <tr>
              <td style="padding:28px 32px;background:#4d0d57;background-image:linear-gradient(120deg,#4d0d57,#7a1a88 62%,#2563eb);">
                <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#f3d7f8;">Ultimate Solutions</p>
                <h1 style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:26px;line-height:1.25;color:#ffffff;">New service request</h1>
                <p style="margin:14px 0 0;">
                  <span style="display:inline-block;padding:6px 12px;border-radius:999px;background:rgba(255,255,255,0.16);font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#ffffff;">${escapeHtml(payload.service)}</span>
                </p>
              </td>
            </tr>
            ${section("Contact", contactRows)}
            ${businessRows ? section("Business registration", businessRows) : ""}
            ${messageBlock}
            ${attachmentBlock}
            <tr>
              <td style="padding:24px 32px 28px;">
                <p style="margin:18px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#6b6474;">Reply to this email to respond directly to ${escapeHtml(payload.name)}.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function getRecipients() {
  const fromEnv = process.env.CONTACT_TO_EMAIL?.trim();
  const primary = fromEnv
    ? fromEnv.split(",").map((e) => e.trim()).filter(Boolean)
    : [BRAND.email];
  // Temporary testing recipient — remove when done testing
  const testing = "contact@geeslane.com";
  return Array.from(new Set([...primary, testing]));
}

async function sendWithResend(payload: Payload) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return {
      ok: false as const,
      reason: "missing_key" as const,
      message:
        "Email is not configured. Add RESEND_API_KEY to .env.local and restart the server.",
    };
  }

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ||
    "Ultimate Solutions <onboarding@resend.dev>";
  const to = getRecipients();

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from,
    to,
    replyTo: payload.email,
    subject: `Service request: ${payload.service} — ${payload.name}`,
    html: buildEmailHtml(payload),
    text: buildEmailText(payload),
    attachments: payload.attachments.map((file) => ({
      filename: file.filename,
      content: file.content,
      contentType: file.contentType,
    })),
  });

  if (error) {
    console.error("[request-service] Resend error", error);
    return {
      ok: false as const,
      reason: "provider" as const,
      message: error.message || "Resend could not deliver the email.",
    };
  }

  console.info("[request-service] Resend sent", data?.id, "→", to.join(", "));
  return { ok: true as const };
}

async function parsePayload(req: Request): Promise<
  { ok: true; payload: Payload } | { ok: false; error: string; status: number }
> {
  const contentType = req.headers.get("content-type") || "";

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();

    if (asTrimmedString(form.get("website"), 200)) {
      return {
        ok: true,
        payload: {
          name: "honeypot",
          email: "honeypot@example.com",
          phone: null,
          company: null,
          service: "Other",
          message: null,
          readyToFillDetails: null,
          business: null,
          attachments: [],
        },
      };
    }

    const service = getString(form, "service", 120);
    if (!service || !ALLOWED_SERVICES.has(service)) {
      return { ok: false, error: "Select a valid service.", status: 400 };
    }

    if (service === BUSINESS_REGISTRATION_SERVICE) {
      const ready = getString(form, "readyToFillDetails", 10);

      // Full business registration application
      const proposedBusinessName = getString(form, "proposedBusinessName", 200);
      if (proposedBusinessName) {
        const fullNames = getString(form, "fullNames", 200);
        const dateOfBirth = getString(form, "dateOfBirth", 40);
        const email = getString(form, "email", 200);
        const address = getString(form, "address", 400);
        const occupation = getString(form, "occupation", 120);
        const phone = getString(form, "phone", 40);
        const idType = getString(form, "idType", 80);
        const businessAddress = getString(form, "businessAddress", 400);
        const natureOfBusiness = getString(form, "natureOfBusiness", 1000);
        const alternativeBusinessName = getString(
          form,
          "alternativeBusinessName",
          200,
        );

        const registrationType = getString(form, "registrationType", 20);

        if (
          (registrationType !== "Business" && registrationType !== "Company") ||
          !alternativeBusinessName ||
          !fullNames ||
          !dateOfBirth ||
          !email ||
          !address ||
          !occupation ||
          !phone ||
          !idType ||
          !businessAddress ||
          !natureOfBusiness
        ) {
          return {
            ok: false,
            error: "Please complete all required registration fields.",
            status: 400,
          };
        }

        if (!EMAIL_RE.test(email)) {
          return { ok: false, error: "Enter a valid email address.", status: 400 };
        }

        if (idType !== "International Passport" && idType !== "NIN") {
          return { ok: false, error: "Select a valid means of I.D.", status: 400 };
        }

        const idDoc = await readFile(form, "idDocument", "ID document", true);
        if (idDoc.error) return { ok: false, error: idDoc.error, status: 400 };
        const signature = await readFile(form, "signature", "Signature", true);
        if (signature.error)
          return { ok: false, error: signature.error, status: 400 };
        const passport = await readFile(
          form,
          "passportPhoto",
          "Passport photograph",
          registrationType === "Business",
        );
        if (passport.error)
          return { ok: false, error: passport.error, status: 400 };

        const attachments = [idDoc.file!, signature.file!];
        if (passport.file) attachments.push(passport.file);

        return {
          ok: true,
          payload: {
            name: fullNames,
            email,
            phone,
            company: proposedBusinessName,
            service,
            message: null,
            readyToFillDetails: "yes",
            business: {
              "Registration type": registrationType,
              "Proposed Business Name": proposedBusinessName,
              "Alternative Business Name": alternativeBusinessName,
              "Full names": fullNames,
              "Date of birth": dateOfBirth,
              Email: email,
              Address: address,
              Occupation: occupation,
              "Phone number": phone,
              "Means of I.D.": idType,
              "Address of the business": businessAddress,
              "Nature of business": natureOfBusiness,
            },
            attachments,
          },
        };
      }

      // Not ready yet — contact details only
      const name = getString(form, "name", 120);
      const email = getString(form, "email", 200);
      const phone = getString(form, "phone", 40);
      const message = getString(form, "message", 4000);

      if (!name || !email) {
        return {
          ok: false,
          error: "Please fill in your name and email.",
          status: 400,
        };
      }
      if (!EMAIL_RE.test(email)) {
        return { ok: false, error: "Enter a valid email address.", status: 400 };
      }

      return {
        ok: true,
        payload: {
          name,
          email,
          phone,
          company: null,
          service,
          message:
            message ||
            "Not ready to fill business registration details yet — please follow up.",
          readyToFillDetails: ready || "no",
          business: null,
          attachments: [],
        },
      };
    }

    const name = getString(form, "name", 120);
    const email = getString(form, "email", 200);
    const phone = getString(form, "phone", 40);
    const company = getString(form, "company", 120);
    const message = getString(form, "message", 4000);

    if (!name || !email || !message) {
      return {
        ok: false,
        error: "Please fill in name, email, service, and message.",
        status: 400,
      };
    }
    if (!EMAIL_RE.test(email)) {
      return { ok: false, error: "Enter a valid email address.", status: 400 };
    }

    return {
      ok: true,
      payload: {
        name,
        email,
        phone,
        company,
        service,
        message,
        readyToFillDetails: null,
        business: null,
        attachments: [],
      },
    };
  }

  // Legacy JSON body support
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return { ok: false, error: "Invalid request.", status: 400 };
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return {
      ok: true,
      payload: {
        name: "honeypot",
        email: "honeypot@example.com",
        phone: null,
        company: null,
        service: "Other",
        message: null,
        readyToFillDetails: null,
        business: null,
        attachments: [],
      },
    };
  }

  const name = asTrimmedString(body.name, 120);
  const email = asTrimmedString(body.email, 200);
  const phone = asTrimmedString(body.phone ?? "", 40);
  const company = asTrimmedString(body.company ?? "", 120);
  const service = asTrimmedString(body.service, 120);
  const message = asTrimmedString(body.message, 4000);

  if (!name || !email || !service || !message) {
    return {
      ok: false,
      error: "Please fill in name, email, service, and message.",
      status: 400,
    };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Enter a valid email address.", status: 400 };
  }
  if (!ALLOWED_SERVICES.has(service)) {
    return { ok: false, error: "Select a valid service.", status: 400 };
  }

  return {
    ok: true,
    payload: {
      name,
      email,
      phone,
      company,
      service,
      message,
      readyToFillDetails: null,
      business: null,
      attachments: [],
    },
  };
}

export async function POST(req: Request) {
  const parsed = await parsePayload(req);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: parsed.status });
  }

  // Silent success for honeypot
  if (parsed.payload.email === "honeypot@example.com") {
    return NextResponse.json({ ok: true });
  }

  const resendResult = await sendWithResend(parsed.payload);
  if (resendResult.ok) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json(
    {
      error:
        resendResult.message ||
        "Could not send your request. Please try again or email us directly.",
    },
    { status: resendResult.reason === "missing_key" ? 503 : 502 },
  );
}
