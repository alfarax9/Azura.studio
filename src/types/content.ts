/**
 * Shared content contract.
 *
 * Every page reads through `src/lib/content.ts`, which serves the seed data in
 * `src/content/`. The shapes below are the only thing components know about.
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
  /** Role held on the engagement — shown where a studio site would show a year. */
  role: string;
  /**
   * Optional: the CV these entries came from carries no per-project dates, so
   * nothing here sets one. Fill it in and the index and case study pick it up.
   */
  year?: string;
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
  /** What the work involved. */
  services: string[];
  /** What was handed over. */
  deliverables: string[];
  /** Languages, frameworks and infrastructure the build ran on. */
  stack: string[];
  timeline?: string;
  /** Only rendered when a project has measured outcomes to quote. */
  stats?: { value: string; label: string }[];
  chapters: ProjectChapter[];
  gallery: ImageAsset[];
  liveUrl?: string;
};

/** The professional summary, told long-form on the about page. */
export type Profile = {
  name: string;
  role: string;
  headline: string;
  /** Short supporting lines beside the headline on the home page. */
  pitch: string[];
  /** The long-form summary, told on the about page. */
  summary: string[];
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

/** A competition result or award. */
export type Achievement = {
  _id: string;
  /** Oversized in the listing — "1st", "2nd", "3rd". */
  placement: string;
  title: string;
  organiser: string;
  year?: string;
};

/** Education and organisational roles share one shape. */
export type Credential = {
  _id: string;
  title: string;
  organisation: string;
  period: string;
  points: string[];
};

export type SiteSettings = {
  brand: string;
  /** Oversized display lettering in the hero — separate from `brand`. */
  wordmark: string;
  /** Discipline line under the hero statement. */
  role: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  availability: string;
  socials: { label: string; href: string }[];
};
