import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { Intro } from "@/components/Intro/Intro";
import { TrustSection } from "@/components/TrustSection/TrustSection";
import { FitCheck } from "@/components/FitCheck/FitCheck";
import { FailureStory } from "@/components/FailureStory/FailureStory";
import { SeriesRow } from "@/components/SeriesRow/SeriesRow";
import { Network } from "@/components/Network/Network";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { Lifestyle } from "@/components/Lifestyle/Lifestyle";
import { OpportunityMoment } from "@/components/OpportunityMoment/OpportunityMoment";
import { Access } from "@/components/Access/Access";
import { Faq } from "@/components/Faq/Faq";
import { FinalCTA } from "@/components/FinalCTA/FinalCTA";
import { StickyMobileCTA } from "@/components/StickyMobileCTA/StickyMobileCTA";
import { CtaBand } from "@/components/CtaBand/CtaBand";
import { backdrops, ctaBands } from "@/data/landingPage";
import { Footer } from "@/components/Footer/Footer";

/**
 * Vierzehn Abschnitte in vier Bloecken, hell und dunkel im Wechsel.
 *
 * Die Reihenfolge folgt der Frage, die ein Besucher an dieser Stelle wirklich
 * hat — nicht der Reihenfolge, in der wir etwas erzaehlen wollen:
 *
 *   1 Aufmerksamkeit   Worum geht es, und warum sollte ich zuhoeren?
 *   2 Vertrauen        Wer bist du, passt das zu mir, bist du ehrlich?
 *   3 Inhalt           Was bekomme ich konkret?
 *   4 Entscheidung     Bestaetigt das jemand, was kostet es, wie komme ich rein?
 *
 * Der Katalog steht bewusst NACH der Person. Ein Serienverzeichnis ueberzeugt
 * niemanden, der noch nicht weiss, wessen Erfahrung darin steckt.
 */
export default function Page() {
  return (
    <>
      <Header />

      <main id="inhalt">
        {/* --- 1 · Aufmerksamkeit ------------------------------------ */}
        <Hero />              {/* dunkel · Worum geht es           */}
        <Intro />             {/* dunkel · Den Weg sieht man nicht */}

        {/* --- 2 · Vertrauen ----------------------------------------- */}
        <TrustSection />      {/* hell   · Wer ist ISI             */}
        <FitCheck />          {/* dunkel · Passt das zu dir        */}
        <FailureStory />      {/* dunkel · Auch die Fehler         */}

        {/* --- 3 · Inhalt -------------------------------------------- */}
        <SeriesRow />         {/* hell   · Die Serien              */}
        <CtaBand
          {...ctaBands.nachInhalten}
          tone="dark"
          image={backdrops.ctaNachInhalten.src}
          video={backdrops.ctaClip.src}
          videoKlein={backdrops.ctaClip.klein}
          imageOpacity={0.24}
          imagePosition="50% 42%"
        />
        <Network />           {/* dunkel · Das Umfeld              */}
        <CtaBand
          {...ctaBands.nachUmfeld}
          tone="light"
          image={backdrops.finalCta.src}
          imagePosition="50% 38%"
        />

        {/* --- 4 · Entscheidung -------------------------------------- */}
        <Lifestyle />         {/* hell   · Wofuer das gut ist      */}
        <OpportunityMoment /> {/* dunkel · Was daraus werden kann  */}
        {/* Der Beleg steht direkt vor der Frage, nicht in der Mitte. */}
        <Testimonials />      {/* hell   · Wer es bestaetigt       */}
        <Access />            {/* hell   · Umfang, Plaetze, Aufnahme */}
        <Faq />               {/* hell   · Offene Fragen           */}
        <FinalCTA />          {/* dunkel · Entscheidung            */}
      </main>

      <Footer />
      <StickyMobileCTA />
    </>
  );
}
