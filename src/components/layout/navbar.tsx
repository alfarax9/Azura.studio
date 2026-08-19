"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { MenuDrawer } from "@/components/layout/menu-drawer";
import { Magnetic } from "@/components/motion/magnetic";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";
import { Star } from "@/components/ui/star";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types/content";

type NavItem = { label: string; href: string };

/** The bar's own colour — the inverse of whatever sits under it. */
type Tone = "light" | "dark";

/**
 * Fixed bar that trades one navigation for another as you scroll.
 *
 * At the top of a page it shows the wordmark and the full link set. Once the
 * reader moves past the fold the links retract and hand over to the menu
 * button, which then stays pinned for the rest of the page. Below `md` there
 * is never room for the links, so the button holds the whole job.
 *
 * The bar inverts against the section beneath it. `mix-blend-difference` is the
 * usual trick, but it only resolves cleanly over near-black or near-white; over
 * a busy mid-tone photograph it returns a muddy grey and the label disappears.
 * Instead each section declares its tone via `data-nav-bg`, and the bar takes
 * the opposite one.
 */
export function Navbar({
  items,
  settings,
}: {
  items: readonly NavItem[];
  settings: SiteSettings;
}) {
  const pathname = usePathname();
  const barRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<Tone>("light");
  // Past the fold the links give way to the menu button.
  const [collapsed, setCollapsed] = useState(false);
  const [renderedPath, setRenderedPath] = useState(pathname);
  const lenis = useSmoothScroll();

  // Close the drawer the moment a navigation commits. Adjusting state during
  // render is React's prescribed alternative to a setState-in-effect here.
  if (renderedPath !== pathname) {
    setRenderedPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Sample what is actually painted behind the button, every frame the page
  // moves.
  //
  // An IntersectionObserver band was the first attempt, but its rootMargin is
  // fixed at construction and goes stale the moment the viewport resizes,
  // which silently parks the detection line off-screen. Hit-testing the real
  // stack has no such assumption.
  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setCollapsed(window.scrollY > 120);

      const button = buttonRef.current;
      if (!button) return;

      // Probe under the button itself, not the middle of the bar — that is the
      // only place anything is actually painted.
      const box = button.getBoundingClientRect();
      const x = box.left + box.width / 2;
      const y = box.top + box.height / 2;

      // The bar is pointer-events-none, so hit-testing passes straight through
      // it to the content underneath.
      for (const el of document.elementsFromPoint(x, y)) {
        const marked = (el as HTMLElement).closest<HTMLElement>("[data-nav-bg]");
        if (marked) {
          setTone(marked.dataset.navBg === "dark" ? "light" : "dark");
          return;
        }
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    // Lenis is the scroll driver here, so subscribe to it as well as to the
    // native event — a programmatic scroll can move the page without ever
    // dispatching `scroll`.
    lenis?.on("scroll", schedule);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // Browsers freeze rAF in a hidden tab, so anything that moved while we were
    // backgrounded left the tone stale. Re-read on the way back.
    document.addEventListener("visibilitychange", read);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      lenis?.off("scroll", schedule);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", read);
    };
  }, [pathname, lenis]);

  // Over the drawer the button is always light.
  const active: Tone = open ? "light" : tone;

  return (
    <>
      <header ref={barRef} className="pointer-events-none fixed inset-x-0 top-0 z-100">
        <div
          className={cn(
            "padding-global flex items-center justify-between pt-[1.25em] transition-colors duration-500",
            active === "light" ? "text-cream" : "text-ink",
          )}
        >
          <Link
            href="/"
            data-cursor="hover"
            aria-label={`${settings.brand} — home`}
            className={cn(
              "pointer-events-auto text-[1.25em] leading-none font-semibold tracking-[-0.04em]",
              "transition-opacity duration-500",
              open ? "opacity-0" : "opacity-100",
            )}
          >
            {settings.brand}
          </Link>

          <div className="flex items-center justify-end">
            {/* Full link set, only while the reader is still on the fold and
                only where there is room for it. */}
            <nav
              aria-label="Primary"
              aria-hidden={collapsed || open}
              className={cn(
                "hidden items-center gap-[2em] transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)] md:flex",
                collapsed || open
                  ? "pointer-events-none -translate-y-[0.4em] opacity-0"
                  : "pointer-events-auto translate-y-0 opacity-100",
              )}
            >
              {items.map((item) => {
                const isActive =
                  item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-cursor="hover"
                    tabIndex={collapsed || open ? -1 : undefined}
                    aria-current={isActive ? "page" : undefined}
                    className="group relative text-[1.0625em] leading-[130%]"
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute -bottom-[0.15em] left-0 h-px w-full origin-left bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* The button occupies the same slot the links vacate, so nothing
                shifts as they trade places. */}
            <Magnetic strength={0.25} className="pointer-events-auto md:-ml-[2em]">
              {/* Driven by plain conditional classes, not a `data-` variant:
                  the attribute is always present, so `data-[hidden=true]`
                  matched on presence alone and kept the button invisible. */}
              <div
                ref={buttonRef}
                className={cn(
                  "transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)]",
                  !collapsed && !open
                    ? "md:pointer-events-none md:translate-y-[0.4em] md:opacity-0"
                    : "md:pointer-events-auto md:translate-y-0 md:opacity-100",
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpen((v) => !v)}
                  aria-expanded={open}
                  aria-controls="menu-drawer"
                  data-cursor="hover"
                  className="flex cursor-pointer items-center gap-[0.5em]"
                >
                  <span className="text-[1.0625em] leading-[130%]">
                    {open ? "Close" : "Menu"}
                  </span>
                  <Star
                    className={cn(
                      "size-[0.75em] transition-transform duration-700 ease-[var(--ease-out-expo)]",
                      open && "rotate-180",
                    )}
                  />
                </button>
              </div>
            </Magnetic>
          </div>
        </div>
      </header>

      <MenuDrawer
        open={open}
        items={items}
        settings={settings}
        activePath={pathname}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
