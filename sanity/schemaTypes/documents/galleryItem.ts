import { defineField, defineType } from "sanity";

export const galleryItemType = defineType({
  name: "galleryItem",
  title: "Gallery Item",
  type: "document",
  fields: [
    defineField({ name: "locale", type: "string", initialValue: "en", validation: (rule) => rule.required() }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "treatmentType", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "beforeImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "afterImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "disclaimer", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "altText", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "treatmentType",
      media: "afterImage",
    },
  },
});
