import Link from "next/link";

import { TextReveal } from "@/components/motion/text-reveal";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section data-nav-bg="dark" className="flex min-h-svh flex-col justify-center bg-void py-32 text-cream">
      <div className="padding-global">
        <p className="section-tag text-cream/60">Error 404</p>

        <TextReveal
          as="h1"
          immediate
          delay={0.1}
          className="mt-8 max-w-[14ch] text-display"
        >
          This page moved, or never existed
        </TextReveal>

        <div className="mt-12 flex flex-wrap gap-4">
          <Button asChild variant="invert" size="lg">
            <Link href="/">Back home</Link>
          </Button>
          <Button asChild variant="outlineInvert" size="lg">
            <Link href="/work">See the work</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
