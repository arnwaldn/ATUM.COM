'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Global GSAP configuration
gsap.config({
  nullTargetWarn: false,
});

// ScrollTrigger configuration
ScrollTrigger.config({
  ignoreMobileResize: true,
});

// Set global defaults for GSAP animations
// immediateRender: false is critical for Lenis smooth scroll compatibility
gsap.defaults({
  ease: 'power3.out',
});

// Clip-path morphing patterns (OnScrollShapeMorph style)
export const clipPathPatterns = {
  // Rectangle to vertical line
  rectangleToLine: {
    step1: {
      initial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      final: 'polygon(50% 0%, 50% 50%, 50% 50%, 50% 100%)',
    },
    step2: {
      initial: 'polygon(50% 50%, 50% 0%, 50% 100%, 50% 50%)',
      final: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    },
  },
  // Rectangle to horizontal line
  rectangleToHorizontalLine: {
    step1: {
      initial: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      final: 'polygon(40% 50%, 60% 50%, 80% 50%, 20% 50%)',
    },
    step2: {
      initial: 'polygon(20% 50%, 80% 50%, 60% 50%, 40% 50%)',
      final: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    },
  },
  // Decagon morph
  decagon: {
    step1: {
      initial: 'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)',
      final: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
    },
    step2: {
      initial: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)',
      final: 'polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)',
    },
  },
  // Circle morph
  circle: {
    step1: {
      initial: 'circle(50% at 50% 50%)',
      final: 'circle(0% at 50% 50%)',
    },
    step2: {
      initial: 'circle(0% at 50% 50%)',
      final: 'circle(50% at 50% 50%)',
    },
  },
};

// Default animation settings
export const defaultAnimationSettings = {
  duration: 1,
  ease: 'power3.out',
};

// Scroll animation defaults
export const scrollAnimationDefaults = {
  start: 'top bottom-=100',
  end: 'bottom 15%',
  toggleActions: 'play none none reverse',
};

// Create a basic fade up animation
export const createFadeUpAnimation = (
  element: gsap.TweenTarget,
  options?: gsap.TweenVars
) => {
  return gsap.from(element, {
    y: 60,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    ...options,
  });
};

// Create a stagger animation
export const createStaggerAnimation = (
  elements: gsap.TweenTarget,
  options?: gsap.TweenVars
) => {
  return gsap.from(elements, {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
    ...options,
  });
};

// Create scroll-triggered animation
export const createScrollAnimation = (
  element: gsap.TweenTarget,
  trigger: Element | string,
  animationVars: gsap.TweenVars,
  scrollTriggerVars?: ScrollTrigger.Vars
) => {
  return gsap.from(element, {
    ...animationVars,
    immediateRender: false, // Critical for Lenis compatibility
    scrollTrigger: {
      trigger,
      start: 'top 75%',
      toggleActions: 'play none none reverse',
      ...scrollTriggerVars,
    },
  });
};

// Create clip-path morph animation (OnScrollShapeMorph style)
export const createClipPathMorphAnimation = (
  imageElement: Element,
  pattern: keyof typeof clipPathPatterns = 'rectangleToLine',
  scrollTriggerVars?: ScrollTrigger.Vars
) => {
  const clipPaths = clipPathPatterns[pattern];

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: imageElement,
      start: 'top 50%',
      end: '+=50%',
      scrub: true,
      ...scrollTriggerVars,
    },
  });

  tl.fromTo(
    imageElement,
    {
      filter: 'brightness(100%)',
      clipPath: clipPaths.step1.initial,
    },
    {
      filter: 'brightness(300%)',
      clipPath: clipPaths.step1.final,
      ease: 'sine.in',
    }
  ).to(imageElement, {
    filter: 'brightness(100%)',
    clipPath: clipPaths.step2.final,
    ease: 'sine.out',
  });

  return tl;
};

// Kill all ScrollTriggers (for cleanup)
export const killAllScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};

// Refresh ScrollTrigger (after DOM changes)
export const refreshScrollTrigger = () => {
  ScrollTrigger.refresh();
};

export { gsap, ScrollTrigger };
