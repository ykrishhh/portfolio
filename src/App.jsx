import { useCallback, useEffect, useRef, useState } from "react";
import { useMotionValue, motion } from "motion/react";
import { ArrowUpRight, Envelope, Shield } from "@phosphor-icons/react";
import { Button, ButtonGroup, ButtonIcon } from "./components/Button";
import { useKonamiCode } from "./hooks/useKonamiCode";
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
import { LenisProvider } from "./components/LenisProvider";
import { HeroVideo } from "./components/HeroVideo";
import { SkillCategory } from "./components/SkillCategory";
import { SKILL_CATEGORIES } from "./data/skills";
import {
  useScrubText,
  usePinGallery,
  useHeroChoreography,
} from "./components/animations";
import { useGitHubStars } from "./hooks/useGitHubStars";

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

/* ========== FluidNav with glassmorphism ========== */
function FluidNav({ open, setOpen }) {
  const sentinelRef = useRef(null);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
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
      ([entry]) => setHidden(!entry.isIntersecting && window.scrollY > 120),
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
          className="pointer-events-auto mx-auto mt-5 flex w-max items-center gap-1 glass-nav px-2 py-2"
          style={{
            transform: hidden ? "translateY(-160%)" : "translateY(0)",
            transition: "transform var(--duration-smooth) var(--ease-expo)",
          }}
        >
          <a
            href="#home"
            className="px-4 font-semibold text-sm tracking-tight text-[var(--color-accent)]"
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
            role="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative flex h-11 w-11 items-center justify-center text-[var(--color-text)] active:scale-90 md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className="absolute left-0 block h-[1.5px] w-full rounded-full bg-current"
                style={{
                  top: open ? "50%" : "2px",
                  transform: open ? "translateY(-50%) rotate(45deg)" : "none",
                  transition: "top var(--duration-base) var(--ease-expo), transform var(--duration-base) var(--ease-spring)",
                }}
              />
              <span
                className="absolute left-0 top-1/2 block h-[1.5px] w-full -translate-y-1/2 rounded-full bg-current"
                style={{
                  opacity: open ? 0 : 1,
                  transform: open ? "scaleX(0)" : "scaleX(1)",
                  transition: "opacity var(--duration-fast) var(--ease-sharp), transform var(--duration-fast) var(--ease-sharp)",
                }}
              />
              <span
                className="absolute left-0 block h-[1.5px] w-full rounded-full bg-current"
                style={{
                  bottom: open ? "50%" : "2px",
                  transform: open ? "translateY(50%) rotate(-45deg)" : "none",
                  transition: "bottom var(--duration-base) var(--ease-expo), transform var(--duration-base) var(--ease-spring)",
                }}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        id="mobile-menu"
        className="fixed inset-0 flex flex-col justify-center px-8 md:hidden"
        style={{
          zIndex: "var(--z-overlay)",
          background: "var(--color-void)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transform: open ? "scale(1)" : "scale(1.04)",
          transition: "opacity var(--duration-smooth) var(--ease-expo), transform var(--duration-smooth) var(--ease-expo)",
        }}
      >
        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="font-display text-4xl font-bold tracking-tight text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
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
  return (
    <section
      id={id}
      className={[
        bordered ? "border-t border-[var(--color-hairline)]" : "",
        "py-28 md:py-40 lg:py-48",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container">
        {(eyebrow || title || desc) && (
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {eyebrow && <span className="section-header">{eyebrow}</span>}
            {title && <h2 className="section-title">{title}</h2>}
            {desc && <p className="section-desc">{desc}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}

function ProjectGrid({ projects }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        visible: { transition: { staggerChildren: 0.06 } },
      }}
    >
      {projects.map((p, i) => {
        const isHero = i % 3 === 0;
        return (
          <motion.div
            key={p.name}
            className={isHero ? "lg:col-span-2 lg:row-span-2" : ""}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectCard project={p} size={isHero ? "lg" : "sm"} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ========== Gapless Bento Grid (grid-flow-dense) ========== */
const BENTO = [
  {
    cls: "bento-a",
    tag: "Firmware",
    title: "GLiTCh BadgE",
    desc: "RP2040 + iCE40 fault-injection playground.",
    img: "https://images.pexels.com/photos/1448561/pexels-photo-1448561.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1200&fit=crop",
  },
  {
    cls: "bento-b",
    tag: "Extraction",
    title: "CH55x Dumper",
    desc: "Timing-attack firmware readout over UART.",
    img: "https://images.pexels.com/photos/4432037/pexels-photo-4432037.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
  },
  {
    cls: "bento-c",
    tag: "Exploitation",
    title: "ret2dso",
    desc: "Full RELRO bypass via loader metadata.",
    img: "https://images.pexels.com/photos/2182863/pexels-photo-2182863.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  },
  {
    cls: "bento-d",
    tag: "Side-Channel",
    title: "ChipWhisperer",
    desc: "AES key recovery from power traces.",
    img: "https://images.pexels.com/photos/7858245/pexels-photo-7858245.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
  },
  {
    cls: "bento-e",
    tag: "IoT",
    title: "Echo Show eMMC",
    desc: "Hardware tap to root a smart display.",
    img: "https://images.pexels.com/photos/34924858/pexels-photo-34924858.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
  },
];

function BentoGrid() {
  return (
    <div className="bento-grid mt-12">
      {BENTO.map((cell, i) => (
        <motion.a
          key={cell.title}
          href="#work"
          className={`bento-cell ${cell.cls} group`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
        >
          <img src={cell.img} alt={cell.title} loading="lazy" />
          <span className="tag tag-accent bento-cell__tag">{cell.tag}</span>
          <div className="bento-cell__label">
            <h3 className="font-display text-lg font-bold tracking-tight text-[var(--color-text)]">
              {cell.title}
            </h3>
            <p className="mt-1 font-mono text-xs tracking-[0.02em] text-[var(--color-text-muted)]">
              {cell.desc}
            </p>
          </div>
        </motion.a>
      ))}
    </div>
  );
}

/* ========== Infinite Marquee ========== */
const MARQUEE_ITEMS = [
  "RP2350", "CH55x", "STM32", "iCE40", "ESP32", "nRF52", "Frida",
  "eBPF", "Kernel", "RF24", "Xposed", "LaserFI",
];

function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="marquee py-6" aria-hidden="true">
      <div className="marquee__track">
        {row.map((item, i) => (
          <span key={i} className="marquee__item">{item}</span>
        ))}
      </div>
      <div className="marquee__track">
        {row.map((item, i) => (
          <span key={i} className="marquee__item">{item}</span>
        ))}
      </div>
    </div>
  );
}

import { StickyStack } from "./components/StickyStack";

const DOMAINS = [
  { tag: "01", title: "Fault Injection", img: "https://images.pexels.com/photos/36169772/pexels-photo-36169772.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
  { tag: "02", title: "Side-Channel", img: "https://images.pexels.com/photos/36169774/pexels-photo-36169774.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
  { tag: "03", title: "Embedded/IoT", img: "https://images.pexels.com/photos/6636497/pexels-photo-6636497.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
  { tag: "04", title: "Loader Exploits", img: "https://images.pexels.com/photos/6755078/pexels-photo-6755078.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop" },
];

/* ========== Desire: pinned title + scrubbing text reveal ========== */
const SCRUB_PARAGRAPH =
  "I treat every system as a puzzle with a hidden exit. Firmware, kernels, cloud, and the models on top all leak the same way. The work is patience and repetition. I don't trust the docs. I verify.";

function DesireSection() {
  const pinRef = useRef(null);
  const containerRef = useRef(null);
  const scrubRef = useRef(null);
  usePinGallery(pinRef, containerRef);
  useScrubText(scrubRef);

  return (
    <section
      ref={containerRef}
      className="py-32 md:py-48"
    >
      <div className="container grid gap-12 lg:grid-cols-2">
        <div ref={pinRef} className="pin-title">
          <h2 className="section-title mt-4">
            How I
            <br />
            Operate
          </h2>
          <div className="mt-8 h-px w-24 bg-[var(--color-accent)]" />
        </div>
        <div className="flex flex-col justify-center">
          <p
            ref={scrubRef}
            className="font-display text-2xl font-medium leading-snug tracking-tight text-[var(--color-text)] md:text-3xl"
          >
            {SCRUB_PARAGRAPH}
          </p>
          <div className="mt-12 grid grid-cols-2 gap-4">
            {[
              ["2022", "First CVE"],
              ["40+", "Repos shipped"],
              ["6", "Validated vulns"],
              ["\u221e", "Things broken"],
            ].map(([n, l]) => (
              <div key={l} className="stat-cell">
                <div className="font-display text-3xl font-bold text-[var(--color-accent)]">
                  {n}
                </div>
                <div className="mt-1 font-mono text-xs tracking-[0.05em] text-[var(--color-text-muted)]">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WriteupGrid({ writeups }) {
  return (
    <motion.div
      className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        visible: { transition: { staggerChildren: 0.06 } },
      }}
    >
      {writeups.map((w, i) => (
        <motion.div
          key={w.title}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <WriteupCard writeup={w} />
        </motion.div>
      ))}
    </motion.div>
  );
}

function KonamiToast({ active }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (active) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [active]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 border border-[var(--color-success)] bg-[var(--color-void)] px-4 py-3 font-mono text-xs tracking-wider"
      style={{
        opacity: 1,
        transform: "translateY(0)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        color: "var(--color-success)",
      }}
    >
      <span>Konami: DEBUG MODE</span>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState("All");
  const konamiActive = useKonamiCode({ duration: 10000 });

  const PROJECTS = [
    {
      name: "termux-security-toolkit",
      desc: "Security tools and scripts for Termux: network scanning, password auditing, and pentesting on Android.",
      stars: useGitHubStars("ykrishhh/termux-security-toolkit"),
      url: "https://github.com/ykrishhh/termux-security-toolkit",
      arch: "https://github.com/ykrishhh/termux-security-toolkit/blob/master/docs/architecture.html",
      icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
      category: "Android",
      tags: ["android", "termux", "pentesting"],
    },
    {
      name: "ESP32-HARNESS",
      desc: "Advanced ESP32 pentesting and telemetry firmware for 2.4 GHz research, RF24 experimentation, and on-device forensic capture.",
      stars: useGitHubStars("ykrishhh/ESP32-HARNESS"),
      url: "https://github.com/ykrishhh/ESP32-HARNESS",
      arch: "https://github.com/ykrishhh/ESP32-HARNESS/blob/main/docs/architecture.html",
      icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>,
      category: "Hardware",
      tags: ["esp32", "firmware", "iot"],
    },
    {
      name: "ou-hunt-report",
      desc: "OU.edu Red Team Hunt: 6 validated vulnerabilities with proof-of-concept exploits.",
      stars: useGitHubStars("ykrishhh/ou-hunt-report"),
      url: "https://github.com/ykrishhh/ou-hunt-report",
      arch: "https://github.com/ykrishhh/ou-hunt-report/blob/main/docs/architecture.html",
      icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
      category: "Web",
      tags: ["red-team", "cve", "python"],
    },
    {
      name: "pypentest-ai",
      desc: "AI-assisted Python pentesting: exploit analysis and vulnerability detection for reconnaissance.",
      stars: useGitHubStars("ykrishhh/pypentest-ai"),
      url: "https://github.com/ykrishhh/pypentest-ai",
      icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a8 8 0 0 1 8 8H4a8 8 0 0 1 8-8Z"/><path d="M12 14v4"/><path d="M12 14h.01"/></svg>,
      category: "AI",
      tags: ["ai", "pentesting", "python"],
    },
    {
      name: "HarryPanel",
      desc: "Advanced web hosting control panel: server management, database admin, file manager, and deployment tools.",
      stars: useGitHubStars("ykrishhh/HarryPanel"),
      url: "https://github.com/ykrishhh/HarryPanel",
      arch: "https://github.com/ykrishhh/HarryPanel/blob/main/docs/architecture.html",
      icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
      category: "Web",
      tags: ["flask", "devops", "hosting"],
    },
    {
      name: "android-rooting-masterclass",
      desc: "Complete guide to Android rooting and hooking, from user-space DEX editing to Xposed and KernelSU.",
      stars: useGitHubStars("ykrishhh/android-rooting-masterclass"),
      url: "https://github.com/ykrishhh/android-rooting-masterclass",
      icon: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
      category: "Android",
      tags: ["android", "frida", "kernel"],
    },
    {
      name: "kernelsu-next-guide",
      desc: "Complete guide to KernelSU-Next: installation, module development, and advanced kernel-level Android customization.",
      stars: useGitHubStars("ykrishhh/kernelsu-next-guide"),
      url: "https://github.com/ykrishhh/kernelsu-next-guide",
      icon: (props) => <Shield {...props} />,
      category: "Android",
      tags: ["kernel", "android", "guide"],
    },
  ];

  const visibleProjects =
    projectFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === projectFilter);

  const onFilterChange = useCallback((v) => setProjectFilter(v), []);

  const heroRef = useRef(null);
  useHeroChoreography(heroRef);

  const magneticRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMagneticMove = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = magneticRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(dx * 0.15);
    mouseY.set(dy * 0.15);
  };

  const handleMagneticLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <LenisProvider>
      <main className="relative min-h-screen w-full max-w-full overflow-x-hidden font-sans text-[var(--color-text)]">
        <div className="grain-overlay" aria-hidden="true" />
        <a href="#home" className="skip-link">
          Skip to content
        </a>

        <FluidNav open={menuOpen} setOpen={setMenuOpen} />

        {/* Hero — premium motion: video background + staggered text */}
        <section
          id="home"
          ref={heroRef}
          aria-labelledby="hero-heading"
          className="hero-shell relative flex min-h-[100dvh] items-center overflow-hidden"
        >
          <div className="hero-fallback" aria-hidden="true" />
          <div className="hero-video-wash" aria-hidden="true" />
          <HeroVideo />

          <div className="container relative" style={{ zIndex: 4 }}>
            <div className="max-w-6xl">
              {/* Eyebrow directly above H1 */}
              <div className="hero-eyebrow" aria-hidden="true">
                <span className="hero-eyebrow__dot" />
                <span>Building in public since 2022</span>
              </div>

              <h1
                id="hero-heading"
                className="hero-title font-display font-bold text-[var(--color-text)]"
              >
                <span className="hero-line block">Breaking systems.</span>
                <span className="hero-line block"><span className="font-semibold text-[var(--color-accent)]">Building</span> them safer.</span>
              </h1>

              <p className="hero-sub mt-7 max-w-xl text-[clamp(1rem,1.1vw,1.125rem)] leading-relaxed text-[var(--color-text-muted)]">
                Six CVEs disclosed. Forty open-source tools. One relentless loop:
                <span className="text-[var(--color-text)]"> red-team, dissect, ship.</span>
              </p>

              <div className="hero-ctas mt-9 flex flex-wrap items-center gap-3">
                <motion.div
                  ref={magneticRef}
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  style={{ x: mouseX, y: mouseY }}
                >
                  <Button asChild variant="primary">
                    <a href="#work">
                      View Selected Work
                      <ButtonIcon>
                        <ArrowUpRight weight="bold" className="h-4 w-4" />
                      </ButtonIcon>
                    </a>
                  </Button>
                </motion.div>
                <Button asChild variant="secondary">
                  <a href="#writeups">Read Field Notes</a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right-edge portal hairline */}
          <div className="hero-portal" aria-hidden="true" />

          {/* Scroll cue */}
          <div className="hero-cue" aria-hidden="true">
            <span className="hero-cue__line" />
            <span className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-[var(--color-text-faint)]">
              Scroll
            </span>
          </div>
        </section>

        {/* Signal Strip — stats moved out of hero */}
        <section className="signal-strip container max-w-[1500px] mx-auto px-6 md:px-12">
          {[
            ["6", "CVEs disclosed"],
            ["40+", "Open-source tools"],
            ["\u221e", "Systems broken"],
            ["2022 \u2014", "Building in public"],
            ["1", "Researcher behind it"],
          ].map(([value, label]) => (
            <div key={label} className="signal-cell">
              <div className="signal-cell__value">{value}</div>
              <div className="signal-cell__label">{label}</div>
            </div>
          ))}
        </section>

        {/* About — bordered */}
        <section
          id="about"
          className="border-t border-[var(--color-hairline)] py-28 md:py-40 lg:py-48"
        >
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className="section-title">Krishna</h2>
                <div className="mt-6 space-y-4 text-base leading-relaxed text-[var(--color-text-muted)]">
                  <p>
                    Security engineer. I break systems to learn how they work,
                    then rebuild them stronger.
                  </p>
                  <p>
                    ESP32 firmware fuzzing, multi-agent pentest pipelines, Android
                    attestation research. The range runs from silicon to cloud.
                  </p>
                  <p>
                    Right now I ship open-source tools, write research, and push
                    local LLMs to automate vuln discovery.
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex flex-col justify-center"
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
              >
                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>Quick Facts</CardTitle>
                    <CardDescription>At a glance.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    {[
                      ["Location", "India"],
                      ["Focus", "OffSec \u00b7 Hardware \u00b7 AI"],
                      ["Workspace", "Linux (Termux) on Android"],
                      ["Active since", "2022"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center gap-3">
                        <span className="text-[var(--color-accent)]">\u2192</span>
                        <span className="text-[var(--color-text-muted)]">
                          {k}: <span className="text-[var(--color-text)]">{v}</span>
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Gapless Bento Grid — no border, let the grid breathe */}
        <Section title="Signal Log" desc="A cross-section of the work: firmware, red team, and the tooling in between." bordered={false}>
          <BentoGrid />
        </Section>

        {/* Projects — bordered */}
        <Section
          id="work"
          bordered
          title="Selected Work"
          desc="Open-source tools, hardware research, and agentic pentest frameworks."
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
                <ArrowUpRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </Section>

        {/* Writeups — no border for rhythm */}
        <Section
          id="writeups"
          bordered
          title="Research Notes"
          desc="Vulnerability analysis from real engagements and lab work."
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
              <ArrowUpRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Section>

        {/* Infinite Marquee — trusted tooling */}
        <Marquee />

        {/* Horizontal Accordion — research domains, bordered */}
        <Section bordered title="Research Domains" desc="Four lanes, one obsession: finding the path that was not supposed to exist.">
          <StickyStack cards={DOMAINS} />
        </Section>

        {/* Desire — pinned title + scrubbing text reveal, no border */}
        <DesireSection />

        {/* Timeline — bordered */}
        <Section bordered title="Timeline" desc="Four years of breaking and building in public.">
          <div className="mt-16">
            <Timeline items={JOURNEY} />
          </div>
        </Section>

        {/* Stack / Arsenal — no border */}
        <Stack items={STACK} title="Arsenal" />

        {/* Skills — categorized grid */}
        <Section id="skills" bordered title="Capabilities" desc="Six domains, one operator. From silicon fault injection to cloud-scale automation.">
          <div className="skills-grid">
            {SKILL_CATEGORIES.map((cat) => (
              <SkillCategory key={cat.name} {...cat} />
            ))}
          </div>
        </Section>

        {/* Contact — bordered, centered CTA */}
        <Section id="contact" bordered>
          <div className="mx-auto max-w-3xl text-center">
            <motion.h2
              className="font-display font-bold tracking-tight"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Let's Build
            </motion.h2>
            <motion.p
              className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
            >
              Open to red team engagements, vuln research collabs, and hard
              reverse-engineering work.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            >
              <ButtonGroup className="mt-8 flex-wrap justify-center gap-3">
              <Button asChild variant="primary">
                <a href="mailto:krishy2122@gmail.com">
                    <Envelope weight="bold" className="h-4 w-4" />
                  Email Me
                  <ButtonIcon>
                    <ArrowUpRight weight="bold" className="h-4 w-4" />
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
          </motion.div>
        </div>
        </Section>

        {/* Konami Easter Egg: override accent to success green while active */}
        {konamiActive && (
          <style>{`
            :root {
              --color-accent: #4af626;
              --color-accent-strong: #6cff47;
              --color-accent-glow: rgba(74,246,38,0.3);
              --color-border-accent: #4af626;
              --color-text-accent: #4af626;
            }
          `}</style>
        )}

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
        <KonamiToast active={konamiActive} />
      </main>
    </LenisProvider>
  );
}

export default App;
