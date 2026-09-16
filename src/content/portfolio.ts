/**
 * Single source of truth for the site.
 *
 * Components hold no copy of their own — they read from here. Optional fields
 * (`image`, `liveUrl`, `repoUrl`) are rendered only when present, so nothing
 * has to be stubbed out while screenshots and links are still pending.
 */

export type NavLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  /** Category line above the title. */
  eyebrow: string;
  title: string;
  body: string;
  stack: string[];
  /** Real screenshot only. Absent until one exists. */
  image?: string;
  imageAlt?: string;
  liveUrl?: string;
  repoUrl?: string;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Honor = {
  placement: string;
  name: string;
  organizer: string;
};

export type ContactItem = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export const nav: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const site = {
  name: "Maulana Alfara",
  title: "Maulana Alfara — Software Engineer, Web and Applied AI",
  description:
    "Software engineering student at SMK Telkom Malang, building production web applications and integrating LLM and RAG architectures into them.",
  cvUrl: "/cv.pdf",
};

export const hero = {
  badge: "Available for new opportunities",
  /** Two sentences, broken onto separate lines on desktop. */
  headline: ["Engineering scalable web products.", "Putting AI to work inside them."],
  intro:
    "Software engineering student at SMK Telkom Malang, building production web applications and integrating LLM and RAG architectures into them.",
  primaryCta: { label: "View my work", href: "#work" },
  secondaryCta: { label: "Download CV", href: "/cv.pdf" },
  /** Set only when a real screenshot exists. */
  image: undefined as string | undefined,
  imageAlt: "The SIRANA interface",
};

export const about = {
  title: "Web engineering, with AI built in.",
  profile: {
    label: "Applied AI and web engineering",
    lead: "Fullstack engineering student specializing in Next.js, PHP/Laravel, Node.js, and hybrid AI engineering that combines business rules, machine learning, and LLM retrieval.",
    body: "Looking for an internship on a team where the work has real impact.",
  },
  metrics: [
    { value: "5+", label: "Web and AI projects shipped" },
    { value: "3", label: "Competition podium finishes" },
  ],
  role: {
    title: "Assistant Manager",
    body: "MokletDev division, METIC at SMK Telkom Malang",
  },
  focus: {
    title: "Core expertise",
    body: "Hybrid AI architectures, applied RAG systems, and enterprise web development",
  },
};

export const work = {
  title: "Selected work.",
};

/** The first entry is the full-width feature card. */
export const projects: Project[] = [
  {
    id: "sirana",
    eyebrow: "AI integration and frontend",
    title: "Emergency regulations, answered in plain language.",
    body: "Built the web interface and AI chatbot that let people ask plain-language questions about emergency regulation documents. Retrieval-augmented generation keeps every answer grounded in the source material.",
    stack: ["Next.js", "NLP", "LLM", "RAG", "vector store"],
  },
  {
    id: "nunchi",
    eyebrow: "Fullstack development",
    title: "Health and wellbeing, built for the Korean market.",
    body: "Developed fullstack features across user flows, data storage, and REST API integrations, shaped around what Korean users expect.",
    stack: ["Fullstack web", "REST API", "relational database"],
  },
  {
    id: "glucofy",
    eyebrow: "Frontend engineering",
    title: "Log a meal. See your sugar target update instantly.",
    body: "Designed a fast food-logging interface that tracks personal sugar targets with live progress visualization.",
    stack: ["Next.js", "React", "Tailwind CSS", "REST API", "data visualization"],
  },
  {
    id: "fuboru",
    eyebrow: "Enterprise platform",
    title: "The backend behind internal and public portals.",
    body: "Built server-side logic, database architecture, authentication, and CRUD systems for both internal and public-facing web platforms.",
    stack: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "mexpo",
    eyebrow: "Frontend architecture",
    title: "A modular frontend, built from reusable parts.",
    body: "Developed responsive Next.js interfaces that consume backend REST APIs, using a reusable component architecture.",
    stack: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  },
];

export const leadership = {
  title: "Leadership.",
  role: "Assistant Manager, MokletDev Division",
  organization:
    "METIC (Moklet Education of Technology and Informatics Club), SMK Telkom Malang",
  dates: "2024 – Present",
  responsibilities: [
    "Co-lead the developer community, running internal projects, learning sessions, and workshops.",
    "Mentor junior members in web development and AI fundamentals, and prepare teams for technology competitions.",
    "Coordinate project timelines across club divisions.",
  ],
};

export const toolkit = {
  title: "Toolkit.",
};

export const skills: SkillGroup[] = [
  {
    label: "Frontend",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "TailwindCSS",
      "shadcn/ui",
      "Responsive UI",
    ],
  },
  {
    label: "Backend",
    items: [
      "PHP",
      "Laravel",
      "Node.js",
      "Express",
      "Python (FastAPI)",
      "REST API",
      "Authentication & RBAC",
    ],
  },
  {
    label: "Database",
    items: [
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Prisma ORM",
      "Eloquent ORM",
      "Vector store (pgvector, Chroma)",
    ],
  },
  {
    label: "AI engineering",
    items: [
      "LLM integration (OpenAI, Gemini)",
      "RAG",
      "NLP",
      "Prompt engineering",
      "Embeddings",
      "Chatbot development",
      "Hybrid model design (rules + ML + LLM)",
      "Model evaluation",
    ],
  },
  {
    label: "ML and data",
    items: [
      "Python",
      "Pandas",
      "NumPy",
      "scikit-learn",
      "Data preprocessing",
      "Feature engineering",
      "Model serving via API",
    ],
  },
  {
    label: "DevOps and tools",
    items: ["Docker", "Git", "GitHub", "Linux", "Nginx", "Postman", "Figma", "CI/CD"],
  },
  {
    label: "Soft skills",
    items: [
      "Team leadership",
      "Cross-division collaboration",
      "Problem solving",
      "Public speaking",
      "Project management",
    ],
  },
];

export const recognition = {
  title: "Recognition.",
};

export const honors: Honor[] = [
  { placement: "1st", name: "Connection AI", organizer: "Axioo Competition" },
  { placement: "3rd", name: "Exploraition Batch 1", organizer: "Garuda Spark" },
  {
    placement: "3rd",
    name: "ADVA/JA Dengue Slayers Challenge 3.0",
    organizer: "Singapore",
  },
];

export const education = {
  school: "SMK Telkom Malang",
  program: "Software Engineering (Rekayasa Perangkat Lunak)",
  dates: "2024 – Present",
  note: "Assistant Manager of the MokletDev division at METIC.",
};

export const contact = {
  headline: "Let's build something extraordinary together.",
  cta: { label: "Email me", href: "mailto:maulanaalfara38@gmail.com" },
  location: "Malang, Indonesia",
};

export const contactItems: ContactItem[] = [
  {
    label: "Email",
    value: "maulanaalfara38@gmail.com",
    href: "mailto:maulanaalfara38@gmail.com",
  },
  { label: "Phone", value: "+62 812 8446 1122", href: "tel:+6281284461122" },
  { label: "Location", value: "Malang, Jawa Timur" },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/maulana-alfara",
    href: "https://www.linkedin.com/in/maulana-alfara",
    external: true,
  },
];
