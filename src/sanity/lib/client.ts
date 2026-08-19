import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, sanityEnabled } from "@/sanity/env";

export const client = sanityEnabled
  ? createClient({
      projectId,
      dataset,
      apiVersion,
    
      useCdn: true,
      perspective: "published",
      stega: {
        studioUrl: "/studio",
        enabled: process.env.NEXT_PUBLIC_SANITY_VISUAL_EDITING === "true",
      },
    })
  : null;

/** Tagged fetch with ISR. Returns `null` when Sanity is not configured. */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<T | null> {
  if (!client) return null;

  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60, tags },
    });
  } catch (error) {
    // A CMS outage should degrade to local content, never to a 500.
    console.error("[sanity] fetch failed, falling back to local content", error);
    return null;
  }
}
