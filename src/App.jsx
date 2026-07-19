import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { Button, ButtonGroup, ButtonIcon } from "./components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/Card";
import { FilterTabList } from "./components/FilterTabs";
import { ProjectCard, WriteupCard } from "./components/ProjectCard";
import { Stack, Timeline } from "./components/Timeline";
import { MotionHero } from "./components/MotionHero";
import { LenisProvider } from "./components/LenisProvider";

function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const NAV_LINKS = ["Home", "About", "Work", "Writeups", "Contact"];

const SOCIALS = [
  { name: "GitHub", url: "https://github.com/ykrishhh" },
  { name: "X", url: "https://x.com/harry6ez" },
  { name: "harrydev.one", url: "https://harrydev.one" },
];

const PROJECT_CATEGORIES = ["All", "Hardware", "AI", "Web", "Android"];

const PROJECTS = [
  {
    name: "termux-security-toolkit",
    desc: "Security tools and scripts for Termux: network scanning, password auditing, and pentesting on Android.",
    stars: 5,
    url: "https://github.com/ykrishhh/termux-security-toolkit",
    icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
    category: "Android",
    tags: ["android", "termux", "pentesting"],
  },
  {
    name: "ESP32-HARNESS",
    desc: "Advanced ESP32 pentesting and telemetry firmware for 2.4 GHz research, RF24 experimentation, and on-device forensic capture.",
    stars: 1,
    url: "https://github.com/ykrishhh/ESP32-HARNESS",
    icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>,
    category: "Hardware",
    tags: ["esp32", "firmware", "iot"],
  },
  {
    name: "ou-hunt-report",
    desc: "OU.edu Red Team Hunt: 6 validated vulnerabilities with proof-of-concept exploits.",
    stars: 1,
    url: "https://github.com/ykrishhh/ou-hunt-report",
    icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    category: "Web",
    tags: ["red-team", "cve", "python"],
  },
  {
    name: "pypentest-ai",
    desc: "AI-assisted Python pentesting: exploit analysis and vulnerability detection for reconnaissance.",
    stars: 0,
    url: "https://github.com/ykrishhh/pypentest-ai",
    icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 1 8 8H4a8 8 0 0 1 8-8Z"/><path d="M12 14v4"/><path d="M12 14h.01"/></svg>,
    category: "AI",
    tags: ["ai", "pentesting", "python"],
  },
  {
    name: "HarryPanel",
    desc: "Advanced web hosting control panel: server management, database admin, file manager, and deployment tools.",
    stars: 1,
    url: "https://github.com/ykrishhh/HarryPanel",
    icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
    category: "Web",
    tags: ["flask", "devops", "hosting"],
  },
  {
    name: "android-rooting-masterclass",
    desc: "Complete guide to Android rooting and hooking, from user-space DEX editing to Xposed and KernelSU.",
    stars: 1,
    url: "https://github.com/ykrishhh/android-rooting-masterclass",
    icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    category: "Android",
    tags: ["android", "frida", "kernel"],
  },
];

const WRITEUPS = [
  {
    title: "ESP32 BLE Attack Vectors",
    desc: "Recon, over-the-air exploitation, and payload injections on ESP32 Bluetooth Low Energy.",
    url: "https://harrydev.one/blog/esp32-ble-attack",
    icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>,
  },
  {
    title: "Android Root Security Bypass",
    desc: "Bypassing modern attestation models using custom eBPF hooks.",
    url: "https://harrydev.one/blog/android-rooting-deep-dive",
    icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    title: "Binary Reverse Engineering",
    desc: "Advanced CTF disassembly walkthroughs and assembly analysis.",
    url: "https://harrydev.one/blog/ctf-reverse-engineering",
    icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  },
];

const STACK = [
  "Python", "C", "JavaScript", "Bash", "Linux", "ESP32", "Android", "Frida", "eBPF", "React", "FastAPI", "LangChain",
];

