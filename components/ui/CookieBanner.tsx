'use client';

import { useState, useEffect } from 'react';

const COOKIE_CONSENT_KEY = 'atum-cookie-consent';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if already consented
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
          maxWidth: '800px',
          width: '100%',
          background: '#1f2937',
          border: '1px solid #374151',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <h3 style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>
            🍪 Gestion des cookies
          </h3>
          <p style={{ color: '#9ca3af', fontSize: '14px', lineHeight: '1.5' }}>
            Nous utilisons des cookies pour assurer le fonctionnement du site et améliorer votre expérience.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={handleReject}
            style={{
              padding: '10px 20px',
              background: 'transparent',
              border: '1px solid #6b7280',
              borderRadius: '8px',
              color: 'white',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Tout refuser
          </button>
          <button
            onClick={handleAccept}
            style={{
              padding: '10px 20px',
              background: '#d4af37',
              border: 'none',
              borderRadius: '8px',
              color: '#000',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
            }}
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}
