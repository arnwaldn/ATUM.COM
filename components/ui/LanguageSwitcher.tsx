'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { locales, localeNames, type Locale } from '@/i18n';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact';
}

export function LanguageSwitcher({
  className,
  variant = 'default',
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    // Remove current locale prefix from pathname
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');

    router.push(newPath);
  };

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={cn(
              'px-2 py-1 text-sm font-medium rounded transition-all duration-200',
              locale === loc
                ? 'text-gold-500 bg-gold-500/10'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            )}
            aria-label={`Switch to ${localeNames[loc]}`}
          >
            {loc.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative flex items-center bg-gray-800/50 rounded-full p-1',
        className
      )}
    >
      {/* Sliding background */}
      <div
        className={cn(
          'absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gold-500 rounded-full transition-transform duration-300',
          locale === 'en' && 'translate-x-[calc(100%+4px)]'
        )}
      />

      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={cn(
            'relative z-10 px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200',
            locale === loc ? 'text-black' : 'text-gray-400 hover:text-white'
          )}
          aria-label={`Switch to ${localeNames[loc]}`}
        >
          {localeNames[loc]}
        </button>
      ))}
    </div>
  );
}
