export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-01-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

/**
 * The site ships fully populated from local content, so Sanity is optional.
 * Everything CMS-related stays dormant until a project id is present.
 */
export const sanityEnabled = projectId.length > 0;
