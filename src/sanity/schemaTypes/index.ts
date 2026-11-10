import type { SchemaTypeDefinition } from "sanity"
import { homePage } from "./homePage"
import { accessibleImage, blockContent, cta } from "./objects"
import { siteSettings } from "./siteSettings"

/** Document types that exist exactly once. The Studio hides "create" and "delete" for them. */
export const singletonTypes = new Set(["homePage", "siteSettings"])

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  homePage,
  blockContent,
  cta,
  accessibleImage,
]
