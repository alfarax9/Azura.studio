"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * The Lenis instance is an external system, so it lives in a module store
 * rather than React state — publishing it from an effect would otherwise mean
 * a setState-in-effect cascade on every mount.
 */
let instance: Lenis | null = null;
const listeners = new Set<() => void>();

function publish(next: Lenis | null) {
  instance = next;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Access the live Lenis instance (null before mount / when motion is reduced). */
export function useSmoothScroll() {
  return useSyncExternalStore(
    subscribe,
    () => instance,
    () => null,
  );
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenis = useSmoothScroll();
  const reduced = useReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reduced) return;

    const next = new Lenis({
      duration: 1.15,
      // Exponential ease-out: fast pickup, long glide — the feel the reference
      // site gets from its own smooth-scroll layer.
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Native inertia on touch beats an emulated one; only wheel is smoothed.
      syncTouch: false,
      autoRaf: false,
    });

    // Drive Lenis from the GSAP ticker so scroll position and ScrollTrigger
    // updates land in the same frame — two independent rAF loops would tear.
    const tick = (time: number) => next.raf(time * 1000);
    gsap.ticker.add(tick);
    next.on("scroll", ScrollTrigger.update);

    publish(next);

    return () => {
      gsap.ticker.remove(tick);
      next.destroy();
      publish(null);
    };
  }, [reduced]);

  // Route changes swap the whole document; triggers must re-measure against it.
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [pathname, lenis]);

  return <>{children}</>;
}
