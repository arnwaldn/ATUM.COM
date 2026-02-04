'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { notifyConsentChange, type CookieConsent } from '@/lib/analytics';

const COOKIE_CONSENT_KEY = 'atum-cookie-consent';
const CONSENT_VERSION = '1.0';

// Eye of Horus SVG Icon
function EyeOfHorusIcon({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer eye shape */}
      <path
        d="M6 24C6 24 12 12 24 12C36 12 42 24 42 24C42 24 36 36 24 36C12 36 6 24 6 24Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Inner eye circle */}
      <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="1.5" fill="none" />
      {/* Pupil */}
      <circle cx="24" cy="24" r="4" fill="currentColor" />
      {/* Eyebrow line */}
      <path
        d="M10 14C12 10 18 6 24 6C30 6 36 10 38 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
      {/* Tear line */}
      <path
        d="M24 36L21 44"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Spiral tail */}
      <path
        d="M21 44C21 44 18 46 16 45C14 44 15 42 17 42"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Toggle Switch Component
function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      style={{
        position: 'relative',
        width: '48px',
        height: '26px',
        borderRadius: '13px',
        background: checked ? '#C9A30D' : '#374151',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'background 200ms ease',
        opacity: disabled ? 0.6 : 1,
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '3px',
          left: checked ? '25px' : '3px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'white',
          transition: 'left 200ms ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      />
    </button>
  );
}

export function CookieBanner() {
  const t = useTranslations('cookies');
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (!savedConsent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }

    // Check if consent version is outdated
    try {
      const parsed: CookieConsent = JSON.parse(savedConsent);
      if (parsed.version !== CONSENT_VERSION) {
        localStorage.removeItem(COOKIE_CONSENT_KEY);
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1000);
        return () => clearTimeout(timer);
      }
    } catch {
      localStorage.removeItem(COOKIE_CONSENT_KEY);
    }
  }, []);

  const saveConsent = (analytics: boolean) => {
    const consent: CookieConsent = {
      essential: true,
      analytics,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    notifyConsentChange();
    setIsVisible(false);
  };

  const handleAcceptAll = () => {
    saveConsent(true);
  };

  const handleRejectAll = () => {
    saveConsent(false);
  };

  const handleSaveSettings = () => {
    saveConsent(analyticsEnabled);
  };

  if (!isVisible) return null;

  return (
    <div
      id="cookie-banner"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        right: '20px',
        zIndex: 99999,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '720px',
          width: '100%',
          background: 'rgba(23, 23, 23, 0.98)',
          border: '1px solid #C9A30D',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(201, 163, 13, 0.1)',
          cursor: 'auto',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(201, 163, 13, 0.15), rgba(201, 163, 13, 0.05))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              border: '1px solid rgba(201, 163, 13, 0.2)',
            }}
          >
            <EyeOfHorusIcon className="text-gold-500" />
          </div>
          <div>
            <h3 style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>
              {t('title')}
            </h3>
            <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.6' }}>
              {t('description')}
            </p>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div
            style={{
              background: 'rgba(38, 38, 38, 0.6)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '16px',
              border: '1px solid rgba(201, 163, 13, 0.1)',
            }}
          >
            {/* Essential Cookies */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
                paddingBottom: '16px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div style={{ flex: 1, marginRight: '16px' }}>
                <h4 style={{ color: 'white', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>
                  {t('essential.title')}
                </h4>
                <p style={{ color: '#9ca3af', fontSize: '12px', lineHeight: '1.5' }}>
                  {t('essential.description')}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#C9A30D', fontSize: '12px', fontWeight: '500' }}>
                  {t('essential.required')}
                </span>
                <ToggleSwitch checked={true} onChange={() => {}} disabled={true} />
              </div>
            </div>

            {/* Analytics Cookies */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1, marginRight: '16px' }}>
                <h4 style={{ color: 'white', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>
                  {t('analytics.title')}
                </h4>
                <p style={{ color: '#9ca3af', fontSize: '12px', lineHeight: '1.5' }}>
                  {t('analytics.description')}
                </p>
              </div>
              <ToggleSwitch checked={analyticsEnabled} onChange={setAnalyticsEnabled} />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {!showSettings ? (
            <>
              <button
                onClick={() => setShowSettings(true)}
                style={{
                  padding: '12px 20px',
                  background: 'transparent',
                  border: '1px solid #525252',
                  borderRadius: '8px',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C9A30D';
                  e.currentTarget.style.color = '#C9A30D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#525252';
                  e.currentTarget.style.color = '#9ca3af';
                }}
              >
                {t('settings')}
              </button>
              <div style={{ flex: 1, display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button
                  onClick={handleRejectAll}
                  style={{
                    padding: '12px 20px',
                    background: 'transparent',
                    border: '1px solid #525252',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'all 200ms ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#C9A30D';
                    e.currentTarget.style.background = 'rgba(201, 163, 13, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#525252';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {t('reject')}
                </button>
                <button
                  onClick={handleAcceptAll}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #C9A30D, #9D7F0A)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#000',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 200ms ease',
                    boxShadow: '0 4px 12px rgba(201, 163, 13, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(201, 163, 13, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 163, 13, 0.3)';
                  }}
                >
                  {t('accept')}
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowSettings(false)}
                style={{
                  padding: '12px 20px',
                  background: 'transparent',
                  border: '1px solid #525252',
                  borderRadius: '8px',
                  color: '#9ca3af',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 200ms ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C9A30D';
                  e.currentTarget.style.color = '#C9A30D';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#525252';
                  e.currentTarget.style.color = '#9ca3af';
                }}
              >
                {t('back')}
              </button>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleSaveSettings}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #C9A30D, #9D7F0A)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#000',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '14px',
                    transition: 'all 200ms ease',
                    boxShadow: '0 4px 12px rgba(201, 163, 13, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(201, 163, 13, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(201, 163, 13, 0.3)';
                  }}
                >
                  {t('save')}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
