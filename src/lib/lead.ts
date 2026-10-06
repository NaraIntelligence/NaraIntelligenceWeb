import { COPY, LANGS, type Lang } from "./copy";
import { PHONE_CODES } from "./phone-codes";

/**
 * The request-info lead, shared by the form and /api/lead so the browser and
 * the server enforce exactly the same rules. The server is the one that
 * counts; the client runs the same checks only to answer instantly.
 */

export type LeadField =
  | "name"
  | "interest"
  | "business"
  | "email"
  | "phone"
  | "consent";

export type LeadErrorCode =
  | "required"
  | "invalidEmail"
  | "invalidPhone"
  | "invalidOption"
  | "tooLong";

export type LeadErrors = Partial<Record<LeadField, LeadErrorCode>>;

/** What the form posts. `website` is the honeypot — humans never see it. */
export type LeadPayload = {
  name: string;
  interest: string;
  business: string;
  email: string;
  dial: string;
  phone: string;
  consent: boolean;
  agent: string | null;
  lang: Lang;
  page: string;
  website: string;
};

export type Lead = Omit<LeadPayload, "website">;

export const LEAD_MAX = {
  name: 120,
  interest: 80,
  business: 80,
  email: 254,
  phone: 32,
  agent: 60,
  page: 200,
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Either language's labels are valid — the visitor may switch mid-form.
const INTEREST_OPTIONS = new Set(LANGS.flatMap((l) => COPY[l].form.interestOptions));
const BUSINESS_OPTIONS = new Set(LANGS.flatMap((l) => COPY[l].form.businessOptions));
const DIAL_CODES = new Set(PHONE_CODES.map((c) => c.dial));

function str(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max + 1) : "";
}

/** Normalises untrusted input (anything JSON can hold) into a payload. */
export function readLeadPayload(input: unknown): LeadPayload {
  const raw = (input && typeof input === "object" ? input : {}) as Record<string, unknown>;
  return {
    name: str(raw.name, LEAD_MAX.name),
    interest: str(raw.interest, LEAD_MAX.interest),
    business: str(raw.business, LEAD_MAX.business),
    email: str(raw.email, LEAD_MAX.email),
    dial: str(raw.dial, 8),
    phone: str(raw.phone, LEAD_MAX.phone),
    consent: raw.consent === true,
    agent: str(raw.agent, LEAD_MAX.agent) || null,
    lang: raw.lang === "es" ? "es" : "en",
    page: str(raw.page, LEAD_MAX.page),
    website: str(raw.website, 200),
  };
}

export function validateLead(lead: Lead): LeadErrors {
  const errors: LeadErrors = {};

  const required = ["name", "interest", "business", "email", "phone"] as const;
  for (const field of required) {
    if (!lead[field]) errors[field] = "required";
    else if (lead[field].length > LEAD_MAX[field]) errors[field] = "tooLong";
  }

  if (!errors.interest && !INTEREST_OPTIONS.has(lead.interest))
    errors.interest = "invalidOption";
  if (!errors.business && !BUSINESS_OPTIONS.has(lead.business))
    errors.business = "invalidOption";

  if (!errors.email && !EMAIL_RE.test(lead.email)) errors.email = "invalidEmail";

  // Digits only once spacing and separators are stripped.
  const digits = lead.phone.replace(/[\s.()-]/g, "");
  if (!errors.phone && (!/^\+?\d{6,15}$/.test(digits) || !DIAL_CODES.has(lead.dial)))
    errors.phone = "invalidPhone";

  if (!lead.consent) errors.consent = "required";

  return errors;
}
