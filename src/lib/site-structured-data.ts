import { SiteContent } from "@/types/site";

export function buildLocalBusinessJsonLd(content: SiteContent) {
  const settings = content.siteSettings;

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
    name: settings.siteName,
    description: settings.brandTagline,
    telephone: settings.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      streetAddress: "9560 Southwest 107th Avenue, STE 108A",
      addressLocality: "Miami",
      addressRegion: "FL",
      postalCode: "33176",
      addressCountry: "US",
    },
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.miamiwellnessmedspa.com",
    image: [],
    priceRange: "$$",
    sameAs: [
      settings.instagramUrl,
      settings.facebookUrl,
      settings.classpassUrl,
      settings.googleReviewsUrl,
    ].filter(Boolean),
    hasMap: settings.mapUrl,
    potentialAction: {
      "@type": "ReserveAction",
      target: settings.booking.fallbackUrl,
    },
    openingHoursSpecification: settings.hours.map((hour) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hour.day,
      opens: hour.hours.includes("-") ? hour.hours.split("-")[0].trim() : undefined,
      closes: hour.hours.includes("-") ? hour.hours.split("-")[1].trim() : undefined,
    })),
  };
}
