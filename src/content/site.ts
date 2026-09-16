import { px } from "@/lib/media";
import type {
  Achievement,
  Credential,
  ImageAsset,
  ProcessStep,
  Profile,
  Service,
  SiteSettings,
} from "@/types/content";

export const site: SiteSettings = {
  brand: "AZURA",
  wordmark: "ALFARA",
  role: "Fullstack & AI Engineer",
  tagline: "Web products with the intelligence built in, not bolted on.",
  email: "maulanaalfara38@gmail.com",
  phone: "+62 812 8446 1122",
  location: "Malang, Jawa Timur — Indonesia",
  availability: "Open to an engineering internship on a team shipping AI-driven products",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/maulana-alfara" },
    { label: "Email", href: "mailto:maulanaalfara38@gmail.com" },
  ],
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * The professional summary.
 *
 * Same facts as the CV, framed around delivered capability rather than study
 * status — the qualification is stated where it belongs, under education.
 */
export const profile: Profile = {
  name: "Maulana Alfara",
  role: "Fullstack Engineer & AI Engineer",
  headline: "I build the product and the intelligence inside it.",
  pitch: [
    "Fullstack on both ends — Next.js in front, Laravel and Node.js behind — plus an AI layer that keeps business rules, machine learning and LLM retrieval working as one system rather than three.",
    "Shipped into manufacturing, emergency regulation and consumer health.",
  ],
  summary: [
    "I work across the whole surface of a web product: Next.js, React and TypeScript on the front end, PHP, Laravel and Node.js on the back, and an AI layer that combines business rules, machine learning and LLM retrieval so what the system returns stays accurate and traceable to its source.",
    "That work has shipped into manufacturing, emergency regulation and consumer health — domains where the model is rarely the hard part. The hard part is whether the people already using the system trust what it returns. So deterministic rules run first, the model handles what those rules miss, and predictions arrive inside the workflow the team already knows rather than in a separate tool.",
    "Alongside client work I serve as Assistant Manager of the MokletDev division at METIC, running internal projects, mentoring junior members in web development and AI, and preparing teams for competition. I am looking for an internship where I can ship AI-driven products with engineers who do this every day.",
  ],
};

export const services: Service[] = [
  {
    _id: "s1",
    title: "Frontend Engineering",
    body: "Interfaces built in Next.js and typed end to end — responsive, componentised, and light enough to open several times a day on a phone.",
    capabilities: ["Next.js & React", "TypeScript", "TailwindCSS", "shadcn/ui", "Responsive UI"],
  },
  {
    _id: "s2",
    title: "Backend & APIs",
    body: "Server-side logic, data modelling and the REST surfaces between them, with authentication and role-based access handled as part of the design rather than after it.",
    capabilities: ["PHP & Laravel", "Node.js & Express", "Python (FastAPI)", "REST API", "Auth & RBAC"],
  },
  {
    _id: "s3",
    title: "AI Engineering",
    body: "LLM features that answer from real source material. Retrieval over the documents that matter, prompts designed for the task, and a hybrid design that keeps output auditable.",
    capabilities: [
      "LLM integration (OpenAI, Gemini)",
      "RAG & embeddings",
      "NLP",
      "Prompt engineering",
      "Chatbot development",
      "Hybrid rules + ML + LLM",
      "Model evaluation",
    ],
  },
  {
    _id: "s4",
    title: "Data & Machine Learning",
    body: "From cleaning operational data through feature engineering to a trained model served over an API the main application can call.",
    capabilities: [
      "Python, Pandas, NumPy",
      "scikit-learn",
      "Data preprocessing",
      "Feature engineering",
      "Model serving via API",
      "PostgreSQL, MySQL, Redis",
      "Prisma & Eloquent ORM",
      "Vector stores (pgvector, Chroma)",
    ],
  },
  {
    _id: "s5",
    title: "Delivery & Collaboration",
    body: "Shipping is a team sport. I work across divisions, keep timelines honest, and hand over something the next engineer can run.",
    capabilities: [
      "Docker & Linux",
      "Git & GitHub",
      "Nginx",
      "CI/CD",
      "Postman & Figma",
      "Team leadership",
      "Project management",
    ],
  },
];

/** How the AI work is put together — the method behind the project write-ups. */
export const process: ProcessStep[] = [
  {
    _id: "p1",
    title: "Rules before models",
    body: "Anything the business already has a policy for is handled deterministically. The trained model takes the patterns those rules miss. Results stay auditable and consistent with company standards, which is what makes them usable.",
  },
  {
    _id: "p2",
    title: "Answers with a source",
    body: "For anything a language model touches, retrieval comes first. Responses are grounded in the real regulation or document set, so a user can follow an answer back to where it came from instead of taking it on faith.",
  },
  {
    _id: "p3",
    title: "Ship it where the work happens",
    body: "A model behind its own dashboard gets ignored. Predictions are served through internal APIs into the screens staff already know how to use, so the intelligence arrives as part of the job rather than one more tool to learn.",
  },
];

export const achievements: Achievement[] = [
  { _id: "a1", placement: "1st", title: "Connection AI", organiser: "Axioo Competition" },
  { _id: "a2", placement: "3rd", title: "Exploraition Batch 1", organiser: "Garuda Spark" },
  {
    _id: "a3",
    placement: "3rd",
    title: "ADVA / JA Dengue Slayers Challenge 3.0",
    organiser: "Singapore",
  },
  {
    _id: "a4",
    placement: "1st",
    title: "Dunia Games Esports — Call of Duty Mobile",
    organiser: "Dunia Games",
    year: "2023",
  },
  {
    _id: "a5",
    placement: "2nd",
    title: "Major Series — Call of Duty Mobile",
    organiser: "Major Series",
    year: "2023",
  },
  {
    _id: "a6",
    placement: "2nd",
    title: "Major Series — Call of Duty Mobile",
    organiser: "Major Series",
    year: "2022",
  },
];

export const credentials: Credential[] = [
  {
    _id: "c1",
    title: "Assistant Manager, MokletDev Division",
    organisation: "METIC — Moklet Education of Technology and Informatics Club, SMK Telkom Malang",
    period: "2024 — Present",
    points: [
      "Help run the school developer community, including internal projects, learning sessions and workshops for members.",
      "Mentor junior members in web development and AI basics, and prepare teams for technology competitions.",
      "Keep project timelines on track and coordinate with the other divisions in the club.",
    ],
  },
  {
    _id: "c2",
    title: "Rekayasa Perangkat Lunak (Software Engineering)",
    organisation: "SMK Telkom Malang",
    period: "2024 — Present",
    points: [
      "Focus on web engineering, database systems and applied artificial intelligence.",
      "Active in METIC as Assistant Manager of the MokletDev division.",
    ],
  },
];

/** Showroom strip — loose visual fragments, still placeholder photography. */
export const showroom: ImageAsset[] = [
  { url: px(3184465, "portrait"), alt: "Interface work in progress on a desk" },
  { url: px(1181675), alt: "Pairing session over a codebase" },
  { url: px(3861964, "portrait"), alt: "Notes from a model evaluation run" },
  { url: px(3183150), alt: "Whiteboard mapping of a data flow" },
  { url: px(1181244, "portrait"), alt: "Late build session" },
  { url: px(3861958), alt: "Dashboard explorations" },
];

export const capabilitiesTicker = [
  "Next.js",
  "TypeScript",
  "Laravel",
  "Node.js",
  "Python",
  "RAG & LLM",
  "Machine Learning",
  "PostgreSQL",
  "Docker",
];
