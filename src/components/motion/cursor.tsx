"use client";

import { useEffect, useRef, useState } from "react";

import { gsap, useGSAP } from "@/lib/gsap";
import { useMediaQuery } from "@/lib/use-media-query";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Trailing dot that inflates into a labelled disc over interactive elements.
 * Opt in from anywhere with `data-cursor="view"` / `data-cursor-label="…"`.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState("");
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const enabled = finePointer && !reduced;

  useEffect(() => {
    document.body.dataset.cursor = enabled ? "on" : "off";
    return () => {
      delete document.body.dataset.cursor;
    };
  }, [enabled]);

  useGSAP(
    () => {
      if (!enabled || !dot.current) return;

      const el = dot.current;
      gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });

      const x = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
      const y = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

      let visible = false;
      const onMove = (e: PointerEvent) => {
        if (!visible) {
          visible = true;
          gsap.to(el, { opacity: 1, duration: 0.3 });
        }
        x(e.clientX);
        y(e.clientY);

        const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
          "[data-cursor]",
        );
        const mode = target?.dataset.cursor;
        const next = target?.dataset.cursorLabel ?? "";

        setLabel(next);
        gsap.to(el, {
          scale: mode === "view" ? 1 : mode === "hover" ? 0.45 : 0.18,
          duration: 0.45,
          ease: "expo.out",
        });
      };

      const onLeave = () => {
        visible = false;
        gsap.to(el, { opacity: 0, duration: 0.25 });
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);

      return () => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", onLeave);
      };
    },
    { dependencies: [enabled] },
  );

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex size-24 items-center justify-center rounded-full bg-azure mix-blend-normal"
    >
      <span
        ref={labelRef}
        className="section-tag text-cream transition-opacity duration-200"
        style={{ opacity: label ? 1 : 0 }}
      >
        {label}
      </span>
    </div>
  );
}
