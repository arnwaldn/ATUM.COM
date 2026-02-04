'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { GA_MEASUREMENT_ID, getConsentStatus } from '@/lib/analytics';

export function GoogleAnalytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      setHasConsent(getConsentStatus());
    };

    // Check on mount
    checkConsent();

    // Listen for storage changes (other tabs)
    window.addEventListener('storage', checkConsent);

    // Listen for custom consent update event (same tab)
    window.addEventListener('cookie-consent-update', checkConsent);

    return () => {
      window.removeEventListener('storage', checkConsent);
      window.removeEventListener('cookie-consent-update', checkConsent);
    };
  }, []);

  // Don't render if no GA ID or no consent
  if (!GA_MEASUREMENT_ID || !hasConsent) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        `}
      </Script>
    </>
  );
}
