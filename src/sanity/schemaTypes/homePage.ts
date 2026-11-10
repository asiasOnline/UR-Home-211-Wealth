import { HomeIcon } from "@sanity/icons/Home"
import { defineArrayMember, defineField, defineType } from "sanity"

const heading = (title = "Heading") =>
  defineField({ name: "heading", title, type: "string", validation: (rule) => rule.required() })

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "mission", title: "Mission" },
    { name: "stats", title: "Stats" },
    { name: "howWeHelp", title: "How We Help" },
    { name: "qualifications", title: "Qualifications" },
    { name: "support", title: "Support" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      options: { collapsible: false },
      fields: [
        heading(),
        defineField({ name: "subheading", title: "Subheading", type: "blockContent" }),
        defineField({ name: "primaryCta", title: "Primary button", type: "cta" }),
        defineField({ name: "secondaryCta", title: "Secondary button", type: "cta" }),
        defineField({
          name: "images",
          title: "Photo grid",
          description:
            "Four photos, shown left to right, top to bottom. The 1st and 4th are cropped square; the 2nd and 3rd are cropped wide (16:9).",
          type: "array",
          of: [defineArrayMember({ type: "accessibleImage" })],
          validation: (rule) => rule.length(4),
        }),
      ],
    }),
    defineField({
      name: "mission",
      title: "Mission",
      type: "object",
      group: "mission",
      options: { collapsible: false },
      fields: [
        heading(),
        defineField({ name: "body", title: "Text", type: "blockContent" }),
        defineField({ name: "cta", title: "Button", type: "cta" }),
        defineField({ name: "image", title: "Photo", type: "accessibleImage" }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "object",
      group: "stats",
      options: { collapsible: false },
      fields: [
        heading(),
        defineField({ name: "body", title: "Text", type: "blockContent" }),
        defineField({ name: "cta", title: "Button", type: "cta" }),
        defineField({ name: "asideHeading", title: "Stat grid heading", type: "string" }),
        defineField({
          name: "items",
          title: "Stats",
          description: "Shown as a 2×2 grid.",
          type: "array",
          of: [
            defineArrayMember({
              name: "stat",
              type: "object",
              fields: [
                defineField({ name: "value", title: "Number", type: "string", description: "e.g. 17,000+ or 1 In 8", validation: (rule) => rule.required() }),
                defineField({ name: "label", title: "Description", type: "text", rows: 2, validation: (rule) => rule.required() }),
              ],
              preview: { select: { title: "value", subtitle: "label" } },
            }),
          ],
          validation: (rule) => rule.length(4),
        }),
      ],
    }),
    defineField({
      name: "howWeHelp",
      title: "How We Help",
      type: "object",
      group: "howWeHelp",
      options: { collapsible: false },
      fields: [
        heading(),
        defineField({ name: "intro", title: "Intro", type: "blockContent" }),
        defineField({
          name: "services",
          title: "Service cards",
          type: "array",
          of: [
            defineArrayMember({
              name: "service",
              type: "object",
              fields: [
                defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
                defineField({ name: "image", title: "Photo", type: "accessibleImage" }),
                defineField({ name: "description", title: "Description", type: "blockContent" }),
              ],
              preview: { select: { title: "title", subtitle: "subtitle", media: "image" } },
            }),
          ],
        }),
        defineField({ name: "footer", title: "Closing text", type: "blockContent" }),
        defineField({ name: "cta", title: "Button", type: "cta" }),
      ],
    }),
    defineField({
      name: "qualifications",
      title: "Qualifications",
      type: "object",
      group: "qualifications",
      options: { collapsible: false },
      fields: [
        heading(),
        defineField({
          name: "intro",
          title: "Intro",
          type: "blockContent",
          description: "Not shown on the site yet.",
        }),
        defineField({
          name: "cards",
          title: "Question cards",
          type: "array",
          of: [
            defineArrayMember({
              name: "questionCard",
              type: "object",
              fields: [
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "string",
                  options: {
                    list: [
                      { title: "Home", value: "home" },
                      { title: "People", value: "people" },
                      { title: "Path", value: "path" },
                    ],
                    layout: "radio",
                    direction: "horizontal",
                  },
                  initialValue: "home",
                }),
                defineField({ name: "title", title: "Question", type: "string", validation: (rule) => rule.required() }),
                defineField({ name: "description", title: "Description", type: "blockContent" }),
              ],
              preview: { select: { title: "title", subtitle: "icon" } },
            }),
          ],
        }),
        defineField({ name: "checklistHeading", title: "Checklist heading", type: "string" }),
        defineField({
          name: "checklist",
          title: "Who qualifies",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        defineField({ name: "checklistCta", title: "Checklist button", type: "cta" }),
        defineField({ name: "footer", title: "Closing text", type: "blockContent" }),
        defineField({ name: "footerCta", title: "Closing button", type: "cta" }),
      ],
    }),
    defineField({
      name: "support",
      title: "Find Ways To Support",
      type: "object",
      group: "support",
      description: "This section isn't on the site yet.",
      options: { collapsible: false },
      fields: [
        heading(),
        defineField({ name: "body", title: "Text", type: "blockContent" }),
        defineField({ name: "cta", title: "Button", type: "cta" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
})
