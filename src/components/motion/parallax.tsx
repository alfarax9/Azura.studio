"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Scrubbed vertical parallax. `speed` is the fraction of the element's own
 * height it drifts across the full scroll pass — keep it small (0.05–0.25) or
 * the offset becomes obvious at the edges.
 */
export function Parallax({
  children,
  className,
  speed = 0.14,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!ref.current || reduced) return;

      gsap.fromTo(
        ref.current,
        { yPercent: -speed * 100 },
        {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [reduced, speed] },
  );

  return (
    <div className={cn("overflow-hidden", className)}>
      <div ref={ref} className="h-full w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
