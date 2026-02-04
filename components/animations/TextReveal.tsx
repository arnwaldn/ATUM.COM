'use client';

import { useRef, useLayoutEffect, createElement, useMemo, forwardRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

type TextRevealEffect = 'blur' | 'chars' | 'words' | 'slide';

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  effect?: TextRevealEffect;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
}

export function TextReveal({
  children,
  as: Component = 'div',
  effect = 'chars',
  className,
  delay = 0,
  duration = 0.8,
  stagger = 0.02,
  once = true,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Split text based on effect type
  const splitContent = useMemo(() => {
    if (effect === 'blur' || effect === 'slide') {
      return null;
    }

    if (effect === 'words') {
      return children.split(' ').map((word, i, arr) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="word inline-block">
            {word}
          </span>
          {i < arr.length - 1 && ' '}
        </span>
      ));
    }

    // chars effect - split by words first to prevent word breaks
    const words = children.split(' ');
    return words.map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block whitespace-nowrap">
        {word.split('').map((char, charIndex) => (
          <span key={charIndex} className="inline-block overflow-hidden">
            <span className="char inline-block">
              {char}
            </span>
          </span>
        ))}
        {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
      </span>
    ));
  }, [children, effect]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      let targets: Element[] | HTMLElement;
      let initialState: gsap.TweenVars;
      let finalState: gsap.TweenVars;

      switch (effect) {
        case 'blur':
          targets = container;
          initialState = { opacity: 0, filter: 'blur(15px)' };
          finalState = {
            opacity: 1,
            filter: 'blur(0px)',
            duration: duration * 1.5,
            delay,
            ease: 'power2.out',
          };
          break;

        case 'slide':
          targets = container;
          initialState = { xPercent: -105 };
          finalState = {
            xPercent: 0,
            duration,
            delay,
            ease: 'power2.out',
          };
          break;

        case 'words':
          targets = Array.from(container.querySelectorAll('.word'));
          initialState = { y: '100%', opacity: 0 };
          finalState = {
            y: '0%',
            opacity: 1,
            duration,
            delay,
            stagger,
            ease: 'power2.out',
          };
          break;

        case 'chars':
        default:
          targets = Array.from(container.querySelectorAll('.char'));
          initialState = { y: '100%', opacity: 0 };
          finalState = {
            y: '0%',
            opacity: 1,
            duration,
            delay,
            stagger,
            ease: 'power2.out',
          };
          break;
      }

      // Set initial state immediately (no flash)
      gsap.set(targets, initialState);

      // Animate to final state on scroll
      gsap.to(targets, {
        ...finalState,
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      });
    }, container);

    return () => ctx.revert();
  }, [effect, delay, duration, stagger, once, prefersReducedMotion]);

  // For blur effect - simple wrapper
  if (effect === 'blur') {
    return createElement(
      Component,
      { ref: containerRef, className: cn(className) },
      children
    );
  }

  // For slide effect
  if (effect === 'slide') {
    return (
      <span className="inline-block overflow-hidden">
        {createElement(
          Component,
          { ref: containerRef, className: cn('inline-block', className) },
          children
        )}
      </span>
    );
  }

  // For chars or words effect
  return createElement(
    Component,
    { ref: containerRef, className: cn(className) },
    splitContent
  );
}
