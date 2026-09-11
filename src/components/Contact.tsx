"use client";

import { CONTACT_EMAIL } from "@/lib/copy";
import { useLang } from "@/lib/lang-context";

export function Contact() {
  const { t } = useLang();

  return (
    <section className="contact shell" id="contact">
      <p className="kicker">{t.contact.kicker}</p>
      <h2 className="contact__heading">{t.contact.heading}</h2>
      <p className="contact__subtitle">{t.contact.subtitle}</p>
      <a className="btn btn--solid btn--lg" href={`mailto:${CONTACT_EMAIL}`}>
        {t.contact.cta}
      </a>
    </section>
  );
}
