import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { AboutHero } from "@/components/sections/about-hero";
import { ApproachCards } from "@/components/sections/approach-cards";
import { ServicesPin } from "@/components/sections/services-pin";
import { SectionTag } from "@/components/ui/section-tag";
import { showroom } from "@/content/site";
import { getProcess, getServices, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "AZURA is a small digital product studio pairing product design with front-end engineering — one team from research through launch.",
};

export default async function AboutPage() {
  const [settings, services, process] = await Promise.all([
    getSiteSettings(),
    getServices(),
    getProcess(),
  ]);

  return (
    <>
      <AboutHero image={showroom[1] ?? showroom[0]} location={settings.location} />

      <section data-nav-bg="light" className="bg-cream pt-[3em] pb-(--spacing-section) text-ink">
        <div className="padding-global">
          <div className="grid-12">
            <div className="col-span-12 flex flex-col gap-[2.5em] md:col-span-7">
              <SectionTag label="About the studio" />
              <TextReveal as="h1" className="text-headline">
                A small team that designs and ships the same thing
              </TextReveal>
            </div>

            <Reveal className="col-span-12 md:col-span-4 md:col-start-9" delay={0.1}>
              <p className="text-[1.0625em] leading-relaxed text-ink/70">{settings.tagline}</p>
            </Reveal>
          </div>

          <div className="mt-[5em] grid grid-cols-1 gap-[1.5em] md:grid-cols-2">
            <TextReveal as="p" className="text-title">
              Most studios hand off. We stay on the file until it is live.
            </TextReveal>

            <Reveal
              className="flex flex-col items-start gap-[1.5em] text-[1.0625em] leading-relaxed text-ink/70"
              delay={0.1}
            >
              <p>
                AZURA is deliberately small. The people who run the research sessions are the same
                people who draw the interface and write the components, which removes the seam
                where most projects lose their intent.
              </p>
              <p>
                We work in the open: a real build in a real browser every week, not a deck. You can
                click the thing while it is still cheap to change, and by the time it launches
                there are no surprises left in it.
              </p>
              <p>
                {settings.availability}. We stay available after launch — the first three months
                post-release are usually where the most valuable work happens.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <ServicesPin services={services} images={showroom} />

      <section data-nav-bg="light" className="section-pad bg-cream text-ink">
        <div className="padding-global">
          <SectionTag label="How we work" count={String(process.length).padStart(2, "0")} />
          <ApproachCards steps={process} />
        </div>
      </section>
    </>
  );
}
