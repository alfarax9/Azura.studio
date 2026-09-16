"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";

const SEEN_KEY = "azura:preloaded";

/** Never subscribes: the flag only changes when this component writes it. */
const noopSubscribe = () => () => {};

/**
 * First-visit counter that holds the page until the fold is painted, then lifts
 * away as a full-bleed curtain. Shown once per session so internal navigation
 * never pays for it again.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();
  const lenis = useSmoothScroll();

  const seen = useSyncExternalStore(
    noopSubscribe,
    useCallback(() => sessionStorage.getItem(SEEN_KEY) === "1", []),
    // The server cannot know; assume seen so the curtain is never in the HTML.
    useCallback(() => true, []),
  );

  const active = !seen && !reduced && !done;

  // The page must not scroll underneath the curtain.
  useEffect(() => {
    if (!active) return;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [active, lenis]);

  useGSAP(
    () => {
      if (!active || !root.current) return;

      const counter = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem(SEEN_KEY, "1");
          ScrollTrigger.refresh();
          setDone(true);
        },
      });

      tl.to(counter, {
        value: 100,
        duration: 1.9,
        ease: "power2.inOut",
        onUpdate() {
          const v = Math.round(counter.value);
          if (countRef.current) countRef.current.textContent = String(v).padStart(3, "0");
          if (barRef.current) barRef.current.style.transform = `scaleX(${v / 100})`;
        },
      })
        .to(
          "[data-preloader-word]",
          { yPercent: -110, duration: 0.8, stagger: 0.06, ease: "expo.inOut" },
          "-=0.25",
        )
        .to(root.current, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, "-=0.45");
    },
    { scope: root, dependencies: [active] },
  );

  if (!active) return null;

  return (
    <div
      ref={root}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      className="fixed inset-0 z-200 flex flex-col justify-between bg-void px-(--spacing-gutter) py-10 text-cream"
    >
      <div className="flex items-start justify-between">
        <span data-preloader-word className="section-tag inline-block text-cream/60">
          AZURA
        </span>
        <span data-preloader-word className="section-tag inline-block text-cream/60">
          Portfolio
        </span>
      </div>

      <div className="overflow-hidden">
        <span
          data-preloader-word
          className="block text-display"
        >
          <span ref={countRef}>000</span>
        </span>
      </div>

      <div className="space-y-6">
        <span className="block h-px w-full bg-cream/20">
          <span ref={barRef} className="block h-px w-full origin-left scale-x-0 bg-cream" />
        </span>
        <span data-preloader-word className="section-tag block text-cream/60">
          Transforming ideas into reliable, high-impact digital products
        </span>
      </div>
    </div>
  );
}
