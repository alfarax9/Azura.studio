"use client";

import { useRef, type ReactNode } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Seamless horizontal ticker. Renders the row twice and wraps at -50%, so the
 * loop is invisible regardless of content width. Scrolling nudges the speed and
 * flips direction, which is what keeps it feeling attached to the page.
 */
export function Marquee({
  children,
  className,
  speed = 60,
  direction = 1,
  scrollReactive = true,
}: {
  children: ReactNode;
  className?: string;
  /** Pixels per second at rest. */
  speed?: number;
  direction?: 1 | -1;
  scrollReactive?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = track.current;
      if (!el || reduced) return;

      const half = el.scrollWidth / 2;
      if (half <= 0) return;

      const tween = gsap.to(el, {
        x: direction === 1 ? -half : 0,
        duration: half / speed,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (value) => `${(parseFloat(value) % half) - (direction === 1 ? 0 : half)}px`,
        },
      });

      if (direction === -1) gsap.set(el, { x: -half });
      if (!scrollReactive) return () => tween.kill();

      const trigger = ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          // Scroll velocity leans the ticker; sign flips it with the scroll.
          const boost = gsap.utils.clamp(-4, 4, self.getVelocity() / 320);
          tween.timeScale(Math.sign(boost || 1) * Math.max(1, Math.abs(boost)));
        },
      });

      return () => {
        trigger.kill();
        tween.kill();
      };
    },
    { scope: root, dependencies: [reduced, speed, direction, scrollReactive] },
  );

  return (
    <div ref={root} className={cn("overflow-hidden", className)}>
      <div ref={track} className="marquee-track" aria-hidden={false}>
        {children}
        <span aria-hidden="true" className="contents">
          {children}
        </span>
      </div>
    </div>
  );
}
