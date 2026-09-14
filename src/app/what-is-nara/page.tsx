import type { Metadata } from "next";
import { WhatIsNara } from "@/components/WhatIsNara";

export const metadata: Metadata = {
  title: "What is Nara Intelligence — a workforce you hire",
  description:
    "How Nara Intelligence builds digital employees: the director-and-specialist org chart, why it works, and the public data behind it.",
};

export default function WhatIsNaraPage() {
  return <WhatIsNara />;
}
