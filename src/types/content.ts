/**
 * Shared content contract.
 *
 * Both the local fallback content and the Sanity GROQ projections resolve to
 * these shapes, so components never learn where their data came from.
 */

export type ImageAsset = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ProjectSummary = {
  _id: string;
  title: string;
  slug: string;
  year: string;
  discipline: string;
  headline: string;
  cover: ImageAsset;
  /** Muted MP4 that plays on hover in the index. */
  preview?: string;
  accent: string;
};

export type ProjectChapter = {
  heading: string;
  body: string;
  media?: ImageAsset;
};

export type Project = ProjectSummary & {
  client: string;
  intro: string;
  services: string[];
  deliverables: string[];
  timeline: string;
  stats: { value: string; label: string }[];
  chapters: ProjectChapter[];
  gallery: ImageAsset[];
  liveUrl?: string;
};

export type Testimonial = {
  _id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  projectSlug?: string;
};

export type Service = {
  _id: string;
  title: string;
  body: string;
  capabilities: string[];
};

export type ProcessStep = {
  _id: string;
  title: string;
  body: string;
};

export type SiteSettings = {
  brand: string;
  /** Oversized display lettering in the hero — separate from `brand`. */
  wordmark: string;
  tagline: string;
  email: string;
  location: string;
  availability: string;
  socials: { label: string; href: string }[];
};
