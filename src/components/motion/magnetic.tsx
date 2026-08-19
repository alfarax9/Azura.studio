"use client";

import { useRef, type ReactNode } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Pulls its child toward the pointer while hovered. Wraps rather than clones so
 * it works with any element, including server components.
 */
export function Magnetic({
  children,
  className,
  strength = 0.35,
  radius = 1.4,
}: {
  children: ReactNode;
  className?: string;
  /** 0 = inert, 1 = child sticks to the pointer. */
  strength?: number;
  /** Activation area as a multiple of the element's own size. */
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || reduced) return;
      if (window.matchMedia("(hover: none)").matches) return;

      const move = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const moveY = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });

      const onPointerMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        const within =
          Math.abs(dx) < (r.width * radius) / 2 && Math.abs(dy) < (r.height * radius) / 2;

        if (within) {
          move(dx * strength);
          moveY(dy * strength);
        } else {
          move(0);
          moveY(0);
        }
      };

      const onLeave = () => {
        move(0);
        moveY(0);
      };

      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);

      return () => {
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [reduced, strength, radius] },
  );

  return (
    <div ref={ref} className={cn("inline-block will-change-transform", className)}>
      {children}
    </div>
  );
}
