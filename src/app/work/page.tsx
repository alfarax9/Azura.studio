import type { Metadata } from "next";

import { CapabilityTicker } from "@/components/sections/capability-ticker";
import { PageHeader } from "@/components/sections/page-header";
import { ProjectGrid } from "@/components/sections/project-grid";
import { capabilitiesTicker } from "@/content/site";
import { getProjectSummaries } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected product design and engineering work by AZURA — platforms, design systems and brand systems built to last.",
};

export default async function WorkPage() {
  const projects = await getProjectSummaries();

  return (
    <>
      <PageHeader
        label={`Work — ${projects.length} projects`}
        title="Products we shaped, shipped and still stand behind"
        lead="A short archive on purpose. Every engagement here ran end to end — research through launch — and every number quoted came from the client's own reporting."
      />

      <section data-nav-bg="light" className="section-pad bg-cream text-ink">
        <div className="padding-global">
          <ProjectGrid projects={projects} />
        </div>
      </section>

      <CapabilityTicker items={capabilitiesTicker} direction={-1} className="bg-ink text-cream" />
    </>
  );
}
