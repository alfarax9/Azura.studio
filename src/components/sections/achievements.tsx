import { Reveal } from "@/components/motion/reveal";
import { SectionTag } from "@/components/ui/section-tag";
import { TextReveal } from "@/components/motion/text-reveal";
import { pad } from "@/lib/utils";
import type { Achievement } from "@/types/content";

/**
 * Competition results as a ruled list.
 *
 * The placement carries the weight rather than a counter — it is the only
 * number on the row anyone reads first — and each entry sits on a hairline so
 * the block reads as a record rather than a set of cards.
 */
export function Achievements({ items }: { items: Achievement[] }) {
  if (items.length === 0) return null;

  return (
    <section data-nav-bg="light" className="section-pad bg-cream text-ink">
      <div className="padding-global">
        <SectionTag label="Recognition" count={pad(items.length)} />

        <div className="grid-12 mt-[3em]">
          <TextReveal as="h2" className="col-span-12 text-title md:col-span-7">
            Results from the competitions I entered
          </TextReveal>
        </div>

        <ul className="mt-[3em] flex flex-col">
          {items.map((item, i) => (
            <Reveal key={item._id} delay={(i % 3) * 0.06} distance={16}>
              <li className="flex items-baseline gap-[1.5em] border-t border-hairline py-[1.5em]">
                <span className="text-headline w-[2.5em] shrink-0 leading-none">
                  {item.placement}
                </span>

                <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-[1.5em] gap-y-[0.25em]">
                  <span className="text-subtitle">{item.title}</span>
                  <span className="section-tag text-muted">
                    {item.organiser}
                    {item.year ? ` — ${item.year}` : ""}
                  </span>
                </span>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
