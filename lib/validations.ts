import { z } from 'zod';

/**
 * Contact form validation schema
 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Le nom doit contenir au moins 2 caractères' })
    .max(100, { message: 'Le nom ne peut pas dépasser 100 caractères' }),
  email: z
    .string()
    .email({ message: 'Email invalide' }),
  company: z
    .string()
    .max(100, { message: 'Le nom de l\'entreprise ne peut pas dépasser 100 caractères' })
    .optional(),
  projectType: z
    .string()
    .min(1, { message: 'Veuillez sélectionner un type de projet' }),
  budget: z
    .string()
    .optional(),
  message: z
    .string()
    .min(10, { message: 'Le message doit contenir au moins 10 caractères' })
    .max(5000, { message: 'Le message ne peut pas dépasser 5000 caractères' }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Newsletter subscription schema
 */
export const newsletterSchema = z.object({
  email: z
    .string()
    .email({ message: 'Email invalide' }),
});

export type NewsletterFormData = z.infer<typeof newsletterSchema>;

/**
 * Project types for contact form
 */
export const projectTypes = [
  { value: 'web', label: 'Développement Web', labelEn: 'Web Development' },
  { value: 'mobile', label: 'Application Mobile', labelEn: 'Mobile Application' },
  { value: 'ai', label: 'Intelligence Artificielle', labelEn: 'Artificial Intelligence' },
  { value: 'automation', label: 'Automatisation', labelEn: 'Automation' },
  { value: 'design', label: 'Design UI/UX', labelEn: 'UI/UX Design' },
  { value: 'consulting', label: 'Conseil Technique', labelEn: 'Technical Consulting' },
  { value: 'other', label: 'Autre', labelEn: 'Other' },
] as const;

/**
 * Budget ranges for contact form
 */
export const budgetRanges = [
  { value: '5k-15k', label: '5 000 € - 15 000 €' },
  { value: '15k-30k', label: '15 000 € - 30 000 €' },
  { value: '30k-50k', label: '30 000 € - 50 000 €' },
  { value: '50k+', label: '50 000 € +' },
  { value: 'undefined', label: 'À définir', labelEn: 'To be defined' },
] as const;
