"use client";

import Image from "next/image";
import { useRef } from "react";

import { ArrowLink } from "@/components/ui/arrow-link";
import { SectionTag } from "@/components/ui/section-tag";
import { TextReveal } from "@/components/motion/text-reveal";
import { gsap, useGSAP } from "@/lib/gsap";
import { BLUR } from "@/lib/media";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { ImageAsset } from "@/types/content";

/**
 * Full-width slider. On desktop the section pins and the track translates by
 * its own overflow width; on touch and under reduced motion it degrades to a
 * plain swipeable strip.
 */
export function Showroom({ items }: { items: ImageAsset[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const section = root.current;
      const el = track.current;
      if (!section || !el || reduced) return;
      if (!window.matchMedia("(min-width: 768px)").matches) return;

      const distance = () => el.scrollWidth - window.innerWidth;
      if (distance() <= 0) return;

      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section data-nav-bg="dark" ref={root} className="relative overflow-hidden bg-ink py-[5em] text-cream">
      <div className="padding-global">
        <SectionTag label="Showroom" count="Fragments" invert />

        <div className="grid-12 mt-[2em]">
          <TextReveal as="h2" className="col-span-12 text-title md:col-span-8">
            Fragments from the studio floor
          </TextReveal>
        </div>
      </div>

      <div
        ref={track}
        className="padding-global mt-[3em] flex gap-[1em] overflow-x-auto pb-[1em] will-change-transform md:overflow-visible md:pb-0"
      >
        {items.map((item, i) => (
          <figure
            key={item.url}
            data-cursor="hover"
            className={`relative shrink-0 overflow-hidden rounded-[0.4em] ${
              i % 3 === 1
                ? "h-[52vh] w-[74vw] md:h-[64vh] md:w-[42vw]"
                : "h-[42vh] w-[62vw] md:h-[48vh] md:w-[28vw]"
            } ${i % 3 === 2 ? "self-end" : ""}`}
          >
            <Image
              src={item.url}
              alt={item.alt}
              fill
              sizes="(min-width: 768px) 42vw, 74vw"
              placeholder="blur"
              blurDataURL={BLUR}
              className="object-cover transition-transform duration-1000 ease-[var(--ease-out-expo)] hover:scale-105"
            />
          </figure>
        ))}
      </div>

      <div className="padding-global mt-[3em]">
        <ArrowLink href="/work" className="text-cream">
          Explore the archive
        </ArrowLink>
      </div>
    </section>
  );
}
