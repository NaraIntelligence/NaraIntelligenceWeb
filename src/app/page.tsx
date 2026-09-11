import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { PartnerMarquee } from "@/components/PartnerMarquee";
import { Reveal } from "@/components/Reveal";
import { SkipLink } from "@/components/SkipLink";

export default function Page() {
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

        <main id="main">
          <Hero />
          <PartnerMarquee />
          <Reveal />
          <HowItWorks />
          <About />
          <Contact />
        </main>

        <Footer />
      </div>
    </>
  );
}
