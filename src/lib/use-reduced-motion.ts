"use client";

import { useMediaQuery } from "@/lib/use-media-query";

/**
 * Reactive `prefers-reduced-motion`. Defaults to `false` on the server so the
 * markup matches the common case, then corrects on the first client render.
 */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
