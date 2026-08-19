"use client";

import { useRef, type ElementType, type ReactNode } from "react";

import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Split granularity. Lines read best for display type, chars for short labels. */
  split?: "lines" | "words" | "chars";
  delay?: number;
  stagger?: number;
  /** Start the animation on mount instead of waiting for the scroll trigger. */
  immediate?: boolean;
};

/**
 * Masked line-by-line reveal: each fragment is clipped by its own wrapper and
 * slides up from below the baseline. This is the signature entrance used for
 * every headline on the site.
 */
export function TextReveal({
  children,
  as: Tag = "div",
  className,
  split = "lines",
  delay = 0,
  stagger = 0.09,
  immediate = false,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;

      const instance = SplitText.create(ref.current, {
        type: split,
        // The mask wrapper is what makes fragments appear to emerge from nothing.
        mask: split,
        linesClass: "reveal-line",
        autoSplit: true,
// Re-split on font swap / resize so line breaks never desync from the mask.
        onSplit(self) {
          const targets =
            split === "lines" ? self.lines : split === "words" ? self.words : self.chars;

          return gsap.from(targets, {
            yPercent: 118,
            duration: 1.1,
            ease: "expo.out",
            stagger,
            delay,
            ...(immediate
              ? {}
              : {
                  scrollTrigger: {
                    trigger: ref.current,
                    start: "top 88%",
                    once: true,
                  },
                }),
          });
        },
      });

      return () => instance.revert();
    },
    { scope: ref, dependencies: [reduced, split, delay, stagger, immediate] },
  );

  return (
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
