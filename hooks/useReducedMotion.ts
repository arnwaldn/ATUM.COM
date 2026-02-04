'use client';

import { useState, useEffect } from 'react';
import { isClient } from '@/lib/utils';

/**
 * Hook to detect if user prefers reduced motion
 * Returns true if user has requested reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (!isClient) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook that returns animation properties based on reduced motion preference
 * Useful for conditionally applying animations
 */
export function useAnimationConfig() {
  const prefersReducedMotion = useReducedMotion();

  return {
    prefersReducedMotion,
    // Animation duration (0 if reduced motion)
    duration: prefersReducedMotion ? 0 : 1,
    // Spring config for Framer Motion
    spring: prefersReducedMotion
      ? { duration: 0 }
      : { type: 'spring', stiffness: 100, damping: 15 },
    // Ease for GSAP
    ease: prefersReducedMotion ? 'none' : 'power3.out',
    // Whether to enable scroll-triggered animations
    enableScrollAnimations: !prefersReducedMotion,
    // Whether to enable parallax effects
    enableParallax: !prefersReducedMotion,
  };
}

/**
 * Returns appropriate GSAP animation vars based on reduced motion
 */
export function useGSAPVars(
  normalVars: gsap.TweenVars,
  reducedVars?: gsap.TweenVars
): gsap.TweenVars {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return reducedVars || {
      ...normalVars,
      duration: 0,
      delay: 0,
      stagger: 0,
    };
  }

  return normalVars;
}
