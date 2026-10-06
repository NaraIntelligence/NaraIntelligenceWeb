"use client";

import Image from "next/image";
import { useLang } from "@/lib/lang-context";
import { useRequestInfo } from "@/lib/request-info-context";

export function Hero() {
  const { t } = useLang();
  const { open } = useRequestInfo();

  return (
    <section className="hero shell" id="top">
      <div>
        <h1 className="hero__title">{t.hero.headline}</h1>
        <p className="hero__subtitle">{t.hero.subtitle}</p>
        <div className="hero__actions">
          <button
            type="button"
            className="btn btn--solid btn--md"
            onClick={() => open()}
          >
            {t.hero.ctaPrimary}
          </button>
          <a className="btn btn--outline btn--md" href="#how-it-works">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>

      <div className="hero__visual">
        {/* No frame — the android sits straight on the page; a soft mask
            dissolves the still's black into the ambient glow. */}
        <div className="hero__still">
          <Image
            src="/images/hero.jpg"
            alt={t.hero.imageLabel}
            fill
            preload
            sizes="(max-width: 1080px) 460px, 520px"
          />
        </div>
      </div>
    </section>
  );
}
