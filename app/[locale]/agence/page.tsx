import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { FadeUp } from '@/components/animations/FadeUp';
import { StaggerChildren } from '@/components/animations/StaggerChildren';
import { Badge } from '@/components/ui/Badge';
import { ValueCard } from '@/components/ui/ValueCard';
import { CTASection } from '@/components/sections/CTASection';
import {
  Search,
  Palette,
  Code2,
  TestTube,
  Rocket,
  Headphones
} from 'lucide-react';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: locale === 'fr' ? 'Agence' : 'About',
    description: t('subtitle'),
  };
}

const valueKeys = ['excellence', 'innovation', 'collaboration', 'transparency', 'reliability'] as const;

const methodSteps = [
  { key: 'discovery', icon: Search },
  { key: 'design', icon: Palette },
  { key: 'development', icon: Code2 },
  { key: 'testing', icon: TestTube },
  { key: 'launch', icon: Rocket },
  { key: 'support', icon: Headphones },
];

export default async function AgencePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('about');

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-black relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <FadeUp>
                <Badge variant="gold" className="mb-6">
                  {t('badge')}
                </Badge>
              </FadeUp>
              <FadeUp delay={0.1}>
                <h1 className="text-white mb-6">{t('title')}</h1>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="text-xl text-gray-400 mb-8">{t('subtitle')}</p>
              </FadeUp>
              <FadeUp delay={0.3}>
                <div className="prose prose-invert">
                  <h3 className="text-gold-500 font-display">{t('story.title')}</h3>
                  <p className="text-gray-400">{t('story.content')}</p>
                </div>
              </FadeUp>
            </div>

            {/* Logo/Image */}
            <FadeUp delay={0.4} className="flex justify-center lg:justify-end">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent rounded-full blur-2xl" />
                <Image
                  src="/images/logo-atum.png"
                  alt="ATUM Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4 md:px-6">
          <FadeUp className="text-center mb-12">
            <h2 className="text-white">{t('values.title')}</h2>
          </FadeUp>

          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            childSelector=".value-card"
            stagger={0.1}
          >
            {valueKeys.map((key) => (
              <div key={key} className="value-card">
                <ValueCard
                  icon={key}
                  title={t(`values.items.${key}.title`)}
                  description={t(`values.items.${key}.description`)}
                />
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <FadeUp className="text-center mb-16">
            <h2 className="text-white">{t('method.title')}</h2>
          </FadeUp>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

            <StaggerChildren
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8"
              childSelector=".method-step"
              stagger={0.1}
            >
              {methodSteps.map((step, index) => (
                <div key={step.key} className="method-step text-center">
                  {/* Step number */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gray-900 border-2 border-gold-500/30 flex items-center justify-center relative z-10">
                      <step.icon className="w-7 h-7 text-gold-500" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center text-xs font-bold text-black">
                      {index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <h4 className="text-white font-display font-bold mb-2">
                    {t(`method.steps.${step.key}.title`)}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {t(`method.steps.${step.key}.description`)}
                  </p>
                </div>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection locale={locale} />
    </>
  );
}
