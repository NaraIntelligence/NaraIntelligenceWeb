"use client";

import Image from "next/image";
import { useState } from "react";
import type { Copy } from "@/lib/copy";
import { useLang } from "@/lib/lang-context";
import { useRequestInfo } from "@/lib/request-info-context";
import { AgentModal, type Agent } from "./AgentModal";

/** Card + gap, kept in sync with `.poster-card` in globals.css. */
const CARD_STRIDE = 264;
/** A single loop of the track has to outrun the widest screen, or the rail
 *  empties out and visibly snaps back at the end of each cycle. Sized for
 *  an ultrawide monitor, not just a laptop. */
const MIN_LOOP_WIDTH = 2900;

function repeatsFor(count: number) {
  return Math.max(1, Math.ceil(MIN_LOOP_WIDTH / (count * CARD_STRIDE)));
}

function PosterCard({
  agent,
  tier,
  department,
  directorBadge,
  openHint,
  onOpen,
  hidden,
}: {
  agent: Agent;
  tier: "director" | "employee";
  department: string;
  directorBadge: string;
  openHint: string;
  onOpen: () => void;
  hidden: boolean;
}) {
  const [noPhoto, setNoPhoto] = useState(false);

  return (
    <button
      type="button"
      className={`poster-card poster-card--${tier}`}
      onClick={onOpen}
      tabIndex={hidden ? -1 : undefined}
      aria-hidden={hidden || undefined}
    >
      <span className="poster-card__art">
        <span className="poster-card__mark" aria-hidden>
          {agent.name.charAt(0)}
        </span>

        {!noPhoto && (
          <Image
            className="poster-card__photo"
            src={agent.photo}
            alt=""
            fill
            sizes="240px"
            onError={() => setNoPhoto(true)}
          />
        )}

        <span className="poster-card__dept">{department}</span>
        {tier === "director" && (
          <span className="poster-card__badge">{directorBadge}</span>
        )}

        <span className="poster-card__reveal">
          <span className="poster-card__name">{agent.name}</span>
          <span className="poster-card__role">{agent.role}</span>
          <span className="poster-card__desc">{agent.description}</span>
          <span className="poster-card__open">{openHint} →</span>
        </span>
      </span>
    </button>
  );
}

function PosterRail({
  agents,
  departments,
  tier,
  directorBadge,
  openHint,
  onOpen,
  reverse = false,
}: {
  agents: Agent[];
  departments: Copy["departments"];
  tier: "director" | "employee";
  directorBadge: string;
  openHint: string;
  onOpen: (agent: Agent) => void;
  reverse?: boolean;
}) {
  // One "loop" is the list repeated enough times to be wider than the
  // screen; the track then holds two of those and slides exactly -50%.
  const loop = Array.from({ length: repeatsFor(agents.length) }, () => agents).flat();

  const renderLoop = (copy: number) =>
    loop.map((agent, i) => (
      <PosterCard
        key={`${copy}-${i}-${agent.name}`}
        agent={agent}
        tier={tier}
        department={departments[agent.department]}
        directorBadge={directorBadge}
        openHint={openHint}
        onOpen={() => onOpen(agent)}
        hidden={copy === 1}
      />
    ));

  return (
    <div className="poster-rail">
      <div className={`poster-track${reverse ? " poster-track--reverse" : ""}`}>
        {renderLoop(0)}
        {renderLoop(1)}
      </div>
    </div>
  );
}

export function Products() {
  const { t } = useLang();
  const { open: openRequestInfo } = useRequestInfo();
  const [selected, setSelected] = useState<Agent | null>(null);

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
          openHint={t.products.openHint}
          onOpen={setSelected}
        />
      </div>

      <div className="agent-group">
        <div className="agent-group__head shell">
          <div className="agent-group__heading">
            <h3 className="agent-group__label">{t.products.employeesLabel}</h3>
            <button
              type="button"
              className="agent-group__cta"
              onClick={() => openRequestInfo()}
            >
              {t.products.employeesCta} →
            </button>
          </div>
          <p className="agent-group__note">{t.products.employeesNote}</p>
        </div>
        <PosterRail
          agents={t.employeeAgents}
          departments={t.departments}
          tier="employee"
          directorBadge={t.products.directorBadge}
          openHint={t.products.openHint}
          onOpen={setSelected}
          reverse
        />
      </div>

      <AgentModal
        agent={selected}
        department={selected ? t.departments[selected.department] : ""}
        onClose={() => setSelected(null)}
        onHire={(name) => {
          setSelected(null);
          openRequestInfo(name);
        }}
      />
    </section>
  );
}
