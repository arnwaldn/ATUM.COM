'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from './Button';
import { X, Cookie, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const COOKIE_CONSENT_KEY = 'atum-cookie-consent';
const COOKIE_CONSENT_DATE_KEY = 'atum-cookie-consent-date';

type ConsentStatus = 'pending' | 'accepted' | 'rejected';

interface CookieBannerProps {
  locale?: string;
}

export function CookieBanner({ locale = 'fr' }: CookieBannerProps) {
  const t = useTranslations('cookies');
  const [status, setStatus] = useState<ConsentStatus>('pending');
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    const consentDate = localStorage.getItem(COOKIE_CONSENT_DATE_KEY);

    // Re-ask consent after 13 months (CNIL requirement)
    if (savedConsent && consentDate) {
      const thirteenMonthsAgo = Date.now() - (13 * 30 * 24 * 60 * 60 * 1000);
      if (parseInt(consentDate) < thirteenMonthsAgo) {
        // Consent expired, ask again
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        localStorage.removeItem(COOKIE_CONSENT_DATE_KEY);
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
      }
      setStatus(savedConsent as ConsentStatus);
    } else if (!savedConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const saveConsent = (consent: ConsentStatus) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, consent);
    localStorage.setItem(COOKIE_CONSENT_DATE_KEY, Date.now().toString());
    setStatus(consent);
    setIsVisible(false);

    // If rejected, we could disable analytics here
    if (consent === 'rejected') {
      // Disable any analytics/tracking cookies
      // window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
    }
  };

  const handleAccept = () => saveConsent('accepted');
  const handleReject = () => saveConsent('rejected');

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
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center">
              <Cookie className="w-6 h-6 text-gold-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-display font-bold text-lg mb-2">
                {t('title')}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('description')}
              </p>
            </div>
          </div>

          {/* Details (expandable) */}
          {showDetails && (
            <div className="bg-gray-800/50 rounded-xl p-4 space-y-4">
              <div>
                <h4 className="text-white font-medium text-sm mb-2">{t('essential.title')}</h4>
                <p className="text-gray-400 text-xs">{t('essential.description')}</p>
                <span className="inline-block mt-2 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                  {t('essential.required')}
                </span>
              </div>
              <div>
                <h4 className="text-white font-medium text-sm mb-2">{t('analytics.title')}</h4>
                <p className="text-gray-400 text-xs">{t('analytics.description')}</p>
              </div>
            </div>
          )}

          {/* Privacy Policy Link */}
          <p className="text-gray-500 text-xs">
            {t('moreInfo')}{' '}
            <Link
              href={`/${locale}/mentions-legales`}
              className="text-gold-500 hover:text-gold-400 underline"
            >
              {t('privacyPolicy')}
            </Link>
          </p>

          {/* Buttons - CNIL compliant: equal visibility */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
              {t('settings')}
            </button>
            <div className="flex-1 flex flex-col sm:flex-row gap-3 sm:justify-end">
              {/* CNIL: Both buttons must have equal prominence */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleReject}
                className="w-full sm:w-auto"
              >
                {t('reject')}
              </Button>
              <Button
                variant="outline"
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
    </div>
  );
}

// Export a function to reset consent (for settings page)
export function resetCookieConsent() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    localStorage.removeItem(COOKIE_CONSENT_DATE_KEY);
    window.location.reload();
  }
}

// Export a function to get current consent status
export function getCookieConsent(): ConsentStatus | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(COOKIE_CONSENT_KEY) as ConsentStatus | null;
  }
  return null;
}
