"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const variants: Variants = {
  hidden: (d: number) => ({ opacity: 0, y: d }),
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * Lightweight scroll entrance for non-text blocks (cards, rules, media).
 * Text uses `TextReveal` instead — it needs per-line masking.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 28,
  amount = 0.25,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={cn(className)}
      custom={distance}
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
