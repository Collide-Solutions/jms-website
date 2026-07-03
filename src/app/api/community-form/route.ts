import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RECIPIENTS = {
  contractor: "danish@jmsuniversal.com",
  vendor: "purchase@jmsuniversal.com",
  career: "hr@jmsuniversal.com",
} as const;

const FORM_LABELS = {
  contractor: "Contractor Registration",
  vendor: "Vendor Registration",
  career: "Join Our Team",
} as const;

type FormType = keyof typeof RECIPIENTS;

function isFormType(value: FormDataEntryValue | null): value is FormType {
  return typeof value === "string" && value in RECIPIENTS;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatLabel(name: string) {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    return NextResponse.json(
      { error: "Email service is not configured. Add RESEND_API_KEY and RESEND_FROM_EMAIL." },
      { status: 500 },
    );
  }

  const formData = await request.formData();
  const formType = formData.get("formType");

  if (!isFormType(formType)) {
    return NextResponse.json({ error: "Invalid form type." }, { status: 400 });
  }

  const fields: Array<[string, string]> = [];
  const attachments: Array<{ filename: string; content: string }> = [];

  for (const [key, value] of formData.entries()) {
    if (key === "formType") continue;

    if (value instanceof File) {
      if (!value.name || value.size === 0) continue;
      const bytes = Buffer.from(await value.arrayBuffer());
      attachments.push({
        filename: value.name,
        content: bytes.toString("base64"),
      });
      continue;
    }

    fields.push([key, value]);
  }

  const rows = fields
    .map(([key, value]) => {
      return `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e4e7ec;font-weight:700;color:#071b3b;width:38%;">${escapeHtml(formatLabel(key))}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e4e7ec;color:#344054;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>
      `;
    })
    .join("");

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;background:#f5f7fa;padding:24px;">
      <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #e4e7ec;border-radius:14px;overflow:hidden;">
        <div style="background:#071b3b;color:#ffffff;padding:22px 24px;">
          <p style="margin:0 0 6px;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#d0d5dd;">JMS Website Submission</p>
          <h1 style="margin:0;font-size:24px;line-height:1.2;">${escapeHtml(FORM_LABELS[formType])}</h1>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tbody>${rows}</tbody>
        </table>
        ${
          attachments.length
            ? `<p style="margin:0;padding:16px 24px;color:#667085;font-size:13px;">${attachments.length} attachment(s) included.</p>`
            : ""
        }
      </div>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [RECIPIENTS[formType]],
      subject: `Website: ${FORM_LABELS[formType]}`,
      html,
      reply_to: fields.find(([key]) => key === "email")?.[1],
      attachments,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return NextResponse.json({ error: "Unable to send email.", details: error }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
