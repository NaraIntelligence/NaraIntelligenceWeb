"use client";

import { useLang } from "@/lib/lang-context";
import type { Copy } from "@/lib/copy";

type DirectorAgent = Copy["directorAgents"][number];
type EmployeeAgent = Copy["employeeAgents"][number];

function PosterCard({
  agent,
  department,
  tier,
  directorBadge,
  managesLabel,
  hidden = false,
}: {
  agent: DirectorAgent | EmployeeAgent;
  department: string;
  tier: "director" | "employee";
  directorBadge: string;
  managesLabel: string;
  hidden?: boolean;
}) {
  const manages = "manages" in agent ? agent.manages : null;

  return (
    <article
      className={`poster-card poster-card--${tier}`}
      aria-hidden={hidden || undefined}
    >
      <div className="poster-card__art">
        <span className="poster-card__mark" aria-hidden>
          {agent.name.charAt(0)}
        </span>
        <span className="poster-card__dept">{department}</span>
        {tier === "director" && (
          <span className="poster-card__badge">{directorBadge}</span>
        )}
      </div>

      <div className="poster-card__info">
        <p className="poster-card__name">{agent.name}</p>
        <p className="poster-card__role">{agent.role}</p>
        <p className="poster-card__desc">{agent.description}</p>
        {manages && manages.length > 0 && (
          <p className="poster-card__manages">
            {managesLabel} {manages.join(", ")}
          </p>
        )}
      </div>
    </article>
  );
}

function PosterRail({
  agents,
  departments,
  tier,
  directorBadge,
  managesLabel,
  reverse = false,
}: {
  agents: (DirectorAgent | EmployeeAgent)[];
  departments: Copy["departments"];
  tier: "director" | "employee";
  directorBadge: string;
  managesLabel: string;
  reverse?: boolean;
}) {
  const cards = (hidden: boolean) =>
    agents.map((agent) => (
      <PosterCard
        key={`${hidden ? "dup-" : ""}${agent.name}`}
        agent={agent}
        department={departments[agent.department]}
        tier={tier}
        directorBadge={directorBadge}
        managesLabel={managesLabel}
        hidden={hidden}
      />
    ));

  return (
    <div className="poster-rail">
      <div
        className={`poster-track${reverse ? " poster-track--reverse" : ""}`}
      >
        {cards(false)}
        {cards(true)}
      </div>
    </div>
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
        <PosterRail
          agents={t.directorAgents}
          departments={t.departments}
          tier="director"
          directorBadge={t.products.directorBadge}
          managesLabel={t.products.managesLabel}
        />
      </div>

      <div className="agent-group">
        <div className="agent-group__head shell">
          <h3 className="agent-group__label">{t.products.employeesLabel}</h3>
          <p className="agent-group__note">{t.products.employeesNote}</p>
        </div>
        <PosterRail
          agents={t.employeeAgents}
          departments={t.departments}
          tier="employee"
          directorBadge={t.products.directorBadge}
          managesLabel={t.products.managesLabel}
          reverse
        />
      </div>
    </section>
  );
}
