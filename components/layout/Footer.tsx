'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/ui/Logo';
import { Linkedin, Mail, Globe } from 'lucide-react';

interface FooterProps {
  locale: string;
}

export function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  const serviceLinks = [
    { href: `/${locale}/services#web`, label: t('sections.services.links.web') },
    { href: `/${locale}/services#mobile`, label: t('sections.services.links.mobile') },
    { href: `/${locale}/services#ai`, label: t('sections.services.links.ai') },
    { href: `/${locale}/services#automation`, label: t('sections.services.links.automation') },
    { href: `/${locale}/services#design`, label: t('sections.services.links.design') },
    { href: `/${locale}/services#consulting`, label: t('sections.services.links.consulting') },
  ];

  const companyLinks = [
    { href: `/${locale}/agence`, label: t('sections.company.links.about') },
    { href: `/${locale}/realisations`, label: t('sections.company.links.projects') },
    { href: `/${locale}/contact`, label: t('sections.company.links.contact') },
    { href: `/${locale}/mentions-legales`, label: t('sections.company.links.legal') },
  ];

  const socialLinks = [
    {
      href: 'https://linkedin.com/company/atum-dev',
      icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      href: 'mailto:contact@atum.dev',
      icon: Mail,
      label: 'Email',
    },
    {
      href: 'https://www.atum.dev',
      icon: Globe,
      label: 'Website',
    },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo href={`/${locale}`} size="lg" className="mb-6" />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {t('description')}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gold-500 hover:text-black transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-display font-bold mb-6">
              {t('sections.services.title')}
            </h4>
            <nav className="space-y-3">
              {serviceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-400 text-sm hover:text-gold-500 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-display font-bold mb-6">
              {t('sections.company.title')}
            </h4>
            <nav className="space-y-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-gray-400 text-sm hover:text-gold-500 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-display font-bold mb-6">
              Contact
            </h4>
            <div className="space-y-4">
              <a
                href="mailto:contact@atum.dev"
                className="flex items-center gap-3 text-gray-400 text-sm hover:text-gold-500 transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
                contact@atum.dev
              </a>
              <a
                href="https://www.atum.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 text-sm hover:text-gold-500 transition-colors duration-200"
              >
                <Globe className="w-5 h-5" />
                www.atum.dev
              </a>
              <a
                href="https://linkedin.com/company/atum-dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-400 text-sm hover:text-gold-500 transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              {t('copyright', { year: currentYear })}
            </p>
            <p className="text-gray-500 text-sm flex items-center gap-2">
              {t('madeWith')}
              <span className="text-gold-500">♦</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
