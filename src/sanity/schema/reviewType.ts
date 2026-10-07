import { defineField, defineType } from "sanity";

export const reviewType = defineType({
  name: "review",
  title: "Client Video Review",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tourLocation",
      title: "Tour Location",
      type: "string",
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL (YouTube/Vimeo) or File",
      type: "url",
    }),
    defineField({
      name: "videoFile",
      title: "Upload Video File",
      type: "file",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      validation: (rule) => rule.min(1).max(5),
    }),
    defineField({
      name: "reviewText",
      title: "Review Snippet (Text)",
      type: "text",
    }),
  ],
});
