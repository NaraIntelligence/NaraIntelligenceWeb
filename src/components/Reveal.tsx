"use client";

import { useRef } from "react";
import { useLang } from "@/lib/lang-context";
import { useScrollProgress } from "@/lib/use-scroll-progress";
import { ImagePlaceholder } from "./ImagePlaceholder";

/**
 * "Under the hood" — the further you scroll, the more of the android's
 * outer shell is clipped away from the bottom up, and the more of its
 * interior shows through.
 *
 * Layer order matters: the interior sits at the back unclipped, an opaque
 * backing clipped to the same path sits in the middle so the interior can't
 * bleed through the shell, and the outer shell on top shares that clip.
 */
export function Reveal() {
  const { t } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(trackRef);

  const clipPath = `inset(0 0 ${Math.round(progress * 100)}% 0)`;

  return (
    <section className="reveal" ref={trackRef} aria-label={t.reveal.kicker}>
      <div className="reveal__sticky">
        <p className="reveal__kicker">{t.reveal.kicker}</p>

        <div className="reveal__frame">
          <ImagePlaceholder
            className="reveal__layer"
            label={t.reveal.innerPlaceholder}
          />
          <div className="reveal__backing" style={{ clipPath }} />
          <ImagePlaceholder
            className="reveal__layer"
            label={t.reveal.outerPlaceholder}
            style={{ clipPath }}
          />
        </div>

        <p className="reveal__caption">{t.reveal.caption}</p>
      </div>
    </section>
  );
}
