import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeProvider } from "./context/ThemeContext";
import { useKonamiCode } from "./hooks/useKonamiCode";

import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import World from "./components/World";
import Metrics from "./components/Metrics";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { SkillCategory } from "./components/SkillCategory";
import { SKILL_CATEGORIES } from "./data/skills";
import { StickyStack } from "./components/StickyStack";
import { Timeline, Stack } from "./components/Timeline";

gsap.registerPlugin(ScrollTrigger);

const RESEARCH_DOMAINS = [
  { tag: "001", img: "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Android Kernel Exploitation & Low-Level Forensics" },
  { tag: "002", img: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Cloud Infrastructure Security & Container Escape" },
  { tag: "003", img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800", title: "Firmware Reversing & Embedded System Hardening" },
  { tag: "004", img: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800", title: "AI Red-Teaming & LLM Prompt Injection" },
];

const TIMELINE_ITEMS = [
  { year: "2024", title: "Senior Security Researcher", desc: "Lead mobile kernel exploitation team. Published 3 Android CVEs." },
  { year: "2023", title: "Security Engineer", desc: "Built automated fuzzing pipeline. Discovered 12 critical vulnerabilities." },
  { year: "2022", title: "CTF Champion", desc: "1st place at HITCON CTF 2022. Specialized in pwn & reversing." },
  { year: "2021", title: "Started Research", desc: "Began Android firmware reversing. Published first writeup." },
];

const SKILL_TAGS = [
  "Android RE", "Linux Kernel", "Cloud Sec", "Firmware",
  "Exploit Dev", "Malware Analysis", "iOS RE", "Network Pentest",
  "Web3 Audit", "Bug Bounty", "CTF", "Threat Intel",
];

function App() {
  const easterEgg = useKonamiCode({ duration: 6000 });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    gsap.matchMedia().add("(prefers-reduced-motion: reduce)", () => {
      ScrollTrigger.getAll().forEach((t) => t.disable());
      gsap.set(
        ".animated-word, .bento-tilt_1, .bento-tilt_2, .hero-heading-top, .hero-heading-bottom, .hero-subtitle, .hero-cta",
        { opacity: 1, y: 0, clearProps: "transform" }
      );
    });

    return () => { lenis.destroy(); };
  }, []);

  return (
    <ThemeProvider>
      <div className="grain-overlay" />
      {easterEgg && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center">
          <span className="font-mono text-accent text-sm tracking-widest animate-pulse">
            KONAMI MODE — DEBUG CONSOLE ENABLED
          </span>
        </div>
      )}
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <NavBar />
        <Hero />

        <section className="container py-24">
          <p className="section-header">/domains</p>
          <h2 className="section-title">Research Domains</h2>
          <p className="section-desc">Active areas of offensive security research</p>
          <StickyStack cards={RESEARCH_DOMAINS} />
        </section>

        <About />

        <section className="container py-24">
          <p className="section-header">/toolkit</p>
          <h2 className="section-title">Skills & Arsenal</h2>
          <p className="section-desc">Tools, languages, and disciplines in active rotation</p>
          <div className="skills-grid">
            {SKILL_CATEGORIES.map((cat) => (
              <SkillCategory key={cat.name} {...cat} />
            ))}
          </div>
        </section>

        <Features />
        <Story />
        <World />

        <section className="container py-24">
          <p className="section-header">/experience</p>
          <h2 className="section-title">Timeline</h2>
          <p className="section-desc">Career milestones and research highlights</p>
          <div className="mt-10">
            <Timeline items={TIMELINE_ITEMS} />
          </div>
        </section>

        <Metrics />

        <section className="container py-24">
          <p className="section-header">/specialties</p>
          <h2 className="section-title">Specialties</h2>
          <Stack items={SKILL_TAGS} title="" subtitle="" />
        </section>

        <Contact />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
