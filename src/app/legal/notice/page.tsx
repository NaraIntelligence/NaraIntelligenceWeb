import { LegalPage } from "@/components/LegalPage";
import { legalMetadata } from "@/lib/legal-metadata";

export const metadata = legalMetadata("notice");

export default function NoticePage() {
  return <LegalPage doc="notice" />;
}
