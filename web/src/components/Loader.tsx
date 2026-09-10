"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";

/**
 * Full-bleed intro card. The slogan the user moved out of the hero lives
 * here: it shimmers, fades at 1.4s, and the overlay unmounts at 2s.
 */
export function Loader() {
  const { t } = useLang();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setVisible(false), 2000);
    return () => window.clearTimeout(id);
  }, []);

  if (!visible) return null;

  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__text shimmer">{t.hero.welcome}</span>
    </div>
  );
}
