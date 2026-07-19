import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  Mail,
  Menu,
  X,
  Shield,
  Cpu,
  Brain,
  Terminal,
  ExternalLink,
  Zap,
  Target,
  BookOpen,
} from "lucide-react";

function GithubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const NAV_LINKS = ["Home", "About", "Work", "Writeups", "Contact"];

const SOCIALS = [
  { name: "GitHub", url: "https://github.com/ykrishhh", icon: GithubIcon },
  { name: "X", url: "https://x.com/harry6ez", icon: XIcon },
  { name: "harrydev.one", url: "https://harrydev.one", icon: Globe },
];

const PROJECTS = [
  {
    name: "termux-security-toolkit",
    desc: "Security tools and scripts for Termux: network scanning, password auditing, and pentesting on Android.",
    stars: 5,
    url: "https://github.com/ykrishhh/termux-security-toolkit",
    icon: Terminal,
    tags: ["android", "termux", "pentesting"],
  },
  {
    name: "ESP32-HARNESS",
    desc: "Advanced ESP32 pentesting and telemetry firmware for 2.4 GHz research, RF24 experimentation, and on-device forensic capture.",
    stars: 1,
    url: "https://github.com/ykrishhh/ESP32-HARNESS",
    icon: Cpu,
    tags: ["esp32", "firmware", "iot"],
  },
  {
    name: "ou-hunt-report",
    desc: "OU.edu Red Team Hunt: 6 validated vulnerabilities with proof-of-concept exploits.",
    stars: 1,
    url: "https://github.com/ykrishhh/ou-hunt-report",
    icon: Shield,
    tags: ["red-team", "cve", "python"],
  },
  {
    name: "pypentest-ai",
    desc: "AI-assisted Python pentesting: exploit analysis and vulnerability detection for reconnaissance.",
    stars: 0,
    url: "https://github.com/ykrishhh/pypentest-ai",
    icon: Brain,
    tags: ["ai", "pentesting", "python"],
  },
  {
    name: "HarryPanel",
    desc: "Advanced web hosting control panel: server management, database admin, file manager, and deployment tools.",
    stars: 1,
    url: "https://github.com/ykrishhh/HarryPanel",
    icon: Terminal,
    tags: ["flask", "devops", "hosting"],
  },
  {
    name: "android-rooting-masterclass",
    desc: "Complete guide to Android rooting and hooking, from user-space DEX editing to Xposed and KernelSU.",
    stars: 1,
    url: "https://github.com/ykrishhh/android-rooting-masterclass",
    icon: Shield,
    tags: ["android", "frida", "kernel"],
  },
];

const WRITEUPS = [
  {
    title: "ESP32 BLE Attack Vectors",
    desc: "Recon, over-the-air exploitation, and payload injections on ESP32 Bluetooth Low Energy.",
    url: "https://harrydev.one/blog/esp32-ble-attack",
    icon: Cpu,
  },
  {
    title: "Android Root Security Bypass",
    desc: "Bypassing modern attestation models using custom eBPF hooks.",
    url: "https://harrydev.one/blog/android-rooting-deep-dive",
    icon: Shield,
  },
  {
    title: "Binary Reverse Engineering",
    desc: "Advanced CTF disassembly walkthroughs and assembly analysis.",
    url: "https://harrydev.one/blog/ctf-reverse-engineering",
    icon: Terminal,
  },
];

const STACK = [
  "Python",
  "C",
  "TypeScript",
  "Bash",
  "Linux",
  "ESP32",
  "Android",
  "Frida",
  "eBPF",
  "React",
  "FastAPI",
  "LangChain",
];

