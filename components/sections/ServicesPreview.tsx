'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FadeUp } from '@/components/animations/FadeUp';
import { TextReveal } from '@/components/animations/TextReveal';
import { StaggerChildren } from '@/components/animations/StaggerChildren';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { ArrowRight } from 'lucide-react';

interface ServicesPreviewProps {
  locale: string;
}

const serviceKeys = ['web', 'mobile', 'ai', 'automation', 'design', 'consulting'] as const;

// Images de fond pour chaque service
const serviceImages: Partial<Record<typeof serviceKeys[number], string>> = {
  web: '/images/service-web.png',
  mobile: '/images/service-mobile.png',
  ai: '/images/service-ai.png',
  automation: '/images/service-automation.png',
  design: '/images/service-design.png',
  consulting: '/images/service-consulting.png',
};

export function ServicesPreview({ locale }: ServicesPreviewProps) {
  const t = useTranslations('services');

  return (
    <section id="services-preview" className="py-24 md:py-32 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <FadeUp>
            <Badge variant="gold" className="mb-6">
              {t('badge')}
            </Badge>
          </FadeUp>
          <TextReveal as="h2" effect="chars" className="text-white mb-6" stagger={0.02}>
            {t('title')}
          </TextReveal>
          <TextReveal as="p" effect="blur" className="text-lg text-gray-400" delay={0.2}>
            {t('subtitle')}
          </TextReveal>
        </div>

        {/* Services Grid */}
        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          childSelector=".service-card"
          stagger={0.12}
          scale={0.95}
          y={50}
          rotateX={5}
          blur={4}
          duration={1.2}
        >
          {serviceKeys.map((key) => (
            <div key={key} className="service-card">
              <ServiceCard
                icon={key}
                title={t(`items.${key}.title`)}
                description={t(`items.${key}.description`)}
                features={[
                  t(`items.${key}.features.0`),
                  t(`items.${key}.features.1`),
                  t(`items.${key}.features.2`),
                  t(`items.${key}.features.3`),
                ]}
                image={serviceImages[key]}
              />
            </div>
          ))}
        </StaggerChildren>

        {/* CTA */}
        <FadeUp className="text-center">
          <Link href={`/${locale}/services`}>
            <Button variant="outline" className="group">
              {t('cta')}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
