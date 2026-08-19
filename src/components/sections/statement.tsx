import { ArrowLink } from "@/components/ui/arrow-link";
import { Reveal } from "@/components/motion/reveal";
import { SectionTag } from "@/components/ui/section-tag";
import { TextReveal } from "@/components/motion/text-reveal";

/**
 * The "does this sound familiar?" beat: the eyebrow and headline sit in the
 * left half of the 12-column bed, the supporting paragraph in the right.
 */
export function Statement() {
  return (
    <section data-nav-bg="light" className="section-pad bg-cream text-ink">
      <div className="padding-global">
        <SectionTag label="Sound familiar?" />

        <div className="grid-12 mt-[3em]">
          <div className="col-span-12 md:col-span-7">
            <TextReveal as="h2" className="text-title">
              You have a product. It works. It just no longer looks like the company you have
              become.
            </TextReveal>
          </div>

          <Reveal className="col-span-12 md:col-span-4 md:col-start-9" delay={0.1}>
            <p className="text-[1.0625rem] leading-relaxed text-ink/70">
              We design and build digital products that hold up under real use — fast, accessible,
              maintainable by the team that inherits them, and unmistakably yours. No template, no
              handover cliff, no rebuild in eighteen months.
            </p>
            <div className="mt-[1.5em]">
              <ArrowLink href="/about">More about the studio</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
