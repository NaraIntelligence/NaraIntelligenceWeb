import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { COPY } from "@/lib/copy";

export const alt = "Nara Intelligence — Employees, reengineered by intelligence.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = await readFile(join(process.cwd(), "public/assets/na-logo.jpg"), "base64");
const logoSrc = `data:image/jpeg;base64,${logo}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 85% 20%, #1c1c1c 0%, #000000 55%)",
          color: "#fafafa",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={72} height={72} alt="" style={{ borderRadius: 14 }} />
          <span style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.01em" }}>
            Nara Intelligence
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <span
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              maxWidth: 940,
            }}
          >
            {COPY.en.hero.headline}
          </span>
          <span style={{ fontSize: 28, color: "#9a9a9a", maxWidth: 900, lineHeight: 1.4 }}>
            Digital employees, designed and deployed for the specific tasks holding your operation back.
          </span>
        </div>
      </div>
    ),
    size,
  );
}
