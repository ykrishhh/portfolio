import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Scrubbing text reveal: entire element fades in on scroll */
export function useScrubText(ref, deps = []) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return undefined;

    const tween = gsap.fromTo(
      el,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "top 45%",
          scrub: true,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* Pin a title block on the left while a gallery scrolls on the right */
export function usePinGallery(pinRef, containerRef, deps = []) {
  useEffect(() => {
    const pin = pinRef.current;
    const container = containerRef.current;
    if (!pin || !container || prefersReduced()) return undefined;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top 18%",
      end: "bottom 85%",
      pin,
      pinSpacing: true,
    });

    return () => st.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* Generic reveal: scale 0.85 -> 1 + fade as element enters, darken as it leaves */
/* Unused — kept for reference */

/* Hero reveal choreography — adds `.hero-revealed` to the hero <section> once,
 * after fonts are ready. Honors prefers-reduced-motion (CSS skips animation). */
export function useHeroChoreography(heroRef, deps = []) {
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return undefined;
    if (document.querySelector(".hero-shell.hero-revealed")) return undefined;

    const trigger = () => {
      el.classList.add("hero-revealed");
    };

    if (document.fonts && typeof document.fonts.ready?.then === "function") {
      document.fonts.ready.then(trigger);
    } else {
      requestAnimationFrame(trigger);
    }
    // Hard fallback in case fonts.ready hangs
    const t = window.setTimeout(trigger, 1200);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
