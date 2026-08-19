import type { Metadata } from "next";
import Image from "next/image";

import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { CapabilityTicker } from "@/components/sections/capability-ticker";
import { PageHeader } from "@/components/sections/page-header";
import { SectionTag } from "@/components/ui/section-tag";
import { capabilitiesTicker, showroom } from "@/content/site";
import { getProcess, getServices, getSiteSettings } from "@/lib/content";
import { BLUR } from "@/lib/media";
import { pad } from "@/lib/utils";

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
      <PageHeader
        label="About the studio"
        title="A small team that designs and ships the same thing"
        lead={settings.tagline}
      />

      <section data-nav-bg="light" className="section-pad bg-cream text-ink">
        <div className="padding-global grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Parallax className="relative aspect-[4/5] overflow-hidden rounded-md" speed={0.1}>
              <Image
                src={showroom[0].url}
                alt={showroom[0].alt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                placeholder="blur"
                blurDataURL={BLUR}
                className="scale-115 object-cover"
              />
            </Parallax>
          </Reveal>

          <div className="md:col-span-6 md:col-start-7">
            <SectionTag label="Who we are" />
            <TextReveal
              as="p"
              className="mt-10 text-title text-balance"
            >
              Most studios hand off. We stay on the file until it is live.
            </TextReveal>

            <Reveal className="mt-8 space-y-6 text-[1.0625rem] leading-relaxed text-ink/70" delay={0.1}>
              <p>
                AZURA is deliberately small. The people who run the research sessions are the same
                people who draw the interface and write the components, which removes the seam where
                most projects lose their intent.
              </p>
              <p>
                We work in the open: a real build in a real browser every week, not a deck. You can
                click the thing while it is still cheap to change, and by the time it launches there
                are no surprises left in it.
              </p>
              <p>
                {settings.availability}. We take on a small number of engagements at a time and stay
                available after launch — the first three months post-release are usually where the
                most valuable work happens.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CapabilityTicker items={capabilitiesTicker} className="bg-ink text-cream" />

      <section data-nav-bg="light" className="section-pad bg-cream text-ink">
        <div className="padding-global">
          <SectionTag label="What we do" count={pad(services.length)} />

          <div className="mt-12 grid gap-px border-t border-hairline sm:grid-cols-2">
            {services.map((service, i) => (
              <Reveal key={service._id} delay={i * 0.08}>
                <article className="group h-full border-b border-hairline py-10 sm:pr-10">
                  <span className="section-tag text-muted">{pad(i + 1)}</span>
                  <h2 className="mt-4 text-title">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-[46ch] text-[1.0625rem] leading-relaxed text-ink/70">
                    {service.body}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.capabilities.map((c) => (
                      <li
                        key={c}
                        className="rounded-full border border-hairline px-3 py-1 text-[0.8125rem] text-ink/70 transition-colors duration-500 group-hover:border-ink/40"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-nav-bg="dark" className="section-pad bg-ink text-cream">
        <div className="padding-global">
          <SectionTag label="How we work" count={pad(process.length)} invert />

          <ol className="mt-12">
            {process.map((step, i) => (
              <Reveal key={step._id} delay={i * 0.06}>
                <li className="grid gap-6 border-b border-hairline-invert py-10 md:grid-cols-12">
                  <span className="section-tag text-cream/60 md:col-span-2">{pad(i + 1)}</span>
                  <h2 className="text-title md:col-span-4">
                    {step.title}
                  </h2>
                  <p className="text-[1.0625rem] leading-relaxed text-cream/60 md:col-span-6">
                    {step.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section data-nav-bg="light" className="bg-cream py-20 text-ink">
        <div className="padding-global">
          <SectionTag label="Studio" count="Fragments" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {showroom.slice(1).map((image, i) => (
              <Reveal key={image.url} delay={i * 0.06}>
                <figure className="relative aspect-[4/5] overflow-hidden rounded-md">
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    placeholder="blur"
                    blurDataURL={BLUR}
                    className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] hover:scale-105"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
