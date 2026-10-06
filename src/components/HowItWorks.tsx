"use client";

import { useEffect, useRef } from "react";
import { useLang } from "@/lib/lang-context";
import { useScrollProgress } from "@/lib/use-scroll-progress";
import { STEP_ICONS } from "./icons";

/** One visual per step. `null` = no video yet: the step shows a typographic
 *  card (its number and title) instead, crossfading exactly like a video. */
const STEP_VIDEOS: (string | null)[] = [
  "/assets/step-contact.mp4",
  "/assets/step-audit.mp4",
  null,
  null,
];

function StepCard({
  n,
  title,
  active,
}: {
  n: string;
  title: string;
  active: boolean;
}) {
  return (
    <div className={`steps__card${active ? " is-active" : ""}`} aria-hidden>
      <span className="steps__card-n">{n}</span>
      <span className="steps__card-title">{title}</span>
    </div>
  );
}

function StepVideo({ src, active }: { src: string; active: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  // Both videos stay mounted so the swap is a 1s crossfade rather than a
  // pop, but only the active one is allowed to decode frames.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!active) {
      el.pause();
      return;
    }

    el.muted = true;
    el.defaultMuted = true;
    const tryPlay = () => {
      void el.play().catch(() => {});
    };
    tryPlay();
    el.addEventListener("canplay", tryPlay);
    return () => el.removeEventListener("canplay", tryPlay);
  }, [active]);

  return (
    <video
      ref={ref}
      className={`steps__video${active ? " is-active" : ""}`}
      src={src}
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden
    />
  );
}

export function HowItWorks() {
  const { t } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(trackRef);

  // The active step is a pure function of scroll position — the track is
  // 400vh, so each step owns a quarter of it.
  const stepCount = t.stepList.length;
  const activeStep = Math.min(
    stepCount - 1,
    Math.floor(progress * stepCount),
  );

  return (
    <section className="steps" id="how-it-works">
      <div className="steps__intro shell">
        <div className="steps__intro-inner">
          <p className="kicker">{t.steps.kicker}</p>
          <h2 className="steps__heading">{t.steps.heading}</h2>
        </div>
      </div>

      <div className="steps__track" ref={trackRef}>
        <div className="steps__sticky">
          <div className="steps__visual">
            {STEP_VIDEOS.map((src, i) =>
              src ? (
                <StepVideo key={src} src={src} active={activeStep === i} />
              ) : (
                <StepCard
                  key={`card-${i}`}
                  n={String(i + 1).padStart(2, "0")}
                  title={t.stepList[i].title}
                  active={activeStep === i}
                />
              ),
            )}
          </div>

          <ol className="steps__list">
            {t.stepList.map((step, i) => {
              const Icon = STEP_ICONS[i];
              const active = activeStep === i;
              return (
                <li
                  className={`step${active ? " is-active" : ""}`}
                  key={step.title}
                  aria-current={active ? "step" : undefined}
                >
                  <span className="step__n">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="step__icon">
                    <Icon />
                  </span>
                  <div>
                    <h3 className="step__title">{step.title}</h3>
                    <p className="step__body">{step.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
