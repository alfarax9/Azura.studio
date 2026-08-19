import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";

/** Dark masthead used by every page except the home page. */
export function PageHeader({
  label,
  title,
  lead,
  children,
}: {
  label: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <header data-nav-bg="dark" className="bg-void pt-(--spacing-hero-top) pb-[5em] text-cream">
      <div className="padding-global">
        <Reveal distance={10}>
          <span className="section-rule-invert" />
          <p className="section-tag mt-[1.5em] text-cream/60">{label}</p>
        </Reveal>

        <TextReveal as="h1" immediate delay={0.1} className="mt-[1.5em] max-w-[14ch] text-display">
          {title}
        </TextReveal>

        {lead && (
          <Reveal className="mt-[1.5em] max-w-[52ch]" delay={0.25}>
            <p className="text-[1.0625rem] leading-relaxed text-cream/70">{lead}</p>
          </Reveal>
        )}

        {children}
      </div>
    </header>
  );
}
