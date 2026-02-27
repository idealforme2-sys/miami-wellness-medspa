import { defineField, defineType } from "sanity";

export const faqItemType = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    defineField({ name: "locale", type: "string", initialValue: "en", validation: (rule) => rule.required() }),
    defineField({ name: "question", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "answer", type: "text", validation: (rule) => rule.required() }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "locale",
    },
  },
});
