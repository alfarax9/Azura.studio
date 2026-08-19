import { cn } from "@/lib/utils";

/**
 * Four-point sparkle. Sits beside the menu label and slides out of each drawer
 * link on hover. Sized in `em` so it tracks whatever type it sits next to.
 */
export function Star({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      className={cn("size-[0.75em] shrink-0", className)}
    >
      {/* Each arm is a concave curve into the centre, which is what gives the
          star its pinched, four-pointed silhouette. */}
      <path d="M6 0c.35 3.02 2.63 5.3 5.65 5.65v.7C8.63 6.7 6.35 8.98 6 12h-.7C4.95 8.98 2.67 6.7-.35 6.35v-.7C2.67 5.3 4.95 3.02 5.3 0Z" />
    </svg>
  );
}
