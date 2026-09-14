import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { PartnerMarquee } from "@/components/PartnerMarquee";
import { Products } from "@/components/Products";
import { Reveal } from "@/components/Reveal";

export default function Page() {
  return (
    <>
      <Hero />
      <PartnerMarquee />
      <Reveal />
      <HowItWorks />
      <Products />
      <Contact />
    </>
  );
}
