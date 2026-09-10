import type { CSSProperties } from "react";
import { SlotMark } from "./icons";

type Props = {
  /** Short one-word caption, as in the prototype's image slots. */
  label: string;
  /** `bare` sits straight on the page with a dashed outline of its own. */
  variant?: "filled" | "bare";
  className?: string;
  style?: CSSProperties;
};

/**
 * Stands in for the agent renders that have not been delivered yet
 * (the X-ray reveal layers, steps 03–04, and the company portrait).
 * Swap a placeholder for the real <video>/<Image> once the asset lands —
 * the surrounding layout and scroll behaviour do not change.
 */
export function ImagePlaceholder({
  label,
  variant = "filled",
  className,
  style,
}: Props) {
  return (
    <div
      className={["slot", variant === "bare" ? "slot--bare" : "", className ?? ""]
        .filter(Boolean)
        .join(" ")}
      style={style}
      data-slot={label}
    >
      <span className="slot__mark">
        <SlotMark />
      </span>
      <span className="slot__label">{label}</span>
    </div>
  );
}
