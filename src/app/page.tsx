import Link from "next/link";

import { Achievements } from "@/components/sections/achievements";
import { Hero } from "@/components/sections/hero";
import { ProjectGrid } from "@/components/sections/project-grid";
import { Statement } from "@/components/sections/statement";
import { HomeSectionHeader } from "@/components/ui/home-section-header";
import { Star } from "@/components/ui/star";
import {
  getAchievements,
  getProfile,
  getProjectSummaries,
  getSiteSettings,
} from "@/lib/content";
import { pad } from "@/lib/utils";

export default async function HomePage() {
  const [settings, profile, projects, achievements] = await Promise.all([
    getSiteSettings(),
    getProfile(),
    getProjectSummaries(),
    getAchievements(),
  ]);

  const featured = projects.slice(0, 4);

  return (
    <>
      <Hero settings={settings} projects={projects} />

      <Statement profile={profile} />

      <section data-nav-bg="light" className="section-pad bg-cream text-ink">
        <div className="padding-global">
          <HomeSectionHeader
            label="Projects"
            title="A few things I am glad to have my name on"
            count={pad(projects.length)}
          />

          <ProjectGrid projects={featured} />

          <div className="mt-[5em] flex justify-center">
            <Link
              href="/work"
              data-cursor="hover"
              className="group inline-flex items-center gap-[0.5em] bg-[#1212120d] py-[0.75em] pr-[1.25em] pl-[1em] text-[1.0625em] text-ink transition-colors duration-500 hover:bg-ink hover:text-cream"
            >
              <Star className="size-[0.75em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-180" />
              All projects
            </Link>
          </div>
        </div>
      </section>

      <Achievements items={achievements} />
    </>
  );
}
