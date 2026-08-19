import { Reveal } from "@/components/motion/reveal";
import { cn, pad } from "@/lib/utils";
import type { ProcessStep } from "@/types/content";

/** Card faces cycle through the reference's three fills. */
const FACES = [
  "bg-[#efefef] text-ink",
  "bg-ink text-cream",
  "bg-ember text-cream",
];

/**
 * The approach, told as a row of tall cards. Each one pushes its heading to the
 * top and its body to the bottom, so the block reads as a set of columns rather
 * than a list of paragraphs.
 */
export function ApproachCards({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="grid-12 mx-auto mt-[3em]">
      {steps.map((step, i) => (
        <Reveal
          key={step._id}
          delay={i * 0.08}
          className="col-span-12 sm:col-span-6 md:col-span-4"
        >
          <article
            className={cn(
              "flex h-full flex-col items-start justify-between gap-[7em] px-[1.5em] pt-[1.5em] pb-[2em]",
              FACES[i % FACES.length],
            )}
          >
            <header className="flex w-full items-start justify-between">
              <h3 className="text-subtitle">{step.title}</h3>
              <span className="section-tag opacity-60">{pad(i + 1)}</span>
            </header>

            <p className="text-[1.0625em] leading-relaxed opacity-80">{step.body}</p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
