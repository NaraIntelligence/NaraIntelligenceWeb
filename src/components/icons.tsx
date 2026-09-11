import type { SVGProps } from "react";

/**
 * Minimalist line icons — no emoji anywhere on the page, per the brief.
 * Stroke weight and geometry match the prototype's inline SVGs.
 */

const strokeProps: SVGProps<SVGSVGElement> = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export function ContactIcon() {
  return (
    <svg {...strokeProps}>
      <path d="M21 11.5a8.5 8.5 0 1 1-3.8-7.1" />
      <path d="M21 3v6h-6" />
    </svg>
  );
}

export function AuditIcon() {
  return (
    <svg {...strokeProps}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.2 15.2 21 21" />
    </svg>
  );
}

export function BuildIcon() {
  return (
    <svg {...strokeProps}>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M18.5 5.5l-2 2M7.5 16.5l-2 2" />
    </svg>
  );
}

export function PayIcon() {
  return (
    <svg {...strokeProps}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 15h3" />
    </svg>
  );
}

export const STEP_ICONS = [ContactIcon, AuditIcon, BuildIcon, PayIcon] as const;

export function FlagGB() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden focusable="false">
      <rect width="20" height="14" fill="#00247d" />
      <path d="M0 0 20 14M20 0 0 14" stroke="#fff" strokeWidth="2" />
      <path d="M0 0 20 14M20 0 0 14" stroke="#cf142b" strokeWidth="1" />
      <path d="M10 0V14M0 7H20" stroke="#fff" strokeWidth="4" />
      <path d="M10 0V14M0 7H20" stroke="#cf142b" strokeWidth="2" />
    </svg>
  );
}

export function FlagES() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden focusable="false">
      <rect width="20" height="14" fill="#aa151b" />
      <rect y="3.5" width="20" height="7" fill="#f1bf00" />
    </svg>
  );
}

/** Mark used inside the empty image placeholders. */
export function SlotMark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="m3 16 5-5 4 4 3-3 6 6" />
      <circle cx="8.5" cy="8" r="1.4" />
    </svg>
  );
}
