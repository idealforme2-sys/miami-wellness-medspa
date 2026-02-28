import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "locale", type: "string", initialValue: "en", validation: (rule) => rule.required() }),
    defineField({ name: "siteName", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "brandTagline", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "phoneDisplay", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "phoneHref", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "smsHref", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "fullAddress", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "cityStateZip", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "mapEmbedUrl", type: "url", validation: (rule) => rule.required() }),
    defineField({ name: "mapUrl", type: "url", validation: (rule) => rule.required() }),
    defineField({ name: "instagramUrl", type: "url", validation: (rule) => rule.required() }),
    defineField({ name: "facebookUrl", type: "url" }),
    defineField({ name: "googleReviewsUrl", type: "url", validation: (rule) => rule.required() }),
    defineField({ name: "classpassUrl", type: "url", validation: (rule) => rule.required() }),
    defineField({ name: "vagaroUrl", type: "url", validation: (rule) => rule.required() }),
    defineField({
      name: "hours",
      title: "Business Hours",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "day", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "hours", type: "string", validation: (rule) => rule.required() }),
          ],
          preview: {
            select: { title: "day", subtitle: "hours" },
          },
        }),
      ],
    }),
    defineField({ name: "disclaimer", type: "text", validation: (rule) => rule.required() }),
    defineField({ name: "bookingEmbedCode", type: "text" }),
    defineField({ name: "bookingFallbackUrl", type: "url", validation: (rule) => rule.required() }),
    defineField({ name: "bookingIframeUrl", type: "url", validation: (rule) => rule.required() }),
    defineField({ name: "bookingCtaLabel", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "bookingServiceContext", type: "string", initialValue: "general_consult" }),
  ],
  preview: {
    select: {
      title: "siteName",
      subtitle: "locale",
    },
  },
});
