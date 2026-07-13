import { type Variants } from 'motion/react';

/**
 * Motion tokens v4.2 — single source of truth for all animations.
 */
export const tokens = {
  duration: {
    instant: 0.1,
    fast: 0.18,
    normal: 0.35,
    slow: 0.6,
  },
  easing: {
    smooth: [0.22, 1, 0.36, 1] as [number, number, number, number],
    sharp: [0.4, 0, 0.2, 1] as [number, number, number, number],
    bounce: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  },
  distance: {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
  },
} as const;

/**
 * Device adaptation — shorter durations on low-end devices.
 */
export function useReducedDurations() {
  const isLowEnd =
    typeof navigator !== 'undefined' &&
    (((navigator as any).deviceMemory !== undefined && (navigator as any).deviceMemory <= 2) ||
    ((navigator as any).deviceMemory === undefined && navigator.hardwareConcurrency <= 4));

  return isLowEnd
    ? { instant: 0, fast: 0.1, normal: 0.15, slow: 0.25 }
    : tokens.duration;
}

/**
 * Shared variants used across sections.
 */

/** Fade + slide up entrance */
export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: tokens.duration.normal, ease: tokens.easing.smooth },
  },
};

/** Fade in only (no slide) */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: tokens.duration.normal, ease: tokens.easing.smooth },
  },
};

/** Stagger container — use as `variants` on the parent */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

/** Stagger item — use as `variants` on each child inside staggerContainer */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: tokens.duration.normal, ease: tokens.easing.smooth },
  },
};

/** Scale-in for cards */
export const cardReveal: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: tokens.duration.normal, ease: tokens.easing.smooth },
  },
};

/** Shared layout transition defaults */
export const layoutTransition = {
  duration: tokens.duration.normal,
  ease: tokens.easing.smooth,
};
