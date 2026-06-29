export type ProjectCategory =
  | "AI Product"
  | "Full Stack SaaS"
  | "Healthcare"
  | "Frontend"
  | "Marketplace";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  label: string;
  summary: string;
  impact: string;
  tech: string[];
  repo: string;
  live?: string;
  image?: string;
  accent: "cyan" | "lime" | "coral" | "gold" | "violet";
};

export const profile = {
  name: "Tanishk Rathore",
  role: "Full Stack Developer",
  location: "India",
  email: "rathoretanishk11@gmail.com",
  github: "https://github.com/Tanishk-rathore-01",
  resumeHref: "/Tanishk_Rathore_Resume.pdf",
  avatar: "/assets/avatar.jpg",
  headlineWords: [
    "Full Stack Developer",
    "AI Product Builder",
    "React + TypeScript",
    "Supabase Systems",
    "Recruiter-Ready Interfaces",
  ],
  intro:
    "Tanishk Rathore is a full-stack developer building polished, responsive web applications with React, TypeScript, Tailwind CSS, Node.js, Python, Supabase, PostgreSQL, and AI tooling. He combines practical product thinking, debugging discipline, and user-focused UI craft to ship projects that feel modern, usable, and production-minded.",
  shortPitch:
    "I build polished full-stack products with modern frontend craft, practical backend systems, and AI-assisted workflows.",
  stats: [
    { value: "5", label: "featured builds" },
    { value: "10+", label: "core technologies" },
    { value: "3 mo", label: "HR recruiter experience" },
  ],
};

export const navigation = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const skillGroups = [
  {
    title: "Frontend Foundations",
    summary: "Responsive, accessible interfaces with clear hierarchy and smooth interaction states.",
    skills: ["JavaScript", "TypeScript", "HTML", "CSS", "React", "Vue.js", "Tailwind CSS"],
  },
  {
    title: "Backend And APIs",
    summary: "Server logic, API integration, validation, and practical product workflows.",
    skills: ["Node.js", "Python", "REST APIs", "API Design", "Auth Flows", "Validation"],
  },
  {
    title: "Data And Storage",
    summary: "Application data models, relational storage, and Supabase-backed product features.",
    skills: ["PostgreSQL", "Supabase", "Database Design", "RLS Concepts", "Query Thinking"],
  },
  {
    title: "Delivery And AI Tooling",
    summary: "Version control, deployment thinking, debugging discipline, and AI-assisted development.",
    skills: ["GitHub", "Vercel", "AI Tooling", "Debugging", "Problem Solving", "Prompting"],
  },
];

export const projects: Project[] = [
  {
    id: "eventrahq",
    title: "EventraHQ",
    category: "Full Stack SaaS",
    label: "Multi-tenant event operations platform",
    summary:
      "Production-oriented event platform covering publishing, registrations, Razorpay test payments, ticketing, QR check-in, organization roles, audit records, and async jobs.",
    impact:
      "Shows SaaS architecture depth: tenant isolation, row-level security, idempotent payment handling, job queues, and operational workflows.",
    tech: ["React", "TypeScript", "Express", "Supabase", "PostgreSQL", "Razorpay", "Gemini", "Vercel"],
    repo: "https://github.com/Tanishk-rathore-01/eventrahq-fullstack-saas",
    image:
      "https://raw.githubusercontent.com/Tanishk-rathore-01/eventrahq-fullstack-saas/main/docs/images/eventrahq-home.png",
    accent: "cyan",
  },
  {
    id: "preppilot",
    title: "PrepPilot / AI-Career-Forge",
    category: "AI Product",
    label: "AI career preparation platform",
    summary:
      "AI career coach for mock interviews, readiness scoring, salary negotiation practice, resume matching, dashboards, and structured improvement feedback.",
    impact:
      "Demonstrates AI product thinking with validation, auth, provider fallback chains, scoring logic, and career-focused UX.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Auth.js", "Prisma", "Gemini", "OpenAI"],
    repo: "https://github.com/Tanishk-rathore-01/AI-Career-Forge",
    accent: "lime",
  },
  {
    id: "apex-health-care",
    title: "Apex Health Care",
    category: "Healthcare",
    label: "India-focused hospital management system",
    summary:
      "Dark clinical operations dashboard for patient records, appointments, medical records, billing, pharmacy inventory, reports, and protected admin access.",
    impact:
      "Highlights domain-specific UX, Supabase auth/database integration, RBAC, RLS concepts, charts, forms, and typed healthcare workflows.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "TanStack Query", "Recharts", "Vitest"],
    repo: "https://github.com/Tanishk-rathore-01/Hospital-Management-System-",
    live: "https://hospital-management-system-inky-kappa.vercel.app",
    image:
      "https://raw.githubusercontent.com/Tanishk-rathore-01/Hospital-Management-System-/main/docs/assets/apex-dashboard.png",
    accent: "coral",
  },
  {
    id: "cafe-au-latte",
    title: "Cafe Au Latte",
    category: "Frontend",
    label: "Premium responsive landing page",
    summary:
      "Portfolio-quality cafe landing page concept with editorial layout, animated navigation, menu filtering, reservation dialog, image-led storytelling, and responsive polish.",
    impact:
      "Shows frontend taste: motion, accessibility, responsive design QA, component composition, and high-detail UI execution.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Motion", "Lucide", "Responsive UI"],
    repo: "https://github.com/Tanishk-rathore-01/Cafe-Au-Latte",
    image:
      "https://raw.githubusercontent.com/Tanishk-rathore-01/Cafe-Au-Latte/main/qa/desktop-hero.png",
    accent: "gold",
  },
  {
    id: "vyom-veloce",
    title: "VYOM Veloce",
    category: "Marketplace",
    label: "Luxury vehicle marketplace",
    summary:
      "Full-stack luxury car and motorcycle marketplace with curated inventory, seller onboarding, modification studio, admin dashboard, Supabase auth, and Razorpay booking flow.",
    impact:
      "Demonstrates premium product UI, marketplace flows, protected admin tooling, generated visual systems, and payment demo limitations explained clearly.",
    tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "Supabase", "Razorpay", "Pexels API", "Vercel"],
    repo: "https://github.com/Tanishk-rathore-01/vyom-veloce",
    live: "https://vyom-veloce.vercel.app",
    image:
      "https://raw.githubusercontent.com/Tanishk-rathore-01/vyom-veloce/main/public/readme/homepage.webp",
    accent: "violet",
  },
];

export const experience = [
  {
    title: "HR Recruiter",
    org: "Recruiting Experience",
    period: "3 months",
    detail:
      "Built practical communication, candidate screening, follow-up discipline, and hiring-process awareness that now supports recruiter-friendly product thinking.",
  },
];

export const education = [
  {
    title: "Bachelor of Computer Applications",
    org: "IAMR College, Duhai, Ghaziabad, Uttar Pradesh",
    period: "Undergraduate",
  },
  {
    title: "Class 10 and Class 12",
    org: "Presidency The International School, Bhiwadi, Alwar, Rajasthan",
    period: "Completed",
  },
];
