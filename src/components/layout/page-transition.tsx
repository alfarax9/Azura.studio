"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";

import { useReducedMotion } from "@/lib/use-reduced-motion";

/**
 * Route-change curtain.
 *
 * Only the overlay is keyed on the pathname — the RSC children are left alone,
 * so a navigation never has to keep the previous tree mounted to animate out.
 */
export function PageTransition() {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        aria-hidden="true"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        style={{ transformOrigin: "top" }}
        className="pointer-events-none fixed inset-0 z-150 bg-azure"
      />
    </AnimatePresence>
  );
}
