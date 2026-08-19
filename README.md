# AZURA

Digital product studio site — *Transforming ideas into reliable, high-impact digital products.*

A motion-led portfolio built on Next.js App Router, modelled on the interaction
vocabulary of high-end studio sites: a first-visit counter, smooth scroll, masked
per-line type reveals, a cursor-tracked project preview, a pinned horizontal
showroom, and route-change curtains.

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) | RSC, static export of every marketing route |
| Language | TypeScript (strict) | One content contract shared by CMS and fallback |
| Styling | Tailwind CSS v4 | CSS-first `@theme` tokens, no JS config |
| Primitives | Radix UI + CVA | Accessible unstyled behaviour, typed variants |
| Transitions | Motion 13 | Presence, viewport reveals, overlays |
| Scroll motion | GSAP 3.15 + ScrollTrigger + SplitText | Scrubbed, pinned and per-line choreography |
| Smooth scroll | Lenis 1.3 | Wheel smoothing, driven off the GSAP ticker |
| CMS | Sanity v6 (`next-sanity`) | Embedded Studio at `/studio`, tag-based ISR |
| Forms | React Hook Form + Zod v4 | One schema validating client and server |
| Media | Pexels today, Cloudinary-ready | `next/image` remote patterns pre-authorised |

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. **No environment variables are required** — the site
renders fully from `src/content/`.

## Environment

Copy `.env.example` to `.env.local`. Every value is optional:

- No `NEXT_PUBLIC_SANITY_PROJECT_ID` → local content is used and `/studio` 404s.
- With a project id → Sanity becomes the source of truth and `/studio` mounts.

If a Sanity query fails or returns nothing, the site silently falls back to local
content rather than erroring. That behaviour lives in `src/lib/content.ts`, the
single read surface every page uses.

## Content model

Schemas are in `src/sanity/schemaTypes/`: `siteSettings` (singleton), `project`,
`testimonial`, `service`, `processStep`. GROQ projections in
`src/sanity/lib/queries.ts` resolve to the same shapes as `src/types/content.ts`,
so components never learn where their data came from.

To publish edits without a redeploy, set `SANITY_REVALIDATE_SECRET` and point a
Sanity webhook at `POST /api/revalidate` with an `x-webhook-secret` header. The
route purges the cache tag matching the document `_type`.

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
  app/                 routes, server action, sitemap/robots, embedded Studio
  components/
    motion/            TextReveal, Reveal, Magnetic, Marquee, Parallax, Cursor
    layout/            Navbar, Footer, Preloader, PageTransition
    sections/          Hero, Statement, ProjectIndex, Testimonials, Showroom…
    providers/         SmoothScroll (Lenis ⇄ GSAP ticker)
    ui/                Button, ArrowLink, SectionHeading
  content/             local fallback content and CMS seed data
  lib/                 gsap registration, content facade, media, hooks
  sanity/              env, client, queries, schema, desk structure
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

Placeholder photography and video are free assets from [Pexels](https://www.pexels.com)
under the Pexels licence. Replace them before launch. All copy is placeholder
copy written for this template — swap it for your own before publishing.
