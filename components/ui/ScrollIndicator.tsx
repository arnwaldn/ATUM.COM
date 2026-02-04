'use client';

import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  text?: string;
  className?: string;
  onClick?: () => void;
}

export function ScrollIndicator({
  text = 'Scroll',
  className,
  onClick,
}: ScrollIndicatorProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex flex-col items-center gap-2 text-gray-400',
        'transition-colors duration-300 hover:text-gold-500',
        'focus:outline-none focus:text-gold-500',
        className
      )}
      aria-label={text}
    >
      <span className="text-xs font-medium tracking-widest uppercase">
        {text}
      </span>
      <div className="relative w-6 h-10 border-2 border-current rounded-full flex items-start justify-center p-1">
        <div className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
      </div>
      <ChevronDown className="w-4 h-4 animate-bounce" style={{ animationDelay: '0.1s' }} />
    </button>
  );
}
