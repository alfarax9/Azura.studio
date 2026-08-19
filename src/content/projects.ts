import { px, pxVideo } from "@/lib/media";
import type { Project } from "@/types/content";

/**
 * Fallback project content. Used verbatim until Sanity is connected, and kept
 * afterwards as seed data for the dataset.
 */
export const projects: Project[] = [
  {
    _id: "northwind",
    title: "Northwind",
    slug: "northwind",
    year: "2026",
    discipline: "Product Design & Build",
    headline: "Field service, finally on one screen",
    client: "Northwind Utilities",
    accent: "#2d62ff",
    cover: { url: px(3184291), alt: "Northwind dispatch console on a studio desk" },
    preview: pxVideo(3129576, "3129576-uhd_2560_1440_30fps.mp4"),
    intro:
      "Northwind dispatches four thousand technicians a day across six regions. Scheduling lived in one system, parts in another, and the field app in a third — so the person on the roof was always the last to know. We rebuilt the whole loop as a single console.",
    services: ["Product strategy", "Interface design", "Design system", "Front-end build"],
    deliverables: ["Dispatch console", "Field companion app", "Component library", "Handoff kit"],
    timeline: "16 weeks",
    liveUrl: "https://example.com",
    stats: [
      { value: "41%", label: "Faster job assignment" },
      { value: "3→1", label: "Systems replaced" },
      { value: "98", label: "Lighthouse performance" },
    ],
    chapters: [
      {
        heading: "Start with the worst day",
        body: "We shadowed dispatchers through a storm week rather than a quiet one. Every decision in the console traces back to something we watched go wrong at 2am — the conflicting truck assignment, the part that was never in the van, the call that took nine minutes to route.",
        media: { url: px(3184338), alt: "Dispatch team reviewing a live board" },
      },
      {
        heading: "One surface, three densities",
        body: "The same data serves a dispatcher on a triple monitor, a supervisor on a laptop, and a technician on a cracked phone in the rain. Instead of three products we built one layout engine with three density modes, so a change ships everywhere at once.",
        media: { url: px(3182773), alt: "Responsive layouts across desktop and mobile" },
      },
      {
        heading: "Motion that reports status",
        body: "Nothing animates for decoration. A job card eases when it is reassigned, pulses when it breaches SLA, and settles when it closes — so the room can read the board from across the floor without touching it.",
      },
    ],
    gallery: [
      { url: px(3184292), alt: "Console overview screen" },
      { url: px(1181263, "portrait"), alt: "Technician using the field app" },
      { url: px(3183197), alt: "Design system component sheet" },
    ],
  },
  {
    _id: "vantage",
    title: "Vantage",
    slug: "vantage",
    year: "2026",
    discipline: "Brand & Platform",
    headline: "Portfolio intelligence for private markets",
    client: "Vantage Capital Partners",
    accent: "#ee4b2b",
    cover: { url: px(5077047), alt: "Vantage reporting interface" },
    preview: pxVideo(3195394, "3195394-uhd_2560_1440_25fps.mp4"),
    intro:
      "Private-market reporting still arrives as a quarterly PDF. Vantage wanted the opposite: a live position on every holding, legible to an analyst and to a limited partner who opens it twice a year.",
    services: ["Brand identity", "Data visualisation", "Platform design", "Front-end build"],
    deliverables: ["Identity system", "LP portal", "Chart library", "Marketing site"],
    timeline: "22 weeks",
    stats: [
      { value: "12k", label: "Positions tracked live" },
      { value: "−63%", label: "Time to quarterly close" },
      { value: "AA", label: "WCAG conformance" },
    ],
    chapters: [
      {
        heading: "Charts people trust",
        body: "We built the visual grammar before the product: one categorical ramp, one sequential ramp, one diverging ramp, all contrast-tested in both themes. Every chart in the platform draws from that set, so a number never changes meaning between two screens.",
        media: { url: px(7534217), alt: "Chart system explorations" },
      },
      {
        heading: "The quiet quarter",
        body: "Closing a quarter used to mean three weeks of spreadsheet reconciliation. The portal now assembles the pack continuously, and the close is a review rather than a rebuild.",
        media: { url: px(5076516), alt: "Analyst reviewing portfolio data" },
      },
    ],
    gallery: [
      { url: px(3861969), alt: "Portal dashboard" },
      { url: px(4491461), alt: "Brand collateral" },
      { url: px(1181671, "portrait"), alt: "Team working session" },
    ],
  },
  {
    _id: "kindred",
    title: "Kindred",
    slug: "kindred",
    year: "2025",
    discipline: "Service Design",
    headline: "A care network that actually connects",
    client: "Kindred Health",
    accent: "#2d62ff",
    cover: { url: px(7688336), alt: "Kindred care coordination app" },
    preview: pxVideo(2278095, "2278095-hd_1920_1080_30fps.mp4"),
    intro:
      "Kindred coordinates home care for eleven thousand families. The hard part was never the software — it was that nurses, schedulers and relatives each held a different version of the same week.",
    services: ["Service design", "Research", "Interface design", "Accessibility"],
    deliverables: ["Coordinator workspace", "Family app", "Accessibility audit"],
    timeline: "18 weeks",
    stats: [
      { value: "11k", label: "Families served" },
      { value: "2.4×", label: "Schedule confirmations" },
      { value: "0", label: "Blocking a11y defects" },
    ],
    chapters: [
      {
        heading: "Designing for the third person in the room",
        body: "Most care tools serve the professional. Kindred serves the relative too, and they open it in a hospital corridor on a low battery. That constraint set the type scale, the touch targets, and how much the app is allowed to load.",
        media: { url: px(7681091), alt: "Family member using the care app" },
      },
      {
        heading: "Accessible by construction",
        body: "Contrast, focus order and reduced-motion paths were fixed in the component library rather than audited at the end. The final review found no blocking issues because there was nowhere for them to enter.",
      },
    ],
    gallery: [
      { url: px(7688460), alt: "Coordinator workspace" },
      { url: px(3861943, "portrait"), alt: "Nurse on a home visit" },
      { url: px(5439381), alt: "Research synthesis wall" },
    ],
  },
  {
    _id: "solaris-grid",
    title: "Solaris Grid",
    slug: "solaris-grid",
    year: "2025",
    discipline: "Design & Development",
    headline: "Renewables trading, made legible",
    client: "Solaris Grid",
    accent: "#ee4b2b",
    cover: { url: px(3182812), alt: "Solaris Grid trading interface" },
    preview: pxVideo(3129671, "3129671-uhd_2560_1440_30fps.mp4"),
    intro:
      "Energy traders read six screens at once. Solaris asked for a seventh — which was the wrong brief. We consolidated instead, and gave the desk a single view that survives a volatile afternoon.",
    services: ["Interface design", "Real-time UI", "Performance", "Front-end build"],
    deliverables: ["Trading desk UI", "Alerting system", "Performance budget"],
    timeline: "14 weeks",
    stats: [
      { value: "60fps", label: "Under full tick load" },
      { value: "−48%", label: "Screens per desk" },
      { value: "180ms", label: "Alert to render" },
    ],
    chapters: [
      {
        heading: "Performance is a design decision",
        body: "A price grid that stutters is a price grid nobody trusts. We set the frame budget before the first mockup, and every visual idea had to fit inside it — which killed some beautiful things and saved the product.",
        media: { url: px(3182759), alt: "Real-time price grid" },
      },
      {
        heading: "Alarms you can ignore safely",
        body: "The old system shouted at everything, so the desk muted it. The new one grades urgency into three tiers with distinct motion signatures, and only the top tier interrupts.",
      },
    ],
    gallery: [
      { url: px(3184418), alt: "Trading desk layout" },
      { url: px(2582937), alt: "Alerting states" },
    ],
  },
  {
    _id: "atlas-freight",
    title: "Atlas Freight",
    slug: "atlas-freight",
    year: "2024",
    discipline: "Platform Design",
    headline: "Logistics visibility, end to end",
    client: "Atlas Freight Group",
    accent: "#2d62ff",
    cover: { url: px(4348404), alt: "Atlas Freight tracking platform" },
    preview: pxVideo(2887463, "2887463-hd_1920_1080_25fps.mp4"),
    intro:
      "A container leaves Rotterdam and disappears for nine days. Atlas had the data to close that gap and no surface to show it on. We built one.",
    services: ["Platform design", "Mapping UI", "Design system", "Front-end build"],
    deliverables: ["Shipment tracker", "Map system", "Partner portal"],
    timeline: "20 weeks",
    stats: [
      { value: "9d → 0", label: "Visibility gap" },
      { value: "230+", label: "Partner carriers" },
      { value: "1.1s", label: "Largest contentful paint" },
    ],
    chapters: [
      {
        heading: "The map is not the product",
        body: "Every logistics tool opens on a world map covered in dots, and none of them answer the only question anyone asks: is my thing late. The map became a supporting view; the answer became the front door.",
        media: { url: px(3760067), alt: "Shipment timeline view" },
      },
    ],
    gallery: [
      { url: px(4348401), alt: "Partner portal" },
      { url: px(2977565, "portrait"), alt: "Operations team" },
    ],
  },
  {
    _id: "verve",
    title: "Verve",
    slug: "verve",
    year: "2024",
    discipline: "Brand & E-commerce",
    headline: "Commerce that moves at brand speed",
    client: "Verve Studio",
    accent: "#ee4b2b",
    cover: { url: px(1181677), alt: "Verve commerce storefront" },
    preview: pxVideo(3141210, "3141210-uhd_2560_1440_25fps.mp4"),
    intro:
      "Verve drops four collections a year and their old storefront needed a developer for every one of them. We handed the calendar back to the brand team.",
    services: ["Brand system", "E-commerce design", "Headless build", "CMS architecture"],
    deliverables: ["Storefront", "Campaign builder", "Content model"],
    timeline: "12 weeks",
    stats: [
      { value: "4×", label: "Campaigns shipped per year" },
      { value: "+27%", label: "Conversion on launch" },
      { value: "0", label: "Dev tickets per drop" },
    ],
    chapters: [
      {
        heading: "A page builder with taste",
        body: "Total freedom produces bad pages. The campaign builder offers nine composed sections instead of a blank canvas, each one already correct in type, rhythm and contrast — so anything the team assembles looks deliberate.",
        media: { url: px(1181316), alt: "Campaign builder sections" },
      },
    ],
    gallery: [
      { url: px(1181673, "portrait"), alt: "Storefront on mobile" },
      { url: px(3184360), alt: "Collection landing page" },
    ],
  },
];

export const projectSummaries = projects.map(
  ({ _id, title, slug, year, discipline, headline, cover, preview, accent }) => ({
    _id,
    title,
    slug,
    year,
    discipline,
    headline,
    cover,
    preview,
    accent,
  }),
);
