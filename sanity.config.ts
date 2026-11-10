"use client"

/**
 * Sanity Studio config, mounted at /studio (see src/app/studio/[[...tool]]/page.tsx).
 */
import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { apiVersion, dataset, projectId } from "./src/sanity/env"
import { schemaTypes, singletonTypes } from "./src/sanity/schemaTypes"
import { structure } from "./src/sanity/structure"

const singletonActions = new Set(["publish", "discardChanges", "restore"])

export default defineConfig({
  name: "default",
  title: "UR Home",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    // Hide singletons from the global "Create new" menu
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // Singletons can be published and reverted, but not duplicated or deleted
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
})
