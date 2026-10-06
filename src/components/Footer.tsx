"use client";

import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/copy";
import { useLang } from "@/lib/lang-context";
import { useRequestInfo } from "@/lib/request-info-context";

export function Footer() {
  const { t } = useLang();
  const { open } = useRequestInfo();

  return (
    <footer className="footer">
      <div className="footer__inner shell">
        <div className="footer__brand">
          <Image
            className="footer__logo"
            src="/assets/na-logo.jpg"
            alt=""
            width={28}
            height={28}
          />
          <span className="footer__wordmark">Nara Intelligence</span>
          <p className="footer__tagline">{t.footer.tagline}</p>
        </div>

        <div className="footer__cols">
          <nav className="footer__col" aria-label={t.footer.navLabel}>
            <p className="footer__col-title">{t.footer.navLabel}</p>
            <Link href="/#how-it-works">{t.nav.how}</Link>
            <Link href="/#products">{t.nav.products}</Link>
            <Link href="/#contact">{t.nav.contact}</Link>
          </nav>

          <nav className="footer__col" aria-label={t.footer.companyLabel}>
            <p className="footer__col-title">{t.footer.companyLabel}</p>
            <Link href="/what-is-nara">{t.nav.what}</Link>
            <span className="footer__static">{t.footer.builtIn}</span>
          </nav>

          <div className="footer__col">
            <p className="footer__col-title">{t.footer.contactLabel}</p>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <button
              type="button"
              className="footer__link-btn"
              onClick={() => open()}
            >
              {t.nav.cta}
            </button>
          </div>
        </div>
      </div>

      <div className="footer__bar shell">
        <span className="footer__copy">{t.footer.copyright}</span>
        <nav className="footer__legal" aria-label={t.footer.legalLabel}>
          <Link href="/legal/notice">{t.footer.notice}</Link>
          <span aria-hidden>·</span>
          <Link href="/legal/privacy">{t.footer.privacy}</Link>
          <span aria-hidden>·</span>
          <Link href="/legal/cookies">{t.footer.cookies}</Link>
        </nav>
      </div>
    </footer>
  );
}
