"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { useRequestInfo } from "@/lib/request-info-context";
import { FlagES, FlagGB } from "./icons";

export function Nav() {
  const { lang, t, setLang } = useLang();
  const { open } = useRequestInfo();

  return (
    <header className="nav">
      <Link className="nav__brand" href="/" aria-label="Nara Intelligence">
        <Image
          className="nav__logo"
          src="/assets/na-logo.jpg"
          alt=""
          width={34}
          height={34}
          priority
        />
        <span className="nav__wordmark">Nara Intelligence</span>
      </Link>

      <nav className="nav__right" aria-label="Primary">
        <div className="nav__links">
          {/* Root-relative so they still resolve from /what-is-nara. */}
          <Link className="nav__link" href="/#how-it-works">
            {t.nav.how}
          </Link>
          <Link className="nav__link" href="/#products">
            {t.nav.products}
          </Link>
          <Link className="nav__link" href="/what-is-nara">
            {t.nav.what}
          </Link>
          <Link className="nav__link" href="/#contact">
            {t.nav.contact}
          </Link>
        </div>

        <div className="lang" role="group" aria-label="Language">
          <button
            type="button"
            className="lang__btn"
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
            title={t.a11y.switchToEnglish}
          >
            <FlagGB />
            <span className="sr-only">{t.a11y.switchToEnglish}</span>
          </button>
          <button
            type="button"
            className="lang__btn"
            onClick={() => setLang("es")}
            aria-pressed={lang === "es"}
            title={t.a11y.switchToSpanish}
          >
            <FlagES />
            <span className="sr-only">{t.a11y.switchToSpanish}</span>
          </button>
        </div>

        <button
          type="button"
          className="btn btn--solid btn--sm"
          onClick={() => open()}
        >
          {t.nav.cta}
        </button>
      </nav>
    </header>
  );
}
