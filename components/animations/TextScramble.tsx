'use client';

import { useRef, useEffect, useState, createElement } from 'react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

interface TextScrambleProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  chars?: string;
  duration?: number;
  delay?: number;
}

// Lettres ASCII mappées vers des hiéroglyphes via la police Egyptian Hieroglyphics
const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function TextScramble({
  children,
  className,
  as: Component = 'span',
  chars = DEFAULT_CHARS,
  duration = 1000,
  delay = 0,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // If user prefers reduced motion, show final text immediately
    if (prefersReducedMotion) {
      setDisplayText(children);
      setIsComplete(true);
      return;
    }

    // Initialize with scrambled text
    const initialScramble = children
      .split('')
      .map((char) => (char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)]))
      .join('');
    setDisplayText(initialScramble);

    // Start animation after delay
    const delayTimeout = setTimeout(() => {
      startTimeRef.current = performance.now();

      const animate = (currentTime: number) => {
        if (!startTimeRef.current) return;

        const elapsed = currentTime - startTimeRef.current;
        const progress = Math.min(elapsed / duration, 1);

        // Calculate how many characters should be revealed
        const revealIndex = Math.floor(progress * children.length);

        // Build display string
        let display = '';
        for (let i = 0; i < children.length; i++) {
          if (i < revealIndex) {
            // Character is revealed
            display += children[i];
          } else if (children[i] === ' ') {
            // Preserve spaces
            display += ' ';
          } else {
            // Random scramble character
            display += chars[Math.floor(Math.random() * chars.length)];
          }
        }

        setDisplayText(display);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Ensure final text is exact
          setDisplayText(children);
          setIsComplete(true);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(delayTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [children, chars, duration, delay, prefersReducedMotion]);

  return createElement(
    Component,
    {
      ref: containerRef,
      className: cn(
        'inline-block',
        // Use monospace-like spacing during animation to prevent layout shift
        !isComplete && 'tracking-normal',
        className
      ),
      'aria-label': children,
    },
    // Use aria-hidden span for visual effect, aria-label for accessibility
    // Apply hieroglyph font directly via inline style during animation
    createElement(
      'span',
      {
        'aria-hidden': 'true',
        style: !isComplete ? { fontFamily: "'Ancient Egyptian Hieroglyphs', sans-serif" } : undefined
      },
      displayText
    )
  );
}
