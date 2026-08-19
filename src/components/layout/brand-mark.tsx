import Link from "next/link";

import type { SiteSettings } from "@/types/content";

/**
 * The wordmark sits in its own absolute strip at the top of the document, not
 * in the fixed bar — so it scrolls away with the page and only the menu button
 * stays pinned.
 */
export function BrandMark({ settings }: { settings: SiteSettings }) {
  return (
    <div className="absolute inset-x-0 top-0 z-95">
      <div className="padding-global flex items-center justify-between py-[1rem]">
        <Link
          href="/"
          data-cursor="hover"
          aria-label={`${settings.brand} — home`}
          className="text-[1.25em] leading-none font-semibold tracking-[-0.04em] text-cream mix-blend-difference"
        >
          {settings.brand}
        </Link>
      </div>
    </div>
  );
}
