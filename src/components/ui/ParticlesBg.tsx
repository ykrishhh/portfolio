import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  opacity: number;
  connections: number[];
}

export function ParticlesBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];
    const mouse = { x: -10000, y: -10000, active: false, px: -10000, py: -10000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 150);
      particles = [];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.1 + Math.random() * 0.25;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: 0.5 + Math.random() * 1.2,
          opacity: 0.2 + Math.random() * 0.4,
          connections: [],
        });
      }
    };

    const handleMouse = (e: MouseEvent) => {
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;

      // Motion detection for velocity-based effects
      const dx = mouse.x - mouse.px;
      const dy = mouse.y - mouse.py;
      if (Math.hypot(dx, dy) > 2) {
        // Spawn a brief bright particle at cursor position
        particles.push({
          x: mouse.x,
          y: mouse.y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          r: 1.5 + Math.random() * 2,
          opacity: 0.8,
          connections: [],
        });
        // Keep particle count bounded
        if (particles.length > 200) particles.shift();
      }
    };
    const handleLeave = () => { mouse.active = false; };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);
    document.addEventListener('mouseleave', handleLeave);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Mouse attraction (pull toward cursor)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 250 && dist > 5) {
            const force = (250 - dist) / 250 * 0.02;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
          if (dist < 60) {
            const repulse = (60 - dist) / 60 * 0.03;
            p.vx -= (dx / dist) * repulse;
            p.vy -= (dy / dist) * repulse;
          }
        }

        // Brownian motion
        p.vx += (Math.random() - 0.5) * 0.04;
        p.vy += (Math.random() - 0.5) * 0.04;

        // Friction
        p.vx *= 0.97;
        p.vy *= 0.97;

        // Speed cap
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 2) { p.vx = (p.vx / speed) * 2; p.vy = (p.vy / speed) * 2; }

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = canvas.width + 10;
        else if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        else if (p.y > canvas.height + 10) p.y = -10;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 0, ${p.opacity})`;
        ctx.fill();

        // Connection lines (proximity-based constellation)
        ctx.strokeStyle = 'rgba(0, 255, 0, 0.03)';
        ctx.lineWidth = 0.5;
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            // Brighter connections near mouse
            let alpha = 0.03;
            if (mouse.active) {
              const mx = mouse.x, my = mouse.y;
              const midX = (p.x + p2.x) / 2;
              const midY = (p.y + p2.y) / 2;
              const near = Math.hypot(midX - mx, midY - my);
              if (near < 200) alpha = 0.08 + (200 - near) / 200 * 0.12;
            }
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 255, 0, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[-2]"
    />
  );
}
