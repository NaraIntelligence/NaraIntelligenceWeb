"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/copy";
import { useLang } from "@/lib/lang-context";
import {
  validateLead,
  type LeadErrorCode,
  type LeadErrors,
  type LeadField,
} from "@/lib/lead";
import { DEFAULT_PHONE_ISO, PHONE_CODES } from "@/lib/phone-codes";
import { useRequestInfo } from "@/lib/request-info-context";

type Field = Exclude<LeadField, "consent">;
type Status = "idle" | "sending" | "error" | "rateLimited" | "sent";

const EMPTY = { name: "", interest: "", business: "", email: "", phone: "" };

/** Mounts the dialog only while it's open, so every visit starts from a
 *  clean form without having to reset state from an effect. */
export function RequestInfoModal() {
  const { isOpen } = useRequestInfo();
  if (!isOpen) return null;
  return <RequestInfoDialog />;
}

function RequestInfoDialog() {
  const { lang, t } = useLang();
  const { agentName, close } = useRequestInfo();

  const [values, setValues] = useState(EMPTY);
  const [countryIso, setCountryIso] = useState(DEFAULT_PHONE_ISO);
  const [consent, setConsent] = useState(false);
  // Honeypot: off-screen and out of the tab order, so only bots fill it.
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const dialogRef = useRef<HTMLDivElement>(null);

  // Escape closes, and the page behind must not scroll while it's open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [close]);

  const country = useMemo(
    () => PHONE_CODES.find((c) => c.iso === countryIso) ?? PHONE_CODES[0],
    [countryIso],
  );

  const message = (field: LeadField): string | undefined => {
    const code: LeadErrorCode | undefined = errors[field];
    if (!code) return undefined;
    if (field === "consent") return t.form.consentRequired;
    if (code === "invalidEmail") return t.form.invalidEmail;
    if (code === "invalidPhone") return t.form.invalidPhone;
    if (code === "tooLong") return t.form.tooLong;
    return t.form.required;
  };

  const set = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    // Clear the error as soon as they start fixing the field.
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    const lead = {
      name: values.name.trim(),
      interest: values.interest,
      business: values.business,
      email: values.email.trim(),
      dial: country.dial,
      phone: values.phone.trim(),
      consent,
      agent: agentName,
      lang,
      page: window.location.pathname,
    };

    const found = validateLead(lead);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, website }),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      if (res.status === 429) {
        setStatus("rateLimited");
        return;
      }
      const data = (await res.json().catch(() => null)) as
        | { fields?: LeadErrors }
        | null;
      if (res.status === 400 && data?.fields) {
        setErrors(data.fields);
        setStatus("idle");
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const heading = agentName
    ? `${t.products.hirePrefix} ${agentName}`
    : t.form.title;

  return (
    <div
      className="modal"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="modal__panel modal__panel--form"
        role="dialog"
        aria-modal="true"
        aria-label={heading}
        tabIndex={-1}
        ref={dialogRef}
      >
        <button
          type="button"
          className="modal__close"
          onClick={close}
          aria-label={t.form.close}
        >
          ×
        </button>

        {status === "sent" ? (
          <div className="modal__success" role="status">
            <h2 className="modal__title">{t.form.successTitle}</h2>
            <p className="modal__subtitle">{t.form.successBody}</p>
            <button
              type="button"
              className="btn btn--solid btn--md"
              onClick={close}
            >
              {t.form.close}
            </button>
          </div>
        ) : (
          <>
            <h2 className="modal__title">{heading}</h2>
            <p className="modal__subtitle">{t.form.subtitle}</p>

            <form className="form" onSubmit={onSubmit} noValidate>
              <Text
                id="rif-name"
                label={t.form.name}
                placeholder={t.form.namePlaceholder}
                value={values.name}
                error={message("name")}
                onChange={(v) => set("name", v)}
              />

              <Select
                id="rif-interest"
                label={t.form.interest}
                placeholder={t.form.interestPlaceholder}
                options={t.form.interestOptions}
                value={values.interest}
                error={message("interest")}
                onChange={(v) => set("interest", v)}
              />

              <Select
                id="rif-business"
                label={t.form.business}
                placeholder={t.form.businessPlaceholder}
                options={t.form.businessOptions}
                value={values.business}
                error={message("business")}
                onChange={(v) => set("business", v)}
              />

              <Text
                id="rif-email"
                type="email"
                label={t.form.email}
                placeholder={t.form.emailPlaceholder}
                value={values.email}
                error={message("email")}
                onChange={(v) => set("email", v)}
              />

              <div className="form__field">
                <label className="form__label" htmlFor="rif-phone">
                  {t.form.phone}
                </label>
                <div className="form__phone">
                  <select
                    className={`form__input form__select form__dial${
                      errors.phone ? " is-invalid" : ""
                    }`}
                    value={countryIso}
                    onChange={(e) => setCountryIso(e.target.value)}
                    aria-label={t.form.phoneCountry}
                  >
                    {PHONE_CODES.map((c) => (
                      <option key={c.iso} value={c.iso}>
                        {c.flag} {c.name} ({c.dial})
                      </option>
                    ))}
                  </select>
                  <input
                    id="rif-phone"
                    type="tel"
                    className={`form__input${errors.phone ? " is-invalid" : ""}`}
                    placeholder={t.form.phonePlaceholder}
                    value={values.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby="rif-phone-note"
                  />
                </div>
                {errors.phone && <p className="form__error">{message("phone")}</p>}
                <p className="form__note" id="rif-phone-note">
                  {t.form.whatsappNote}
                </p>
              </div>

              <div className="form__hp" aria-hidden>
                <label htmlFor="rif-website">Website</label>
                <input
                  id="rif-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="form__field">
                <label className="form__consent" htmlFor="rif-consent">
                  <input
                    id="rif-consent"
                    type="checkbox"
                    className="form__check"
                    checked={consent}
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      setErrors((er) => (er.consent ? { ...er, consent: undefined } : er));
                    }}
                    aria-invalid={errors.consent ? true : undefined}
                    aria-describedby="rif-privacy-note"
                  />
                  <span>
                    {t.form.consentPrefix}{" "}
                    <Link href="/legal/privacy" target="_blank" rel="noopener">
                      {t.form.consentLink}
                    </Link>
                    {t.form.consentSuffix}
                  </span>
                </label>
                {errors.consent && <p className="form__error">{message("consent")}</p>}
                <p className="form__note" id="rif-privacy-note">
                  {t.form.privacyNote}
                </p>
              </div>

              {(status === "error" || status === "rateLimited") && (
                <p className="form__alert" role="alert">
                  {status === "rateLimited" ? t.form.rateLimited : t.form.sendError}{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                </p>
              )}

              <button
                type="submit"
                className="btn btn--solid btn--md form__submit"
                disabled={status === "sending"}
                aria-busy={status === "sending" || undefined}
              >
                {status === "sending"
                  ? t.form.sending
                  : status === "error" || status === "rateLimited"
                    ? t.form.retry
                    : t.form.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Text({
  id,
  label,
  placeholder,
  value,
  error,
  onChange,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div className="form__field">
      <label className="form__label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className={`form__input${error ? " is-invalid" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
      />
      {error && <p className="form__error">{error}</p>}
    </div>
  );
}

function Select({
  id,
  label,
  placeholder,
  options,
  value,
  error,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  options: string[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="form__field">
      <label className="form__label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className={`form__input form__select${error ? " is-invalid" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="form__error">{error}</p>}
    </div>
  );
}
