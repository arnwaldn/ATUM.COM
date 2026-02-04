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
- **Déploiement**: Vercel
- **Repo**: https://github.com/arnwaldn/ATUM.COM

### URLs de Production
- **Stable**: https://atumcom.vercel.app
- **FR**: https://atumcom.vercel.app/fr
- **EN**: https://atumcom.vercel.app/en

---

## Travail Accompli (Session du 4 Fév 2026)

### 1. Curseur Personnalisé - Eye of Horus
- **Fichier**: `components/ui/CustomCursor.tsx`
- Curseur SVG représentant l'Œil d'Horus (thème égyptien)
- Animation GSAP au survol des éléments cliquables (pulse, glow, ring)
- z-index: 999999 (toujours au-dessus de tout)
- Désactivé sur mobile/tablette et si prefers-reduced-motion

### 2. Cookie Banner RGPD/CNIL
- **Fichier**: `components/ui/CookieBanner.tsx`
- Conforme CNIL (boutons égaux, pas de dark pattern)
- Styles inline (pas de dépendances Tailwind pour éviter les bugs)
- z-index: 99999
- `cursor: auto` pour afficher le curseur système sur le popup
- localStorage key: `atum-cookie-consent`
- Délai d'apparition: 1 seconde

### 3. Traductions Cookies
- **Fichiers**: `messages/fr.json`, `messages/en.json`
- Section `cookies` avec toutes les traductions (non utilisées actuellement car composant simplifié)

---

## Problèmes Résolus

### Cookie Banner ne s'affichait pas
- **Cause**: Imports complexes qui échouaient silencieusement
- **Solution**: Simplification avec styles inline uniquement

### Curseur invisible sur Cookie Banner
- **Cause**: globals.css applique `cursor: none !important` partout
- **Solution 1**: `cursor: auto` sur le container du cookie banner
- **Solution 2**: z-index du curseur (999999) > cookie banner (99999)

### Multiples URLs Vercel
- **Explication**: Chaque déploiement génère une URL unique (preview)
- **URL stable**: https://atumcom.vercel.app

---

## Architecture Importante

```
app/
  [locale]/
    layout.tsx      ← Intègre CookieBanner, CustomCursor, Header, Footer
    page.tsx        ← Page d'accueil

components/
  ui/
    CookieBanner.tsx  ← Popup RGPD
    CustomCursor.tsx  ← Œil d'Horus animé
    Button.tsx        ← Boutons réutilisables

  layout/
    Header.tsx
    Footer.tsx
    SmoothScrollProvider.tsx  ← Lenis

messages/
  fr.json           ← Traductions françaises
  en.json           ← Traductions anglaises

app/globals.css     ← Design system, cursor: none global
```

---

## Points d'Attention pour la Suite

1. **Le cookie banner utilise des styles inline** - Si on veut le rendre plus joli, il faudra réintégrer Tailwind avec précaution

2. **Traductions cookies non utilisées** - Le composant actuel est hardcodé en français, les traductions dans messages/*.json sont disponibles mais pas intégrées

3. **Middleware deprecated** - Next.js affiche un warning sur la convention "middleware" → "proxy"

4. **Le curseur custom nécessite `cursor: none` global** - Si on retire cette règle, le curseur système réapparaîtra

---

## Prochaines Étapes Possibles

- [ ] Réintégrer les traductions dans CookieBanner
- [ ] Ajouter le bouton "Personnaliser" avec toggles pour cookies analytiques
- [ ] Améliorer le design du cookie banner (cohérence avec le thème)
- [ ] Ajouter Google Analytics conditionnel selon le consentement
- [ ] Tester le responsive sur différents devices

---

*Note générée automatiquement par Claude Code - Session ATUM CREA*
