"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }) {
  const lenisRef = useRef(null);
  const [_isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: !prefersReducedMotion,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Single driver: GSAP ticker drives Lenis (prevents double-rAF conflicts)
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Force a resize after first paint so Lenis captures correct dimensions
    requestAnimationFrame(() => lenis.resize());

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    lenis.on("scroll", ScrollTrigger.update);

    setIsReady(true);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  return <>{children}</>;
}

export function useLenis() {
  return lenisRef.current;
}