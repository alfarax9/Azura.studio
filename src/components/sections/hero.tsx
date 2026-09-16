"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { Magnetic } from "@/components/motion/magnetic";
import { TextReveal } from "@/components/motion/text-reveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { BLUR } from "@/lib/media";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { ProjectSummary, SiteSettings } from "@/types/content";

/**
 * Full-bleed hero.
 *
 * A single cover image fills the viewport behind a three-stop gradient that
 * runs dark → transparent → cream, so the section dissolves into the page
 * below it instead of ending on a hard edge.
 */
export function Hero({
  settings,
  projects,
}: {
  settings: SiteSettings;
  projects: ProjectSummary[];
}) {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const cover = projects[0]?.cover;

  useGSAP(
    () => {
      if (reduced || !root.current) return;

      // Slow push-in on the backdrop as the hero scrolls away.
      gsap.to("[data-hero-media]", {
        scale: 1.12,
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      data-nav-bg="dark"
      className="relative h-svh overflow-hidden bg-void"
    >
      {cover && (
        <div data-hero-media className="absolute inset-0 will-change-transform">
          <Image
            src={cover.url}
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover"
          />
        </div>
      )}

      {/* Dark at the top for the header, clear in the middle, cream at the
          bottom so the next section begins before this one ends. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6),rgba(0,0,0,0)_20%,rgba(0,0,0,0)_60%,var(--color-cream))]"
      />

      {/* Statement block, set a third of the way down — the composition's
          quiet half, against the wordmark's weight at the foot. */}
      <div className="padding-global absolute inset-x-0 top-[32%]">
        <TextReveal
          as="h1"
          immediate
          delay={0.15}
          className="text-lead max-w-[26ch] text-cream italic"
        >
          {settings.tagline.replace(/\.$/, "")}
        </TextReveal>

        <p className="text-lead mt-[0.1em] text-grey">
          {settings.role} — {settings.location}
        </p>
      </div>

      <div className="padding-global absolute inset-x-0 top-(--spacing-hero-top) flex justify-end">
        <Magnetic strength={0.3}>
          <Link
            href="/contact"
            data-cursor="hover"
            className="group inline-flex items-center gap-[0.6em] rounded-full bg-ink px-[1.6em] py-[0.8em] text-[1rem] text-cream transition-colors duration-500 hover:bg-azure"
          >
            Coffee?
            <svg
              viewBox="0 0 12 12"
              aria-hidden="true"
              className="size-[0.7em] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-[0.2em]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M2 10 10 2M4 2h6v6" />
            </svg>
          </Link>
        </Magnetic>
      </div>

      {/* Sits on the section rather than the padded container: it is meant to
          bleed to within 1rem of each edge, not sit on the content gutter. */}
      <p className="text-wordmark absolute right-[1rem] bottom-[1.5rem] left-[1rem] text-center font-wordmark text-cream uppercase italic">
        {settings.wordmark}
      </p>

    </section>
  );
}
