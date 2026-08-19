import { ArrowLink } from "@/components/ui/arrow-link";
import { Reveal } from "@/components/motion/reveal";
import { SectionTag } from "@/components/ui/section-tag";
import { TextReveal } from "@/components/motion/text-reveal";
import { getSiteSettings } from "@/lib/content";

/**
 * First beat after the fold. It also carries the tagline, which the hero no
 * longer states — the hero is the wordmark alone, so the positioning line has
 * to land here or it never appears on the page at all.
 */
export async function Statement() {
  const settings = await getSiteSettings();

  return (
    <section data-nav-bg="light" className="section-pad bg-cream text-ink">
      <div className="padding-global">
        <SectionTag label="Sound familiar?" />

        <div className="mt-[3em] grid grid-cols-12 gap-x-[1.5rem] gap-y-[1.5em]">
          <div className="col-span-12 flex flex-col gap-[2.5em] md:col-span-7">
            <TextReveal as="h2" className="text-title">
              You have a product. It works. It just no longer looks like the company you have
              become.
            </TextReveal>
          </div>

          <Reveal
            className="col-span-12 flex flex-col items-start gap-[2.5em] md:col-span-4 md:col-start-9"
            delay={0.1}
          >
            <p className="text-[1.0625em] leading-relaxed text-ink/70">{settings.tagline}</p>
            <p className="text-[1.0625em] leading-relaxed text-ink/70">
              No template, no handover cliff, no rebuild in eighteen months.
            </p>
            <div>
              <ArrowLink href="/about">More about the studio</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
