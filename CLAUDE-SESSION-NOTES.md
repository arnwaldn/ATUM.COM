# Notes de Session - ATUM.COM

> Dernière mise à jour: 4 février 2026

## Résumé du Projet

**ATUM** est le site vitrine d'une agence digitale premium avec un thème inspiré de l'Égypte antique.

### Stack Technique
- **Framework**: Next.js 16 (App Router)
- **Styling**: TailwindCSS 4 + CSS Variables
- **Animations**: GSAP + ScrollTrigger
- **Smooth Scroll**: Lenis
- **i18n**: next-intl (FR/EN)
- **Analytics**: Google Analytics 4 (conditionnel)
- **Déploiement**: Vercel
- **Repo**: https://github.com/arnwaldn/ATUM.COM

### URLs de Production
- **Stable**: https://atumcom.vercel.app
- **FR**: https://atumcom.vercel.app/fr
- **EN**: https://atumcom.vercel.app/en

---

## Travail Accompli (Session du 4 Fév 2026)

### 1. Curseur Personnalisé - Eye of Horus ✅
- **Fichier**: `components/ui/CustomCursor.tsx`
- Curseur SVG représentant l'Œil d'Horus (thème égyptien)
- Animation GSAP au survol des éléments cliquables (pulse, glow, ring)
- z-index: 999999 (toujours au-dessus de tout)
- Désactivé sur mobile/tablette et si prefers-reduced-motion

### 2. Cookie Banner RGPD/CNIL 100% Conforme ✅
- **Fichier**: `components/ui/CookieBanner.tsx`
- Design égyptien (Eye of Horus, bordures dorées)
- Traductions i18n intégrées (useTranslations)
- Toggles pour cookies analytiques
- **Conformité CNIL complète** :
  - Responsable : ATUM (affiché)
  - Lien vers mentions légales
  - Durée : 13 mois (affichée + expiration auto)
  - Google Analytics nommé explicitement
  - Bouton "Gérer les cookies" dans le footer

### 3. Google Analytics Conditionnel ✅
- **Fichiers**: `lib/analytics.ts`, `components/analytics/GoogleAnalytics.tsx`
- GA4 chargé uniquement si consentement analytics = true
- Anonymize IP activé
- Event `cookie-consent-update` pour mise à jour immédiate

### 4. Droit de Retrait CNIL ✅
- **Fichier**: `components/layout/Footer.tsx`
- Bouton "Gérer les cookies" dans la section Entreprise
- Supprime le consentement et recharge la page

---

## Architecture Cookie Consent

```
localStorage: 'atum-cookie-consent'
{
  essential: true,        // Toujours true
  analytics: boolean,     // Choix utilisateur
  timestamp: number,      // Date du consentement
  version: "1.0"          // Pour invalidation future
}

lib/analytics.ts
├── GA_MEASUREMENT_ID
├── isConsentExpired()    // Vérifie les 13 mois
├── getConsentStatus()    // Retourne analytics boolean
├── pageview()            // Track pageview si consent
├── event()               // Track event si consent
└── notifyConsentChange() // Dispatch custom event

components/analytics/GoogleAnalytics.tsx
└── Charge GA4 script si consentement analytics
```

---

## Conformité CNIL - Checklist ✅

| Exigence | Statut | Implémentation |
|----------|--------|----------------|
| Boutons équivalents | ✅ | Accepter = Refuser même taille |
| Personnalisation | ✅ | Bouton + toggles |
| Identité responsable | ✅ | "Responsable : ATUM" |
| Lien mentions légales | ✅ | Lien cliquable dynamique |
| Durée conservation | ✅ | "13 mois" affiché |
| Finalités précises | ✅ | "Google Analytics" nommé |
| Droit de retrait | ✅ | Bouton footer |
| Expiration auto | ✅ | isConsentExpired() |
| Données anonymisées | ✅ | anonymize_ip: true |

---

## Fichiers Clés

| Fichier | Rôle |
|---------|------|
| `components/ui/CookieBanner.tsx` | Banner RGPD complet |
| `components/ui/CustomCursor.tsx` | Curseur Eye of Horus |
| `components/analytics/GoogleAnalytics.tsx` | GA4 conditionnel |
| `components/layout/Footer.tsx` | Contient "Gérer les cookies" |
| `lib/analytics.ts` | Utilitaires GA4 + consent |
| `messages/fr.json` | Traductions FR |
| `messages/en.json` | Traductions EN |
| `app/globals.css` | cursor: none global |

---

## Points d'Attention

1. **Variable d'environnement GA4** : Ajouter `NEXT_PUBLIC_GA_ID=G-XXXXX` dans Vercel pour activer Google Analytics

2. **Middleware deprecated** : Next.js affiche un warning "middleware" → "proxy"

3. **Curseur custom** : Nécessite `cursor: none` global dans globals.css

---

## Pour la Prochaine Session

- [ ] Configurer Google Analytics (créer propriété GA4, ajouter ID dans Vercel)
- [ ] Tester le responsive sur différents devices
- [ ] Améliorer la page mentions légales si besoin
- [ ] Ajouter plus de contenu/projets

---

*Note générée automatiquement par Claude Code - Session ATUM CREA*
