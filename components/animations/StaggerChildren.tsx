'use client';

import { ReactNode, useRef } from 'react';
import { useLayoutEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  childSelector?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
  rotateX?: number;
  blur?: number;
  once?: boolean;
}

export function StaggerChildren({
  children,
  className,
  childSelector = '> *',
  stagger = 0.1,
  delay = 0,
  duration = 1.1,
  y = 30,
  scale = 0.98,
  rotateX = 0,
  blur = 0,
  once = true,
}: StaggerChildrenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    const elements = container.querySelectorAll(childSelector);
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      // Set initial state immediately (no flash)
      gsap.set(elements, {
        y,
        opacity: 0,
        scale,
        rotateX,
        filter: blur > 0 ? `blur(${blur}px)` : 'none',
      });

      // Animate to final state on scroll
      gsap.to(elements, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        filter: 'blur(0px)',
        duration,
        delay,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      });
    }, container);

    return () => ctx.revert();
  }, [childSelector, stagger, delay, duration, y, scale, rotateX, blur, once, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn(className)}
      style={rotateX !== 0 ? { perspective: '1000px' } : undefined}
    >
      {children}
    </div>
  );
}
