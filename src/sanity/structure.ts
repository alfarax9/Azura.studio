import type { StructureResolver } from "sanity/structure";

/**
 * Pins Site settings as a singleton at the top of the desk; everything else
 * falls through to the default document lists.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("AZURA")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("processStep").title("Process steps"),
    ]);
