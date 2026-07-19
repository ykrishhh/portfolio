import { useEffect, useState } from "react";

export function MotionHero() {
  const [reduceMotion, setReduceMotion] = useState(false);

  // Prefers reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  if (reduceMotion) {
    return (
      <div
        className="absolute inset-0 w-full"
        style={{
          background: "#0a0a14",
        }}
        role="img"
        aria-label="Hero background"
      />
    );
  }

  // Clean subtle gradient overlay — no particles, no ASCII
  return (
    <div
      className="absolute inset-0 w-full"
      style={{
        background:
          "radial-gradient(ellipse 60% 60% at 15% 15%, rgba(59,130,246,0.04) 0%, rgba(230,25,25,0.03) 40%, transparent 70%), #0a0a14",
      }}
      role="img"
      aria-label="Hero background gradient"
    />
  );
}

export default MotionHero;
