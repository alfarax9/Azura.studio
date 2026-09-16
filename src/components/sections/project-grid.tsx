"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";

import { Reveal } from "@/components/motion/reveal";
import { BLUR } from "@/lib/media";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { ProjectSummary } from "@/types/content";

/**
 * Project cards, two to a row.
 *
 * Each card is a 4:5 frame that swaps its still for a muted clip on hover, and
 * the caption sits *on* the image inside a blurred chip rather than underneath
 * it — so the card reads as one object instead of a picture with a label.
 */
export function ProjectGrid({
  projects,
  className,
}: {
  projects: ProjectSummary[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-[1em] md:grid-cols-2", className)}>
      {projects.map((project, i) => (
        <Reveal key={project._id} distance={24} amount={0.2} delay={(i % 2) * 0.08}>
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}

function ProjectCard({ project }: { project: ProjectSummary }) {
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
      className="group relative block aspect-[4/5] w-full overflow-hidden"
    >
      <Image
        src={project.cover.url}
        alt={project.cover.alt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        placeholder="blur"
        blurDataURL={BLUR}
        className={cn(
          "object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)]",
          hovered ? "scale-105" : "scale-100",
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

      {/* Frosted caption riding on the image. */}
      <div className="absolute right-[1.5em] bottom-[1.5em] left-[2em] flex items-center justify-end gap-[0.5em]">
        <div className="relative z-2 flex-1 overflow-hidden bg-[#0000004d] px-[0.75em] py-[0.5em] backdrop-blur-[2px]">
          <div className="flex flex-1 flex-col gap-[0.5em] text-cream">
            <div className="flex items-center justify-between">
              <span className="text-subtitle">{project.title}</span>
              {project.year && <span className="section-tag">{project.year}</span>}
            </div>
            <div className="flex items-center justify-between gap-[1em]">
              <span className="text-[0.9375em] text-cream/80">{project.headline}</span>
              <span className="section-tag shrink-0 text-cream/80">{project.discipline}</span>
            </div>
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[0.25em] origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </Link>
  );
}
