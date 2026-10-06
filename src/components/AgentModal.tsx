"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Copy } from "@/lib/copy";
import { useLang } from "@/lib/lang-context";

export type Agent = Copy["directorAgents"][number] | Copy["employeeAgents"][number];

/** Mounted only while a poster is selected — a fresh instance per agent, so
 *  the photo-fallback state never leaks from one profile to the next. */
export function AgentModal({
  agent,
  department,
  onClose,
  onHire,
}: {
  agent: Agent | null;
  department: string;
  onClose: () => void;
  onHire: (name: string) => void;
}) {
  if (!agent) return null;
  return (
    <AgentSheet
      key={agent.name}
      agent={agent}
      department={department}
      onClose={onClose}
      onHire={onHire}
    />
  );
}

function AgentSheet({
  agent,
  department,
  onClose,
  onHire,
}: {
  agent: Agent;
  department: string;
  onClose: () => void;
  onHire: (name: string) => void;
}) {
  const { t } = useLang();
  const [noPhoto, setNoPhoto] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const manages = "manages" in agent ? agent.manages : null;

  return (
    <div
      className="modal"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal__panel modal__panel--agent"
        role="dialog"
        aria-modal="true"
        aria-label={agent.name}
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label={t.products.closeLabel}
        >
          ×
        </button>

        <div className="agent-sheet">
          <div className="agent-sheet__art">
            <span className="agent-sheet__mark" aria-hidden>
              {agent.name.charAt(0)}
            </span>
            {agent.photo && !noPhoto && (
              <Image
                className="agent-sheet__photo"
                src={agent.photo}
                alt=""
                fill
                sizes="240px"
                onError={() => setNoPhoto(true)}
              />
            )}
          </div>

          <div className="agent-sheet__body">
            <p className="agent-sheet__dept">{department}</p>
            <h2 className="agent-sheet__name">{agent.name}</h2>
            <p className="agent-sheet__role">{agent.role}</p>
            <p className="agent-sheet__detail">{agent.detail}</p>

            <p className="agent-sheet__label">{t.products.tasksLabel}</p>
            <ul className="agent-sheet__tasks">
              {agent.tasks.map((task) => (
                <li key={task}>{task}</li>
              ))}
            </ul>

            {manages && manages.length > 0 && (
              <p className="agent-sheet__manages">
                {t.products.managesLabel} {manages.join(", ")}
              </p>
            )}

            <button
              type="button"
              className="btn btn--solid btn--md agent-sheet__hire"
              onClick={() => onHire(agent.name)}
            >
              {t.products.hirePrefix} {agent.name}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
