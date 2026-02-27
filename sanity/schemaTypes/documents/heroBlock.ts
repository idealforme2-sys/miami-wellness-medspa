import { defineField, defineType } from "sanity";

export const heroBlockType = defineType({
  name: "heroBlock",
  title: "Hero Block",
  type: "document",
  fields: [
    defineField({ name: "locale", type: "string", initialValue: "en", validation: (rule) => rule.required() }),
    defineField({ name: "eyebrow", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "heading", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "subheading", type: "text", validation: (rule) => rule.required() }),
    defineField({ name: "primaryCtaLabel", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "primaryCtaHref", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "secondaryCtaLabel", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "secondaryCtaHref", type: "string", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "locale",
    },
  },
});
