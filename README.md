# AZURA

Portfolio site for **Maulana Alfara**, fullstack and AI engineer —
*Web products with the intelligence built in, not bolted on.*

A motion-led portfolio built on Next.js App Router, modelled on the interaction
vocabulary of high-end studio sites: a first-visit counter, smooth scroll, masked
per-line type reveals, a cursor-tracked project preview, a pinned horizontal
showroom, and route-change curtains.

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) | RSC, static export of every marketing route |
| Language | TypeScript (strict) | One content contract for every page |
| Styling | Tailwind CSS v4 | CSS-first `@theme` tokens, no JS config |
| Primitives | Radix UI + CVA | Accessible unstyled behaviour, typed variants |
| Transitions | Motion 13 | Presence, viewport reveals, overlays |
| Scroll motion | GSAP 3.15 + ScrollTrigger + SplitText | Scrubbed, pinned and per-line choreography |
| Smooth scroll | Lenis 1.3 | Wheel smoothing, driven off the GSAP ticker |
| Content | Typed seed data in `src/content/` | No service to configure, no build-time fetch |
| Forms | React Hook Form + Zod v4 | One schema validating client and server |
| Media | Pexels today, Cloudinary-ready | `next/image` remote patterns pre-authorised |

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. **No environment variables are required** — the
site renders entirely from `src/content/`. `NEXT_PUBLIC_SITE_URL` is the only
one worth setting, and only for absolute URLs in the sitemap and OG tags.

## Content model

All copy is seed data, typed against `src/types/content.ts`:

- `src/content/site.ts` — `site` (contact and identity), `profile` (the
  professional summary), `services`, `process`, `achievements`, `credentials`,
  `showroom`, `capabilitiesTicker`.
- `src/content/projects.ts` — the case studies, plus the `projectSummaries`
  projection the index and bento read.

Pages never import those modules directly. `src/lib/content.ts` is the single
read surface, and its getters are async on purpose: a CMS or an API can be
slotted in behind them later without touching a page.

Two fields are deliberately empty in the current seed. `year` is optional
because the source CV carries no per-project dates — set one and the index and
case study render it. `stats` is optional because no measured outcomes were
available to quote; fabricating them would be worse than leaving the block out.

## Geometry system

The layout is not built on fixed breakpoint sizes. The root font-size tracks the
viewport (`font-size: container / (ideal / 16)`), so `1em` is a constant
fraction of the screen and every size below is expressed in `em`/`rem` against
it. The whole page scales as one piece from 390px to 1920px, with four tiers
(390 / 420 / 850 / 1600 reference widths) rather than per-component overrides.

Everything composes on a 12-column bed (`grid-12`, 1.5em gutters) inside
`padding-global` (2.5em inline), with `section-pad` (7.5em block) between
sections and 11em above page mastheads.

Type tokens are em-based and carry their own weight, leading and tracking:
`text-display` (4em/700/-0.04em), `text-headline` (3.5em/500/-0.03em),
`text-title` (3.25em/500/-0.04em), `text-subtitle`, `text-lead`, and the italic
uppercase `section-tag` with its oversized grey `tag-number`.

> One gotcha worth knowing: `cn()` extends tailwind-merge with these token
> names. Without that, tailwind-merge reads `text-display` as a colour, decides
> it conflicts with `text-ink`, and silently drops one of them.

## Architecture

```
src/
  app/                 routes, server action, sitemap/robots
  components/
    motion/            TextReveal, Reveal, Magnetic, Marquee, Parallax, Cursor
    layout/            Navbar, Footer, Preloader, PageTransition
    sections/          Hero, Statement, ProjectBento, Achievements, Credentials…
    providers/         SmoothScroll (Lenis ⇄ GSAP ticker)
    ui/                Button, ArrowLink, SectionHeading
  content/             seed data — the source of truth for every page
  lib/                 gsap registration, content facade, media, hooks
  types/               shared content contract
```

Two conventions worth knowing:

- **One GSAP registration point.** Everything imports `gsap` from `src/lib/gsap.ts`;
  registering a plugin twice from different module instances throws.
- **One rAF loop.** Lenis runs off `gsap.ticker` rather than its own loop, so
  scroll position and ScrollTrigger updates land in the same frame.

## Motion and accessibility

Every animated component reads `prefers-reduced-motion` through
`useMediaQuery` and renders a static equivalent when it is set — no parallax,
no preloader, no cursor, no route curtain. The custom cursor and hover previews
are additionally gated on `(hover: hover) and (pointer: fine)`, so touch devices
get inline thumbnails instead.

Colour tokens are contrast-checked: the 11px uppercase labels use `--color-muted`
(#666663) on cream and `text-cream/60` on dark, both clearing WCAG AA for small
text.

## Swapping placeholder media

`src/lib/media.ts` is the only file that knows about Pexels. Point `px()` and
`pxVideo()` at Cloudinary (`next-cloudinary` is installed) and every call site
follows — the components take plain URLs.

## Scripts

```bash
npm run dev     # Turbopack dev server
npm run build   # production build + typecheck
npm run start   # serve the production build
npm run lint    # ESLint with the React Compiler rules
```

## Attribution

Photography and video are still free placeholder assets from
[Pexels](https://www.pexels.com) under the Pexels licence — none of it shows the
actual projects. Replace it before launch. The copy is real.
