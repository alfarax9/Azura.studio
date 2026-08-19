import Link from "next/link";

import { Hero } from "@/components/sections/hero";
import { ProjectGrid } from "@/components/sections/project-grid";
import { Statement } from "@/components/sections/statement";
import { Testimonials } from "@/components/sections/testimonials";
import { HomeSectionHeader } from "@/components/ui/home-section-header";
import { Star } from "@/components/ui/star";
import {
  getProjectSummaries,
  getSiteSettings,
  getTestimonials,
} from "@/lib/content";
import { pad } from "@/lib/utils";

export default async function HomePage() {
  const [settings, projects, testimonials] = await Promise.all([
    getSiteSettings(),
    getProjectSummaries(),
    getTestimonials(),
  ]);

  const featured = projects.slice(0, 4);

  return (
    <>
      <Hero settings={settings} projects={projects} />

      <Statement />

      <section data-nav-bg="light" className="section-pad bg-cream text-ink">
        <div className="padding-global">
          <HomeSectionHeader
            label="Projects"
            title="A few things we are glad to have our name on"
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

      <Testimonials items={testimonials} />
    </>
  );
}
