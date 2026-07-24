import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeProvider } from "./context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import World from "./components/World";
import Metrics from "./components/Metrics";
import { SkillCategory } from "./components/SkillCategory";
import { ProjectCard } from "./components/ProjectCard";
import { Timeline } from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import { SKILL_CATEGORIES as skills } from "./data/skills";
import { topRepos } from "./data/github";

function App() {
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

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    gsap.matchMedia().add("(prefers-reduced-motion: reduce)", () => {
      ScrollTrigger.getAll().forEach((t) => t.disable());
      gsap.set(
        ".animated-word, .bento-tilt_1, .bento-tilt_2, .hero-heading-top, .hero-heading-bottom, .hero-subtitle, .hero-cta",
        { opacity: 1, y: 0, clearProps: "transform" }
      );
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <main className="relative min-h-screen w-screen overflow-x-hidden">
        <NavBar />
        <Hero />
        <About />
        <Features />
        <Story />
        <World />
        <Metrics />

        {/* Skills Section — full width */}
        <section className="bg-black py-32">
          <div className="container mx-auto px-3 md:px-10">
            <p className="font-mono text-[0.7rem] font-semibold tracking-[0.12em] text-[#00d4aa] uppercase mb-12">
              expertise
            </p>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#eaeaea] mb-4">
              skills &amp; tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {skills.map((cat) => (
                <SkillCategory key={cat.name} {...cat} />
              ))}
            </div>
          </div>
        </section>

        {/* Project Cards Section */}
        <section className="bg-black py-32">
          <div className="container mx-auto px-3 md:px-10">
            <p className="font-mono text-[0.7rem] font-semibold tracking-[0.12em] text-[#00d4aa] uppercase mb-12">
              projects
            </p>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-[#eaeaea] mb-4">
              open source work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {topRepos.slice(0, 6).map((repo) => (
                <ProjectCard key={repo.name} project={repo} />
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="bg-black py-32">
          <div className="container mx-auto px-3 md:px-10">
            <p className="font-mono text-[0.7rem] font-semibold tracking-[0.12em] text-[#00d4aa] uppercase mb-12">
              history
            </p>
            <Timeline />
          </div>
        </section>

        <Contact />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
