import { CogIcon } from "@sanity/icons/Cog"
import { defineField, defineType } from "sanity"

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "title",
      title: "Site title",
      type: "string",
      description: "Shown in the browser tab and search results.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "copyright",
      title: "Footer copyright",
      type: "string",
      description: "Not shown on the site yet (the footer hasn't been built).",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
})
