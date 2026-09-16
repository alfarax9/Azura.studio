import "server-only";

import {
  achievements as localAchievements,
  credentials as localCredentials,
  process as localProcess,
  profile as localProfile,
  services as localServices,
  site as localSite,
} from "@/content/site";
import { projects as localProjects, projectSummaries } from "@/content/projects";
import type {
  Achievement,
  Credential,
  ProcessStep,
  Profile,
  Project,
  ProjectSummary,
  Service,
  SiteSettings,
} from "@/types/content";

/**
 * Single read surface for every page.
 *
 * The seed data in `src/content/` is the source of truth. The getters stay
 * async so a remote source can be slotted in behind them later without
 * touching a single page.
 */

export async function getSiteSettings(): Promise<SiteSettings> {
  return localSite;
}

export async function getProfile(): Promise<Profile> {
  return localProfile;
}

export async function getProjectSummaries(): Promise<ProjectSummary[]> {
  return projectSummaries;
}

export async function getProjectSlugs(): Promise<string[]> {
  return localProjects.map((p) => p.slug);
}

export async function getProject(slug: string): Promise<Project | null> {
  return localProjects.find((p) => p.slug === slug) ?? null;
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

export async function getServices(): Promise<Service[]> {
  return localServices;
}

export async function getProcess(): Promise<ProcessStep[]> {
  return localProcess;
}

export async function getAchievements(): Promise<Achievement[]> {
  return localAchievements;
}

export async function getCredentials(): Promise<Credential[]> {
  return localCredentials;
}
