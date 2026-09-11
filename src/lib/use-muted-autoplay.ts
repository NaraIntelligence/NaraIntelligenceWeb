"use client";

import { useEffect, type RefObject } from "react";

/**
 * Autoplays a video under Chrome's autoplay policy.
 *
 * Two details the prototype had to discover the hard way, kept here:
 *  1. `muted` must be set as a DOM *property* before play() — the JSX/HTML
 *     attribute alone is not enough for the policy check.
 *  2. play() can lose a race against loading, so it is retried on `canplay`.
 */
export function useMutedAutoplay(
  ref: RefObject<HTMLVideoElement | null>,
  shouldPlay: boolean,
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!shouldPlay) {
      el.pause();
      return;
    }

    el.muted = true;
    el.defaultMuted = true;

    const tryPlay = () => {
      void el.play().catch(() => {
        /* Autoplay refused (e.g. data saver) — the poster frame stays up. */
      });
    };

    tryPlay();
    el.addEventListener("canplay", tryPlay);

    return () => el.removeEventListener("canplay", tryPlay);
  }, [ref, shouldPlay]);
}
