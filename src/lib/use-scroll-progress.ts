"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * Progress (0 → 1) of an element scrolling past a sticky viewport-height pane.
 * 0 while the element's top is at or below the viewport top, 1 once its bottom
 * edge has reached the bottom of the viewport — the same math the prototype
 * used, but rAF-throttled so scrolling stays smooth alongside the videos.
 */
export function useScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const next =
        total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      setProgress((prev) => (Math.abs(next - prev) > 0.004 ? next : prev));
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);

  return progress;
}
