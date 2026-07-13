import { useEffect, useState } from 'react';

interface DeviceCapability {
  isLowEnd: boolean;
  isReducedMotion: boolean;
  /** Duration multiplier (1 = normal, 0.5 = half speed on low-end) */
  speedMultiplier: number;
}

/**
 * Detects low-end devices (≤2GB RAM, ≤4 CPU cores, or prefers-reduced-motion).
 * Returns a speed multiplier to shorten / skip expensive animations.
 */
export function useDeviceAdaptation(): DeviceCapability {
  const [state, setState] = useState<DeviceCapability>({
    isLowEnd: false,
    isReducedMotion: false,
    speedMultiplier: 1,
  });

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mem = (navigator as any).deviceMemory;
    const cores = navigator.hardwareConcurrency;
    const isLowMem = mem !== undefined && mem <= 2;
    const isFewCores = cores <= 4;
    const isLowEnd = (isLowMem || (mem === undefined && isFewCores));
    const isReducedMotion = mql.matches;

    setState({
      isLowEnd,
      isReducedMotion,
      speedMultiplier: isLowEnd || isReducedMotion ? 0.5 : 1,
    });

    const handler = () =>
      setState((s) => ({ ...s, isReducedMotion: mql.matches, speedMultiplier: mql.matches ? 0.5 : s.speedMultiplier }));
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return state;
}
