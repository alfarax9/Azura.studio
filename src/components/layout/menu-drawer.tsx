"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

import { Star } from "@/components/ui/star";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types/content";

type NavItem = { label: string; href: string };

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Right-hand navigation drawer.
 *
 * It occupies a fixed 30em column against the right edge rather than covering
 * the viewport, and rests half-offset when closed — so opening it slides the
 * panel only half its own width instead of throwing it across the screen.
 */
export function MenuDrawer({
  open,
  items,
  settings,
  activePath,
  onClose,
}: {
  open: boolean;
  items: readonly NavItem[];
  settings: SiteSettings;
  activePath: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-80 bg-[rgba(18,18,18,0.3)]"
          />

          <motion.div
            id="menu-drawer"
            initial={{ x: "50%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "50%", opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className={cn(
              "fixed inset-y-0 right-0 z-90 flex h-screen w-[30em] flex-col bg-ink text-cream",
              "pb-[3em] pl-[7em] pr-[9em]",
              "max-md:w-screen max-md:pl-[3.5em]",
              "xs:max-md:pb-[2em] xs:max-md:pr-[7em]",
              "max-xs:pb-[1.5em] max-xs:pl-[3.5em] max-xs:pr-[3em]",
            )}
          >
            <nav
              aria-label="Primary"
              className="flex flex-1 flex-col justify-center gap-[0.75em]"
            >
              {items.map((item, i) => {
                const active =
                  item.href === "/" ? activePath === "/" : activePath.startsWith(item.href);

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: "40%" }}
                    animate={{ opacity: 1, y: "0%" }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      data-cursor="hover"
                      aria-current={active ? "page" : undefined}
                      // The star is parked in the negative margin and clipped
                      // away; on hover it travels into the gap it already owns.
                      className={cn(
                        "group -ml-[2em] flex items-center gap-[1em] overflow-hidden pr-[2em]",
                        "transition-colors duration-250 hover:text-ember",
                        active && "text-ember",
                      )}
                    >
                      <Star
                        className={cn(
                          "size-[1em] -translate-x-[0.6em] opacity-0 transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)]",
                          "group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
                          active && "translate-x-0 opacity-100",
                        )}
                      />
                      <span className="text-nav">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="flex flex-col gap-[0.25em]"
            >
              <p className="text-[1em] font-medium italic">Socials</p>
              <ul className="flex flex-wrap gap-[1em]">
                {settings.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="hover"
                      className="text-[#9e9e9e] leading-[135%] transition-colors duration-250 hover:text-cream"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
