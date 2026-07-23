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
import Contact from "./components/Contact";
import Footer from "./components/Footer";

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

    // Reduced motion: disable all GSAP animations
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
        <Contact />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
