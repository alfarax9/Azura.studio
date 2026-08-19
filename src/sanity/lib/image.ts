import createImageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";

import { dataset, projectId, sanityEnabled } from "@/sanity/env";

const builder = sanityEnabled ? createImageUrlBuilder({ projectId, dataset }) : null;

export function urlFor(source: SanityImageSource) {
  return builder?.image(source).auto("format").fit("max") ?? null;
}
