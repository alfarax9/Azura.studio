"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";

import { Reveal } from "@/components/motion/reveal";
import { BLUR } from "@/lib/media";
import { cn, pad } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { ProjectSummary } from "@/types/content";

/**
 * Project cards on the 12-column bed: two per row, each a still that swaps to
 * a muted looping clip on hover, with the title, discipline and year in the
 * caption underneath.
 *
 * Equal spans keep every caption on the same baseline — uneven spans left the
 * shorter card's caption floating mid-row.
 */

export function ProjectGrid({
  projects,
  className,
}: {
  projects: ProjectSummary[];
  className?: string;
}) {
  return (
    <div className={cn("grid-12", className)}>
      {projects.map((project, i) => (
        <Reveal
          key={project._id}
          distance={24}
          amount={0.2}
          delay={(i % 2) * 0.08}
          className="col-span-12 md:col-span-6"
        >
          <ProjectCard project={project} index={i} />
        </Reveal>
      ))}
    </div>
  );
}

function ProjectCard({ project, index }: { project: ProjectSummary; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const reduced = useReducedMotion();

  const play = () => {
    setHovered(true);
    if (!reduced) void videoRef.current?.play().catch(() => {});
  };

  const stop = () => {
    setHovered(false);
    videoRef.current?.pause();
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="view"
      data-cursor-label="View"
      onPointerEnter={play}
      onPointerLeave={stop}
      onFocus={play}
      onBlur={stop}
      style={{ "--accent": project.accent } as CSSProperties}
      className="group block"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[0.4em] bg-ink">
        {/* The still is overscanned so the scale-down on hover never reveals
            an edge. */}
        <Image
          src={project.cover.url}
          alt={project.cover.alt}
          fill
          sizes="(min-width: 768px) 60vw, 100vw"
          placeholder="blur"
          blurDataURL={BLUR}
          className={cn(
            "object-cover transition-[transform,opacity] duration-1000 ease-[var(--ease-out-expo)]",
            hovered ? "scale-105 opacity-0" : "scale-100 opacity-100",
          )}
        />

        {project.preview && !reduced && (
          <video
            ref={videoRef}
            src={project.preview}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className={cn(
              "absolute inset-0 size-full object-cover transition-opacity duration-700",
              hovered ? "opacity-100" : "opacity-0",
            )}
          />
        )}

        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[0.25em] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />
      </div>

      <div className="mt-[1em]">
        <span className="section-rule" />
        <div className="mt-[0.8em] flex items-start justify-between gap-[1.5em]">
          <div className="flex items-baseline gap-[0.8em]">
            <span className="section-tag text-muted">{pad(index + 1)}</span>
            <div>
              <h3 className="text-subtitle transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-[0.15em]">
                {project.title}
              </h3>
              <p className="mt-[0.2em] text-[1rem] text-muted">{project.headline}</p>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <p className="section-tag text-muted">{project.discipline}</p>
            <p className="section-tag mt-[0.2em] text-muted">{project.year}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
