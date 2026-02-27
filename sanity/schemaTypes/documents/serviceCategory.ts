import { defineField, defineType } from "sanity";

export const serviceCategoryType = defineType({
  name: "serviceCategory",
  title: "Service Category",
  type: "document",
  fields: [
    defineField({ name: "locale", type: "string", initialValue: "en", validation: (rule) => rule.required() }),
    defineField({ name: "title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (rule) => rule.required() }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required() }),
    defineField({ name: "icon", type: "string" }),
    defineField({ name: "seoIntro", type: "text", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "locale",
    },
  },
});
