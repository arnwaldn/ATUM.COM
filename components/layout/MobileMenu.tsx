'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  navLinks: { href: string; label: string }[];
}

export function MobileMenu({
  isOpen,
  onClose,
  locale,
  navLinks,
}: MobileMenuProps) {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      return pathname === href || pathname === `/${locale}/`;
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const menu = menuRef.current;
    const overlay = overlayRef.current;
    const links = linksRef.current;

    if (!menu || !overlay || !links) return;

    const linkElements = links.querySelectorAll('.mobile-nav-link');

    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Animate in
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.fromTo(
        menu,
        { x: '100%' },
        {
          x: '0%',
          duration: 0.4,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        linkElements,
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.2,
          ease: 'power3.out',
        }
      );
    } else {
      // Animate out
      gsap.to(menu, {
        x: '100%',
        duration: 0.3,
        ease: 'power3.in',
      });

      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          document.body.style.overflow = '';
        },
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] lg:hidden">
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm opacity-0"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-gray-900 border-l border-gray-800 transform translate-x-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div onClick={onClose}>
            <Logo href={`/${locale}`} size="sm" />
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <div ref={linksRef} className="p-6">
          <nav className="space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  'mobile-nav-link block py-3 text-xl font-medium transition-colors duration-200',
                  'border-b border-gray-800/50',
                  isActive(link.href)
                    ? 'text-gold-500'
                    : 'text-gray-300 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="mt-8 mobile-nav-link">
            <LanguageSwitcher />
          </div>

          {/* CTA Button */}
          <div className="mt-8 mobile-nav-link">
            <Link href={`/${locale}/contact`} onClick={onClose}>
              <Button className="w-full" size="lg">
                {t('cta')}
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-800">
          <p className="text-sm text-gray-500">
            contact@atum.dev
          </p>
        </div>
      </div>
    </div>
  );
}
