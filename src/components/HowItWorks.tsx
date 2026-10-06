"use client";

import Image from "next/image";
import { useRef } from "react";
import { useLang } from "@/lib/lang-context";
import { useScrollProgress } from "@/lib/use-scroll-progress";
import { STEP_ICONS } from "./icons";

/** One still per step, crossfading as the steps change. `null` falls back
 *  to a typographic card (the step's number and title). */
const STEP_IMAGES: (string | null)[] = [
  "/images/steps/step-1-contact.jpg",
  "/images/steps/step-2-audit.jpg",
  "/images/steps/step-3-development.jpg",
  "/images/steps/step-4-payment.jpg",
];

function StepImage({ src, active }: { src: string; active: boolean }) {
  return (
    <div className={`steps__image${active ? " is-active" : ""}`} aria-hidden>
      <Image src={src} alt="" fill sizes="(max-width: 1080px) 360px, 560px" />
    </div>
  );
}

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
            {STEP_IMAGES.map((src, i) =>
              src ? (
                <StepImage key={src} src={src} active={activeStep === i} />
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
