import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Repos = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen bg-black text-blue-50">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-mono text-sm uppercase md:text-[10px]">
          Security researcher & tool builder
        </p>

        <h2 className="font-display text-6xl leading-[1.05] tracking-tighter text-center md:text-8xl max-w-4xl">
          Offensive <br /> Sec<b className="text-[#00d4aa]">u</b>rity
        </h2>

        <div className="about-subtext mt-10">
          <p>Security research meets practical tooling.</p>
          <p className="text-gray-400 mt-2">
            Building tools that make pentesting accessible on mobile —
            from ESP32 firmware to Termux security toolkits.
          </p>
          <p className="text-gray-400 mt-4 max-w-lg">
            Every tool starts with a question no one asked — that's where the real finding lives.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.webp"
            alt="Security research workspace with mobile pentesting tools"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Repos;
