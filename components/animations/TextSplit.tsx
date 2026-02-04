'use client';

import { useRef, useEffect, useState, ReactNode, createElement } from 'react';
import { useLayoutEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

interface TextSplitProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  type?: 'chars' | 'words' | 'lines';
  stagger?: number;
  duration?: number;
  delay?: number;
  y?: number;
  once?: boolean;
}

export function TextSplit({
  children,
  className,
  as: Component = 'span',
  type = 'chars',
  stagger = 0.02,
  duration = 0.8,
  delay = 0,
  y = 40,
  once = true,
}: TextSplitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [elements, setElements] = useState<ReactNode[]>([]);
  const prefersReducedMotion = useReducedMotion();

  // Split text into elements
  useEffect(() => {
    if (type === 'chars') {
      const chars = children.split('').map((char, i) => (
        <span
          key={i}
          className="inline-block split-char"
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ));
      setElements(chars);
    } else if (type === 'words') {
      const words = children.split(' ').map((word, i, arr) => (
        <span key={i} className="inline-block split-word">
          {word}
          {i < arr.length - 1 ? '\u00A0' : ''}
        </span>
      ));
      setElements(words);
    } else {
      const lines = children.split('\n').map((line, i) => (
        <span key={i} className="block split-line">
          {line}
        </span>
      ));
      setElements(lines);
    }
  }, [children, type]);

  // Animate elements
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || elements.length === 0 || prefersReducedMotion) return;

    const splitElements = container.querySelectorAll(
      type === 'chars' ? '.split-char' : type === 'words' ? '.split-word' : '.split-line'
    );

    if (splitElements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(splitElements, {
        y,
        opacity: 0,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom-=100',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      });
    }, container);

    return () => ctx.revert();
  }, [elements, type, stagger, duration, delay, y, once, prefersReducedMotion]);

  // Create element with proper typing
  return createElement(
    Component,
    {
      ref: containerRef,
      className: cn('overflow-hidden', className),
    },
    prefersReducedMotion ? children : elements
  );
}
