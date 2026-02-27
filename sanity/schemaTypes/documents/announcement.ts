import { defineField, defineType } from "sanity";

export const announcementType = defineType({
  name: "announcement",
  title: "Announcement",
  type: "document",
  fields: [
    defineField({ name: "locale", type: "string", initialValue: "en", validation: (rule) => rule.required() }),
    defineField({ name: "message", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "label", type: "string" }),
    defineField({ name: "href", type: "string" }),
    defineField({ name: "active", type: "boolean", initialValue: true }),
    defineField({ name: "order", type: "number", validation: (rule) => rule.required() }),
  ],
  preview: {
    select: {
      title: "message",
      subtitle: "locale",
    },
  },
});
