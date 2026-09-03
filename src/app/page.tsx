import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { SeriesRow } from "@/components/SeriesRow/SeriesRow";
import { TrustSection } from "@/components/TrustSection/TrustSection";
import { FourPillars } from "@/components/FourPillars/FourPillars";
import { OpportunityMoment } from "@/components/OpportunityMoment/OpportunityMoment";
import { Timeline } from "@/components/Timeline/Timeline";
import { FailureStory } from "@/components/FailureStory/FailureStory";
import { Lifestyle } from "@/components/Lifestyle/Lifestyle";
import { Network } from "@/components/Network/Network";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { Membership } from "@/components/Membership/Membership";
import { ApplicationSteps } from "@/components/ApplicationSteps/ApplicationSteps";
import { Pricing } from "@/components/Pricing/Pricing";
import { Faq } from "@/components/Faq/Faq";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { StickyMobileCTA } from "@/components/StickyMobileCTA/StickyMobileCTA";
import { Footer } from "@/components/Footer/Footer";

/**
 * Reihenfolge und Hell-/Dunkel-Rhythmus der Seite.
 * Der Besucher sieht zuerst, was drin ist (Serien) — dann, warum ausgerechnet ISI.
 */
export default function Page() {
  return (
    <>
      <Header />

      <main id="inhalt">
        <Hero />              {/* dunkel — Einstieg          */}
        <SeriesRow />         {/* hell   — was drin ist       */}
        <TrustSection />      {/* hell   — warum ISI          */}
        <FourPillars />       {/* dunkel — vier Bereiche      */}
        <OpportunityMoment /> {/* dunkel — die Chance         */}
        <Timeline />          {/* hell   — zwanzig Jahre      */}
        <FailureStory />      {/* dunkel — die Fehler         */}
        <Lifestyle />         {/* hell   — die Wahl           */}
        <Network />           {/* dunkel — das Umfeld         */}
        <Testimonials />      {/* hell   — echte Menschen     */}
        <Membership />        {/* dunkel — was du bekommst    */}
        <ApplicationSteps />  {/* hell   — der Weg rein       */}
        <Pricing />           {/* hell   — Investment         */}
        <Faq />               {/* hell   — offene Fragen      */}
        <FinalCTA />          {/* dunkel — Abschluss          */}
      </main>

      <Footer />
      <StickyMobileCTA />
    </>
  );
}
