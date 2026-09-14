"use client";

import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Loader } from "./Loader";
import { Nav } from "./Nav";
import { RequestInfoModal } from "./RequestInfoModal";
import { SkipLink } from "./SkipLink";

/** Chrome shared by every route: the boot loader, the ambient glow, the
 *  nav, the footer and the request-info dialog the CTAs all open. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Loader />
      <div className="page">
        <SkipLink />

        {/* Two slow radial glows so the black ground isn't flat. */}
        <div className="ambient" aria-hidden>
          <div className="ambient__glow ambient__glow--a" />
          <div className="ambient__glow ambient__glow--b" />
        </div>

        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </div>

      <RequestInfoModal />
    </>
  );
}
