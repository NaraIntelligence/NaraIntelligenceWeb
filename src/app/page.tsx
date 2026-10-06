import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { PartnerMarquee } from "@/components/PartnerMarquee";
import { Products } from "@/components/Products";

// "Under the hood" (<Reveal />, src/components/Reveal.tsx) is switched off
// until the android interior/exterior renders exist — with placeholders it
// read as unfinished. To bring it back, drop the renders into Reveal.tsx and
// mount it again between <PartnerMarquee /> and <HowItWorks />.

export default function Page() {
  return (
    <>
      <Hero />
      <PartnerMarquee />
      <HowItWorks />
      <Products />
      <Contact />
    </>
  );
}
