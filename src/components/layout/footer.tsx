import Image from "next/image";
import Link from "next/link";

import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { navigation, showroom } from "@/content/site";
import { BLUR } from "@/lib/media";
import type { SiteSettings } from "@/types/content";

/**
 * Closing call to action, an image band, then the link columns. The oversized
 * email address is the only real target here — everything else is secondary.
 */
export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  const band = showroom[1] ?? showroom[0];

  return (
    <footer data-nav-bg="dark" className="relative bg-ink text-cream">
      <div className="padding-global pt-(--spacing-section) pb-[2.5em]">
        <TextReveal as="h2" className="text-display max-w-[12ch]">
          Ready to build something that lasts?
        </TextReveal>

        <Reveal className="mt-[2em]" delay={0.15}>
          <Magnetic strength={0.28}>
            <a
              href={`mailto:${settings.email}`}
              data-cursor="hover"
              className="group inline-block text-headline"
            >
              {settings.email}
              <span className="mt-[0.1em] block h-px w-full origin-left scale-x-0 bg-cream transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
            </a>
          </Magnetic>
        </Reveal>

        <Reveal className="mt-[1em]" delay={0.25}>
          <p className="section-tag text-cream/60">{settings.availability}</p>
        </Reveal>

        {band && (
          <Reveal className="mt-[4em]" delay={0.1}>
            <div className="relative aspect-[21/6] w-full overflow-hidden rounded-[0.4em]">
              <Image
                src={band.url}
                alt={band.alt}
                fill
                sizes="100vw"
                placeholder="blur"
                blurDataURL={BLUR}
                className="object-cover"
              />
            </div>
          </Reveal>
        )}

        <div className="mt-[4em]">
          <span className="section-rule-invert" />
          <div className="grid-12 mt-[1.5em]">
            <div className="col-span-12 md:col-span-3">
              <p className="section-tag text-cream/60">Studio</p>
              <p className="mt-[0.6em] max-w-[28ch] text-[1rem] leading-relaxed text-cream/70">
                {settings.tagline}
              </p>
            </div>

            <nav aria-label="Footer" className="col-span-6 md:col-span-3">
              <p className="section-tag text-cream/60">Menu</p>
              <ul className="mt-[0.6em] space-y-[0.3em]">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      data-cursor="hover"
                      className="text-[1rem] text-cream/70 transition-colors hover:text-cream"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="col-span-6 md:col-span-3">
              <p className="section-tag text-cream/60">Socials</p>
              <ul className="mt-[0.6em] space-y-[0.3em]">
                {settings.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      data-cursor="hover"
                      className="text-[1rem] text-cream/70 transition-colors hover:text-cream"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-12 md:col-span-3">
              <p className="section-tag text-cream/60">Where</p>
              <p className="mt-[0.6em] text-[1rem] text-cream/70">{settings.location}</p>
            </div>
          </div>
        </div>

        <div className="mt-[3em] flex flex-col gap-[0.6em] border-t border-hairline-invert pt-[1.5em] text-cream/60 sm:flex-row sm:items-center sm:justify-between">
          <p className="section-tag">
            © {year} — {settings.brand}
          </p>
          <Link href="/privacy" data-cursor="hover" className="section-tag hover:text-cream">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
