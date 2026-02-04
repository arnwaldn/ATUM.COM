// Google Analytics 4 Utilities
// Only tracks if user has given consent for analytics cookies

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  timestamp: number;
  version: string;
}

const COOKIE_CONSENT_KEY = 'atum-cookie-consent';

// CNIL requires max 13 months retention
const CONSENT_MAX_AGE_MS = 13 * 30 * 24 * 60 * 60 * 1000; // ~13 months

export function isConsentExpired(consent: CookieConsent): boolean {
  return Date.now() - consent.timestamp > CONSENT_MAX_AGE_MS;
}

export function getConsentStatus(): boolean {
  if (typeof window === 'undefined') return false;

  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!consent) return false;

  try {
    const parsed: CookieConsent = JSON.parse(consent);
    return parsed.analytics === true;
  } catch {
    return false;
  }
}

export function getFullConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;

  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!consent) return null;

  try {
    return JSON.parse(consent);
  } catch {
    return null;
  }
}

export function pageview(url: string) {
  if (!GA_MEASUREMENT_ID || !getConsentStatus()) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

export function event(
  action: string,
  params?: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
  }
) {
  if (!GA_MEASUREMENT_ID || !getConsentStatus()) return;

  window.gtag('event', action, params);
}

// Dispatch event to notify GA component of consent change
export function notifyConsentChange() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('cookie-consent-update'));
}
