import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  // Singleton: creation and deletion are disabled in the desk structure.
  fields: [
    defineField({ name: "brand", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "tagline",
      type: "text",
      rows: 2,
      validation: (r) => r.required().max(160),
    }),
    defineField({ name: "email", type: "string", validation: (r) => r.required().email() }),
    defineField({ name: "location", type: "string" }),
    defineField({
      name: "availability",
      type: "string",
      description: "Shown in the header ticker and the contact page.",
    }),
    defineField({
      name: "socials",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", type: "url", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "brand", subtitle: "tagline" },
  },
});
