"use client";

import { useRef } from "react";
import { useLang } from "@/lib/lang-context";
import { useMutedAutoplay } from "@/lib/use-muted-autoplay";

export function Hero() {
  const { t } = useLang();
  const videoRef = useRef<HTMLVideoElement>(null);
  useMutedAutoplay(videoRef, true);

  return (
    <section className="hero shell" id="top">
      <div>
        <h1 className="hero__title">{t.hero.headline}</h1>
        <p className="hero__subtitle">{t.hero.subtitle}</p>
        <div className="hero__actions">
          <a className="btn btn--solid btn--md" href="#contact">
            {t.hero.ctaPrimary}
          </a>
          <a className="btn btn--outline btn--md" href="#how-it-works">
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>

      <div className="hero__visual">
        {/* No frame, no border — the agent sits straight on the page's black,
            scaled to `contain` so the moving arm is never clipped. */}
        <video
          ref={videoRef}
          className="hero__video"
          src="/assets/hero-agent.mp4"
          loop
          muted
          playsInline
          preload="auto"
          aria-label={t.hero.slotPlaceholder}
        />
        <div className="hero__fade" />
      </div>
    </section>
  );
}
