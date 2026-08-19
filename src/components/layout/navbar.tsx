"use client";

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
 * A fixed bar holding nothing but the menu button, right-aligned.
 *
 * It inverts against the section beneath it. `mix-blend-difference` is the
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
        <div className="padding-global flex justify-end pt-[1.25em]">
          <Magnetic strength={0.25} className="pointer-events-auto">
            <div ref={buttonRef}>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="menu-drawer"
                data-cursor="hover"
                className={cn(
                  "flex cursor-pointer items-center gap-[0.5em] transition-colors duration-500",
                  active === "light" ? "text-cream" : "text-ink",
                )}
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
