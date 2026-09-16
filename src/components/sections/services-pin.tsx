"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { BLUR } from "@/lib/media";
import { cn, pad } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { ImageAsset, Service } from "@/types/content";

/**
 * Services as a scroll-driven sequence.
 *
 * The section is four viewports tall and its inner frame is `position: sticky`,
 * so scrolling advances through the services while the frame stays put. Scroll
 * progress drives two things: which service is active, and how far the hairline
 * rail on the left has filled.
 *
 * The rail is written straight to the DOM rather than through React state —
 * it updates every frame, and re-rendering the section that often would be
 * wasteful. Only the active index, which changes a handful of times, is state.
 */
export function ServicesPin({
  services,
  images,
}: {
  services: Service[];
  images: ImageAsset[];
}) {
  const root = useRef<HTMLElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const count = services.length;

  useGSAP(
    () => {
      if (!root.current || count === 0) return;

      const setFill = fill.current
        ? gsap.quickSetter(fill.current, "height", "%")
        : null;

      const trigger = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate(self) {
          const scaled = self.progress * count;
          setActive(Math.min(count - 1, Math.floor(scaled)));
          // Rail refills within each service rather than across the whole run.
          setFill?.((scaled % 1) * 100);
        },
      });

      return () => trigger.kill();
    },
    { scope: root, dependencies: [count, reduced] },
  );

  if (count === 0) return null;

  return (
    <section
      ref={root}
      data-nav-bg="dark"
      className="relative z-3 h-[400vh] bg-cream max-md:h-auto"
    >
      <div className="sticky top-0 flex h-dvh items-start justify-end overflow-hidden max-md:static max-md:h-auto max-md:block">
        {/* Media stack — only the active frame is opaque. */}
        {services.map((service, i) => {
          const image = images[i % images.length];
          return (
            <div
              key={service._id}
              aria-hidden={i !== active}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000 ease-[var(--ease-out-expo)]",
                i === active ? "z-2 opacity-100" : "z-1 opacity-0",
                "max-md:relative max-md:inset-auto max-md:aspect-[4/3] max-md:opacity-100",
              )}
            >
              {image && (
                <Image
                  src={image.url}
                  alt=""
                  fill
                  sizes="100vw"
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="object-cover"
                />
              )}
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_top,#000000b3,#0000_55%)]"
              />
            </div>
          );
        })}

        {/* Left rail: eyebrow above a 1px track that fills per service. */}
        <div className="absolute inset-y-0 left-0 z-3 flex h-screen items-start pl-[5em] max-md:hidden">
          <div className="relative flex h-full w-[3px] items-end justify-between">
            <span className="h-[25%] w-px overflow-hidden bg-[#fdfbf833]">
              <span ref={fill} className="block h-0 w-px bg-white" />
            </span>
          </div>
        </div>

        {/* Copy for the active service, pinned to the lower-left. */}
        <div className="absolute inset-x-[2.5em] bottom-[2.5em] z-3 grid grid-cols-6 gap-y-[1.5em] text-cream max-md:hidden">
          <div className="col-span-6 flex items-start gap-[0.25em]">
            <span className="section-tag">What I do</span>
            <span className="section-tag">
              {pad(active + 1)} / {pad(count)}
            </span>
          </div>

          <div className="col-span-6 flex flex-col items-start gap-[0.5em] md:col-span-3">
            <h3 className="text-headline">{services[active].title}</h3>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="text-[1.0625em] leading-relaxed text-cream/80">
              {services[active].body}
            </p>
            <ul className="mt-[1em] flex flex-wrap gap-[0.5em]">
              {services[active].capabilities.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-hairline-invert px-[0.9em] py-[0.35em] text-[0.8125em] text-cream/80"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Below the sticky breakpoint the sequence flattens into a list. */}
        <div className="hidden max-md:block">
          {services.map((service, i) => (
            <div key={service._id} className="padding-global py-[2em]">
              <span className="section-tag text-muted">{pad(i + 1)}</span>
              <h3 className="mt-[0.4em] text-title">{service.title}</h3>
              <p className="mt-[0.6em] text-[1.0625em] leading-relaxed text-ink/70">
                {service.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
