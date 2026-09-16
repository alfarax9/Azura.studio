import { px, pxVideo } from "@/lib/media";
import type { Project } from "@/types/content";

/**
 * Project seed data, taken from the CV.
 *
 * Photography is still Pexels placeholder material — the copy, roles and stacks
 * are real, the pictures are not. Swap them before this goes anywhere public.
 */
export const projects: Project[] = [
  {
    _id: "ims",
    title: "IMS",
    slug: "ims",
    role: "AI Engineer",
    discipline: "AI Engineering",
    headline: "Manufacturing operations with a model the floor can trust",
    client: "Indofood KSA",
    accent: "#2d62ff",
    cover: { url: px(3184291), alt: "Operations dashboard on a factory office desk" },
    preview: pxVideo(3129576, "3129576-uhd_2560_1440_30fps.mp4"),
    intro:
      "IMS is the internal management system for Indofood KSA's manufacturing operations. I handled the AI side of it: cleaning the operational data, training the model, and serving it through an API the main application calls — so the intelligence lands inside a system the staff already run their day on.",
    services: ["Data preprocessing", "Model training", "Model serving", "Fullstack integration"],
    deliverables: ["Cleaned operational dataset", "Trained model", "Prediction API"],
    stack: ["Python", "Machine learning", "REST API", "Enterprise data integration"],
    chapters: [
      {
        heading: "The data before the model",
        body: "Most of the work was upstream of anything you would call AI. Operational data arrives shaped by the process that produced it, not by the one that consumes it, so cleaning and preparing it was the part that decided whether the rest would hold.",
        media: { url: px(3184338), alt: "Reviewing an operational dataset" },
      },
      {
        heading: "Deterministic first, model second",
        body: "The design stayed hybrid on purpose. Rules cover the cases the company already has standards for; the model runs on what is left. Keeping that order is what makes a result auditable — you can always say which part of the system produced it, and why.",
        media: { url: px(3182773), alt: "Rules and model output compared side by side" },
      },
      {
        heading: "Into screens people already know",
        body: "I worked with the fullstack team to fit the output into the existing interface rather than a new one. Nobody had to learn a second tool to get the benefit of the first.",
      },
    ],
    gallery: [
      { url: px(3184292), alt: "Management system overview screen" },
      { url: px(3183197), alt: "Model evaluation notes" },
    ],
  },
  {
    _id: "sirana",
    title: "SIRANA",
    slug: "sirana",
    role: "AI Integration & Frontend Engineer",
    discipline: "AI & Frontend",
    headline: "Emergency regulation, answerable in plain language",
    client: "SIRANA",
    accent: "#ee4b2b",
    cover: { url: px(5077047), alt: "SIRANA chat interface on a laptop" },
    preview: pxVideo(3195394, "3195394-uhd_2560_1440_25fps.mp4"),
    intro:
      "Sistem Integrasi NLP Regulasi & Edukasi Kedaruratan. Emergency regulation is written to be precise, not to be read in a hurry — which is exactly when people need it. SIRANA puts a chatbot in front of that material so someone can ask a question in their own words and get an answer that still comes from the regulation itself.",
    services: ["Frontend build", "AI integration", "Prompt design", "Retrieval pipeline"],
    deliverables: ["Web interface", "AI chatbot", "Retrieval over the regulation corpus"],
    stack: ["Next.js", "NLP", "LLM", "RAG", "Vector store"],
    chapters: [
      {
        heading: "Retrieval, so the source survives the answer",
        body: "Answers are retrieved from the regulation and education documents before the model writes anything. The point is not fluency — it is that a user can trace a response back to the real source material instead of trusting a model's recall.",
        media: { url: px(7534217), alt: "Retrieval over a regulation document set" },
      },
      {
        heading: "The chat flow is the product",
        body: "I owned the interface, the chat flow, the prompt design and the connection between the two services. Everything a user experiences as one conversation is that seam working quietly.",
        media: { url: px(5076516), alt: "Chat flow wireframes" },
      },
    ],
    gallery: [
      { url: px(3861969), alt: "SIRANA answer view" },
      { url: px(4491461), alt: "Regulation source panel" },
    ],
  },
  {
    _id: "nunchi",
    title: "Nunchi",
    slug: "nunchi",
    role: "Fullstack Developer",
    discipline: "Fullstack Build",
    headline: "A wellbeing app built for how the Korean market reads it",
    client: "Nunchi",
    accent: "#2d62ff",
    cover: { url: px(7688336), alt: "Nunchi wellbeing app on a phone" },
    preview: pxVideo(2278095, "2278095-hd_1920_1080_30fps.mp4"),
    intro:
      "A health and wellbeing app for the Korean market. I worked across frontend and backend — user flows, data storage and API integration — and adjusted features and copy to fit local expectations rather than shipping a translation of someone else's product.",
    services: ["Frontend build", "Backend build", "API integration", "Localisation"],
    deliverables: ["User flows", "Data layer", "API integration"],
    stack: ["Fullstack web", "REST API", "Relational database"],
    chapters: [
      {
        heading: "Both sides of the same feature",
        body: "Working across the stack meant a change to a user flow did not stop at the screen. The storage, the endpoint and the interface moved together, which is the fastest way to build something small and the only way to keep it coherent.",
        media: { url: px(7681091), alt: "Nunchi flow on mobile" },
      },
      {
        heading: "Local by design, not by translation",
        body: "Features and copy were adjusted against the product requirements with the team, so the app reads as something made for its market rather than adapted to it after the fact.",
      },
    ],
    gallery: [
      { url: px(7688460), alt: "Nunchi home screen" },
      { url: px(3861943, "portrait"), alt: "App in use" },
    ],
  },
  {
    _id: "glucofy",
    title: "Glucofy",
    slug: "glucofy",
    role: "Frontend Developer",
    discipline: "Frontend Build",
    headline: "Sugar intake tracked against a target that is actually yours",
    client: "Glucofy",
    accent: "#ee4b2b",
    cover: { url: px(3182812), alt: "Glucofy tracking interface" },
    preview: pxVideo(3129671, "3129671-uhd_2560_1440_30fps.mp4"),
    intro:
      "A personalised sugar intake tracker. Most trackers set one limit for everyone; Glucofy sets a target per person and measures the day against that. I built the interface — the logging, and the progress views that turn those numbers into something readable at a glance.",
    services: ["Interface design", "Frontend build", "Data visualisation", "Responsive UI"],
    deliverables: ["Logging interface", "Progress views", "Component set"],
    stack: ["Next.js", "React", "TailwindCSS", "REST API", "Data visualisation"],
    chapters: [
      {
        heading: "Logging has to be fast or it does not happen",
        body: "People open this several times a day, on a phone, usually mid-something-else. Food logging was built to be quick first and pretty second — an entry that takes too long is an entry that never gets made, and a tracker with gaps in it is worthless.",
        media: { url: px(3182759), alt: "Food logging screen" },
      },
      {
        heading: "Numbers you can read in a second",
        body: "The same data that makes a useful record makes a poor dashboard. Progress views compress the day into a state a user can read at a glance, with the detail one level down for when they want it.",
      },
    ],
    gallery: [
      { url: px(3184418), alt: "Daily progress view" },
      { url: px(2582937), alt: "Target states" },
    ],
  },
  {
    _id: "fuboru",
    title: "Fuboru",
    slug: "fuboru",
    role: "Fullstack Developer",
    discipline: "Fullstack Build",
    headline: "A company platform, public site and back office in one",
    client: "Fuboru",
    accent: "#2d62ff",
    cover: { url: px(4348404), alt: "Fuboru company web platform" },
    preview: pxVideo(2887463, "2887463-hd_1920_1080_25fps.mp4"),
    intro:
      "A company web platform built in PHP, covering server-side logic, database design and the pages users actually see. The internal and public halves of the site share one codebase, with CRUD modules and authentication set up for both.",
    services: ["Server-side logic", "Database design", "Authentication", "Frontend build"],
    deliverables: ["Public site", "Internal CRUD modules", "Authentication"],
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
    chapters: [
      {
        heading: "One codebase, two audiences",
        body: "The public pages and the internal tooling have different users and the same data. Building both meant the schema had to answer to a visitor and an administrator at once, which is a better constraint to design against than either one alone.",
        media: { url: px(3760067), alt: "Fuboru admin module" },
      },
    ],
    gallery: [
      { url: px(4348401), alt: "Public landing page" },
      { url: px(2977565, "portrait"), alt: "Admin listing view" },
    ],
  },
  {
    _id: "mexpo",
    title: "Mexpo",
    slug: "mexpo",
    role: "Frontend Developer",
    discipline: "Frontend Build",
    headline: "Design files to a live frontend on the client's own APIs",
    client: "Mexpo",
    accent: "#ee4b2b",
    cover: { url: px(1181677), alt: "Mexpo web platform" },
    preview: pxVideo(3141210, "3141210-uhd_2560_1440_25fps.mp4"),
    intro:
      "A web platform frontend built in Next.js straight from the design files and wired to the backend REST APIs. Components stayed reusable and pages stayed light, with layouts that hold up on a phone.",
    services: ["Frontend build", "API integration", "Component architecture", "Responsive layout"],
    deliverables: ["Frontend implementation", "Reusable component set"],
    stack: ["Next.js", "React", "TailwindCSS", "TypeScript"],
    chapters: [
      {
        heading: "Components that survive the second page",
        body: "Building from a design file is easy once. The work is making the second and third page cost less than the first, which means deciding early what is a component and what is a one-off — and being strict about it.",
        media: { url: px(1181316), alt: "Component sheet" },
      },
    ],
    gallery: [
      { url: px(1181673, "portrait"), alt: "Mexpo on mobile" },
      { url: px(3184360), alt: "Landing page" },
    ],
  },
];

export const projectSummaries = projects.map(
  ({ _id, title, slug, role, year, discipline, headline, cover, preview, accent }) => ({
    _id,
    title,
    slug,
    role,
    year,
    discipline,
    headline,
    cover,
    preview,
    accent,
  }),
);
