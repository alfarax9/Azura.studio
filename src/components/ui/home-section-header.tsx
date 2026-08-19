import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";

/**
 * Homepage section masthead: eyebrow and heading on the left, an oversized
 * count on the right, both sitting on the same baseline across the 12-column
 * bed.
 */
export function HomeSectionHeader({
  label,
  title,
  count,
}: {
  label: string;
  title: string;
  count?: string;
}) {
  return (
    <div className="mb-[3.5em] grid grid-cols-12 items-end gap-4">
      <div className="col-span-12 flex flex-col gap-[1.5em] md:col-span-8">
        <Reveal distance={10}>
          <span className="section-rule" />
          <p className="section-tag mt-[1.5em] text-ink">{label}</p>
        </Reveal>
        <TextReveal as="h2" className="text-title">
          {title}
        </TextReveal>
      </div>

      {count && (
        <Reveal distance={10} className="col-span-12 md:col-span-4">
          <div className="flex w-full items-center justify-end">
            <span className="tag-number">{count}</span>
          </div>
        </Reveal>
      )}
    </div>
  );
}
