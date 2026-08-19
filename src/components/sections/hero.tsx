"use client";

import Image from "next/image";
import { useRef } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { BLUR } from "@/lib/media";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { ProjectSummary, SiteSettings } from "@/types/content";

/**
 * Full-bleed hero carrying nothing but the wordmark.
 *
 * Two gradients stack over the image: one darkens the top so the menu button
 * stays legible, the other floods the bottom with the page colour so the fold
 * dissolves into the section below instead of ending on a hard edge.
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
      className="relative h-svh overflow-hidden bg-void max-xs:overflow-hidden"
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
            className="size-full object-cover"
          />
        </div>
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,#0009,#0000_20%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,#0009,#0000_20%,var(--color-cream))]"
      />

      <h1 className="text-wordmark absolute inset-x-[1rem] bottom-[1.5rem] text-center text-ink uppercase italic max-xs:static">
        {settings.brand}
      </h1>
    </section>
  );
}
