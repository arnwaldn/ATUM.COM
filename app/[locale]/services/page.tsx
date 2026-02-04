import { getTranslations } from 'next-intl/server';
import { FadeUp } from '@/components/animations/FadeUp';
import { StaggerChildren } from '@/components/animations/StaggerChildren';
import { Badge } from '@/components/ui/Badge';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { CTASection } from '@/components/sections/CTASection';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'services' });
  return {
    title: locale === 'fr' ? 'Services' : 'Services',
    description: t('subtitle'),
  };
}

const serviceKeys = ['web', 'mobile', 'ai', 'automation', 'design', 'consulting'] as const;

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('services');

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <FadeUp>
              <Badge variant="gold" className="mb-6">
                {t('badge')}
              </Badge>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h1 className="text-white mb-6">{t('title')}</h1>
            </FadeUp>
            <FadeUp delay={0.2}>
              <p className="text-xl text-gray-400">{t('subtitle')}</p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4 md:px-6">
          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            childSelector=".service-card"
            stagger={0.1}
          >
            {serviceKeys.map((key) => (
              <div key={key} id={key} className="service-card">
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
                />
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection locale={locale} />
    </>
  );
}
