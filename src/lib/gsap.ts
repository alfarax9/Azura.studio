"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

/**
 * Single registration point. GSAP throws if a plugin registers twice under
 * different module instances, so every consumer imports from here.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

  gsap.defaults({ ease: "expo.out", duration: 1 });

  // Long tasks (hydration, video decode) otherwise make GSAP bail out of
  // catch-up frames and animations visibly jump.
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
