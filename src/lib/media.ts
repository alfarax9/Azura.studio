/**
 * Placeholder media resolvers.
 *
 * Everything here points at free Pexels assets so the site is fully populated
 * before any CMS content exists. Once Cloudinary is wired up, swap the two
 * builders below for `CldImage` / `CldVideoPlayer` sources — call sites take
 * plain URLs and never touch the provider directly.
 */

const PEXELS_IMAGE = "https://images.pexels.com/photos";
const PEXELS_VIDEO = "https://videos.pexels.com/video-files";

export type Crop = "landscape" | "portrait" | "square";

const RATIO: Record<Crop, { w: number; h: number }> = {
  landscape: { w: 1600, h: 1000 },
  portrait: { w: 1000, h: 1400 },
  square: { w: 1200, h: 1200 },
};

/** Deterministic Pexels image URL at a fixed crop. */
export function px(id: number, crop: Crop = "landscape") {
  const { w, h } = RATIO[crop];
  return `${PEXELS_IMAGE}/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;
}

/** Direct MP4 from Pexels. `file` is the full filename, which encodes the rendition. */
export function pxVideo(id: number, file: string) {
  return `${PEXELS_VIDEO}/${id}/${file}`;
}

/**
 * Tiny blurred placeholder for `next/image`. Pexels serves a 20px version, but
 * a flat tone avoids a second network round-trip during LCP.
 */
export const BLUR =
  "data:image/svg+xml;base64," +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="5"><rect width="8" height="5" fill="#1c1c1c"/></svg>`,
  ).toString("base64");
