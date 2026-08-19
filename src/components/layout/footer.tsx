import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text-reveal";
import { Star } from "@/components/ui/star";
import { showroom } from "@/content/site";
import { BLUR } from "@/lib/media";
import { cn } from "@/lib/utils";
import type { SiteSettings } from "@/types/content";

/**
 * Closing block: a square image beside an oversized call to action, a hairline,
 * then the CTA pill with legal and socials along the bottom.
 *
 * The `md:max-tablet:` ranges below are deliberate. Tailwind emits `max-*`
 * variants in ascending breakpoint order, so a smaller `max-` breakpoint lands
 * earlier in the sheet and loses the cascade wherever a larger one also
 * matches. Scoping the middle tier to 768–991 keeps the two from overlapping
 * at all.
 */
export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  const rest = showroom[0];
  const hover = showroom[2] ?? showroom[1] ?? rest;

  return (
    <footer data-nav-bg="dark" className="relative z-1 bg-ink">
      <div className="padding-global pt-(--spacing-section) pb-0">
        <div className="mx-auto w-full max-w-[var(--size-container)]">
          <div className="flex gap-[1.5em] border-b border-[#fdfbf833] pb-[4em] md:max-tablet:pb-[3em] max-md:pb-[2em]">
            {rest && (
              <div
                className={cn(
                  "group relative size-[8em] shrink-0 overflow-hidden rounded-[0.25em]",
                  "md:max-tablet:size-[6em] max-md:size-[4em]",
                )}
              >
                <Image
                  src={rest.url}
                  alt={rest.alt}
                  fill
                  sizes="8em"
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                <Image
                  src={hover.url}
                  alt=""
                  fill
                  sizes="8em"
                  placeholder="blur"
                  blurDataURL={BLUR}
                  className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>
            )}

            <TextReveal
              as="h2"
              className="text-cta text-off-white md:max-tablet:text-[3em] max-md:text-[2em]"
            >
              Ready to build something that lasts?
            </TextReveal>
          </div>

          <div
            className={cn(
              "flex flex-col items-start gap-[7em] pt-[2.5em] pb-[1.25em]",
              "md:max-tablet:gap-[5.25em]",
              "max-md:gap-[3.5em] max-md:pt-[1.5em] max-md:pb-[1em]",
            )}
          >
            <Reveal distance={16}>
              <CtaPill href={`mailto:${settings.email}`} label={settings.email} />
            </Reveal>

            <div
              className={cn(
                "flex w-full items-end justify-between gap-4",
                "max-md:flex-col max-md:items-start max-md:gap-[3.5em]",
              )}
            >
              <div
                className={cn(
                  "flex items-end gap-[4em]",
                  "md:max-tablet:gap-[3em]",
                  "max-md:w-full max-md:justify-between max-md:gap-0",
                )}
              >
                <p className="text-[0.75em] text-off-white opacity-60">
                  © {year} — {settings.brand}
                </p>
                <Link
                  href="/privacy"
                  data-cursor="hover"
                  className="text-[0.75em] text-off-white opacity-60 transition-opacity duration-300 hover:opacity-100"
                >
                  Privacy Policy
                </Link>
              </div>

              {/* Order flips on small screens so the socials lead the block. */}
              <div className="flex flex-col gap-[0.2rem] max-md:order-[-9999] max-md:w-full max-md:gap-[0.4rem]">
                <div
                  className={cn(
                    "flex w-full items-center gap-[0.25em]",
                    "max-md:flex-col max-md:items-start max-md:gap-[3.75em]",
                  )}
                >
                  <p className="text-[0.75em] leading-[135%] font-medium text-off-white uppercase italic">
                    Socials
                  </p>
                </div>
                <ul className="flex flex-wrap gap-[1em]">
                  {settings.socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        data-cursor="hover"
                        className="text-[0.75em] text-off-white opacity-60 transition-opacity duration-300 hover:opacity-100"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Pill link whose accent disc rises from below the baseline to flood the button
 * on hover, while the outlined dot gives way to a star.
 */
function CtaPill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      data-cursor="hover"
      className="group relative isolate inline-flex items-center gap-[0.5em] overflow-hidden rounded-full border border-hairline-invert py-[0.75em] pr-[1.25em] pl-[1em] text-off-white"
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-1 h-[200%] w-[150%] translate-y-full rounded-full bg-ember transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-y-0"
      />

      <span className="relative flex size-[0.75em] items-center justify-center rounded-full border border-cream transition-[border-color] duration-500 group-hover:border-transparent">
        <Star className="absolute size-[0.75em] scale-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-100" />
      </span>

      <span className="relative text-[1.0625em] leading-[155%] font-normal">{label}</span>
    </a>
  );
}
