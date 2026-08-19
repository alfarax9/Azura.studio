import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { Star } from "@/components/ui/star";
import { getAdjacentProjects, getProject, getProjectSlugs } from "@/lib/content";
import { BLUR } from "@/lib/media";

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

  const info = [
    { label: "Client", value: project.client },
    { label: "Year", value: project.year },
    { label: "Timeline", value: project.timeline },
    { label: "Discipline", value: project.discipline },
  ].filter((item) => Boolean(item.value));

  return (
    <>
      {/* Hero: the thumbnail runs 60svh under its own dark gradient, and the
          white content panel rides up over its lower edge. */}
      <section
        data-nav-bg="dark"
        className="relative z-3 flex flex-col justify-center overflow-hidden bg-cream text-ink"
      >
        <div className="relative z-2">
          <Image
            src={project.cover.url}
            alt={project.cover.alt}
            width={2400}
            height={1400}
            priority
            sizes="100vw"
            className="h-[60svh] w-full object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[60svh] bg-[linear-gradient(to_bottom,#000000bf,#12121200_40%)]"
          />
        </div>

        <div className="relative z-3 bg-cream pt-[1.5em]">
          <div className="padding-global">
            <div className="grid grid-cols-12 items-start gap-[1.5em]">
              <div className="col-span-12 flex flex-col gap-[1em] md:col-span-7">
                <TextReveal as="h1" immediate className="text-headline">
                  {project.title}
                </TextReveal>
                <p className="text-[1.0625em] leading-relaxed text-ink/70">{project.headline}</p>

                {project.liveUrl && (
                  <Reveal delay={0.15}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="hover"
                      className="group inline-flex items-center gap-[0.5em] bg-[#1212120d] py-[0.75em] pr-[1.25em] pl-[1em] text-[1.0625em] transition-colors duration-500 hover:bg-ink hover:text-cream"
                    >
                      <Star className="size-[0.75em] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-180" />
                      Visit live site
                    </a>
                  </Reveal>
                )}
              </div>

              <Reveal
                className="col-span-12 grid grid-cols-2 items-start gap-[1.5em] md:col-span-4 md:col-start-9"
                delay={0.1}
              >
                {info.map((item) => (
                  <div key={item.label} className="flex flex-col gap-[0.25em]">
                    <span className="project-tag">{item.label}</span>
                    <span className="text-[1.0625em] font-medium">{item.value}</span>
                  </div>
                ))}

                {project.services?.length > 0 && (
                  <div className="col-span-2 flex flex-col gap-[0.25em]">
                    <span className="project-tag">Services</span>
                    <ul className="flex flex-col">
                      {project.services.map((service) => (
                        <li key={service} className="text-[1.0625em] font-medium">
                          {service}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section data-nav-bg="light" className="relative z-3 bg-cream pt-[5em] pb-[3em] text-ink">
        <div className="padding-global">
          <div className="grid grid-cols-12 items-start gap-[1.5em]">
            <div className="col-span-12 md:col-span-7">
              <TextReveal as="p" className="text-title">
                {project.intro}
              </TextReveal>
            </div>
          </div>

          {project.stats?.length > 0 && (
            <div className="mt-[5em] grid grid-cols-1 gap-[1.5em] border-y border-hairline py-[2.5em] sm:grid-cols-3">
              {project.stats.map((stat, i) => (
                <Reveal key={stat.label} delay={i * 0.08}>
                  <p className="text-headline">{stat.value}</p>
                  <p className="project-tag mt-[0.5em]">{stat.label}</p>
                </Reveal>
              ))}
            </div>
          )}

          {project.chapters?.length > 0 && (
            <div className="mt-[5em] flex flex-col items-center gap-[1em]">
              {project.chapters.map((chapter) => (
                <article key={chapter.heading} className="w-full">
                  <div className="grid grid-cols-12 items-start gap-[1.5em]">
                    <h2 className="col-span-12 text-title md:col-span-5">{chapter.heading}</h2>
                    <p className="col-span-12 text-[1.0625em] leading-relaxed text-ink/70 md:col-span-6 md:col-start-7">
                      {chapter.body}
                    </p>
                  </div>

                  {chapter.media?.url && (
                    <Reveal className="mt-[2em]" delay={0.1}>
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <Image
                          src={chapter.media.url}
                          alt={chapter.media.alt}
                          fill
                          sizes="100vw"
                          placeholder="blur"
                          blurDataURL={BLUR}
                          className="object-cover"
                        />
                      </div>
                    </Reveal>
                  )}
                </article>
              ))}
            </div>
          )}

          {project.gallery?.length > 0 && (
            <div className="mt-[5em] grid grid-cols-1 gap-[1em] md:grid-cols-2">
              {project.gallery.map((image, i) => (
                <Reveal key={image.url} delay={i * 0.06}>
                  {/* The 115% overscan is what the reference scrubs through. */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-[115%]">
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        placeholder="blur"
                        blurDataURL={BLUR}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {next && (
        <section data-nav-bg="light" className="relative z-3 bg-cream pb-[5em] text-ink">
          <div className="padding-global">
            <div className="flex items-center justify-end">
              <Link
                href={`/work/${next.slug}`}
                data-cursor="view"
                data-cursor-label="Next"
                className="group flex w-full items-end justify-between border-t border-hairline pt-[2.5em] pb-[2em]"
              >
                <span className="flex flex-col gap-[0.5em]">
                  <span className="project-tag">Next project</span>
                  <span className="text-headline transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-[0.1em]">
                    {next.title}
                  </span>
                </span>
                <span className="text-[1.0625em] font-medium">{next.year}</span>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
