import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Underlined text link whose rule wipes left-to-right on hover, with an arrow
 * that steps forward at the same time. Used for every inline navigation cue.
 */
export function ArrowLink({
  children,
  className,
  ...props
}: ComponentProps<typeof Link> & { children: ReactNode }) {
  return (
    <Link
      data-cursor="hover"
      className={cn(
        "group/link relative inline-flex items-center gap-2 text-[0.9375rem] font-medium",
        className,
      )}
      {...props}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-100 bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:origin-left group-hover/link:scale-x-0" />
        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform delay-200 duration-500 ease-[var(--ease-out-expo)] group-hover/link:scale-x-100" />
      </span>
      <svg
        viewBox="0 0 12 12"
        aria-hidden="true"
        className="size-3 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M2 10 10 2M4 2h6v6" />
      </svg>
    </Link>
  );
}
