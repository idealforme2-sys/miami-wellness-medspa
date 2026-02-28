import { groq } from "next-sanity";

export const sitePayloadQuery = groq`{
  "siteSettings": *[_type == "siteSettings" && locale == $locale][0]{
    locale,
    siteName,
    brandTagline,
    phoneDisplay,
    phoneHref,
    smsHref,
    email,
    fullAddress,
    cityStateZip,
    mapEmbedUrl,
    mapUrl,
    instagramUrl,
    facebookUrl,
    googleReviewsUrl,
    classpassUrl,
    vagaroUrl,
    hours,
    disclaimer,
    "booking": {
      "embedCode": bookingEmbedCode,
      "fallbackUrl": bookingFallbackUrl,
      "iframeUrl": bookingIframeUrl,
      "ctaLabel": bookingCtaLabel,
      "serviceContext": bookingServiceContext
    }
  },
  "heroBlock": *[_type == "heroBlock" && locale == $locale][0]{
    eyebrow,
    heading,
    subheading,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref
  },
  "serviceCategories": *[_type == "serviceCategory" && locale == $locale] | order(order asc){
    _id,
    title,
    "slug": slug.current,
    order,
    icon,
    seoIntro
  },
  "serviceItems": *[_type == "serviceItem" && locale == $locale] | order(order asc){
    _id,
    name,
    "slug": slug.current,
    "categorySlug": category->slug.current,
    duration,
    startingPrice,
    bestFor,
    shortDescription,
    benefits,
    contraindicationNote,
    order
  },
  "testimonials": *[_type == "testimonial" && locale == $locale] | order(order asc){
    _id,
    quote,
    source,
    reviewerName,
    date,
    rating,
    sourceUrl,
    order
  },
  "faqItems": *[_type == "faqItem" && locale == $locale] | order(order asc){
    _id,
    question,
    answer,
    order
  },
  "galleryItems": *[_type == "galleryItem" && locale == $locale] | order(order asc){
    _id,
    title,
    treatmentType,
    disclaimer,
    altText,
    "beforeImageUrl": beforeImage.asset->url,
    "afterImageUrl": afterImage.asset->url,
    order
  },
  "announcements": *[_type == "announcement" && locale == $locale && active == true] | order(order asc){
    _id,
    message,
    label,
    href,
    active,
    order
  }
}`;
