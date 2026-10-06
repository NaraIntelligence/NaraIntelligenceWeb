import { LegalPage } from "@/components/LegalPage";
import { legalMetadata } from "@/lib/legal-metadata";

export const metadata = legalMetadata("privacy");

export default function PrivacyPage() {
  return <LegalPage doc="privacy" />;
}
