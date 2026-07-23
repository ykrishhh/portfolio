import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".story-content", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  return (
    <section id="story" ref={containerRef} className="min-h-dvh w-screen bg-black text-blue-50 py-32">
      <div className="container mx-auto px-3 md:px-10">
        <div className="flex flex-col items-center">
          <p className="font-mono text-sm uppercase text-blue-50/60">
            background
          </p>

          <h2 className="font-display text-6xl md:text-8xl tracking-tighter mt-5 text-center leading-[1.05]">
            the j<b className="text-[#00d4aa]">o</b>urney
          </h2>

          <div className="story-content mt-16 max-w-2xl text-center">
            <p className="font-sans text-lg text-blue-50/80 leading-relaxed">
              Started with Python scripts for log analysis. Found my first CVE in a forgotten service.
              Built a Termux toolkit that thousands use daily. Every finding, every tool — open source,
              peer-reviewed, mission-driven.
            </p>
            <div className="mt-12 border-t border-white/10 pt-8">
              <blockquote className="font-mono text-sm text-[#00d4aa]/80">
                "The best vulnerability is the one no one else thought to look for."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
