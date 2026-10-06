"use client";

import { useRef } from "react";
import { preload } from "react-dom";
import { useLang } from "@/lib/lang-context";
import { useMutedAutoplay } from "@/lib/use-muted-autoplay";
import { useRequestInfo } from "@/lib/request-info-context";

export function Hero() {
  const { t } = useLang();
  const { open } = useRequestInfo();
  const videoRef = useRef<HTMLVideoElement>(null);
  useMutedAutoplay(videoRef, true);
  // The poster is the first thing painted in the hero (the LCP element), so
  // fetch it alongside the HTML instead of waiting for the video element.
  preload("/assets/hero-agent-poster.jpg", { as: "image", fetchPriority: "high" });

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
        {/* No frame, no border — the agent sits straight on the page's black,
            scaled to `contain` so the moving arm is never clipped. */}
        <video
          ref={videoRef}
          className="hero__video"
          src="/assets/hero-agent.mp4"
          poster="/assets/hero-agent-poster.jpg"
          loop
          muted
          playsInline
          preload="auto"
          aria-label={t.hero.videoLabel}
        />
        <div className="hero__fade" />
      </div>
    </section>
  );
}
