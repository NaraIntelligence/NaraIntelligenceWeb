"use client";

import { useLang } from "@/lib/lang-context";
import { useRequestInfo } from "@/lib/request-info-context";

export function Contact() {
  const { t } = useLang();
  const { open } = useRequestInfo();

  return (
    <section className="contact shell" id="contact">
      <p className="kicker">{t.contact.kicker}</p>
      <h2 className="contact__heading">{t.contact.heading}</h2>
      <p className="contact__subtitle">{t.contact.subtitle}</p>
      <button
        type="button"
        className="btn btn--solid btn--lg"
        onClick={() => open()}
      >
        {t.contact.cta}
      </button>
    </section>
  );
}
