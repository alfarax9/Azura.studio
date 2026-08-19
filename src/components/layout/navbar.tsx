"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { MenuOverlay } from "@/components/layout/menu-overlay";
import { Magnetic } from "@/components/motion/magnetic";
import { useSmoothScroll } from "@/components/providers/smooth-scroll";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types/content";

type NavItem = { label: string; href: string };

/** The nav's own colour — the inverse of whatever sits under it. */
type Tone = "light" | "dark";

/**
 * The header is only a wordmark and a menu button, and it inverts against the
 * section beneath it.
 *
 * `mix-blend-difference` is the usual trick here, but it only resolves cleanly
 * over near-black or near-white; over a busy mid-tone photograph it returns a
 * muddy grey and the mark disappears. Instead each section declares its own
 * tone via `data-nav-bg`, and the header takes the opposite one.
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
  const markRef = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  const [tone, setTone] = useState<Tone>("light");
  const [scrolled, setScrolled] = useState(false);
  const [renderedPath, setRenderedPath] = useState(pathname);
  const lenis = useSmoothScroll();

  // Close the overlay the moment a navigation commits. Adjusting state during
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

  // Sample what is actually painted behind the bar, every frame the page moves.
  //
  // An IntersectionObserver band was the first attempt, but its rootMargin is
  // fixed at construction and goes stale the moment the viewport resizes,
  // which silently parks the detection line off-screen. Hit-testing the real
  // stack has no such assumption.
  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const bar = barRef.current;
      if (!bar) return;

      const y = bar.offsetHeight / 2;
      setScrolled(window.scrollY > 40);

      // The header is pointer-events-none, so hit-testing passes straight
      // through it to the content underneath.
      const stack = document.elementsFromPoint(window.innerWidth / 2, y);
      for (const el of stack) {
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

  // The wordmark retracts going down and returns coming up. The menu button
  // deliberately sits outside this — it is the only way into navigation, so it
  // stays pinned at every scroll position.
  useGSAP(
    () => {
      if (!markRef.current) return;

      const shift = gsap.quickTo(markRef.current, "yPercent", {
        duration: 0.5,
        ease: "power3.out",
      });

      let lastY = window.scrollY;

      const onScroll = () => {
        const y = window.scrollY;
        if (!open) shift(y > lastY && y > 240 ? -130 : 0);
        lastY = y;
      };

      lenis?.on("scroll", onScroll);
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        lenis?.off("scroll", onScroll);
        window.removeEventListener("scroll", onScroll);
      };
    },
    { dependencies: [open, lenis] },
  );

  // Over the ink overlay the header is always light.
  const active: Tone = open ? "light" : tone;
  const fg = active === "light" ? "text-cream" : "text-ink";
  const rule = active === "light" ? "bg-cream" : "bg-ink";

  return (
    <>
      <header ref={barRef} className="pointer-events-none fixed inset-x-0 top-0 z-100">
        {/* Legibility floor for the stretch where the nav overlaps imagery
            rather than flat colour. Only once scrolled — the hero carries its
            own scrim. */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-x-0 top-0 h-[7em] transition-opacity duration-700",
            scrolled && !open ? "opacity-100" : "opacity-0",
            active === "light"
              ? "bg-[linear-gradient(to_bottom,var(--color-ink),transparent)]"
              : "bg-[linear-gradient(to_bottom,var(--color-cream),transparent)]",
          )}
        />

        <div
          className={cn(
            "padding-global relative flex items-center justify-between py-[1.5em] transition-colors duration-500",
            fg,
          )}
        >
          <span className="overflow-hidden py-[0.15em]">
            <Link
              ref={markRef}
              href="/"
              data-cursor="hover"
              aria-label={`${settings.brand} — home`}
              className="pointer-events-auto block text-[1.25em] leading-none font-semibold tracking-[-0.04em] will-change-transform"
            >
              {settings.brand}
            </Link>
          </span>

          <Magnetic strength={0.25} className="pointer-events-auto">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-overlay"
              data-cursor="hover"
              className="flex h-[2.75em] items-center gap-[0.75em]"
            >
              <span className="section-tag hidden sm:inline">{open ? "Close" : "Menu"}</span>
              <span className="flex size-[1.5em] flex-col items-center justify-center gap-[0.3em]">
                <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-px w-[1.5em] transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)]",
                    rule,
                    open && "translate-y-[0.15em] rotate-45",
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-px w-[1.5em] transition-[transform,background-color] duration-500 ease-[var(--ease-out-expo)]",
                    rule,
                    open && "-translate-y-[0.15em] -rotate-45",
                  )}
                />
              </span>
            </button>
          </Magnetic>
        </div>
      </header>

      <MenuOverlay
        open={open}
        items={items}
        settings={settings}
        activePath={pathname}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
