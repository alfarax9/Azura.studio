"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Reactive media query without a state-in-effect round trip.
 *
 * `useSyncExternalStore` subscribes directly to the MediaQueryList, so the
 * first client render already has the correct answer and the server render is
 * pinned to the supplied fallback.
 */
export function useMediaQuery(query: string, serverFallback = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverFallback,
  );
}
