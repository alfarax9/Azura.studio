import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { AboutHero } from "@/components/sections/about-hero";
import { ApproachCards } from "@/components/sections/approach-cards";
import { Credentials } from "@/components/sections/credentials";
import { ServicesPin } from "@/components/sections/services-pin";
import { SectionTag } from "@/components/ui/section-tag";
import { showroom } from "@/content/site";
import {
  getCredentials,
  getProcess,
  getProfile,
  getServices,
  getSiteSettings,
} from "@/lib/content";
import { pad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Maulana Alfara — fullstack and AI engineer building web products with business rules, machine learning and LLM retrieval working as one system.",
};

export default async function AboutPage() {
  const [settings, profile, services, process, credentials] = await Promise.all([
    getSiteSettings(),
    getProfile(),
    getServices(),
    getProcess(),
    getCredentials(),
  ]);

  return (
    <>
      <AboutHero image={showroom[1] ?? showroom[0]} location={settings.location} />

      <section data-nav-bg="light" className="bg-cream pt-[3em] pb-(--spacing-section) text-ink">
        <div className="padding-global">
          <div className="grid-12">
            <div className="col-span-12 flex flex-col gap-[2.5em] md:col-span-7">
              <SectionTag label={`About ${profile.name}`} />
              <TextReveal as="h1" className="text-headline">
                {profile.role}
              </TextReveal>
            </div>

            <Reveal className="col-span-12 md:col-span-4 md:col-start-9" delay={0.1}>
              <p className="text-[1.0625em] leading-relaxed text-ink/70">{settings.tagline}</p>
            </Reveal>
          </div>

          <div className="mt-[5em] grid grid-cols-1 gap-[1.5em] md:grid-cols-2">
            <TextReveal as="p" className="text-title">
              {profile.headline}
            </TextReveal>

            <Reveal
              className="flex flex-col items-start gap-[1.5em] text-[1.0625em] leading-relaxed text-ink/70"
              delay={0.1}
            >
              {profile.summary.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <ServicesPin services={services} images={showroom} />

      <section data-nav-bg="light" className="section-pad bg-cream text-ink">
        <div className="padding-global">
          <SectionTag label="How I work" count={pad(process.length)} />
          <ApproachCards steps={process} />
        </div>
      </section>

      <section data-nav-bg="light" className="bg-cream pb-(--spacing-section) text-ink">
        <div className="padding-global">
          <SectionTag label="Education & organisation" count={pad(credentials.length)} />
          <Credentials items={credentials} />
        </div>
      </section>
    </>
  );
}
