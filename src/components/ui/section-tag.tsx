import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/**
 * Section marker: hairline rule, italic uppercase eyebrow, and an optional
 * oversized grey count on the right. Opens every section on the site.
 */
export function SectionTag({
  label,
  count,
  className,
  invert = false,
}: {
  label: string;
  count?: string;
  className?: string;
  invert?: boolean;
}) {
  return (
    <Reveal distance={12} className={cn("w-full", className)}>
      <span className={invert ? "section-rule-invert" : "section-rule"} />
      <div className="mt-[1.5em] flex items-start justify-between">
        <span className={cn("section-tag", invert ? "text-cream" : "text-ink")}>{label}</span>
        {count && <span className="tag-number">{count}</span>}
      </div>
    </Reveal>
  );
}
