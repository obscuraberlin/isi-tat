import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { Intro } from "@/components/Intro/Intro";
import { SeriesRow } from "@/components/SeriesRow/SeriesRow";
import { TrustSection } from "@/components/TrustSection/TrustSection";
import { FailureStory } from "@/components/FailureStory/FailureStory";
import { Lifestyle } from "@/components/Lifestyle/Lifestyle";
import { LiveSection } from "@/components/LiveSection/LiveSection";
import { Network } from "@/components/Network/Network";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { OpportunityMoment } from "@/components/OpportunityMoment/OpportunityMoment";
import { Access } from "@/components/Access/Access";
import { Faq } from "@/components/Faq/Faq";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { StickyMobileCTA } from "@/components/StickyMobileCTA/StickyMobileCTA";
import { Footer } from "@/components/Footer/Footer";

/**
 * Elf Abschnitte, hell und dunkel im Wechsel.
 * Jeder beantwortet genau eine Frage — keine zwei dasselbe.
 */
export default function Page() {
  return (
    <>
      <Header />

      <main id="inhalt">
        <Hero />              {/* dunkel · Worum geht es          */}
        <Intro />             {/* dunkel · Der Weg dahin          */}
        <SeriesRow />         {/* hell   · Was ist drin           */}
        <TrustSection />      {/* hell   · Wer ist ISI            */}
        <FailureStory />      {/* dunkel · Warum ehrlich          */}
        <LiveSection />       {/* hell   · Du bist nicht allein   */}
        <Lifestyle />         {/* hell   · Wofür das gut ist      */}
        <Network />           {/* dunkel · Wer sonst dabei ist    */}
        <Testimonials />      {/* hell   · Wer es bestätigt       */}
        <OpportunityMoment /> {/* dunkel · Was daraus werden kann */}
        <Access />            {/* hell   · Umfang, Preis, Aufnahme */}
        <Faq />               {/* hell   · Offene Fragen          */}
        <FinalCTA />          {/* dunkel · Entscheidung           */}
      </main>

      <Footer />
      <StickyMobileCTA />
    </>
  );
}
