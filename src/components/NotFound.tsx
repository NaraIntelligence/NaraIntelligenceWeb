"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { useRequestInfo } from "@/lib/request-info-context";

export function NotFound() {
  const { t } = useLang();
  const { open } = useRequestInfo();

  return (
    <section className="not-found shell">
      <p className="not-found__code" aria-hidden>
        404
      </p>
      <h1 className="not-found__title">{t.notFound.title}</h1>
      <p className="not-found__body">{t.notFound.body}</p>
      <div className="not-found__actions">
        <Link className="btn btn--solid btn--md" href="/">
          {t.notFound.home}
        </Link>
        <button type="button" className="btn btn--outline btn--md" onClick={() => open()}>
          {t.notFound.contact}
        </button>
      </div>
    </section>
  );
}
