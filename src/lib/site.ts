import { CONTACT_EMAIL } from "./copy";

/** Canonical origin, no trailing slash. Override per environment with
 *  NEXT_PUBLIC_SITE_URL (see .env.example). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://naraintelligences.com"
).replace(/\/$/, "");

export const SITE_NAME = "Nara Intelligence";

export const SITE_DESCRIPTION =
  "We design, train and deploy AI agents that run real workflows in your company — with the precision and availability of one more employee.";

/** Every public route, for the sitemap. */
export const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/what-is-nara", priority: 0.8 },
  { path: "/legal/notice", priority: 0.2 },
  { path: "/legal/privacy", priority: 0.2 },
  { path: "/legal/cookies", priority: 0.2 },
] as const;

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  email: CONTACT_EMAIL,
  description: SITE_DESCRIPTION,
  areaServed: "ES",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: CONTACT_EMAIL,
    availableLanguage: ["English", "Spanish"],
  },
};
