'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FadeUp } from '@/components/animations/FadeUp';
import { TextReveal } from '@/components/animations/TextReveal';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Clock, MessageSquare, FileText } from 'lucide-react';

interface CTASectionProps {
  locale: string;
}

export function CTASection({ locale }: CTASectionProps) {
  const t = useTranslations('cta');

  const features = [
    {
      icon: MessageSquare,
      text: t('features.consultation'),
    },
    {
      icon: Clock,
      text: t('features.response'),
    },
    {
      icon: FileText,
      text: t('features.quote'),
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-black to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <Badge variant="gold" className="mb-6">
              {t('badge')}
            </Badge>
          </FadeUp>

          <TextReveal as="h2" effect="chars" className="text-white mb-6" stagger={0.02}>
            {t('title')}
          </TextReveal>

          <TextReveal as="p" effect="blur" className="text-lg text-gray-400 mb-8" delay={0.2}>
            {t('subtitle')}
          </TextReveal>

          {/* Features */}
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <feature.icon className="w-5 h-5 text-gold-500" />
                  <span className="text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* CTA Button */}
          <FadeUp delay={0.4}>
            <MagneticButton>
              <Link href={`/${locale}/contact`}>
                <Button size="lg" className="group">
                  {t('button')}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </MagneticButton>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
