import Image from "next/image";

import { BLUR } from "@/lib/media";
import type { ImageAsset } from "@/types/content";

/**
 * Sticky opening frame: the image holds the viewport while the section above
 * it scrolls away. The picture is rendered at 120% height so the parallax has
 * somewhere to travel without exposing an edge.
 */
export function AboutHero({ image, location }: { image: ImageAsset; location: string }) {
  return (
    <section
      data-nav-bg="dark"
      className="relative z-3 flex flex-col items-stretch justify-center overflow-hidden bg-cream"
    >
      <div className="relative flex h-svh max-h-dvh w-full items-end justify-center overflow-hidden">
        {/* The overscan lives on the wrapper, not the image: `next/image` with
            explicit width/height emits an inline height that beats a utility
            class, so the 120% silently collapsed to 100%. */}
        <div className="absolute inset-x-0 top-0 h-[120%]">
          <Image
            src={image.url}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={BLUR}
            className="object-cover"
          />
        </div>

        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_bottom,#0009,#0000_20%)]"
        />

        <div className="relative mx-auto flex w-full max-w-[var(--size-container)] flex-col items-end justify-end gap-[0.15em] px-(--spacing-gutter) pb-[2em] text-cream">
          <span className="section-tag">Where I work</span>
          <span className="text-[1.0625em] leading-[135%]">{location}</span>
        </div>
      </div>
    </section>
  );
}
