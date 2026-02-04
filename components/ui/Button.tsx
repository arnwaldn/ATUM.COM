'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      relative inline-flex items-center justify-center font-medium
      transition-all duration-300 ease-out
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black
      disabled:pointer-events-none disabled:opacity-50
      overflow-hidden group
    `;

    const variants = {
      primary: `
        bg-gradient-to-r from-gold-500 to-gold-600
        text-black font-semibold
        hover:from-gold-400 hover:to-gold-500
        shadow-lg shadow-gold-500/25
        hover:shadow-gold-500/40
        hover:scale-[1.02]
        active:scale-[0.98]
      `,
      secondary: `
        bg-gray-800 text-white
        hover:bg-gray-700
        border border-gray-700
        hover:border-gray-600
        hover:scale-[1.02]
        active:scale-[0.98]
      `,
      outline: `
        bg-transparent text-gold-500
        border-2 border-gold-500
        hover:bg-gold-500 hover:text-black
        hover:scale-[1.02]
        active:scale-[0.98]
      `,
      ghost: `
        bg-transparent text-white
        hover:bg-white/10
        hover:text-gold-500
      `,
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded-lg',
      md: 'px-6 py-3 text-base rounded-xl',
      lg: 'px-8 py-4 text-lg rounded-xl',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        <span className={cn(isLoading && 'invisible')}>{children}</span>

        {/* Shine effect for primary variant */}
        {variant === 'primary' && (
          <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-[100%] transition-transform duration-700" />
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
