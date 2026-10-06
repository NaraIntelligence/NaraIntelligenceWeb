import { LegalPage } from "@/components/LegalPage";
import { legalMetadata } from "@/lib/legal-metadata";

export const metadata = legalMetadata("cookies");

export default function CookiesPage() {
  return <LegalPage doc="cookies" />;
}
