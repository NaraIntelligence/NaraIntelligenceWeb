"use client";

import Link from "next/link";
import { Fragment } from "react";
import { useLang } from "@/lib/lang-context";
import { getLegalDoc, type LegalDocId } from "@/lib/legal";

const LINKABLE = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+|https?:\/\/[^\s)]+)/g;

/** Turns emails and URLs inside legal copy into real links. */
function Linkified({ text }: { text: string }) {
  return text.split(LINKABLE).map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
    const href = part.includes("@") ? `mailto:${part}` : part;
    return (
      <a key={i} href={href} rel="noopener noreferrer" target={part.includes("@") ? undefined : "_blank"}>
        {part}
      </a>
    );
  });
}

export function LegalPage({ doc }: { doc: LegalDocId }) {
  const { lang, t } = useLang();
  const content = getLegalDoc(doc, lang);

  const others: { id: LegalDocId; href: string; label: string }[] = [
    { id: "notice", href: "/legal/notice", label: t.footer.notice },
    { id: "privacy", href: "/legal/privacy", label: t.footer.privacy },
    { id: "cookies", href: "/legal/cookies", label: t.footer.cookies },
  ];

  return (
    <article className="legal shell">
      <p className="kicker">{t.footer.legalLabel}</p>
      <h1 className="legal__title">{content.title}</h1>
      <p className="legal__updated">{content.updated}</p>
      <p className="legal__intro">
        <Linkified text={content.intro} />
      </p>

      {content.sections.map((section) => (
        <section className="legal__section" key={section.heading}>
          <h2 className="legal__heading">{section.heading}</h2>
          {section.body.map((block, i) =>
            Array.isArray(block) ? (
              <ul className="legal__list" key={i}>
                {block.map((item) => (
                  <li key={item}>
                    <Linkified text={item} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="legal__p" key={i}>
                <Linkified text={block} />
              </p>
            ),
          )}
        </section>
      ))}

      <nav className="legal__nav" aria-label={t.footer.legalLabel}>
        {others
          .filter((o) => o.id !== doc)
          .map((o) => (
            <Link key={o.id} href={o.href}>
              {o.label} →
            </Link>
          ))}
      </nav>
    </article>
  );
}
