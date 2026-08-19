import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "overview", title: "Overview", default: true },
    { name: "story", title: "Story" },
    { name: "media", title: "Media" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      group: "overview",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "overview",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "client",
      type: "string",
      group: "overview",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      type: "string",
      group: "overview",
      validation: (r) => r.required().regex(/^\d{4}$/, { name: "four-digit year" }),
    }),
    defineField({
      name: "discipline",
      title: "Discipline",
      type: "string",
      group: "overview",
      description: "Short label shown beside the project in the index.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "headline",
      type: "string",
      group: "overview",
      description: "One-line claim, sentence case, no full stop.",
      validation: (r) => r.required().max(90),
    }),
    defineField({
      name: "accent",
      type: "string",
      group: "overview",
      description: "Hex accent used for hover states on this project.",
      initialValue: "#2d62ff",
      validation: (r) => r.regex(/^#[0-9a-fA-F]{6}$/, { name: "hex colour" }),
    }),
    defineField({
      name: "order",
      type: "number",
      group: "overview",
      description: "Lower numbers appear first.",
      initialValue: 100,
    }),

    defineField({
      name: "intro",
      type: "text",
      rows: 4,
      group: "story",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "services",
      type: "array",
      group: "story",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "deliverables",
      type: "array",
      group: "story",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({ name: "timeline", type: "string", group: "story" }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
      group: "story",
    }),
    defineField({
      name: "stats",
      type: "array",
      group: "story",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "chapters",
      type: "array",
      group: "story",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "heading", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", type: "text", rows: 5, validation: (r) => r.required() }),
            defineField({
              name: "media",
              type: "image",
              options: { hotspot: true },
              fields: [defineField({ name: "alt", type: "string" })],
            }),
          ],
          preview: { select: { title: "heading", media: "media" } },
        }),
      ],
    }),

    defineField({
      name: "cover",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          validation: (r) => r.required(),
        }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "previewVideo",
      title: "Hover preview (MP4 URL)",
      type: "url",
      group: "media",
      description: "Muted, looping clip played on hover in the project index.",
    }),
    defineField({
      name: "gallery",
      type: "array",
      group: "media",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string" })],
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "displayOrder",
      by: [
        { field: "order", direction: "asc" },
        { field: "year", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "headline", media: "cover" },
  },
});
