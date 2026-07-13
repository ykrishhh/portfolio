import { useEffect, useRef } from 'react';
import { throttle } from '../../utils/throttle';

/**
 * Enhanced cursor glow with trailing particles.
 * Deferred ring follows the cursor with spring-like motion.
 * Automatically disables on touch devices to avoid visual clutter.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -200, y: -200, tx: -200, ty: -200 });
  const trailPosRef = useRef({ x: -200, y: -200 });

  // Don't render on touch devices
  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    if (isTouchDevice) return;
    const glow = glowRef.current;
    const trail = trailRef.current;
    if (!glow || !trail) return;

    let animId: number;

    // Cursor trail particles
    const trailContainer = document.createElement('div');
    trailContainer.className = 'fixed inset-0 pointer-events-none z-[100]';
    trailContainer.style.opacity = '0.5';
    document.body.appendChild(trailContainer);

    const trailParticles: HTMLDivElement[] = [];
    const MAX_TRAIL = 20;

    const handleMouse = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      // Spawn trailing particle (throttled via the wrapper)
      if (trailParticles.length >= MAX_TRAIL) {
        const oldest = trailParticles.shift()!;
        trailContainer.removeChild(oldest);
      }
      const dot = document.createElement('div');
      dot.style.cssText = `
        position: absolute;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background: rgba(0, 255, 0, 0.3);
        transform: translate(-50%, -50%);
        transition: all 1.2s cubic-bezier(0,0,0.2,1);
        pointer-events: none;
      `;
      trailContainer.appendChild(dot);
      trailParticles.push(dot);

      // Animate fading
      requestAnimationFrame(() => {
        dot.style.opacity = '0';
        dot.style.transform = `translate(${(Math.random() - 0.5) * 60}px, ${(Math.random() - 0.5) * 60}px) scale(0.1)`;
        setTimeout(() => {
          if (dot.parentNode) dot.parentNode.removeChild(dot);
        }, 1200);
      });
    };
    const throttledMouse = throttle(handleMouse, 50);

    window.addEventListener('mousemove', throttledMouse);

    // Smooth follower animation
    const animate = () => {
      const p = posRef.current;
      // Spring toward target
      p.tx += (p.x - p.tx) * 0.08;
      p.ty += (p.y - p.ty) * 0.08;

      // Trail ring with more lag
      trailPosRef.current.x += (p.tx - trailPosRef.current.x) * 0.04;
      trailPosRef.current.y += (p.ty - trailPosRef.current.y) * 0.04;

      glow.style.transform = `translate(${p.tx - 100}px, ${p.ty - 100}px)`;
      trail.style.transform = `translate(${trailPosRef.current.x - 60}px, ${trailPosRef.current.y - 60}px)`;

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', throttledMouse);
      trailContainer.remove();
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-[99]"
        style={{
          width: '200px', height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,255,0,0.06) 0%, transparent 70%)',
          transition: 'none',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
      <div
        ref={trailRef}
        className="fixed pointer-events-none z-[98]"
        style={{
          width: '120px', height: '120px',
          borderRadius: '50%',
          border: '1px solid rgba(0,255,0,0.06)',
          background: 'radial-gradient(circle, rgba(0,255,0,0.02) 0%, transparent 60%)',
          transition: 'none',
          willChange: 'transform',
        }}
        aria-hidden="true"
      />
    </>
  );
}
