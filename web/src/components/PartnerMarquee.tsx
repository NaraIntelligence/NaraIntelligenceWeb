"use client";

import { PARTNERS } from "@/lib/copy";
import { useLang } from "@/lib/lang-context";

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="partners__group" aria-hidden={hidden || undefined}>
      {PARTNERS.map((name) => (
        <span className="partners__item" key={name}>
          {name}
        </span>
      ))}
    </div>
  );
}

/**
 * Infinite ribbon of partner wordmarks. The track holds two identical
 * groups and slides exactly -50%, so the loop is seamless; the edges are
 * masked so names dissolve instead of popping in and out.
 */
export function PartnerMarquee() {
  const { t } = useLang();

  return (
    <section className="partners" aria-label={t.partnersLabel}>
      <p className="partners__label">{t.partnersLabel}</p>
      <div className="partners__strip">
        <div className="partners__track">
          <Group />
          <Group hidden />
        </div>
      </div>
    </section>
  );
}
