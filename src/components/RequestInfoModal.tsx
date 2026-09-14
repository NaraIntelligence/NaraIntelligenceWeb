"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/copy";
import { useLang } from "@/lib/lang-context";
import { DEFAULT_PHONE_ISO, PHONE_CODES } from "@/lib/phone-codes";
import { useRequestInfo } from "@/lib/request-info-context";

type Field = "name" | "interest" | "business" | "email" | "phone";

const EMPTY = { name: "", interest: "", business: "", email: "", phone: "" };

/** Mounts the dialog only while it's open, so every visit starts from a
 *  clean form without having to reset state from an effect. */
export function RequestInfoModal() {
  const { isOpen } = useRequestInfo();
  if (!isOpen) return null;
  return <RequestInfoDialog />;
}

function RequestInfoDialog() {
  const { t } = useLang();
  const { agentName, close } = useRequestInfo();

  const [values, setValues] = useState(EMPTY);
  const [countryIso, setCountryIso] = useState(DEFAULT_PHONE_ISO);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);
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

  const set = (field: Field, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    // Clear the error as soon as they start fixing the field.
    setErrors((e) => (e[field] ? { ...e, [field]: undefined } : e));
  };

  const validate = () => {
    const next: Partial<Record<Field, string>> = {};

    (Object.keys(EMPTY) as Field[]).forEach((field) => {
      if (!values[field].trim()) next[field] = t.form.required;
    });

    if (!next.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
      next.email = t.form.invalidEmail;

    // Digits only once spacing and separators are stripped.
    if (!next.phone && values.phone.replace(/[\s.()-]/g, "").length < 6)
      next.phone = t.form.invalidPhone;

    return next;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const subject = agentName
      ? `${t.products.hirePrefix} ${agentName}`
      : t.form.title;
    const body = [
      `${t.form.name}: ${values.name}`,
      `${t.form.interest}: ${values.interest}`,
      `${t.form.business}: ${values.business}`,
      `${t.form.email}: ${values.email}`,
      `${t.form.phone}: ${country.dial} ${values.phone}`,
      agentName ? `\n${t.products.hirePrefix} ${agentName}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
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

        {sent ? (
          <div className="modal__success">
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
                error={errors.name}
                onChange={(v) => set("name", v)}
              />

              <Select
                id="rif-interest"
                label={t.form.interest}
                placeholder={t.form.interestPlaceholder}
                options={t.form.interestOptions}
                value={values.interest}
                error={errors.interest}
                onChange={(v) => set("interest", v)}
              />

              <Select
                id="rif-business"
                label={t.form.business}
                placeholder={t.form.businessPlaceholder}
                options={t.form.businessOptions}
                value={values.business}
                error={errors.business}
                onChange={(v) => set("business", v)}
              />

              <Text
                id="rif-email"
                type="email"
                label={t.form.email}
                placeholder={t.form.emailPlaceholder}
                value={values.email}
                error={errors.email}
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
                {errors.phone && <p className="form__error">{errors.phone}</p>}
                <p className="form__note" id="rif-phone-note">
                  {t.form.whatsappNote}
                </p>
              </div>

              <button type="submit" className="btn btn--solid btn--md form__submit">
                {t.form.submit}
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