const JOURNEY = [
  {
    year: "2022",
    title: "Started Security Research",
    desc: "Deep dive into offensive security, CTF competitions, and vulnerability research.",
    icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  },
  {
    year: "2023",
    title: "Hardware Hacking & ESP32",
    desc: "Built custom firmware for wireless auditing and IoT security research.",
    icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>,
  },
  {
    year: "2024",
    title: "AI-Powered Pentesting",
    desc: "Developed autonomous security tools using local LLMs and agentic pipelines.",
    icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 1 8 8H4a8 8 0 0 1 8-8Z"/><path d="M12 14v4"/><path d="M12 14h.01"/></svg>,
  },
  {
    year: "2025",
    title: "Red Team Engagements",
    desc: "OU.edu Red Team Hunt: 6 validated vulnerabilities with full PoC chain.",
    icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
  {
    year: "2026",
    title: "Building in Public",
    desc: "Open-sourcing tools, writing deep-dive research, and mentoring new researchers.",
    icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  },
];

function useReveal({ threshold = 0.15, rootMargin = "0px 0px -10% 0px" } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;

    const targets = root.matches?.(".reveal, .reveal-fade, .reveal-scale")
      ? [root, ...root.querySelectorAll(".reveal, .reveal-fade, .reveal-scale")]
      : Array.from(root.querySelectorAll(".reveal, .reveal-fade, .reveal-scale"));

    if (!targets.length) return undefined;

    if (typeof IntersectionObserver === "undefined") {
      targets.forEach((el) => el.classList.add("visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}

function FluidNav({ open, setOpen }) {
  const sentinelRef = useRef(null);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 24);
      if (open) {
        setHidden(false);
      } else if (y > lastY.current && y > 120) {
        setHidden(true);
      } else if (y < lastY.current) {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setAtTop(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="absolute left-0 top-0 h-6 w-px" />

      <header
        className="pointer-events-none fixed inset-x-0 top-0 flex justify-center px-4"
        style={{ zIndex: "var(--z-nav)" }}
      >
        <nav
          className="pointer-events-auto mx-auto mt-6 flex w-max items-center gap-1 rounded-full border border-[var(--color-hairline)] bg-[var(--color-void)]/80 px-2 py-2 backdrop-blur-2xl"
          style={{
            boxShadow: atTop ? "var(--shadow-md)" : "var(--shadow-lg)",
            transform: hidden ? "translateY(-160%)" : "translateY(0)",
            transition:
              "transform var(--duration-smooth) var(--ease-expo), box-shadow var(--duration-smooth) var(--ease-smooth)",
          }}
        >
          <a
            href="#home"
            className="px-4 text-sm font-semibold tracking-tight text-[var(--color-text)]"
          >
            KRISH
          </a>

          <div className="hidden items-center md:flex">
            {NAV_LINKS.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">
                {link}
              </a>
            ))}
          </div>

          <Button
            asChild
            variant="primary"
            size="sm"
            className="ml-1 hidden md:inline-flex"
          >
            <a href="#contact">Connect</a>
          </Button>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-[var(--color-text)] active:scale-90 md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className="absolute left-0 block h-[1.5px] w-full rounded-full bg-current"
                style={{
                  top: open ? "50%" : "2px",
                  transform: open ? "translateY(-50%) rotate(45deg)" : "none",
                  transition:
                    "top var(--duration-base) var(--ease-expo), transform var(--duration-base) var(--ease-spring)",
                }}
              />
              <span
                className="absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 rounded-full bg-current"
                style={{
                  opacity: open ? 0 : 1,
                  transform: open ? "scaleX(0)" : "scaleX(1)",
                  transition: "opacity var(--duration-fast) var(--ease-smooth), transform var(--duration-fast) var(--ease-smooth)",
                }}
              />
              <span
                className="absolute left-0 block h-[1.5px] w-full rounded-full bg-current"
                style={{
                  bottom: open ? "50%" : "2px",
                  transform: open ? "translateY(50%) rotate(-45deg)" : "none",
                  transition:
                    "bottom var(--duration-base) var(--ease-expo), transform var(--duration-base) var(--ease-spring)",
                }}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className="fixed inset-0 flex flex-col justify-center px-8 backdrop-blur-3xl md:hidden"
        style={{
          zIndex: "var(--z-overlay)",
          background: "rgba(3, 3, 3, 0.9)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "scale(1)" : "scale(1.04)",
          transition:
            "opacity var(--duration-smooth) var(--ease-expo), transform var(--duration-smooth) var(--ease-expo)",
        }}
      >
        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="font-display text-4xl font-semibold italic tracking-tight text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(16px)",
                transition: `opacity var(--duration-slow) var(--ease-expo) ${100 + i * 60}ms, transform var(--duration-slow) var(--ease-spring) ${100 + i * 60}ms`,
              }}
            >
              {link}
            </a>
          ))}
        </nav>

        <div
          className="mt-10 flex flex-wrap gap-3"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(16px)",
            transition: `opacity var(--duration-slow) var(--ease-expo) ${100 + NAV_LINKS.length * 60}ms, transform var(--duration-slow) var(--ease-spring) ${100 + NAV_LINKS.length * 60}ms`,
          }}
        >
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="tag"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

