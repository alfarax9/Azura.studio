import { Marquee } from "@/components/motion/marquee";

/** Full-bleed running band of capabilities that separates the major sections. */
export function CapabilityTicker({
  items,
  direction = 1,
  className = "bg-azure text-cream",
}: {
  items: string[];
  direction?: 1 | -1;
  className?: string;
}) {
  return (
    <div data-nav-bg="dark" className={`overflow-hidden py-5 ${className}`}>
      <Marquee direction={direction} speed={70}>
        {items.map((item) => (
          <span
            key={item}
            className="flex items-center gap-8 pr-8 text-title whitespace-nowrap"
          >
            {item}
            <span aria-hidden="true" className="text-[0.5em] opacity-60">
              ●
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
