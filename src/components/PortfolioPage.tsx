"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Briefcase,
  Check,
  Code2,
  Copy,
  Database,
  Download,
  ExternalLink,
  FileText,
  GitBranch,
  GraduationCap,
  Layers3,
  MapPin,
  Menu,
  MoonStar,
  Rocket,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  education,
  experience,
  navigation,
  profile,
  projects,
  skillGroups,
  type Project,
} from "@/data/profile";

const categoryOrder = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.24 }}
      variants={fadeUp}
      transition={{ duration: reduceMotion ? 0 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <FadeIn className="section-heading">
      <p className="eyebrow">
        <Sparkles aria-hidden="true" size={16} />
        {eyebrow}
      </p>
      <h2>{title}</h2>
      <p>{body}</p>
    </FadeIn>
  );
}

function AnimatedHeadline() {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % profile.headlineWords.length);
    }, 2300);

    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const word = profile.headlineWords[index];

  return (
    <span className="headline-rotator" aria-hidden="true">
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -18, filter: "blur(10px)" }}
          transition={{ duration: reduceMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Header({
  activeSection,
  copied,
  onCopyEmail,
}: {
  activeSection: string;
  copied: boolean;
  onCopyEmail: () => void;
}) {
  const [open, setOpen] = useState(false);
  const navId = "mobile-nav-menu";

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className="site-header">
      <a className="brand-mark" href="#home" aria-label="Go to home">
        <span>TR</span>
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => {
          const id = item.href.slice(1);
          return (
            <a
              key={item.href}
              className={activeSection === id ? "active" : ""}
              href={item.href}
              aria-current={activeSection === id ? "page" : undefined}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="header-actions">
        <button className="icon-button" type="button" onClick={onCopyEmail} aria-label="Copy email">
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </button>
        <a className="header-cta" href={profile.resumeHref} download>
          <Download size={17} />
          Resume
        </a>
        <button
          className="icon-button mobile-toggle"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-haspopup="menu"
          aria-controls={navId}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.nav
            id={navId}
            className="mobile-nav"
            aria-label="Mobile navigation"
            role="menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} role="menuitem">
                {item.label}
                <ArrowUpRight size={16} />
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function Hero({ copied, onCopyEmail }: { copied: boolean; onCopyEmail: () => void }) {
  return (
    <section id="home" className="hero-section" aria-label="Intro">
      <div className="hero-grid">
        <FadeIn className="hero-copy">
          <div className="status-pill">
            <span className="status-dot" />
            Open to full-stack developer roles
          </div>
          <h1 aria-label="Building sharp digital systems as a Full Stack Developer, AI Product Builder, React + TypeScript, Supabase Systems, and Recruiter-Ready Interfaces">
            Building sharp digital systems as a <AnimatedHeadline />
          </h1>
          <p className="hero-intro">{profile.shortPitch}</p>
          <div className="hero-actions">
            <a className="primary-button" href="#projects">
              View projects
              <ArrowDown size={18} />
            </a>
            <a className="secondary-button" href={profile.resumeHref} download>
              <Download size={18} />
              Download resume
            </a>
            <button className="secondary-button ghost-button" type="button" onClick={onCopyEmail}>
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Email copied" : "Copy email"}
            </button>
          </div>
          <div className="hero-meta" aria-label="Profile highlights">
            {profile.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn className="hero-visual" delay={0.12}>
          <div className="avatar-shell">
            <div className="avatar-glow" />
            <Image
              src={profile.avatar}
              alt="Anime avatar used as Tanishk Rathore's portfolio identity"
              width={720}
              height={720}
              priority
              className="avatar-image"
            />
            <div className="terminal-card">
              <div>
                <span className="terminal-dot" />
                deploy-ready
              </div>
              <strong>React + TypeScript + AI</strong>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="content-section">
      <SectionHeading
        eyebrow="Profile"
        title="A practical builder with recruiter-aware product sense."
        body="The portfolio balances a cinematic visual identity with proof a hiring manager can scan quickly: projects, stack, education, resume, and direct contact."
      />
      <div className="about-grid">
        <FadeIn className="about-card large-card">
          <UserRound aria-hidden="true" />
          <h3>About Tanishk</h3>
          <p>{profile.intro}</p>
        </FadeIn>
        <FadeIn className="about-card" delay={0.08}>
          <MapPin aria-hidden="true" />
          <h3>Based in India</h3>
          <p>Building for India-aware and international product use cases with clean, responsive experiences.</p>
        </FadeIn>
        <FadeIn className="about-card" delay={0.14}>
          <MoonStar aria-hidden="true" />
          <h3>Visual Direction</h3>
          <p>Premium dark interface, glow discipline, anime identity, and AI/cyber motion without sacrificing readability.</p>
        </FadeIn>
      </div>
    </section>
  );
}

function Skills() {
  const icons = [Code2, Server, Database, Zap];

  return (
    <section id="skills" className="content-section">
      <SectionHeading
        eyebrow="Stack"
        title="Frontend polish, backend logic, data thinking, and AI tooling."
        body="The skill system is grouped for recruiter scanning: what you can build, what powers it, where data lives, and how you ship."
      />
      <div className="skills-grid">
        {skillGroups.map((group, index) => {
          const Icon = icons[index] ?? Layers3;
          return (
            <FadeIn className="skill-card" key={group.title} delay={index * 0.05}>
              <div className="skill-card-header">
                <Icon aria-hidden="true" />
                <h3>{group.title}</h3>
              </div>
              <p>{group.summary}</p>
              <div className="skill-tags">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

function ProjectImage({ project }: { project: Project }) {
  if (!project.image) {
    return (
      <div className="project-schematic" aria-label={`${project.title} architecture summary`}>
        <div className="schematic-row">
          {project.tech.slice(0, 3).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="schematic-line" />
        <div className="schematic-grid">
          {project.tech.slice(3, 7).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Image
      src={project.image}
      alt={`${project.title} project screenshot`}
      fill
      sizes="(max-width: 768px) 100vw, 44vw"
      className="project-image"
    />
  );
}

function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="content-section projects-section">
      <SectionHeading
        eyebrow="Selected Work"
        title="Five GitHub-backed builds, framed as recruiter proof."
        body="The project cards focus on system thinking, UI craft, product scope, and the concrete stack behind each build."
      />
      <FadeIn className="project-filter" aria-label="Project filters">
        {categoryOrder.map((category) => (
          <button
            key={category}
            type="button"
            className={activeCategory === category ? "active" : ""}
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
          >
            {category}
          </button>
        ))}
      </FadeIn>
      <div className="project-list">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.article
              layout
              key={project.id}
              className={`project-card accent-${project.accent}`}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
            >
              <div className="project-media">
                <ProjectImage project={project} />
              </div>
              <div className="project-content">
                <div className="project-topline">
                  <span>{project.category}</span>
                  <span>{project.label}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="impact-box">
                  <ShieldCheck aria-hidden="true" size={18} />
                  <span>{project.impact}</span>
                </div>
                <div className="tech-stack">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="project-actions">
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">
                    <GitBranch size={18} />
                    GitHub
                  </a>
                  {project.live ? (
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={18} />
                      Live
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="content-section">
      <SectionHeading
        eyebrow="Background"
        title="Developer profile with communication and hiring-process context."
        body="The resume story is direct: full-stack learning, practical projects, HR exposure, and a clear education path."
      />
      <div className="timeline-grid">
        <FadeIn className="timeline-panel">
          <div className="panel-heading">
            <Briefcase aria-hidden="true" />
            <h3>Experience</h3>
          </div>
          {experience.map((item) => (
            <div className="timeline-item" key={item.title}>
              <span>{item.period}</span>
              <h4>{item.title}</h4>
              <p className="timeline-org">{item.org}</p>
              <p>{item.detail}</p>
            </div>
          ))}
        </FadeIn>
        <FadeIn className="timeline-panel" delay={0.08}>
          <div className="panel-heading">
            <GraduationCap aria-hidden="true" />
            <h3>Education</h3>
          </div>
          {education.map((item) => (
            <div className="timeline-item" key={item.title}>
              <span>{item.period}</span>
              <h4>{item.title}</h4>
              <p>{item.org}</p>
            </div>
          ))}
        </FadeIn>
        <FadeIn className="resume-panel" delay={0.14}>
          <FileText aria-hidden="true" />
          <h3>Resume-ready profile</h3>
          <p>
            A one-page PDF resume is generated from the same portfolio story, so the site and download stay aligned.
          </p>
          <a className="primary-button" href={profile.resumeHref} download>
            <Download size={18} />
            Download PDF
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

function Contact({ copied, onCopyEmail }: { copied: boolean; onCopyEmail: () => void }) {
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
    "Full Stack Developer Opportunity",
  )}&body=${encodeURIComponent(
    "Hi Tanishk,\n\nI saw your portfolio and would like to discuss an opportunity.",
  )}`;

  return (
    <section id="contact" className="contact-section">
      <FadeIn className="contact-card">
        <div>
          <p className="eyebrow">
            <Rocket aria-hidden="true" size={16} />
            Contact
          </p>
          <h2>Ready for full-stack developer opportunities.</h2>
          <p>
            Email is the primary contact channel. The form intentionally opens your mail app instead of storing personal
            data.
          </p>
        </div>
        <div className="contact-actions">
          <a className="primary-button" href={mailto}>
            <Send size={18} />
            Send email
          </a>
          <button className="secondary-button" type="button" onClick={onCopyEmail}>
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copied" : profile.email}
          </button>
          <a className="secondary-button" href={profile.github} target="_blank" rel="noopener noreferrer">
            <GitBranch size={18} />
            GitHub profile
          </a>
        </div>
      </FadeIn>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{profile.name}</strong>
        <span>{profile.role}</span>
      </div>
      <a href="#home" aria-label="Back to top">
        Back to top
        <ArrowUpRight size={16} />
      </a>
    </footer>
  );
}

export function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("home");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sectionIds = ["home", ...navigation.map((item) => item.href.slice(1))];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-20% 0px -50% 0px", threshold: [0.18, 0.3, 0.55] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }, []);

  return (
    <div className="app-shell">
      <div className="noise-layer" aria-hidden="true" />
      <Header activeSection={activeSection} copied={copied} onCopyEmail={handleCopyEmail} />
      <main>
        <Hero copied={copied} onCopyEmail={handleCopyEmail} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact copied={copied} onCopyEmail={handleCopyEmail} />
      </main>
      <Footer />
    </div>
  );
}
