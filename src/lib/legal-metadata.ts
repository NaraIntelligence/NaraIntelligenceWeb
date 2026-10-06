import type { Metadata } from "next";
import { getLegalDoc, legalEntityPending, type LegalDocId } from "./legal";

const DESCRIPTIONS: Record<LegalDocId, string> = {
  notice:
    "Legal notice of Nara Intelligence: who runs this website, terms of use, intellectual property and applicable law.",
  privacy:
    "How Nara Intelligence handles the personal data sent through its contact form, the legal basis, retention and your GDPR rights.",
  cookies:
    "Nara Intelligence uses no tracking or advertising cookies. What the site stores in your browser and how visits are measured.",
};

let warned = false;

/** Static metadata for a legal page — titles come from the English copy,
 *  which is what the server renders. */
export function legalMetadata(id: LegalDocId): Metadata {
  if (legalEntityPending() && !warned) {
    warned = true;
    console.warn(
      "\n⚠ Legal pages: LEGAL_ENTITY in src/lib/legal.ts still has placeholder values — fill them in before going live.\n",
    );
  }
  return {
    title: getLegalDoc(id, "en").title,
    description: DESCRIPTIONS[id],
    alternates: { canonical: `/legal/${id}` },
  };
}
