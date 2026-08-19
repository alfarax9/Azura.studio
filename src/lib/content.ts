import "server-only";

import {
  process as localProcess,
  services as localServices,
  site as localSite,
  testimonials as localTestimonials,
} from "@/content/site";
import { projects as localProjects, projectSummaries } from "@/content/projects";
import { sanityFetch } from "@/sanity/lib/client";
import {
  processQuery,
  projectBySlugQuery,
  projectSlugsQuery,
  projectSummariesQuery,
  servicesQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from "@/sanity/lib/queries";
import type {
  ProcessStep,
  Project,
  ProjectSummary,
  Service,
  SiteSettings,
  Testimonial,
} from "@/types/content";

/**
 * Single read surface for every page.
 *
 * Each getter tries Sanity first and falls back to the bundled content when the
 * CMS is unconfigured, empty, or unreachable. Pages therefore never branch on
 * whether a CMS exists.
 */

function orLocal<T>(remote: T[] | null | undefined, local: T[]): T[] {
  return remote && remote.length > 0 ? remote : local;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const remote = await sanityFetch<SiteSettings>(siteSettingsQuery, {}, ["siteSettings"]);
  return remote ?? localSite;
}

export async function getProjectSummaries(): Promise<ProjectSummary[]> {
  const remote = await sanityFetch<ProjectSummary[]>(projectSummariesQuery, {}, ["project"]);
  return orLocal(remote, projectSummaries);
}

export async function getProjectSlugs(): Promise<string[]> {
  const remote = await sanityFetch<string[]>(projectSlugsQuery, {}, ["project"]);
  return orLocal(
    remote,
    localProjects.map((p) => p.slug),
  );
}

export async function getProject(slug: string): Promise<Project | null> {
  const remote = await sanityFetch<Project>(projectBySlugQuery, { slug }, ["project"]);
  return remote ?? localProjects.find((p) => p.slug === slug) ?? null;
}

/** Previous/next in display order, wrapping at both ends. */
export async function getAdjacentProjects(slug: string) {
  const all = await getProjectSummaries();
  const index = all.findIndex((p) => p.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: all[(index - 1 + all.length) % all.length] ?? null,
    next: all[(index + 1) % all.length] ?? null,
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const remote = await sanityFetch<Testimonial[]>(testimonialsQuery, {}, ["testimonial"]);
  return orLocal(remote, localTestimonials);
}

export async function getServices(): Promise<Service[]> {
  const remote = await sanityFetch<Service[]>(servicesQuery, {}, ["service"]);
  return orLocal(remote, localServices);
}

export async function getProcess(): Promise<ProcessStep[]> {
  const remote = await sanityFetch<ProcessStep[]>(processQuery, {}, ["processStep"]);
  return orLocal(remote, localProcess);
}
