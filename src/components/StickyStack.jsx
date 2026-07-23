import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function StickyStack({ cards }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || prefersReduced()) return undefined;

    const sections = gsap.utils.toArray(".sticky-card");
    const stInstances = [];

    sections.forEach((card, i) => {
      if (i === sections.length - 1) return;

      const nextCard = sections[i + 1];
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top top",
          end: () => `+=${nextCard.offsetHeight}`,
          pin: true,
          pinSpacing: false,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      tl.to(card, {
        scale: 0.92,
        opacity: 0.55,
        ease: "power2.out",
      });

      stInstances.push(tl.scrollTrigger);
    });

    return () => {
      stInstances.forEach((st) => st.kill());
      ScrollTrigger.getAll().forEach((st) => {
        if (wrapper.contains(st.trigger)) st.kill();
      });
    };
  }, [cards]);

  return (
    <div ref={wrapperRef} className="sticky-stack-wrapper">
      {cards.map((card, i) => (
        <div key={card.tag} className="sticky-card">
          <img src={card.img} alt={card.title} loading="lazy" />
          <span className="sticky-card__index">{card.tag}</span>
          <div className="sticky-card__label">
            <h3 className="sticky-card__title">{card.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
