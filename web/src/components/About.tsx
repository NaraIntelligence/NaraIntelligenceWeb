"use client";

import { useLang } from "@/lib/lang-context";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function About() {
  const { t } = useLang();

  return (
    <section className="about" id="company">
      <div className="about__inner shell">
        <div className="about__visual">
          <ImagePlaceholder label={t.about.slotPlaceholder} />
        </div>

        <div>
          <p className="kicker">{t.about.kicker}</p>
          <h2 className="about__heading">{t.about.heading}</h2>
          <p className="about__text">{t.about.p1}</p>
          <p className="about__text">{t.about.p2}</p>

          <dl className="about__stats">
            <div>
              <dt className="about__stat-value">100%</dt>
              <dd className="about__stat-label">{t.about.stat1}</dd>
            </div>
            <div>
              <dt className="about__stat-value">24/7</dt>
              <dd className="about__stat-label">{t.about.stat2}</dd>
            </div>
            <div>
              <dt className="about__stat-value">ES</dt>
              <dd className="about__stat-label">{t.about.stat3}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
