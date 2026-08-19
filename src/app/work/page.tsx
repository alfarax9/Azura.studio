import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { ProjectBento } from "@/components/sections/project-bento";
import { getProjectSummaries, getSiteSettings } from "@/lib/content";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected product design and engineering work by AZURA — platforms, design systems and brand systems built to last.",
};

export default async function WorkPage() {
  const [projects, settings] = await Promise.all([
    getProjectSummaries(),
    getSiteSettings(),
  ]);

  return (
    <section
      data-nav-bg="light"
      className="relative flex flex-col justify-center overflow-hidden bg-cream pt-(--spacing-hero-top) pb-[3em] text-ink"
    >
      <div className="padding-global">
        {/* Masthead on the reference's 12-column title grid. */}
        <div className="relative z-2 grid grid-cols-12 items-start gap-[1.5em]">
          <div className="col-span-12 flex flex-col gap-[1em] md:col-span-7">
            <Reveal distance={10}>
              <span className="section-rule" />
              <p className="section-tag mt-[1.5em]">Work — {pad(projects.length)} projects</p>
            </Reveal>
            <TextReveal as="h1" className="text-headline">
              Products we shaped, shipped and still stand behind
            </TextReveal>
          </div>

          <Reveal
            className="col-span-12 flex flex-col items-start gap-[4em] md:col-span-4 md:col-start-9"
            delay={0.1}
          >
            <p className="text-[1.0625em] leading-relaxed text-ink/70">
              A short archive on purpose. Every engagement here ran end to end — research through
              launch — and every number quoted came from the client&rsquo;s own reporting.
            </p>
            <p className="section-tag text-muted">{settings.availability}</p>
          </Reveal>
        </div>

        <ProjectBento projects={projects} className="mt-[5em]" />
      </div>
    </section>
  );
}
