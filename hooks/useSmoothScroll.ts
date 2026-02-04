'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { ScrollTrigger } from '@/lib/gsap';
import { prefersReducedMotion } from '@/lib/utils';

interface SmoothScrollOptions {
  lerp?: number;
  duration?: number;
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  infinite?: boolean;
}

const defaultOptions: SmoothScrollOptions = {
  lerp: 0.1,
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
};

/**
 * Custom hook for Lenis smooth scroll with GSAP ScrollTrigger integration
 */
export function useSmoothScroll(options: SmoothScrollOptions = {}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Disable smooth scroll if user prefers reduced motion
    if (prefersReducedMotion()) {
      return;
    }

    const mergedOptions = { ...defaultOptions, ...options };

    // Initialize Lenis
    const lenis = new Lenis({
      lerp: mergedOptions.lerp,
      duration: mergedOptions.duration,
      smoothWheel: mergedOptions.smoothWheel,
      wheelMultiplier: mergedOptions.wheelMultiplier,
      touchMultiplier: mergedOptions.touchMultiplier,
      infinite: mergedOptions.infinite,
    });

    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // GSAP ticker integration
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Use GSAP ticker for smoother animation
    const gsap = require('gsap').gsap;
    gsap.ticker.add(tickerCallback);

    // Disable GSAP lag smoothing for better scroll sync
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  return lenisRef;
}

/**
 * Hook to control Lenis scroll (start/stop)
 */
export function useLenisControl() {
  const lenisRef = useRef<Lenis | null>(null);

  const start = () => {
    lenisRef.current?.start();
  };

  const stop = () => {
    lenisRef.current?.stop();
  };

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
      lock?: boolean;
      onComplete?: () => void;
    }
  ) => {
    lenisRef.current?.scrollTo(target, options);
  };

  return { lenisRef, start, stop, scrollTo };
}

/**
 * Hook for scroll direction detection
 */
export function useScrollDirection() {
  const directionRef = useRef<'up' | 'down'>('down');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      directionRef.current = currentScrollY > lastScrollY.current ? 'down' : 'up';
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return directionRef;
}

/**
 * Hook to detect if scrolled past threshold
 */
export function useScrollPast(threshold: number = 100) {
  const isPastRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      isPastRef.current = window.scrollY > threshold;
    };

    handleScroll(); // Check initial state
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isPastRef;
}
