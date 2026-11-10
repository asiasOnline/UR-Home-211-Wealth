import { defineArrayMember, defineField, defineType } from "sanity"

/** Paragraph text with bold, italic, and links. No headings, so editors can't break the section layout. */
export const blockContent = defineType({
  name: "blockContent",
  title: "Text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Normal", value: "normal" }],
      lists: [],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          defineField({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              defineField({
                name: "href",
                title: "URL",
                type: "url",
                validation: (rule) =>
                  rule.required().uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
              }),
            ],
          }),
        ],
      },
    }),
  ],
})

export const cta = defineType({
  name: "cta",
  title: "Button",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "href",
      title: "Link",
      type: "url",
      description: "Optional. A page on this site (e.g. /contact) or a full URL.",
      validation: (rule) => rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
    }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
})

export const accessibleImage = defineType({
  name: "accessibleImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describes the image for screen readers and search engines.",
      validation: (rule) => rule.required(),
    }),
  ],
})
