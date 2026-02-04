'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from './Button';
import { Cookie, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const COOKIE_CONSENT_KEY = 'atum-cookie-consent';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Only run on client
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (!savedConsent) {
      // Show banner after 1 second
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-[9999]',
        'p-4 md:p-6'
      )}
    >
      <div
        className={cn(
          'max-w-4xl mx-auto',
          'bg-gray-900 border border-gray-700 rounded-2xl',
          'p-6 md:p-8',
          'shadow-2xl'
        )}
      >
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center">
              <Cookie className="w-6 h-6 text-gold-500" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-lg mb-2">
                Gestion des cookies
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Nous utilisons des cookies pour assurer le fonctionnement du site et améliorer votre expérience.
              </p>
            </div>
          </div>

          {/* Details */}
          {showDetails && (
            <div className="bg-gray-800/50 rounded-xl p-4 space-y-3">
              <div>
                <h4 className="text-white font-medium text-sm mb-1">Cookies essentiels</h4>
                <p className="text-gray-400 text-xs">Nécessaires au fonctionnement du site.</p>
              </div>
              <div>
                <h4 className="text-white font-medium text-sm mb-1">Cookies analytiques</h4>
                <p className="text-gray-400 text-xs">Pour mesurer l'audience (anonymisé).</p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Settings className="w-4 h-4" />
              Personnaliser
            </button>
            <div className="flex-1 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={handleReject}
                className="w-full sm:w-auto"
              >
                Tout refuser
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAccept}
                className="w-full sm:w-auto"
              >
                Tout accepter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
