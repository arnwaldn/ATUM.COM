'use client';

import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  revealDirection?: 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  duration?: number;
}

export function ImageReveal({
  src,
  alt,
  className,
  imageClassName,
  width,
  height,
  fill = false,
  priority = false,
  revealDirection = 'left',
  delay = 0,
  duration = 1.2,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    const image = imageRef.current;

    if (!container || !overlay || !image || prefersReducedMotion) return;

    // Set initial states based on direction
    const directions = {
      left: { x: '-100%', scaleX: 1 },
      right: { x: '100%', scaleX: 1 },
      top: { y: '-100%', scaleY: 1 },
      bottom: { y: '100%', scaleY: 1 },
    };

    const reverseDirections = {
      left: { x: '100%' },
      right: { x: '-100%' },
      top: { y: '100%' },
      bottom: { y: '-100%' },
    };

    const ctx = gsap.context(() => {
      // Initial state: image hidden, overlay covering
      gsap.set(image, { scale: 1.3 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 75%', // Trigger when element's top is at 75% of viewport
          toggleActions: 'play none none none',
        },
      });

      // Overlay reveals image
      tl.fromTo(
        overlay,
        { ...directions[revealDirection] },
        {
          x: 0,
          y: 0,
          duration: duration * 0.5,
          delay,
          ease: 'power3.inOut',
        }
      )
        .to(overlay, {
          ...reverseDirections[revealDirection],
          duration: duration * 0.5,
          ease: 'power3.inOut',
        })
        .to(
          image,
          {
            scale: 1,
            duration: duration * 0.8,
            ease: 'power3.out',
          },
          '-=0.4'
        );
    }, container);

    return () => ctx.revert();
  }, [revealDirection, delay, duration, prefersReducedMotion]);

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden', className)}>
      {/* Image container */}
      <div ref={imageRef} className="w-full h-full">
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          className={cn('object-cover', imageClassName)}
        />
      </div>

      {/* Reveal overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-gold-500 z-10"
        style={{ transform: 'translateX(-100%)' }}
      />
    </div>
  );
}
