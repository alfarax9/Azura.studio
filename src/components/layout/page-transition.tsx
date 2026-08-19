"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

import { useSmoothScroll } from "@/components/providers/smooth-scroll";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const COVER = 0.6;
const REVEAL = 0.7;

/**
 * Two-phase route curtain.
 *
 * A link click is intercepted so the curtain can drop *before* the navigation
 * commits; once the new route is on screen the same panel continues downward
 * and off, so the whole thing reads as one sweep rather than two unrelated
 * animations. Next's App Router replaces the tree on navigation, so the
 * outgoing page cannot be held around to animate out — covering first is what
 * buys the illusion that it was.
 */
export function PageTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const maskRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const covering = useRef(false);
  const failsafe = useRef<number | null>(null);
  const lastPath = useRef(pathname);
  const reduced = useReducedMotion();
  const lenis = useSmoothScroll();

  // Phase one: intercept the click, drop the curtain, then navigate.
  useEffect(() => {
    if (reduced) return;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page, or a jump within it — nothing to cover.
      if (url.pathname === window.location.pathname) return;

      event.preventDefault();
      if (covering.current) return;
      covering.current = true;

      lenis?.stop();

      // A full-screen curtain that never lifts would leave the page frozen, so
      // release it if the route has not committed in a reasonable window.
      if (failsafe.current) window.clearTimeout(failsafe.current);
      failsafe.current = window.setTimeout(() => {
        if (!covering.current) return;
        covering.current = false;
        gsap.to(maskRef.current, { yPercent: 100, duration: REVEAL, ease: "expo.inOut" });
        gsap.to(veilRef.current, { opacity: 0, duration: REVEAL * 0.5 });
        lenis?.start();
      }, 4000);

      const tl = gsap.timeline({
        onComplete: () => router.push(url.pathname + url.search),
      });

      tl.set(maskRef.current, { yPercent: 0, transformOrigin: "top", scaleY: 0 })
        .to(maskRef.current, { scaleY: 1, duration: COVER, ease: "expo.inOut" })
        .to(veilRef.current, { opacity: 1, duration: COVER * 0.6 }, 0);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      if (failsafe.current) window.clearTimeout(failsafe.current);
    };
  }, [reduced, router, lenis]);

  // Phase two: the route committed — carry the curtain off the bottom.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    if (reduced || !covering.current) return;
    covering.current = false;
    if (failsafe.current) window.clearTimeout(failsafe.current);

    lenis?.scrollTo(0, { immediate: true });

    gsap
      .timeline({
        onComplete: () => {
          gsap.set(maskRef.current, { scaleY: 0, yPercent: 0 });
          lenis?.start();
        },
      })
      .to(veilRef.current, { opacity: 0, duration: REVEAL * 0.5 }, 0)
      .to(maskRef.current, { yPercent: 100, duration: REVEAL, ease: "expo.inOut" }, 0);
  }, [pathname, reduced, lenis]);

  if (reduced) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-150">
      {/* Translucent veil with a solid frame — the reference's 2em ink ring. */}
      <div
        ref={veilRef}
        className="absolute inset-0 bg-[#12121280] opacity-0 shadow-[0_0_0_2em_#121212]"
      />
      {/* Anchored to the top so it grows downward, then travels off the bottom. */}
      <div
        ref={maskRef}
        className="absolute inset-x-0 top-0 h-full origin-top scale-y-0 bg-ink will-change-transform"
      />
    </div>
  );
}
