import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { SkillCategory } from "./SkillCategory";
import { SKILL_CATEGORIES } from "../data/skills";

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  useGSAP(() => {
    gsap.from(".skill-category", {
      scrollTrigger: {
        trigger: "#features",
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
    });
  });

  return (
    <section id="features" className="bg-black py-32">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-mono text-sm uppercase text-blue-50/60">
            Skills & Projects
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-tighter text-blue-50 mt-2 max-w-2xl">
            Tools &<br /> Specialties
          </h2>
          <p className="font-sans text-base text-blue-50/50 mt-4 max-w-md">
            Open source tools for pentesting, firmware analysis, and
            ethical hacking — built for the Termux and ESP32 ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5">
          {SKILL_CATEGORIES.map((cat) => (
            <SkillCategory key={cat.name} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
