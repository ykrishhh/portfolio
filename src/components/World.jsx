import gsap from "gsap";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { Button } from "./Button";

gsap.registerPlugin(ScrollTrigger);

const points = [
  {
    title: "Find the Edge",
    description: "Vulnerabilities live in the assumptions no one questions. Edge cases aren't exceptions — they're the target.",
  },
  {
    title: "Build in the Open",
    description: "Every tool, every exploit chain, every finding published to the community. No black boxes, no secret sauce.",
  },
  {
    title: "Test in Production",
    description: "Controlled, ethical, documented. Real-world validation beats lab-perfect hypotheses.",
  },
];

const World = () => {
  const [expandedIndex, setExpandedIndex] = useState(0);

  useGSAP(() => {
    gsap.from(".principle-item", {
      scrollTrigger: {
        trigger: "#world",
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.5,
      stagger: 0.15,
      ease: "power3.out",
    });

    gsap.from(".terminal-block", {
      scrollTrigger: {
        trigger: "#world",
        start: "top 75%",
      },
      x: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
    });
  });

  return (
    <section id="world" className="bg-black py-32">
      <div className="container mx-auto px-3 md:px-10">
        <div className="flex flex-col items-center">
          <p className="font-mono text-sm uppercase text-blue-50/60">
            philosophy
          </p>

          <h2 className="font-display text-6xl md:text-8xl tracking-tighter mt-5 text-blue-50 text-center leading-[1.05]">
            the h<b className="text-[#00d4aa]">u</b>nt
          </h2>

          <div className="mt-20 flex w-full flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="relative flex w-full max-w-md flex-col gap-5">
              {points.map((point, index) => (
                <div
                  key={index}
                  className={`principle-item cursor-pointer border-b border-white/10 pb-5 transition-all duration-300 ${
                    expandedIndex === index ? "opacity-100" : "opacity-50 hover:opacity-80"
                  }`}
                  onClick={() => setExpandedIndex(index)}
                >
                  <h3 className="font-sans text-xl uppercase tracking-wider text-blue-50 md:text-2xl">
                    {point.title}
                  </h3>
                  {expandedIndex === index && (
                    <p className="mt-3 font-sans text-base text-blue-50/60">
                      {point.description}
                    </p>
                  )}
                </div>
              ))}

              <Button
                variant="primary"
                className="mt-10"
              >
                Read Writeups
              </Button>
            </div>

            <div className="terminal-block w-full max-w-md">
              <div className="bg-black border border-white/10 p-5 font-mono text-sm">
                <div className="flex gap-1.5 mb-4">
                  <span className="size-2.5 bg-red-500" />
                  <span className="size-2.5 bg-yellow-500" />
                  <span className="size-2.5 bg-green-500" />
                </div>
                <div className="space-y-1.5 text-green-400/70">
                  <p><span className="text-[#00d4aa]">$</span> sh recon.sh --target example.com</p>
                  <p className="text-blue-50/40">[+] Scanning open ports...</p>
                  <p className="text-blue-50/40">[+] Enumerating services...</p>
                  <p className="text-[#00d4aa]/80">[!] CVE-2024-XXXX detected</p>
                  <p className="text-blue-50/40">[+] Generating report...</p>
                  <p className="text-green-400">✓ Complete. 3 findings.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default World;
