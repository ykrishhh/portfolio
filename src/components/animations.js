import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Scrubbing word-by-word text reveal: each word fades 0.12 -> 1 as user scrolls */
export function useScrubText(ref, deps = []) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return undefined;

    const words = el.querySelectorAll("[data-word]");
    if (!words.length) return undefined;

    const tween = gsap.fromTo(
      words,
      { opacity: 0.12 },
      {
        opacity: 1,
        stagger: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "bottom 55%",
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
      pinSpacing: false,
    });

    return () => st.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/* Generic reveal: scale 0.85 -> 1 + fade as element enters, darken as it leaves */
export function useScrollReveal(ref, deps = []) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReduced()) return undefined;

    const tween = gsap.fromTo(
      el,
      { scale: 0.85, opacity: 0.2 },
      {
        scale: 1,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
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
