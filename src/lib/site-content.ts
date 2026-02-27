import { defaultLocale } from "@/lib/i18n";
import { defaultSiteContent } from "@/lib/site-defaults";
import { sanityClient } from "@/lib/sanity/client";
import { sitePayloadQuery } from "@/lib/sanity/queries";
import { Locale, SiteContent, SitePayload } from "@/types/site";

const FALLBACK_LIST_KEYS = [
  "serviceCategories",
  "serviceItems",
  "testimonials",
  "faqItems",
  "galleryItems",
  "announcements",
  "stats",
  "whyChooseUsBullets",
] as const;

function mergeSiteContent(payload: SitePayload | null | undefined): SiteContent {
  const merged: SiteContent = {
    ...defaultSiteContent,
    siteSettings: {
      ...defaultSiteContent.siteSettings,
      ...payload?.siteSettings,
      booking: {
        ...defaultSiteContent.siteSettings.booking,
        ...(payload?.siteSettings?.booking || {}),
      },
      hours:
        payload?.siteSettings?.hours && payload.siteSettings.hours.length > 0
          ? payload.siteSettings.hours
          : defaultSiteContent.siteSettings.hours,
    },
    heroBlock: {
      ...defaultSiteContent.heroBlock,
      ...payload?.heroBlock,
    },
    serviceCategories:
      payload?.serviceCategories && payload.serviceCategories.length > 0
        ? payload.serviceCategories
        : defaultSiteContent.serviceCategories,
    serviceItems:
      payload?.serviceItems && payload.serviceItems.length > 0
        ? payload.serviceItems
        : defaultSiteContent.serviceItems,
    testimonials:
      payload?.testimonials && payload.testimonials.length > 0
        ? payload.testimonials
        : defaultSiteContent.testimonials,
    faqItems:
      payload?.faqItems && payload.faqItems.length > 0
        ? payload.faqItems
        : defaultSiteContent.faqItems,
    galleryItems:
      payload?.galleryItems && payload.galleryItems.length > 0
        ? payload.galleryItems
        : defaultSiteContent.galleryItems,
    announcements:
      payload?.announcements && payload.announcements.length > 0
        ? payload.announcements
        : defaultSiteContent.announcements,
    stats:
      payload?.stats && payload.stats.length > 0
        ? payload.stats
        : defaultSiteContent.stats,
    whyChooseUsBullets:
      payload?.whyChooseUsBullets && payload.whyChooseUsBullets.length > 0
        ? payload.whyChooseUsBullets
        : defaultSiteContent.whyChooseUsBullets,
  };

  for (const key of FALLBACK_LIST_KEYS) {
    if (!merged[key] || (Array.isArray(merged[key]) && merged[key].length === 0)) {
      merged[key] = defaultSiteContent[key] as never;
    }
  }

  return merged;
}

export async function getSiteContent(locale: Locale = defaultLocale): Promise<SiteContent> {
  if (!sanityClient) {
    return defaultSiteContent;
  }

  try {
    const payload = await sanityClient.fetch<SitePayload>(sitePayloadQuery, { locale }, { next: { revalidate: 120 } });
    return mergeSiteContent(payload);
  } catch {
    return defaultSiteContent;
  }
}
