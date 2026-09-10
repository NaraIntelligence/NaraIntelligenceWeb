"use client";

import Image from "next/image";
import { useLang } from "@/lib/lang-context";
import { FlagES, FlagGB } from "./icons";

export function Nav() {
  const { lang, t, setLang } = useLang();

  return (
    <header className="nav">
      <a className="nav__brand" href="#top">
        <Image
          className="nav__logo"
          src="/assets/na-logo.jpg"
          alt=""
          width={34}
          height={34}
          priority
        />
        <span className="nav__wordmark">Nara Intelligence</span>
      </a>

      <nav className="nav__right" aria-label="Primary">
        <div className="nav__links">
          <a className="nav__link" href="#how-it-works">
            {t.nav.how}
          </a>
          <a className="nav__link" href="#company">
            {t.nav.company}
          </a>
          <a className="nav__link" href="#contact">
            {t.nav.contact}
          </a>
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

        <a className="btn btn--solid btn--sm" href="#contact">
          {t.nav.cta}
        </a>
      </nav>
    </header>
  );
}
