import { useEffect, useRef } from 'react';
import { throttle, debounce } from '../../utils/throttle';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/**
 * Canvas-based 3D wireframe torus knot.
 * Pure math — no Three.js dependency.
 * Rotates continuously and responds to mouse velocity.
 */

interface Point3D {
  x: number; y: number; z: number;
}

interface Projected {
  x: number; y: number;
}

export function Hero3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const timeRef = useRef(0);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const points: Projected[] = [];
    let px = 0, py = 0;

    const resize = () => {
      canvas.width = Math.min(480, window.innerWidth * 0.8);
      canvas.height = canvas.width;
    };
    const resizeDebounced = debounce(resize, 150);

    window.addEventListener('resize', resizeDebounced);
    resize();

    const computeTorusKnot = (t: number, u: number, p: number, q: number, R: number, r: number): Point3D => {
      const cu = Math.cos(u);
      const su = Math.sin(u);
      const quv = q * u;
      const pqv = p * u;
      const x = (R + r * Math.cos(pqv)) * Math.cos(quv);
      const y = (R + r * Math.cos(pqv)) * Math.sin(quv);
      const z = r * Math.sin(pqv);
      return { x, y, z };
    };

    const project = (p: Point3D, angleX: number, angleY: number, zoom: number): Projected => {
      const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
      const x1 = p.x * cosY - p.z * sinY;
      const z1 = p.x * sinY + p.z * cosY;
      const cosX = Math.cos(angleX), sinX = Math.sin(angleX);
      const y1 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;
      const fov = zoom / (zoom + z2);
      return { x: x1 * fov, y: y1 * fov };
    };

    const R = 1.8;
    const r = 0.7;
    const p = 2;
    const q = 3;
    const segments = 30;
    const rings = 20;

    if (prefersReduced) {
      // Static single frame — no animation, no mouse tracking
      resize();
      const w = canvas.width / 2;
      const h = canvas.height / 2;
      const zoom = 240;
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.15)';
      for (let i = 0; i < rings; i++) {
        const u = (i / rings) * Math.PI * 2;
        ctx.beginPath();
        for (let j = 0; j <= segments; j++) {
          const t = (j / segments) * Math.PI * 2;
          const pt3 = computeTorusKnot(t, u, p, q, R, r);
          const proj = project(pt3, 0.5, 0.35, zoom);
          const sx = proj.x * zoom + w;
          const sy = proj.y * zoom + h;
          if (j === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }
      for (let i = 0; i < segments; i++) {
        const t = (i / segments) * Math.PI * 2;
        ctx.beginPath();
        for (let j = 0; j <= rings; j++) {
          const u = (j / rings) * Math.PI * 2;
          const pt3 = computeTorusKnot(t, u, p, q, R, r);
          const proj = project(pt3, 0.5, 0.35, zoom);
          const sx = proj.x * zoom + w;
          const sy = proj.y * zoom + h;
          if (j === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }
      return;
    }

    // --- Normal animated path ---

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left - canvas.width / 2) / canvas.width;
      const my = (e.clientY - rect.top - canvas.height / 2) / canvas.height;
      mouseRef.current.vx = mx - mouseRef.current.x;
      mouseRef.current.vy = my - mouseRef.current.y;
      mouseRef.current.x = mx;
      mouseRef.current.y = my;
    };
    const throttledMouse = throttle(handleMouse, 50);
    canvas.addEventListener('mousemove', throttledMouse);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width / 2;
      const h = canvas.height / 2;

      const mx = mouseRef.current.x * 1.5;
      const my = mouseRef.current.y * 1.5;
      mouseRef.current.vx *= 0.92;
      mouseRef.current.vy *= 0.92;

      timeRef.current += 0.005;
      const angleX = timeRef.current + my * 0.5 + mouseRef.current.vy * 2;
      const angleY = timeRef.current * 0.7 + mx * 0.5 + mouseRef.current.vx * 2;

      const zoom = 240;

      ctx.strokeStyle = 'rgba(0, 255, 0, 0.15)';

      for (let i = 0; i < rings; i++) {
        const u = (i / rings) * Math.PI * 2;
        ctx.beginPath();
        for (let j = 0; j <= segments; j++) {
          const t = (j / segments) * Math.PI * 2;
          const pt3 = computeTorusKnot(t, u, p, q, R, r);
          const proj = project(pt3, angleX, angleY, zoom);
          const sx = proj.x * zoom + w;
          const sy = proj.y * zoom + h;
          if (j === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      for (let i = 0; i < segments; i++) {
        const t = (i / segments) * Math.PI * 2;
        ctx.beginPath();
        for (let j = 0; j <= rings; j++) {
          const u = (j / rings) * Math.PI * 2;
          const pt3 = computeTorusKnot(t, u, p, q, R, r);
          const proj = project(pt3, angleX, angleY, zoom);
          const sx = proj.x * zoom + w;
          const sy = proj.y * zoom + h;
          if (j === 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      for (let i = 0; i < rings; i += 2) {
        const u = (i / rings) * Math.PI * 2;
        for (let j = 0; j < segments; j += 2) {
          const t = (j / segments) * Math.PI * 2;
          const pt3 = computeTorusKnot(t, u, p, q, R, r);
          const proj = project(pt3, angleX, angleY, zoom);
          const sx = proj.x * zoom + w;
          const sy = proj.y * zoom + h;
          const dx = sx - canvas.width / 2;
          const dy = sy - canvas.height / 2;
          const dist = Math.hypot(dx - mx * 200, dy - my * 200);
          if (dist < 80) {
            ctx.beginPath();
            ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 0, ${0.6 - dist / 130})`;
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeDebounced);
      if (!prefersReduced) {
        canvas.removeEventListener('mousemove', throttledMouse);
      }
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-[480px] mx-auto"
      style={{ opacity: 0.6, filter: 'drop-shadow(0 0 40px rgba(0,255,0,0.08))' }}
      aria-hidden="true"
    />
  );
}
