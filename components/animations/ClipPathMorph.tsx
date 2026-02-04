'use client';

import { useRef, ReactNode } from 'react';
import { useLayoutEffect } from 'react';
import { gsap, ScrollTrigger, clipPathPatterns } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

interface ClipPathMorphProps {
  children: ReactNode;
  className?: string;
  pattern?: keyof typeof clipPathPatterns;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  enableBrightness?: boolean;
  brightnessMax?: number;
}

/**
 * OnScrollShapeMorph style animation component
 * Morphs content using CSS clip-path with optional brightness flash
 */
export function ClipPathMorph({
  children,
  className,
  pattern = 'rectangleToLine',
  start = 'top 50%',
  end = '+=50%',
  scrub = true,
  enableBrightness = true,
  brightnessMax = 300,
}: ClipPathMorphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    const clipPaths = clipPathPatterns[pattern];
    if (!clipPaths) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: container,
          start,
          end,
          scrub: scrub === true ? 1 : scrub,
        },
      });

      // Step 1: Morph to intermediate state with brightness flash
      tl.fromTo(
        container,
        {
          clipPath: clipPaths.step1.initial,
          filter: enableBrightness ? 'brightness(100%)' : 'none',
        },
        {
          clipPath: clipPaths.step1.final,
          filter: enableBrightness ? `brightness(${brightnessMax}%)` : 'none',
          ease: 'sine.in',
          duration: 0.5,
        }
      );

      // Step 2: Return to normal with brightness recovery
      tl.to(container, {
        clipPath: clipPaths.step2.final,
        filter: enableBrightness ? 'brightness(100%)' : 'none',
        ease: 'sine.out',
        duration: 0.5,
      });
    }, container);

    return () => ctx.revert();
  }, [pattern, start, end, scrub, enableBrightness, brightnessMax, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn('will-change-[clip-path,filter]', className)}
      style={{
        clipPath: clipPathPatterns[pattern]?.step1.initial || 'none',
      }}
    >
      {children}
    </div>
  );
}
