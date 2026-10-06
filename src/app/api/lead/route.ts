import { Resend } from "resend";
import { readLeadPayload, validateLead, type Lead } from "@/lib/lead";
import { createRateLimiter } from "@/lib/rate-limit";

/** 5 requests per IP every 10 minutes. */
const rateLimit = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

const MAX_BODY_BYTES = 10_000;

function json(body: unknown, status = 200, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}

function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  const limited = rateLimit(clientIp(request));
  if (!limited.ok) {
    return json({ error: "rate_limited" }, 429, {
      "Retry-After": String(limited.retryAfter),
    });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json({ error: "too_large" }, 413);

  let input: unknown;
  try {
    input = JSON.parse(raw);
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const { website, ...lead } = readLeadPayload(input);

  // Honeypot filled in: a bot. Answer like a success so it learns nothing.
  if (website) return json({ ok: true });

  const errors = validateLead(lead);
  if (Object.keys(errors).length > 0) {
    return json({ error: "invalid", fields: errors }, 400);
  }

  const emailConfigured = Boolean(
    process.env.RESEND_API_KEY &&
      process.env.LEAD_TO_EMAIL &&
      process.env.LEAD_FROM_EMAIL,
  );
  const webhookConfigured = Boolean(process.env.N8N_WEBHOOK_URL);

  if (!emailConfigured && !webhookConfigured) {
    if (process.env.NODE_ENV !== "production") {
      // Local development without keys: the lead is still visible somewhere.
      console.info("[lead] no delivery configured — logging instead:", lead);
      return json({ ok: true });
    }
    console.error("[lead] RESEND_* and N8N_WEBHOOK_URL are all unset");
    return json({ error: "not_configured" }, 503);
  }

  const [email, webhook] = await Promise.allSettled([
    emailConfigured ? sendEmail(lead) : Promise.resolve(null),
    webhookConfigured ? postWebhook(lead) : Promise.resolve(null),
  ]);

  if (email.status === "rejected") console.error("[lead] email failed:", email.reason);
  if (webhook.status === "rejected") console.error("[lead] n8n webhook failed:", webhook.reason);

  // Email is the delivery that counts; the webhook is a bonus and can't break
  // a submission. Without email configured, the webhook has to land instead.
  const delivered = emailConfigured
    ? email.status === "fulfilled"
    : webhook.status === "fulfilled";

  return delivered ? json({ ok: true }) : json({ error: "delivery_failed" }, 502);
}

function rows(lead: Lead): [string, string][] {
  return [
    ["Nombre", lead.name],
    ["Email", lead.email],
    ["Teléfono", `${lead.dial} ${lead.phone}`],
    ["Área de interés", lead.interest],
    ["Tipo de negocio", lead.business],
    ["Agente", lead.agent ?? "—"],
    ["Idioma", lead.lang.toUpperCase()],
    ["Página", lead.page || "/"],
    ["Consentimiento privacidad", lead.consent ? "Sí" : "No"],
  ];
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendEmail(lead: Lead) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.LEAD_TO_EMAIL!.split(",").map((s) => s.trim()).filter(Boolean);
  const subject = `Nuevo lead: ${lead.name} — ${lead.agent ? `contratar a ${lead.agent}` : lead.interest}`;

  const table = rows(lead)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#666;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  const { error } = await resend.emails.send({
    from: process.env.LEAD_FROM_EMAIL!,
    to,
    replyTo: lead.email,
    subject,
    text: rows(lead).map(([k, v]) => `${k}: ${v}`).join("\n"),
    html: `<p>Nueva solicitud desde la web de Nara Intelligence.</p><table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${table}</table><p style="color:#666;font-size:12px">Responde a este email para contestar directamente a ${escapeHtml(lead.email)}.</p>`,
  });

  if (error) throw new Error(`${error.name}: ${error.message}`);
}

async function postWebhook(lead: Lead) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.N8N_WEBHOOK_SECRET) {
    headers["X-Nara-Secret"] = process.env.N8N_WEBHOOK_SECRET;
  }

  const res = await fetch(process.env.N8N_WEBHOOK_URL!, {
    method: "POST",
    headers,
    body: JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }),
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
}
