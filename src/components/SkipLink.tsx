"use client";

import { useLang } from "@/lib/lang-context";

export function SkipLink() {
  const { t } = useLang();
  return (
    <a className="skip-link" href="#main">
      {t.a11y.skipToContent}
    </a>
  );
}
