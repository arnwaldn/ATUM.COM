import { getTranslations } from 'next-intl/server';
import { FadeUp } from '@/components/animations/FadeUp';
import { Badge } from '@/components/ui/Badge';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

const sectionKeys = ['editor', 'hosting', 'intellectual', 'data', 'cookies'] as const;

export default async function LegalPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('legal');

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <FadeUp>
              <Badge variant="gold" className="mb-6">
                Legal
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

      {/* Content Section */}
      <section className="py-12 pb-24 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <FadeUp>
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 md:p-12 space-y-10">
                {sectionKeys.map((key) => (
                  <div key={key}>
                    <h2 className="text-xl font-display font-bold text-white mb-4">
                      {t(`sections.${key}.title`)}
                    </h2>
                    <div className="text-gray-400 whitespace-pre-line leading-relaxed">
                      {t(`sections.${key}.content`)}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
