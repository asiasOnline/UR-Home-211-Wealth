import type { StructureResolver } from "sanity/structure"

// Singletons open straight into their one document, using the type name as the document ID.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Home Page")
        .id("homePage")
        .schemaType("homePage")
        .child(S.document().schemaType("homePage").documentId("homePage")),
      S.divider(),
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .schemaType("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
    ])
