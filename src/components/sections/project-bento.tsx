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
 * Five-tile bento composition on the 12-column bed.
 *
 * The pattern closes exactly every five tiles (8+4, 4+8, 12), so a sixth
 * project starts a fresh cycle rather than leaving a ragged row — the listing
 * stays composed no matter how many projects the CMS returns.
 */
const TILES = [
  { span: "md:col-span-8", ratio: "md:aspect-[16/11]" },
  { span: "md:col-span-4", ratio: "md:aspect-[4/5]" },
  { span: "md:col-span-4", ratio: "md:aspect-[4/5]" },
  { span: "md:col-span-8", ratio: "md:aspect-[16/11]" },
  { span: "md:col-span-12", ratio: "md:aspect-[21/9]" },
];

export function ProjectBento({
  projects,
  className,
}: {
  projects: ProjectSummary[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 gap-[1em] md:grid-cols-12", className)}>
      {projects.map((project, i) => {
        const tile = TILES[i % TILES.length];
        return (
          <Reveal
            key={project._id}
            distance={24}
            amount={0.15}
            delay={(i % 2) * 0.08}
            className={cn("col-span-1", tile.span)}
          >
            <BentoCard project={project} ratio={tile.ratio} />
          </Reveal>
        );
      })}
    </div>
  );
}

function BentoCard({ project, ratio }: { project: ProjectSummary; ratio: string }) {
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
      className={cn(
        "group relative block h-full w-full overflow-hidden",
        // Portrait on small screens, then the tile's own ratio takes over.
        "aspect-[4/5]",
        ratio,
      )}
    >
      <Image
        src={project.cover.url}
        alt={project.cover.alt}
        fill
        sizes="(min-width: 768px) 66vw, 100vw"
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

      {/* Accent flood, rising from the baseline the way the reference's row
          hover does. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-full origin-bottom scale-y-0 bg-[var(--accent)] opacity-70 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
      />

      <div className="absolute right-[1.5em] bottom-[1.5em] left-[2em] flex items-center justify-end gap-[0.5em]">
        <div className="relative z-2 flex-1 overflow-hidden bg-[#0000004d] px-[0.75em] py-[0.5em] backdrop-blur-[2px]">
          <div className="flex flex-col gap-[0.5em] text-cream">
            <div className="flex items-center justify-between gap-[1em]">
              <span className="text-subtitle">{project.title}</span>
              <span className="text-[1.0625em] font-medium">{project.year}</span>
            </div>
            <div className="flex items-center justify-between gap-[1em]">
              <span className="text-[0.9375em] text-cream/80">{project.headline}</span>
              <span className="shrink-0 text-[1.0625em] font-medium">{project.discipline}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
