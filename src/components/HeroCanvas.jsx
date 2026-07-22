import { useEffect, useRef } from "react";

/**
 * HeroCanvas — threat-intel node network with scanning sonar.
 *  - 64 nodes, pointer-parallax, teal accent (#00d4aa)
 *  - Sonar pulse expands every 3s from canvas center
 *  - Lenis-driven scroll radius (hero expands node reach as you scroll away)
 *  - Honors prefers-reduced-motion (one static frame)
 */
export function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-accent")
      .trim() || "#00d4aa";

    let width = 0;
    let height = 0;
    let dpr = 1;
    let nodes = [];
    let rafId = 0;
    let scrollY = 0;
    let lastSonar = 0; // ms timestamp
    let sonarRadius = 0;
    let sonarAlpha = 0;

    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const NODE_COUNT = 72;
    const LINK_DIST_BASE = 140;
    const SONAR_PERIOD_MS = 3000;
    const SONAR_MAX_RADIUS = 720;
    const SONAR_SPEED_PX_PER_S = 260;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.8,
      }));
    }

    function draw(now) {
      ctx.clearRect(0, 0, width, height);

      // pointer parallax (eased)
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      const px = (pointer.x - 0.5) * 26;
      const py = (pointer.y - 0.5) * 26;

      // scroll-driven reach (Lenis hands us scrollY; falls back to window scroll)
      const reach = Math.min(1, scrollY / 600); // 0..1 across first 600px
      const linkDist = LINK_DIST_BASE + reach * 90;

      if (!prefersReduced && lastSonar > 0) {
        const dt = (now - lastSonar) / 1000;
        sonarRadius += dt * SONAR_SPEED_PX_PER_S;
        sonarAlpha = Math.max(0, 1 - sonarRadius / SONAR_MAX_RADIUS) * 0.5;
        if (sonarRadius > SONAR_MAX_RADIUS) {
          sonarRadius = 0;
          sonarAlpha = 0.55; // restart strong
          lastSonar = now;
        }
      }

      // ping sonar ring from right-of-center origin
      if (sonarAlpha > 0 && !prefersReduced) {
        const ox = width * 0.72;
        const oy = height * 0.4;
        ctx.beginPath();
        ctx.arc(ox, oy, sonarRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `color-mix(in srgb, ${accent} ${Math.round(
          sonarAlpha * 100
        )}%, transparent)`;
        ctx.lineWidth = 1.25;
        ctx.stroke();

        // inner soft glow
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, sonarRadius);
        g.addColorStop(0, `color-mix(in srgb, ${accent} 18%, transparent)`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(ox, oy, sonarRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // links
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!prefersReduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
        }
        const x = n.x + px;
        const y = n.y + py;

        // proximity to pointer boosts node brightness for humans
        const dpx = x - (pointer.x * width);
        const dpy = y - (pointer.y * height);
        const pd = Math.hypot(dpx, dpy);
        const pb = Math.max(0, 1 - pd / 260);
        const baseFill = 0.55 + pb * 0.4;
        const linkAlphaBase = 0.32 + pb * 0.12;

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const mx = m.x + px;
          const my = m.y + py;
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * linkAlphaBase;
            ctx.strokeStyle = `color-mix(in srgb, ${accent} ${Math.round(
              alpha * 100
            )}%, transparent)`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }

        ctx.fillStyle = `color-mix(in srgb, ${accent} ${Math.round(
          baseFill * 100
        )}%, transparent)`;
        ctx.beginPath();
        ctx.arc(x, y, n.r + pb * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!prefersReduced) rafId = requestAnimationFrame(draw);
    }

    function onPointer(e) {
      pointer.tx = e.clientX / window.innerWidth;
      pointer.ty = e.clientY / window.innerHeight;
    }

    function onScroll() {
      scrollY = window.scrollY || window.pageYOffset || 0;
    }

    resize();
    lastSonar = performance.now();
    rafId = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
