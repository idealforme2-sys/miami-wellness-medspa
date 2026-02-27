import { defineArrayMember, defineField, defineType } from "sanity";

export const serviceItemType = defineType({
  name: "serviceItem",
  title: "Service Item",
  type: "document",
  fields: [
    defineField({ name: "locale", type: "string", initialValue: "en", validation: (rule) => rule.required() }),
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (rule) => rule.required() }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "serviceCategory" }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "duration", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "startingPrice", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "bestFor", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "shortDescription", type: "text", validation: (rule) => rule.required() }),
    defineField({
      name: "benefits",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (rule) => rule.min(1),
    }),
    defineField({ name: "contraindicationNote", type: "string" }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "startingPrice",
    },
  },
});
