'use client';

import { ReactNode, useRef } from 'react';
import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

interface FadeUpProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  once?: boolean;
}

export function FadeUp({
  children,
  className,
  delay = 0,
  duration = 1.1,
  y = 35,
  once = true,
}: FadeUpProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Set initial state immediately (no flash)
      gsap.set(element, {
        y,
        opacity: 0,
      });

      // Animate to final state on scroll
      gsap.to(element, {
        y: 0,
        opacity: 1,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 75%',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      });
    }, element);

    return () => ctx.revert();
  }, [delay, duration, y, once, prefersReducedMotion]);

  return (
    <div ref={elementRef} className={cn(className)}>
      {children}
    </div>
  );
}
