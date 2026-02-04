// Re-export from the routing config
export { routing, type Locale } from './i18n/routing';

// Also export common values for backwards compatibility
export const locales = ['fr', 'en'] as const;
export const defaultLocale = 'fr';
export const localeNames = {
  fr: 'Français',
  en: 'English',
} as const;
