import { useEffect, useRef, useCallback } from 'react';

interface TiltConfig {
  maxTilt?: number;     // degrees (default 8)
  perspective?: number; // px (default 1000)
  scale?: number;       // hover scale (default 1.02)
  speed?: number;       // transition ms (default 300)
  resetOnLeave?: boolean;
}

export function useTiltEffect<T extends HTMLElement>(config: TiltConfig = {}) {
  const ref = useRef<T>(null);
  const { maxTilt = 8, perspective = 1000, scale = 1.02, speed = 300, resetOnLeave = true } = config;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    el.style.transform = `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale},${scale},${scale})`;
  }, [maxTilt, perspective, scale]);

  const handleMouseLeave = useCallback(() => {
    if (!resetOnLeave || !ref.current) return;
    ref.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
  }, [perspective, resetOnLeave]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.transition = `transform ${speed}ms cubic-bezier(.03,.98,.52,.99)`;
    el.style.transformStyle = 'preserve-3d';
    el.style.willChange = 'transform';

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, speed]);

  return ref;
}
