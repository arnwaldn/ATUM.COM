'use client';

import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  speed?: number;
  scale?: number;
  rotationX?: number;
  rotationY?: number;
  priority?: boolean;
}

export function ParallaxImage({
  src,
  alt,
  className,
  imageClassName,
  speed = 0.3,
  scale = 1.2,
  rotationX = 0,
  rotationY = 0,
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;

    if (!container || !image || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Set initial scale for parallax effect
      gsap.set(image, { scale });

      // Create parallax effect
      gsap.to(image, {
        y: () => container.offsetHeight * speed,
        rotationX,
        rotationY,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [speed, scale, rotationX, rotationY, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      style={{ perspective: '1000px' }}
    >
      <div
        ref={imageRef}
        className="w-full h-full will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={cn('object-cover', imageClassName)}
        />
      </div>
    </div>
  );
}
