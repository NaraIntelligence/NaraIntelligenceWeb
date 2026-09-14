"use client";

import Image from "next/image";
import { PARTNERS } from "@/lib/copy";
import { useLang } from "@/lib/lang-context";

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="partners__group" aria-hidden={hidden || undefined}>
      {PARTNERS.map((partner) => (
        <span className="partners__item" key={partner.name}>
          <Image
            className="partners__logo"
            src={partner.logo}
            alt={partner.name}
            width={120}
            height={40}
          />
        </span>
      ))}
    </div>
  );
}

/**
 * Infinite ribbon of partner logos. The track holds two identical
 * groups and slides exactly -50%, so the loop is seamless; the edges are
 * masked so logos dissolve instead of popping in and out.
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
