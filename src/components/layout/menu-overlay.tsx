"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

import { pad } from "@/lib/utils";
import type { SiteSettings } from "@/types/content";

type NavItem = { label: string; href: string };

/**
 * Full-screen navigation. The reference site has no inline desktop menu — the
 * only way in is this overlay, which is what keeps the header down to a mark
 * and a button at every breakpoint.
 */
export function MenuOverlay({
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
        <motion.div
          id="menu-overlay"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-90 flex flex-col justify-between bg-ink text-cream"
        >
          <nav
            aria-label="Primary"
            className="padding-global flex flex-1 flex-col justify-center"
          >
            {items.map((item, i) => {
              const active =
                item.href === "/" ? activePath === "/" : activePath.startsWith(item.href);

              return (
                <motion.div
                  key={item.href}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    delay: 0.25 + i * 0.06,
                    duration: 0.9,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    data-cursor="hover"
                    aria-current={active ? "page" : undefined}
                    className="group flex items-baseline gap-[0.6em] border-b border-hairline-invert py-[0.35em]"
                  >
                    <span className="section-tag w-[3em] shrink-0 text-cream/50">
                      {pad(i + 1)}
                    </span>
                    <span className="text-headline inline-block transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-[0.1em]">
                      {item.label}
                    </span>
                    {active && (
                      <span aria-hidden="true" className="size-[0.25em] rounded-full bg-azure" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="padding-global pb-[2.5em]"
          >
            <span className="section-rule-invert" />
            <div className="mt-[1.5em] flex flex-wrap items-end justify-between gap-[1.5em]">
              <div>
                <p className="section-tag text-cream/50">Socials</p>
                <ul className="mt-[0.6em] flex flex-wrap gap-x-[1.5em] gap-y-[0.3em]">
                  {settings.socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        data-cursor="hover"
                        className="text-[1rem] text-cream/70 transition-colors hover:text-cream"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`mailto:${settings.email}`}
                data-cursor="hover"
                className="text-lead group inline-block"
              >
                {settings.email}
                <span className="mt-[0.1em] block h-px w-full origin-left scale-x-0 bg-cream transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
