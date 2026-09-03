import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { TrustSection } from "@/components/TrustSection/TrustSection";
import { ContentCarousel } from "@/components/ContentCarousel/ContentCarousel";
import { StickyMobileCTA } from "@/components/StickyMobileCTA/StickyMobileCTA";
import { Footer } from "@/components/Footer/Footer";

export default function Page() {
  return (
    <>
      <Header />

      <main id="inhalt">
        {/* ---- PHASE 1 ---- */}
        <Hero />
        <TrustSection />
        <ContentCarousel />

        {/* ---- PHASE 2 (nach Freigabe) ----
            Timeline · FourPillars · OpportunitySection · FailureStory · LifestyleSection
            ---- PHASE 3 (nach Freigabe) ----
            NetworkSection · Testimonials · MembershipFeatures · ApplicationSteps ·
            Pricing · FAQ · FinalCTA
        */}
      </main>

      <Footer />
      <StickyMobileCTA />
    </>
  );
}
