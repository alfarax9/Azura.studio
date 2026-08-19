"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

import { SectionTag } from "@/components/ui/section-tag";
import { pad } from "@/lib/utils";
import type { Testimonial } from "@/types/content";

const slide = {
  enter: (dir: number) => ({ opacity: 0, y: dir > 0 ? 32 : -32 }),
  center: { opacity: 1, y: 0 },
  exit: (dir: number) => ({ opacity: 0, y: dir > 0 ? -32 : 32 }),
};

/**
 * One quote at a time on the 12-column bed: counter top-left, arrows top-right,
 * the quote itself running across the wide centre columns.
 */
export function Testimonials({ items }: { items: Testimonial[] }) {
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);

  const go = useCallback(
    (step: number) => setState(([i]) => [(i + step + items.length) % items.length, step]),
    [items.length],
  );

  if (items.length === 0) return null;
  const current = items[index];

  return (
    <section data-nav-bg="light" className="section-pad bg-cream text-ink">
      <div className="padding-global">
        <SectionTag label="What clients say" />

        <div className="grid-12 mt-[3em] gap-y-[5em]">
          <div className="col-span-6 md:col-span-3">
            <span className="tag-number">
              {pad(index + 1)} / {pad(items.length)}
            </span>
          </div>

          <div className="col-span-6 flex justify-end gap-[0.5em] md:col-span-3 md:col-start-10">
            <NavButton label="Previous testimonial" onClick={() => go(-1)} rotate />
            <NavButton label="Next testimonial" onClick={() => go(1)} />
          </div>

          <div className="col-span-12 md:col-span-9">
            <div className="min-h-[9em]">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.blockquote
                  key={current._id}
                  custom={direction}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="text-headline">“{current.quote}”</p>

                  <footer className="mt-[1.5em] flex flex-wrap items-center gap-x-[1.5em] gap-y-[0.4em]">
                    <span className="section-tag">{current.author}</span>
                    <span className="section-tag text-muted">
                      {current.role}, {current.company}
                    </span>
                    {current.projectSlug && (
                      <Link
                        href={`/work/${current.projectSlug}`}
                        data-cursor="hover"
                        className="section-tag text-azure underline-offset-4 hover:underline"
                      >
                        View project
                      </Link>
                    )}
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="mt-[2em] flex gap-[0.4em]" role="tablist" aria-label="Testimonials">
              {items.map((t, i) => (
                <button
                  key={t._id}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1}`}
                  data-cursor="hover"
                  onClick={() => setState([i, i > index ? 1 : -1])}
                  className={`h-px w-[2.5em] transition-colors duration-500 ${
                    i === index ? "bg-ink" : "bg-ink/25 hover:bg-ink/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NavButton({
  label,
  onClick,
  rotate = false,
}: {
  label: string;
  onClick: () => void;
  rotate?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      data-cursor="hover"
      className="group flex size-[2.75em] items-center justify-center rounded-full border border-hairline transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-cream"
    >
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className={`size-[0.9em] transition-transform duration-500 ease-[var(--ease-out-expo)] ${
          rotate ? "rotate-180 group-hover:-translate-x-[0.1em]" : "group-hover:translate-x-[0.1em]"
        }`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      >
        <path d="M2 8h12M9 3l5 5-5 5" />
      </svg>
    </button>
  );
}
