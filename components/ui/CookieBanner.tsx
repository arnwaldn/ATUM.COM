'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from './Button';
import { X, Cookie } from 'lucide-react';
import { cn } from '@/lib/utils';

const COOKIE_CONSENT_KEY = 'atum-cookie-consent';

type ConsentStatus = 'pending' | 'accepted' | 'rejected';

export function CookieBanner() {
  const t = useTranslations('cookies');
  const [status, setStatus] = useState<ConsentStatus>('pending');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (savedConsent) {
      setStatus(savedConsent as ConsentStatus);
    } else {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setStatus('accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setStatus('rejected');
    setIsVisible(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  // Don't render if consent already given
  if (status !== 'pending' || !isVisible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[9999]',
        'p-4 md:p-6',
        'transform transition-transform duration-500 ease-out',
        isVisible ? 'translate-y-0' : 'translate-y-full'
      )}
    >
      <div
        className={cn(
          'max-w-4xl mx-auto',
          'bg-gray-900/95 backdrop-blur-xl',
          'border border-gray-800 rounded-2xl',
          'p-6 md:p-8',
          'shadow-2xl shadow-black/50'
        )}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Icon */}
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center">
            <Cookie className="w-6 h-6 text-gold-500" />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-white font-display font-bold text-lg mb-2">
              {t('title')}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReject}
              className="w-full sm:w-auto"
            >
              {t('reject')}
            </Button>
            <Button
              size="sm"
              onClick={handleAccept}
              className="w-full sm:w-auto"
            >
              {t('accept')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
