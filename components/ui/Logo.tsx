'use client';

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  href?: string;
}

const sizes = {
  sm: { width: 32, height: 32, textSize: 'text-lg' },
  md: { width: 40, height: 40, textSize: 'text-xl' },
  lg: { width: 56, height: 56, textSize: 'text-2xl' },
};

export function Logo({
  className,
  size = 'md',
  showText = true,
  href = '/',
}: LogoProps) {
  const { width, height, textSize } = sizes[size];

  const content = (
    <div className={cn('flex items-center gap-3 group', className)}>
      <div className="relative transition-transform duration-300 group-hover:scale-110">
        <Image
          src="/images/logo-atum.png"
          alt="ATUM Logo"
          width={width}
          height={height}
          className="object-contain"
          priority
        />
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/20 rounded-full blur-xl transition-all duration-300" />
      </div>
      {showText && (
        <span
          className={cn(
            'font-display font-bold tracking-tight',
            'bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent',
            'transition-all duration-300',
            textSize
          )}
        >
          ATUM
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