const JOURNEY = [
  {
    year: "2022",
    title: "Started Security Research",
    desc: "Deep dive into offensive security, CTF competitions, and vulnerability research.",
    icon: Target,
  },
  {
    year: "2023",
    title: "Hardware Hacking & ESP32",
    desc: "Built custom firmware for wireless auditing and IoT security research.",
    icon: Cpu,
  },
  {
    year: "2024",
    title: "AI-Powered Pentesting",
    desc: "Developed autonomous security tools using local LLMs and agentic pipelines.",
    icon: Brain,
  },
  {
    year: "2025",
    title: "Red Team Engagements",
    desc: "OU.edu Red Team Hunt: 6 validated vulnerabilities with full PoC chain.",
    icon: Zap,
  },
  {
    year: "2026",
    title: "Building in Public",
    desc: "Open-sourcing tools, writing deep-dive research, and mentoring new researchers.",
    icon: BookOpen,
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] font-sans text-white">
      {/* subtle drift mesh, matches writeups.harrydev.one */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(40% 40% at 20% 20%, rgba(78,133,191,0.18), transparent 60%), radial-gradient(35% 35% at 80% 30%, rgba(137,170,204,0.14), transparent 60%), radial-gradient(45% 45% at 50% 90%, rgba(78,133,191,0.10), transparent 60%)",
          filter: "blur(20px)",
        }}
      />
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "70% center" }}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_204221_5339e40b-e73d-4ab0-9c65-79c18c66fd50.mp4"
        />

        {/* Navbar */}
        <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
          <a
            href="#"
            className="text-lg font-semibold tracking-tight text-white sm:text-xl"
          >
            KRISH
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-white/80 transition-colors hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>

          <a
            href="mailto:krishy2122@gmail.com"
            className="hidden rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition-transform hover:scale-105 md:block"
          >
            Let&apos;s Connect
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center active:scale-90 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`absolute transition-all duration-300 ${
                mobileMenuOpen
                  ? "rotate-90 scale-0 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
            >
              <Menu className="h-6 w-6 text-white" />
            </span>
            <span
              className={`absolute transition-all duration-300 ${
                mobileMenuOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-90 scale-0 opacity-0"
              }`}
            >
              <X className="h-6 w-6 text-white" />
            </span>
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`absolute inset-x-0 top-0 z-20 overflow-hidden bg-black/98 backdrop-blur-xl transition-[height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen
              ? "h-screen opacity-100"
              : "pointer-events-none h-0 opacity-0"
          }`}
        >
          <div className="flex h-full flex-col justify-center px-8">
            <div
              className={`transition-all duration-500 delay-100 ${
                mobileMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mb-6 block text-3xl font-medium text-white/90 transition-colors hover:text-white"
                >
                  {link}
                </a>
              ))}
              <div className="mt-8 flex gap-4">
                {SOCIALS.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/50 hover:text-white"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
          <div className="max-w-3xl">
            <p
              className="mb-4 text-xs text-white/90 sm:mb-6 sm:text-sm"
              style={{ animation: "fadeSlideUp 0.8s ease 0.2s both" }}
            >
              Security Engineer &amp; AI Researcher
            </p>
            <h1
              className="font-display text-4xl italic leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
              style={{ animation: "fadeSlideUp 0.8s ease 0.4s both" }}
            >
              Security work
              <br />
              across hardware
              <br />
              and software.
            </h1>
          </div>

          <div>
            <p
              className="mb-5 max-w-sm text-sm leading-relaxed text-white/60 sm:mb-6 sm:max-w-lg sm:text-base md:text-lg"
              style={{ animation: "fadeSlideUp 0.8s ease 0.7s both" }}
            >
              Offensive security, hardware hacking, and autonomous AI, from bare
              metal to agentic pipelines.
            </p>
            <div
              className="flex flex-wrap items-center gap-3"
              style={{ animation: "fadeSlideUp 0.8s ease 0.9s both" }}
            >
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-105 sm:px-6 sm:py-3"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#writeups"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-white/50 hover:text-white sm:px-6 sm:py-3"
              >
                Read Writeups
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-24 md:px-12 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs text-white/50 sm:text-sm">About</p>
              <h2 className="mb-6 font-display text-4xl italic tracking-tight sm:text-5xl md:text-6xl">
                Krishna
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-white/60 sm:text-base">
                <p>
                  Security engineer focused on offensive security, hardware
                  hacking, and building autonomous AI systems. I break things to
                  understand how they work, then build them stronger.
                </p>
                <p>
                  ESP32 firmware fuzzing, multi-agent pentest pipelines, and Android
                  attestation research. The work runs from kernel to cloud.
                </p>
                <p>
                  Currently building open-source security tools, writing deep-dive
                  research writeups, and exploring how local LLMs can automate
                  vulnerability research.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
                <p className="mb-4 text-xs text-white/40">Quick Facts</p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-white/30">→</span>
                    <span className="text-white/70">
                      Location: <span className="text-white">India</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/30">→</span>
                    <span className="text-white/70">
                      Focus:{" "}
                      <span className="text-white">
                        OffSec · Hardware · AI
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/30">→</span>
                    <span className="text-white/70">
                      Workspace:{" "}
                      <span className="text-white">
                        Linux (Termux) on Android
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/30">→</span>
                    <span className="text-white/70">
                      Active since:{" "}
                      <span className="text-white">2022</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="border-t border-white/10 px-6 py-24 md:px-12 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs text-white/50 sm:text-sm">Timeline</p>
          <h2 className="mb-12 font-display text-4xl italic tracking-tight sm:text-5xl md:text-6xl">
            Journey
          </h2>

          <div className="relative space-y-8">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/10 md:left-1/2" />

            {JOURNEY.map((j, i) => (
              <div
                key={j.year}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-[15px] z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black md:left-1/2 md:-translate-x-1/2">
                  <j.icon className="h-4 w-4 text-white/60" />
                </div>

                {/* Content */}
                <div
                  className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <span className="text-xs text-white/30">{j.year}</span>
                  <h3 className="mt-1 text-base font-medium text-white">
                    {j.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/50">
                    {j.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="work" className="border-t border-white/10 px-6 py-24 md:px-12 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs text-white/50 sm:text-sm">
            Featured Work
          </p>
          <h2 className="mb-4 font-display text-4xl italic tracking-tight sm:text-5xl md:text-6xl">
            Projects
          </h2>
          <p className="mb-12 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base">
            Open-source security tools, hardware research, and AI-powered
            pentesting frameworks.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25 hover:bg-white/[0.05]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                    <p.icon className="h-5 w-5 text-white/70" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/30 transition-colors group-hover:text-white/70" />
                </div>
                <h3 className="mb-2 text-base font-medium text-white">
                  {p.name}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-white/50">
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white/5 px-2 py-1 text-xs text-white/40"
                    >
                      {t}
                    </span>
                  ))}
                  {p.stars > 0 && (
                    <span className="ml-auto text-xs text-white/30">
                      ★ {p.stars}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8">
            <a
              href="https://github.com/ykrishhh?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              View all repos on GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Writeups Section */}
      <section
        id="writeups"
        className="border-t border-white/10 px-6 py-24 md:px-12 lg:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs text-white/50 sm:text-sm">
            Deep Dives
          </p>
          <h2 className="mb-4 font-display text-4xl italic tracking-tight sm:text-5xl md:text-6xl">
            Writeups
          </h2>
          <p className="mb-12 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base">
            Technical research and vulnerability analysis from real-world
            engagements.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WRITEUPS.map((w) => (
              <a
                key={w.title}
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/25 hover:bg-white/[0.05]"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                  <w.icon className="h-5 w-5 text-white/70" />
                </div>
                <h3 className="mb-2 text-base font-medium text-white">
                  {w.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-white/50">
                  {w.desc}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs text-white/40 transition-colors group-hover:text-white/70">
                  Read on harrydev.one
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </a>
            ))}
          </div>

          <div className="mt-8">
            <a
              href="https://harrydev.one"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              Browse all writeups
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Stack Section */}
      <section className="border-t border-white/10 px-6 py-24 md:px-12 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs text-white/50 sm:text-sm">
            Tech Stack
          </p>
          <h2 className="mb-8 font-display text-4xl italic tracking-tight sm:text-5xl md:text-6xl">
            Arsenal
          </h2>
          <div className="flex flex-wrap gap-3">
            {STACK.map((s) => (
              <span
                key={s}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/60"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-white/10 px-6 py-24 md:px-12 lg:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl italic tracking-tight sm:text-5xl md:text-6xl">
            Let&apos;s work on
            <br />
            something useful.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base">
            Open to security research collaborations, pentesting engagements,
            and building autonomous systems together.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="mailto:krishy2122@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-105"
            >
              <Mail className="h-4 w-4" />
              Get in Touch
            </a>
            <a
              href="https://github.com/ykrishhh"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/50 hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="border-t border-white/10 px-6 py-24 md:px-12 lg:px-16"
      >
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs text-white/50 sm:text-sm">
            Get in Touch
          </p>
          <h2 className="mb-4 font-display text-4xl italic tracking-tight sm:text-5xl md:text-6xl">
            Contact
          </h2>
          <p className="mb-8 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base">
            Open to collaborations, security research, and building cool things
            together.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:krishy2122@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-105"
            >
              <Mail className="h-4 w-4" />
              krishy2122@gmail.com
            </a>
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/50 hover:text-white"
              >
                <s.icon className="h-4 w-4" />
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 md:px-12 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/30">
            © 2026 Krishna.
          </p>
          <p className="text-xs text-white/30">
            India • Offensive Security • Hardware/IoT • Autonomous AI
          </p>
        </div>
      </footer>
    </div>
  );
}
