"use client";

import { useLang } from "@/lib/lang-context";
import type { Copy } from "@/lib/copy";

type DirectorAgent = Copy["directorAgents"][number];
type EmployeeAgent = Copy["employeeAgents"][number];

/** Each card sticks a little lower than the one before it, so as you scroll
 * the next card slides up and covers the previous one, leaving a sliver of
 * it peeking out above — the "stacked deck" effect. */
const STACK_STEP = 18;
const STACK_BASE = 16;

function AgentCard({
  agent,
  index,
  department,
  tier,
  directorBadge,
  managesLabel,
}: {
  agent: DirectorAgent | EmployeeAgent;
  index: number;
  department: string;
  tier: "director" | "employee";
  directorBadge: string;
  managesLabel: string;
}) {
  const manages = "manages" in agent ? agent.manages : null;

  return (
    <article
      className={`agent-card agent-card--${tier}`}
      style={{
        top: `calc(var(--nav-height) + ${STACK_BASE + index * STACK_STEP}px)`,
        zIndex: index + 1,
      }}
    >
      {tier === "director" && (
        <span className="agent-card__badge">{directorBadge}</span>
      )}

      <div className="agent-card__top">
        <span className="agent-card__avatar" aria-hidden>
          {agent.name.charAt(0)}
        </span>
        <div className="agent-card__id">
          <p className="agent-card__name">{agent.name}</p>
          <p className="agent-card__role">{agent.role}</p>
        </div>
        <span className="agent-card__dept">{department}</span>
      </div>

      <p className="agent-card__desc">{agent.description}</p>

      {manages && manages.length > 0 && (
        <p className="agent-card__manages">
          {managesLabel} {manages.join(", ")}
        </p>
      )}
    </article>
  );
}

export function Products() {
  const { t } = useLang();

  return (
    <section className="products" id="products">
      <div className="products__intro shell">
        <div className="products__intro-inner">
          <p className="kicker">{t.products.kicker}</p>
          <h2 className="products__heading">{t.products.heading}</h2>
          <p className="products__subheading">{t.products.subheading}</p>
        </div>
      </div>

      <div className="agent-group">
        <div className="agent-group__head shell">
          <h3 className="agent-group__label">{t.products.directorsLabel}</h3>
          <p className="agent-group__note">{t.products.directorsNote}</p>
        </div>
        <div className="agent-stack shell">
          {t.directorAgents.map((agent, i) => (
            <AgentCard
              key={agent.name}
              agent={agent}
              index={i}
              department={t.departments[agent.department]}
              tier="director"
              directorBadge={t.products.directorBadge}
              managesLabel={t.products.managesLabel}
            />
          ))}
        </div>
      </div>

      <div className="agent-group">
        <div className="agent-group__head shell">
          <h3 className="agent-group__label">{t.products.employeesLabel}</h3>
          <p className="agent-group__note">{t.products.employeesNote}</p>
        </div>
        <div className="agent-stack shell">
          {t.employeeAgents.map((agent, i) => (
            <AgentCard
              key={agent.name}
              agent={agent}
              index={i}
              department={t.departments[agent.department]}
              tier="employee"
              directorBadge={t.products.directorBadge}
              managesLabel={t.products.managesLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
