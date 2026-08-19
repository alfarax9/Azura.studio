import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { ArrowLink } from "@/components/ui/arrow-link";
import { SectionTag } from "@/components/ui/section-tag";
import { getAdjacentProjects, getProject, getProjectSlugs } from "@/lib/content";
import { BLUR } from "@/lib/media";
import { pad } from "@/lib/utils";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project not found" };

  return {
    title: project.title,
    description: project.headline,
    openGraph: {
      title: `${project.title} — AZURA`,
      description: project.headline,
      images: project.cover?.url ? [{ url: project.cover.url }] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const { next } = await getAdjacentProjects(slug);

  const meta = [
    { label: "Client", value: project.client },
    { label: "Year", value: project.year },
    { label: "Timeline", value: project.timeline },
    { label: "Discipline", value: project.discipline },
  ].filter((m) => Boolean(m.value));

  return (
    <>
      <header data-nav-bg="dark" className="bg-void pt-40 pb-14 text-cream md:pt-52">
        <div className="padding-global">
          <Reveal distance={10}>
            <div className="flex items-baseline justify-between border-t border-hairline-invert pt-4">
              <span className="section-tag text-cream/60">{project.discipline}</span>
              <span className="section-tag text-cream/60">{project.year}</span>
            </div>
          </Reveal>

          <TextReveal
            as="h1"
            immediate
            delay={0.1}
            className="mt-10 max-w-[14ch] text-display text-balance"
          >
            {project.title}
          </TextReveal>

          <Reveal className="mt-8 max-w-[46ch]" delay={0.2}>
            <p className="text-lead text-cream/70">{project.headline}</p>
          </Reveal>
        </div>

        <Reveal className="mt-16" delay={0.3}>
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={project.cover.url}
              alt={project.cover.alt}
              fill
              priority
              sizes="100vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover"
            />
          </div>
        </Reveal>
      </header>

      <section data-nav-bg="light" className="section-pad bg-cream text-ink">
        <div className="padding-global grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <dl className="space-y-6">
              {meta.map((m) => (
                <div key={m.label} className="border-t border-hairline pt-3">
                  <dt className="section-tag text-muted">{m.label}</dt>
                  <dd className="mt-1 text-[0.9375rem]">{m.value}</dd>
                </div>
              ))}

              {project.services?.length > 0 && (
                <div className="border-t border-hairline pt-3">
                  <dt className="section-tag text-muted">Services</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-hairline px-3 py-1 text-[0.8125rem]"
                      >
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>

            {project.liveUrl && (
              <div className="mt-8">
                <ArrowLink href={project.liveUrl} target="_blank" rel="noreferrer noopener">
                  Visit live site
                </ArrowLink>
              </div>
            )}
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <TextReveal
              as="p"
              className="text-title text-balance"
            >
              {project.intro}
            </TextReveal>
          </div>
        </div>

        {project.stats?.length > 0 && (
          <div className="padding-global mt-20">
            <dl className="grid gap-px overflow-hidden border-y border-hairline sm:grid-cols-3">
              {project.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.08} className="py-10">
                  <dt className="text-headline">
                    {stat.value}
                  </dt>
                  <dd className="section-tag mt-3 text-muted">{stat.label}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        )}
      </section>

      {project.chapters?.length > 0 && (
        <section data-nav-bg="light" className="bg-cream pb-24 text-ink">
          <div className="padding-global space-y-24 md:space-y-36">
            {project.chapters.map((chapter, i) => (
              <article key={chapter.heading} className="grid gap-10 md:grid-cols-12">
                <div className="md:col-span-5">
                  <span className="section-tag text-muted">{pad(i + 1)}</span>
                  <TextReveal
                    as="h2"
                    className="mt-4 text-title"
                  >
                    {chapter.heading}
                  </TextReveal>
                  <Reveal delay={0.1}>
                    <p className="mt-6 text-[1.0625rem] leading-relaxed text-ink/70">
                      {chapter.body}
                    </p>
                  </Reveal>
                </div>

                {chapter.media?.url && (
                  <Reveal className="md:col-span-6 md:col-start-7" delay={0.15}>
                    <Parallax className="relative aspect-[4/3] rounded-md" speed={0.09}>
                      <Image
                        src={chapter.media.url}
                        alt={chapter.media.alt}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        placeholder="blur"
                        blurDataURL={BLUR}
                        className="scale-115 object-cover"
                      />
                    </Parallax>
                  </Reveal>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {project.gallery?.length > 0 && (
        <section data-nav-bg="light" className="bg-cream pb-24 text-ink">
          <div className="padding-global">
            <SectionTag label="Gallery" count={pad(project.gallery.length)} />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((image, i) => (
                <Reveal key={image.url} delay={i * 0.07}>
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
      )}

      {next && (
        <section data-nav-bg="light" className="bg-cream pb-24 text-ink">
          <div className="padding-global">
            <Link
              href={`/work/${next.slug}`}
              data-cursor="view"
              data-cursor-label="Next"
              className="group relative block overflow-hidden border-t border-hairline py-14"
            >
              <span className="section-tag text-muted">Next project</span>
              <span className="mt-4 flex flex-wrap items-baseline justify-between gap-4">
                <span className="text-headline transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-3">
                  {next.title}
                </span>
                <span className="section-tag text-muted">{next.year}</span>
              </span>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
