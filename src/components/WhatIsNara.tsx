"use client";

import type { Copy } from "@/lib/copy";
import { useLang } from "@/lib/lang-context";
import { useRequestInfo } from "@/lib/request-info-context";

type Chart = Copy["whatIsNara"]["charts"][number];

/** Horizontal bars: one series, one fill, values read straight off the bar end
 *  so nothing depends on an axis the reader has to trace back to. */
function BarChart({ chart, sourceLabel }: { chart: Chart; sourceLabel: string }) {
  const max = Math.max(...chart.bars.map((b) => b.value));

  return (
    <figure className="chart">
      <figcaption>
        <h3 className="chart__title">{chart.title}</h3>
        <p className="chart__note">{chart.note}</p>
      </figcaption>

      <div className="chart__plot">
        {chart.bars.map((bar) => (
          <div className="chart__row" key={bar.label}>
            <span className="chart__label">{bar.label}</span>
            <span className="chart__bar-track">
              <span
                className="chart__bar"
                style={{ width: `${(bar.value / max) * 100}%` }}
              />
            </span>
            <span className="chart__value">
              {bar.value}
              {chart.unit}
            </span>
          </div>
        ))}
      </div>

      <p className="chart__source">
        {sourceLabel}:{" "}
        <a href={chart.href} target="_blank" rel="noopener noreferrer">
          {chart.source}
        </a>
      </p>
    </figure>
  );
}

export function WhatIsNara() {
  const { t } = useLang();
  const { open } = useRequestInfo();
  const c = t.whatIsNara;

  return (
    <section className="what">
      <div className="what__intro shell">
        <p className="kicker">{c.kicker}</p>
        <h1 className="what__heading">{c.heading}</h1>
        <p className="what__lead">{c.intro}</p>
      </div>

      <div className="what__block shell">
        <h2 className="what__title">{c.whoTitle}</h2>
        <div className="what__prose">
          <p>{c.whoBody1}</p>
          <p>{c.whoBody2}</p>
        </div>
      </div>

      <div className="what__block shell">
        <h2 className="what__title">{c.sectorsTitle}</h2>
        <p className="what__body">{c.sectorsBody}</p>
        <ul className="what__sectors">
          {c.sectors.map((sector) => (
            <li key={sector}>{sector}</li>
          ))}
        </ul>
      </div>

      <div className="what__block shell">
        <h2 className="what__title">{c.orgTitle}</h2>
        <p className="what__body">{c.orgBody}</p>

        <div className="org">
          <div className="org__top">
            <p className="org__you">{c.orgYou}</p>
            <p className="org__you-note">{c.orgYouNote}</p>
          </div>

          <p className="org__tier-label">{c.orgDirectors}</p>
          <div className="org__tier">
            {t.directorAgents.map((director) => (
              <div className="org__branch" key={director.name}>
                <div className="org__director">
                  <p className="org__name">{director.name}</p>
                  <p className="org__role">{director.role}</p>
                </div>
                <ul className="org__reports">
                  {director.manages.map((name) => {
                    const employee = t.employeeAgents.find((e) => e.name === name);
                    return (
                      <li className="org__employee" key={name}>
                        <span className="org__name">{name}</span>
                        <span className="org__role">{employee?.role ?? ""}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <p className="org__tier-label org__tier-label--bottom">
            {c.orgEmployees}
          </p>
        </div>
      </div>

      <div className="what__block shell">
        <h2 className="what__title">{c.advantagesTitle}</h2>
        <div className="advantages">
          {c.advantages.map((advantage) => (
            <div className="advantage" key={advantage.title}>
              <h3 className="advantage__title">{advantage.title}</h3>
              <p className="advantage__body">{advantage.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="what__block what__block--data shell">
        <h2 className="what__title">{c.dataTitle}</h2>
        <p className="what__body">{c.dataBody}</p>

        <div className="stats">
          {c.stats.map((stat) => (
            <div className="stat" key={stat.value + stat.source}>
              <p className="stat__value">{stat.value}</p>
              <p className="stat__label">{stat.label}</p>
              <a
                className="stat__source"
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {stat.source}
              </a>
            </div>
          ))}
        </div>

        <div className="charts">
          {c.charts.map((chart) => (
            <BarChart key={chart.title} chart={chart} sourceLabel={c.sourceLabel} />
          ))}
        </div>
      </div>

      <div className="what__cta shell">
        <h2 className="what__cta-title">{c.ctaTitle}</h2>
        <p className="what__body">{c.ctaBody}</p>
        <button
          type="button"
          className="btn btn--solid btn--lg"
          onClick={() => open()}
        >
          {t.nav.cta}
        </button>
      </div>
    </section>
  );
}
