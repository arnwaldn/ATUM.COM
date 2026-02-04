'use client';

import { useRef, useLayoutEffect, useCallback } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Custom hook for GSAP animations with automatic cleanup
 */
export function useGSAP<T extends HTMLElement = HTMLDivElement>(
  animation: (element: T, gsapInstance: typeof gsap) => gsap.core.Timeline | gsap.core.Tween | void,
  dependencies: unknown[] = []
) {
  const elementRef = useRef<T>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Create context for cleanup
    const ctx = gsap.context(() => {
      const result = animation(element, gsap);
      if (result) {
        animationRef.current = result;
      }
    }, element);

    return () => {
      ctx.revert();
      animationRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return elementRef;
}

/**
 * Hook for scroll-triggered animations
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  animationVars: gsap.TweenVars,
  scrollTriggerVars?: ScrollTrigger.Vars,
  dependencies: unknown[] = []
) {
  const elementRef = useRef<T>(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.from(element, {
        ...animationVars,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          ...scrollTriggerVars,
        },
      });
    }, element);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return elementRef;
}

/**
 * Hook for stagger animations on multiple elements
 */
export function useStaggerAnimation(
  selector: string,
  animationVars: gsap.TweenVars,
  scrollTriggerVars?: ScrollTrigger.Vars,
  dependencies: unknown[] = []
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(elements, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        ...animationVars,
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
          ...scrollTriggerVars,
        },
      });
    }, container);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return containerRef;
}

/**
 * Hook to refresh ScrollTrigger after DOM changes
 */
export function useScrollTriggerRefresh(dependencies: unknown[] = []) {
  useLayoutEffect(() => {
    // Small delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

/**
 * Hook for timeline creation with cleanup
 */
export function useTimeline(
  timelineVars?: gsap.TimelineVars,
  dependencies: unknown[] = []
) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    timelineRef.current = gsap.timeline(timelineVars);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  const addToTimeline = useCallback(
    (animation: gsap.core.Tween | gsap.core.Timeline, position?: gsap.Position) => {
      if (timelineRef.current) {
        timelineRef.current.add(animation, position);
      }
    },
    []
  );

  return { timeline: timelineRef, addToTimeline };
}
