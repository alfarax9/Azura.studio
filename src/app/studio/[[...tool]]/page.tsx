import { notFound } from "next/navigation";

import { sanityEnabled } from "@/sanity/env";

export const dynamic = "force-static";
export const metadata = {
  title: "AZURA Studio",
  robots: { index: false, follow: false },
};

/**
 * Embedded Sanity Studio at /studio.
 *
 * The config is imported lazily so a deployment without Sanity credentials
 * simply 404s here instead of failing to build.
 */
export default async function StudioPage() {
  if (!sanityEnabled) notFound();

  const [{ NextStudio }, { default: config }] = await Promise.all([
    import("next-sanity/studio"),
    import("../../../../sanity.config"),
  ]);

  return <NextStudio config={config} />;
}
