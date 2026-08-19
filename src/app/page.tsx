import Link from "next/link";

import { CapabilityTicker } from "@/components/sections/capability-ticker";
import { Hero } from "@/components/sections/hero";
import { ProjectGrid } from "@/components/sections/project-grid";
import { Showroom } from "@/components/sections/showroom";
import { Statement } from "@/components/sections/statement";
import { Testimonials } from "@/components/sections/testimonials";
import { Button } from "@/components/ui/button";
import { SectionTag } from "@/components/ui/section-tag";
import { capabilitiesTicker, showroom } from "@/content/site";
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

      <CapabilityTicker items={capabilitiesTicker} />

      <section data-nav-bg="light" className="section-pad bg-cream text-ink">
        <div className="padding-global">
          <SectionTag label="Selected work" count={pad(projects.length)} />

          <ProjectGrid projects={featured} className="mt-12" />

          <div className="mt-12 flex justify-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/work">All projects</Link>
            </Button>
          </div>
        </div>
      </section>

      <Testimonials items={testimonials} />

      <Showroom items={showroom} />
    </>
  );
}
