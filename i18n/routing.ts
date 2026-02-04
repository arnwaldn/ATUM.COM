import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Liste des locales supportées
  locales: ['fr', 'en'],

  // Locale par défaut
  defaultLocale: 'fr',

  // Prefix de locale dans l'URL
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
