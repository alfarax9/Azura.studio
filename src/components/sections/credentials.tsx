import { Reveal } from "@/components/motion/reveal";
import type { Credential } from "@/types/content";

/**
 * Education and organisational roles, told as a two-column record: the role and
 * where it was held on the left, what it actually involved on the right.
 */
export function Credentials({ items }: { items: Credential[] }) {
  if (items.length === 0) return null;

  return (
    <div className="mt-[3em] flex flex-col">
      {items.map((item, i) => (
        <Reveal key={item._id} delay={i * 0.08} distance={16}>
          <article className="grid-12 border-t border-hairline py-[2.5em]">
            <header className="col-span-12 flex flex-col gap-[0.5em] md:col-span-5">
              <h3 className="text-subtitle">{item.title}</h3>
              <p className="section-tag text-muted">{item.period}</p>
              <p className="text-[1.0625em] leading-relaxed text-ink/70">{item.organisation}</p>
            </header>

            <ul className="col-span-12 flex flex-col gap-[0.75em] md:col-span-6 md:col-start-7">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-[0.75em] text-[1.0625em] leading-relaxed text-ink/70"
                >
                  <span aria-hidden="true" className="mt-[0.7em] size-[0.3em] shrink-0 bg-ink/40" />
                  {point}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
