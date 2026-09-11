"use client";

import Image from "next/image";
import { useLang } from "@/lib/lang-context";

export function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="footer__inner shell">
        <div className="footer__brand">
          <Image
            className="footer__logo"
            src="/assets/na-logo.jpg"
            alt=""
            width={22}
            height={22}
          />
          <span className="footer__copy">{t.footer.copyright}</span>
        </div>
        <nav className="footer__links" aria-label="Footer">
          <a href="#how-it-works">{t.nav.how}</a>
          <a href="#company">{t.nav.company}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
      </div>
    </footer>
  );
}
