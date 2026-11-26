import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Variants } from 'motion/react';

gsap.registerPlugin(ScrollTrigger);

export const EDITORIAL_EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EDITORIAL_EASE,
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

export const imageRevealVariant: Variants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: EDITORIAL_EASE,
    },
  },
};

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export interface StaggeredRevealOptions {
  /** Element or selector that triggers the ScrollTrigger; defaults to first matched target. */
  trigger?: gsap.DOMTarget;
  /** Vertical slide distance in pixels before settling (default: 24). */
  y?: number;
  /** Horizontal slide distance in pixels before settling (default: 0). */
  x?: number;
  /** Starting scale before settling to 1 (default: 1). */
  scale?: number;
  /** Animation duration in seconds (default: 0.8). */
  duration?: number;
  /** Delay between staggered items in seconds (default: 0.09). */
  stagger?: number;
  /** GSAP easing function (default: 'power3.out'). */
  ease?: string;
  /** ScrollTrigger start position (default: 'top 84%'). */
  start?: string;
  /** Initial delay in seconds (default: 0). */
  delay?: number;
}

/**
 * Applies a GSAP ScrollTrigger staggered fade-and-slide reveal to text blocks,
 * feature lists, or card groups while respecting prefers-reduced-motion.
 */
export function animateStaggeredReveal(
  targets: gsap.TweenTarget,
  options: StaggeredRevealOptions = {}
): gsap.core.Tween | null {
  if (prefersReducedMotion()) return null;

  const elements = gsap.utils.toArray<HTMLElement>(targets);
  if (elements.length === 0) return null;

  const {
    trigger = elements[0],
    y = 24,
    x = 0,
    scale = 1,
    duration = 0.8,
    stagger = 0.09,
    ease = 'power3.out',
    start = 'top 84%',
    delay = 0,
  } = options;

  return gsap.from(elements, {
    y,
    x,
    scale,
    opacity: 0,
    duration,
    stagger,
    delay,
    ease,
    clearProps: 'transform,opacity',
    scrollTrigger: {
      trigger,
      start,
      once: true,
    },
  });
}

export interface StaggeredRevealGroup extends StaggeredRevealOptions {
  targets: string;
}

/**
 * React hook that registers one or more GSAP ScrollTrigger staggered reveal groups
 * scoped cleanly to a container ref with automatic cleanup.
 */
export function useStaggeredScrollReveal(
  scopeRef: RefObject<HTMLElement | null>,
  groups: StaggeredRevealGroup[],
  deps: ReadonlyArray<unknown> = []
): void {
  useEffect(() => {
    if (prefersReducedMotion() || !scopeRef.current) return;

    const ctx = gsap.context(() => {
      groups.forEach(({ targets, ...options }) => {
        animateStaggeredReveal(targets, options);
      });
    }, scopeRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