function Section({ id, eyebrow, title, desc, children, bordered = true, className = "" }) {
  const revealRef = useReveal();
  return (
    <section
      id={id}
      ref={revealRef}
      className={[
        bordered ? "border-t border-[var(--color-hairline)]" : "",
        "py-24 md:py-32 lg:py-40",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container">
        {(eyebrow || title || desc) && (
          <div className="max-w-2xl">
            {eyebrow && <span className="section-eyebrow reveal">{eyebrow}</span>}
            {title && <h2 className="section-title reveal stagger-1">{title}</h2>}
            {desc && <p className="section-desc reveal stagger-2">{desc}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function ProjectGrid({ projects }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, i) => (
        <ProjectCard key={p.name} project={p} staggerIndex={(i % 6) + 1} />
      ))}
    </div>
  );
}

function WriteupGrid({ writeups }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {writeups.map((w, i) => (
        <WriteupCard key={w.title} writeup={w} staggerIndex={(i % 6) + 1} />
      ))}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All");

  const visibleProjects =
    projectFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === projectFilter);

  const onFilterChange = useCallback((v) => setProjectFilter(v), []);

  return (
    <LenisProvider>
      <div className="relative min-h-screen font-sans text-[var(--color-text)]">
        <div className="bg-mesh" aria-hidden="true" />
        <div className="bg-noise" aria-hidden="true" />

        <FluidNav open={menuOpen} setOpen={setMenuOpen} />

        {/* Motion Hero - replaces the old Hero section */}
        <MotionHero />

        {/* About */}
        <section
          id="about"
          className="border-t border-[var(--color-hairline)] py-24 md:py-32 lg:py-40"
        >
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <span className="section-eyebrow reveal">About</span>
                <h2 className="section-title reveal stagger-1">Krishna</h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--color-text-muted)] reveal stagger-2">
                  <p>
                    Security engineer focused on offensive security, hardware
                    hacking, and building autonomous AI systems. I break things to
                    understand how they work, then build them stronger.
                  </p>
                  <p>
                    ESP32 firmware fuzzing, multi-agent pentest pipelines, and
                    Android attestation research. The work runs from kernel to
                    cloud.
                  </p>
                  <p>
                    Currently building open-source security tools, writing deep-dive
                    research writeups, and exploring how local LLMs can automate
                    vulnerability research.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <Card variant="elevated" className="reveal-scale stagger-3">
                  <CardHeader>
                    <CardTitle>Quick Facts</CardTitle>
                    <CardDescription>The essentials, at a glance.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    {[
                      ["Location", "India"],
                      ["Focus", "OffSec · Hardware · AI"],
                      ["Workspace", "Linux (Termux) on Android"],
                      ["Active since", "2022"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center gap-3">
                        <span className="text-[var(--color-accent)]">→</span>
                        <span className="text-[var(--color-text-muted)]">
                          {k}: <span className="text-[var(--color-text)]">{v}</span>
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <Section eyebrow="Timeline" title="Journey" desc="Four years of breaking, building, and researching in public.">
          <div className="mt-16">
            <Timeline items={JOURNEY} />
          </div>
        </Section>

        {/* Projects */}
        <Section
          id="work"
          eyebrow="Featured Work"
          title="Projects"
          desc="Open-source security tools, hardware research, and AI-powered pentesting frameworks."
        >
          <div className="mt-12">
            <FilterTabList
              options={PROJECT_CATEGORIES.map((c) => ({ value: c, label: c }))}
              value={projectFilter}
              onChange={onFilterChange}
              className="mb-8"
              ariaLabel="Filter projects by category"
            />

            <ProjectGrid key={projectFilter} projects={visibleProjects} />

            <div className="mt-10">
              <a
                href="https://github.com/ykrishhh?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
              >
                View all repos on GitHub
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Section>

        {/* Writeups */}
        <Section
          id="writeups"
          eyebrow="Deep Dives"
          title="Writeups"
          desc="Technical research and vulnerability analysis from real-world engagements."
        >
          <WriteupGrid writeups={WRITEUPS} />
          <div className="mt-10">
            <a
              href="https://harrydev.one"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              Browse all writeups
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Section>

        {/* Stack / Arsenal */}
        <Stack items={STACK} subtitle="Tech Stack" title="Arsenal" />

        {/* Contact */}
        <Section id="contact">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow reveal">Get In Touch</span>
            <h2
              className="reveal stagger-1 font-display italic tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
              }}
            >
              Let's Build
            </h2>
            <p className="reveal stagger-2 mx-auto mt-6 max-w-lg text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
              Open to security research collaborations, red team engagements, and
              interesting problems.
            </p>
            <ButtonGroup className="reveal stagger-3 mt-8 flex-wrap justify-center gap-3">
              <Button asChild variant="primary">
                <a href="mailto:krishy2122@gmail.com">
                  <Mail className="h-4 w-4" />
                  Email Me
                  <ButtonIcon>
                    <ArrowUpRight className="h-4 w-4" />
                  </ButtonIcon>
                </a>
              </Button>
              <Button asChild variant="secondary">
                <a href="https://github.com/ykrishhh" target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </ButtonGroup>
          </div>
        </Section>

        {/* Footer */}
        <footer className="border-t border-[var(--color-hairline)] py-12">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-[var(--color-text-faint)]">
              Built with React 19, Vite 8, Tailwind v4, and zero fluff.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </LenisProvider>
  );
}

export default App;