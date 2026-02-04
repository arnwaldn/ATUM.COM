'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  className?: string;
  videoClassName?: string;
  fallbackClassName?: string;
  cropEdges?: boolean;
  onAnimationEnd?: () => void;
}

export function AnimatedLogo({
  className,
  videoClassName,
  fallbackClassName,
  cropEdges = false,
  onAnimationEnd,
}: AnimatedLogoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasEnded, setHasEnded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleEnded = () => {
    setHasEnded(true);
    onAnimationEnd?.();
  };

  const handleError = () => {
    setHasError(true);
  };

  // Show static logo if video fails to load
  if (hasError) {
    return (
      <div className={cn('relative', className)}>
        <Image
          src="/images/logo-atum.png"
          alt="ATUM Logo"
          width={240}
          height={240}
          priority
          className={cn('object-contain', fallbackClassName)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative',
        cropEdges && 'overflow-hidden rounded-full',
        className
      )}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        onError={handleError}
        className={cn(
          'object-cover',
          videoClassName
        )}
      >
        <source src="/videos/logo-animation.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <Image
          src="/images/logo-atum.png"
          alt="ATUM Logo"
          width={240}
          height={240}
          priority
          className={cn('object-contain', fallbackClassName)}
        />
      </video>
    </div>
  );
}
