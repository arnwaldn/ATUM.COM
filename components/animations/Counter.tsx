'use client';

import { useRef, useState } from 'react';
import { useLayoutEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function Counter({
  end,
  suffix = '',
  prefix = '',
  duration = 2,
  className,
  once = true,
}: CounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // If reduced motion, show final value immediately
    if (prefersReducedMotion) {
      setDisplayValue(end);
      return;
    }

    const ctx = gsap.context(() => {
      const obj = { value: 0 };

      gsap.to(obj, {
        value: end,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          setDisplayValue(Math.round(obj.value));
        },
        scrollTrigger: {
          trigger: container,
          start: 'top bottom-=100',
          toggleActions: once ? 'play none none none' : 'play none none reset',
        },
      });
    }, container);

    return () => ctx.revert();
  }, [end, duration, once, prefersReducedMotion]);

  return (
    <span ref={containerRef} className={cn('tabular-nums', className)}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
