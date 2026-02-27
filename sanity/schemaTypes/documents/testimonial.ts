import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "locale", type: "string", initialValue: "en", validation: (rule) => rule.required() }),
    defineField({ name: "quote", type: "text", validation: (rule) => rule.required() }),
    defineField({
      name: "source",
      type: "string",
      options: { list: ["Google", "ClassPass", "Vagaro"] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "reviewerName", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "date", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "rating", type: "number", validation: (rule) => rule.required().min(1).max(5) }),
    defineField({ name: "sourceUrl", type: "url", validation: (rule) => rule.required() }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: {
      title: "reviewerName",
      subtitle: "source",
    },
  },
});
