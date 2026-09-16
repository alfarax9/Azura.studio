import { ArrowLink } from "@/components/ui/arrow-link";
import { Reveal } from "@/components/motion/reveal";
import { SectionTag } from "@/components/ui/section-tag";
import { TextReveal } from "@/components/motion/text-reveal";
import type { Profile } from "@/types/content";

/** First beat after the fold: the position, stated before any work shows. */
export function Statement({ profile }: { profile: Profile }) {
  return (
    <section data-nav-bg="light" className="section-pad bg-cream text-ink">
      <div className="padding-global">
        <SectionTag label={profile.role} />

        <div className="mt-[3em] grid grid-cols-12 gap-x-[1.5rem] gap-y-[1.5em]">
          <div className="col-span-12 flex flex-col gap-[2.5em] md:col-span-7">
            <TextReveal as="h2" className="text-title">
              {profile.headline}
            </TextReveal>
          </div>

          <Reveal
            className="col-span-12 flex flex-col items-start gap-[2.5em] md:col-span-4 md:col-start-9"
            delay={0.1}
          >
            {profile.pitch.map((line) => (
              <p key={line.slice(0, 40)} className="text-[1.0625em] leading-relaxed text-ink/70">
                {line}
              </p>
            ))}
            <div>
              <ArrowLink href="/about">More about my work</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
