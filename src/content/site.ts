import { px } from "@/lib/media";
import type {
  ImageAsset,
  ProcessStep,
  Service,
  SiteSettings,
  Testimonial,
} from "@/types/content";

export const site: SiteSettings = {
  brand: "AZURA",
  wordmark: "ALFARA",
  tagline: "Transforming ideas into reliable, high-impact digital products.",
  email: "hello@azura.studio",
  location: "Remote — working across CET and SEA",
  availability: "Taking on two projects for Q4 2026",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
    { label: "Behance", href: "https://www.behance.net" },
  ],
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
] as const;

export const testimonials: Testimonial[] = [
  {
    _id: "t1",
    quote:
      "We came in with a redesign brief and left with a different product. AZURA spent the first two weeks proving our assumption was wrong, which cost us a sprint and saved us a year.",
    author: "Marijke de Vries",
    role: "VP Product",
    company: "Northwind Utilities",
    projectSlug: "northwind",
  },
  {
    _id: "t2",
    quote:
      "The design system was handed over with the components, the tokens, and the reasoning. Eight months later our own team is still extending it without breaking anything.",
    author: "Daniel Okonkwo",
    role: "Head of Engineering",
    company: "Vantage Capital Partners",
    projectSlug: "vantage",
  },
  {
    _id: "t3",
    quote:
      "Accessibility usually arrives as a list of complaints at the end. Here it was in the components from day one, and the external audit came back clean.",
    author: "Priya Raghunathan",
    role: "Director of Care Operations",
    company: "Kindred Health",
    projectSlug: "kindred",
  },
  {
    _id: "t4",
    quote:
      "They set a frame budget before drawing anything and then held the line on it. Our traders noticed the difference in the first week.",
    author: "Tobias Lindqvist",
    role: "Head of Trading Technology",
    company: "Solaris Grid",
    projectSlug: "solaris-grid",
  },
  {
    _id: "t5",
    quote:
      "Four campaigns shipped last year without a single developer ticket. That was the whole point, and it is the only metric I care about.",
    author: "Amara Bassey",
    role: "Brand Director",
    company: "Verve Studio",
    projectSlug: "verve",
  },
];

export const services: Service[] = [
  {
    _id: "s1",
    title: "Product Design",
    body: "Interfaces designed around the work people actually do, not the org chart. We map the real flow first, then draw.",
    capabilities: ["Discovery & research", "Information architecture", "Interface design", "Prototyping"],
  },
  {
    _id: "s2",
    title: "Engineering",
    body: "Next.js, TypeScript and a performance budget agreed before the first commit. What ships is what was designed.",
    capabilities: ["Next.js & React", "Headless CMS", "Design systems", "Performance"],
  },
  {
    _id: "s3",
    title: "Motion",
    body: "Animation that carries meaning — state, hierarchy, continuity. Built with GSAP and Motion, and it degrades gracefully.",
    capabilities: ["Scroll choreography", "Micro-interactions", "Page transitions", "Reduced-motion paths"],
  },
  {
    _id: "s4",
    title: "Brand Systems",
    body: "Identity that survives contact with a product surface: type scales, colour ramps, and rules that hold at every size.",
    capabilities: ["Visual identity", "Type & colour systems", "Art direction", "Guidelines"],
  },
];

export const process: ProcessStep[] = [
  {
    _id: "p1",
    title: "Frame the problem",
    body: "A week of interviews, session recordings and a hard look at the analytics. We would rather disagree with the brief early than deliver the wrong thing on time.",
  },
  {
    _id: "p2",
    title: "Design in the open",
    body: "Weekly builds in a real browser, not a slide deck. You interact with the thing while it is still cheap to change.",
  },
  {
    _id: "p3",
    title: "Build to hand over",
    body: "Typed components, documented tokens, and a CMS your team can actually operate. The handover is the deliverable, not an afterthought.",
  },
  {
    _id: "p4",
    title: "Measure and tune",
    body: "Core Web Vitals, funnel movement and a follow-up window after launch. Numbers decide what gets refined next.",
  },
];

/** Showroom strip — loose visual fragments from recent work. */
export const showroom: ImageAsset[] = [
  { url: px(3184465, "portrait"), alt: "Interface detail on a studio wall" },
  { url: px(1181675), alt: "Pairing session on a component library" },
  { url: px(3861964, "portrait"), alt: "Type specimen print" },
  { url: px(3183150), alt: "Whiteboard flow mapping" },
  { url: px(1181244, "portrait"), alt: "Late build session" },
  { url: px(3861958), alt: "Colour ramp explorations" },
];

export const capabilitiesTicker = [
  "Product Design",
  "Next.js Engineering",
  "Design Systems",
  "Motion Design",
  "Headless CMS",
  "Brand Systems",
  "Performance",
  "Accessibility",
];
