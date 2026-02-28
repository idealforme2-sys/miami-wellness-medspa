"use client";

import { useMemo } from "react";
import { CustomCursor } from "./CustomCursor";
import { Preloader } from "./Preloader";
import { Navbar } from "./Navbar";
import { HeroSection } from "./HeroSection";
import { MarqueeStrip } from "./MarqueeStrip";
import { CuratedOfferingsSection } from "./CuratedOfferingsSection";
import { TreatmentsSection } from "./TreatmentsSection";
import { StatsCounter } from "./StatsCounter";
import { ResultsGallery } from "./ResultsGallery";
import { TestimonialsSection } from "./TestimonialsSection";
import { BookingSection } from "./BookingSection";
import { FAQSection } from "./FAQSection";
import { ContactSection } from "./ContactSection";
import { Footer } from "./Footer";
import { NewsletterOverlay } from "./NewsletterOverlay";
import { SiteContent } from "@/types/site";

interface HomePageProps {
  content: SiteContent;
}

export function HomePage({ content }: HomePageProps) {
  const announcements = useMemo(
    () => content.announcements.filter((a) => a.active),
    [content.announcements]
  );

  const sortedCategories = useMemo(
    () => [...content.serviceCategories].sort((a, b) => a.order - b.order),
    [content.serviceCategories]
  );

  const sortedServices = useMemo(
    () => [...content.serviceItems].sort((a, b) => a.order - b.order),
    [content.serviceItems]
  );

  return (
    <>
      <CustomCursor />
      <Preloader />
      <Navbar settings={content.siteSettings} announcement={announcements[0]} />

      <main className="relative overflow-x-clip">
        {/* Hero — full bleed, no announcement bar overlap */}
        <HeroSection hero={content.heroBlock} settings={content.siteSettings} />

        <MarqueeStrip />
        <CuratedOfferingsSection />
        <TreatmentsSection categories={sortedCategories} services={sortedServices} />
        <StatsCounter stats={content.stats} bullets={content.whyChooseUsBullets} />
        <ResultsGallery />
        <TestimonialsSection
          testimonials={content.testimonials}
          googleReviewsUrl={content.siteSettings.googleReviewsUrl}
          classpassUrl={content.siteSettings.classpassUrl}
        />
        <BookingSection booking={content.siteSettings.booking} />
        <FAQSection items={content.faqItems} />
        <ContactSection settings={content.siteSettings} />
      </main>

      <Footer settings={content.siteSettings} />
      <NewsletterOverlay />

      {/* Mobile Sticky Bar */}
      <div
        className="fixed bottom-4 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded-2xl p-2 shadow-2xl md:hidden"
        style={{
          background: "rgba(7,7,11,0.92)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(201,169,110,0.1)",
        }}
      >
        <div className="grid grid-cols-3 gap-2 text-center text-[0.6rem] font-semibold uppercase tracking-[0.14em]">
          <a
            href="#book"
            className="rounded-xl px-3 py-3"
            style={{ background: "linear-gradient(135deg, #c9a96e, #d4af37)", color: "#07070b" }}
          >
            Book
          </a>
          <a
            href={content.siteSettings.phoneHref}
            className="rounded-xl px-3 py-3"
            style={{ border: "1px solid rgba(201,169,110,0.15)", color: "var(--gold-400)" }}
          >
            Call
          </a>
          <a
            href={content.siteSettings.smsHref}
            className="rounded-xl px-3 py-3"
            style={{ border: "1px solid rgba(201,169,110,0.15)", color: "var(--gold-400)" }}
          >
            SMS
          </a>
        </div>
      </div>
    </>
  );
}
