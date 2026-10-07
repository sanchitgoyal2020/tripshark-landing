import { defineField, defineType } from "sanity";

export const packageType = defineType({
  name: "package",
  title: "Tour Package",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Package Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "country",
      title: "Country",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pricing",
      title: "Pricing (e.g., 1500)",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration (e.g., 7 Days, 6 Nights)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description / Text",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "gallery",
      title: "Photos Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
});
