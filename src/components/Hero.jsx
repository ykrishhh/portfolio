import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  const handleVideoLoad = () => {
    setLoading(false);
  };

  useGSAP(() => {
    // Entrance sequence — stagger text before scroll takes over
    const entranceTl = gsap.timeline({ delay: 0.3 });
    entranceTl
      .from(".hero-heading-top", { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" })
      .from(".hero-heading-bottom", { y: 40, opacity: 0, duration: 0.9, ease: "power3.out" }, "-=0.5")
      .from(".hero-subtitle", { y: 20, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .from(".hero-cta", { y: 15, opacity: 0, duration: 0.5, ease: "power3.out" }, "-=0.2");

    // Ken Burns — slow zoom on video during scroll
    gsap.to(videoRef.current, {
      scale: 1.15,
      scrollTrigger: {
        trigger: "#hero-frame",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // Scroll-driven frame expansion
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-frame",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
      },
    });

    tl.to("#hero-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0%",
      width: "100vw",
      height: "100vh",
      ease: "power1.inOut",
    }, 0);

    tl.to(".hero-heading-top", {
      y: -200,
      opacity: 0,
      ease: "power1.inOut",
    }, 0);

    tl.to(".hero-heading-bottom", {
      y: 200,
      opacity: 0,
      ease: "power1.inOut",
    }, 0);
  });

  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-black text-blue-75">
      {/* Loading spinner */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-black">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Background text (behind video frame) */}
      <div className="absolute left-0 top-0 z-0 flex size-full flex-col justify-between p-10 px-5 sm:px-10">
        <h1 className="special-font hero-heading hero-heading-top pointer-events-none z-0 mt-16 text-blue-75 opacity-50">
          SEC<b>U</b>RE
        </h1>
        <h1 className="special-font hero-heading hero-heading-bottom pointer-events-none z-0 text-right text-blue-75 opacity-50">
          SYST<b>E</b>MS
        </h1>
      </div>

      {/* Video frame with clip-path */}
      <div
        id="hero-frame"
        className="relative z-10 mx-auto mt-20 flex h-[70vh] w-[80vw] flex-col items-center justify-center overflow-hidden rounded-3xl bg-transparent sm:h-[80vh] sm:w-[90vw]"
        style={{ clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)" }}
      >
        {/* Video with Ken Burns */}
        <video
          ref={videoRef}
          src="https://cdn.guildfi.com/video/upload/v1755844035/zentry/F1_Updated.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute left-0 top-0 size-full object-cover object-center"
          onLoadedData={handleVideoLoad}
          style={{ willChange: "transform" }}
        />

        {/* Vignette overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)",
          }}
        />

        {/* Film grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20 opacity-[0.04] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
          }}
        />

        {/* Bottom gradient fade */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 z-20 h-1/3 w-full"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
          }}
        />

        {/* Foreground text */}
        <div className="absolute left-0 top-0 z-30 flex size-full flex-col justify-between p-10 px-5 sm:px-10">
          <div className="flex w-full justify-between">
            <h1 className="special-font hero-heading hero-heading-top text-blue-75">
              SEC<b>U</b>RE
            </h1>
          </div>

          <div className="hero-subtitle z-30 max-w-sm font-robert-regular text-sm text-blue-100 sm:text-base mt-20 md:mt-0">
            Krish - Security Researcher & Developer <br /> Digging into Android kernels, ESP32 firmware, and web vulnerabilities to secure the digital landscape.
          </div>

          <div className="hero-cta z-30">
            <a
              href="https://github.com/ykrishhh"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-block overflow-hidden rounded-full border border-white/20 bg-white/5 px-6 py-3 font-general text-xs uppercase tracking-widest text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10"
            >
              <span className="relative z-10">View GitHub</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </a>
          </div>

          <h1 className="special-font hero-heading hero-heading-bottom text-right text-blue-75">
            SYST<b>E</b>MS
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
