import { getTranslations } from 'next-intl/server';
import { FadeUp } from '@/components/animations/FadeUp';
import { Badge } from '@/components/ui/Badge';
import { ContactForm } from '@/components/forms/ContactForm';
import { Mail, Globe, Linkedin, Clock } from 'lucide-react';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: 'Contact',
    description: t('subtitle'),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('contact');

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-black">
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

      {/* Contact Section */}
      <section className="py-12 pb-24 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <FadeUp>
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
                  <ContactForm locale={locale} />
                </div>
              </FadeUp>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <FadeUp delay={0.2}>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-white font-display font-bold mb-6">
                      {t('info.title')}
                    </h3>

                    {/* Contact items */}
                    <div className="space-y-4">
                      <a
                        href="mailto:contact@atum.dev"
                        className="flex items-center gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-gold-500/30 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-500 group-hover:bg-gold-500/20 transition-colors">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">{t('info.email.label')}</p>
                          <p className="text-white font-medium">{t('info.email.value')}</p>
                        </div>
                      </a>

                      <a
                        href="https://www.atum.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-gold-500/30 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-500 group-hover:bg-gold-500/20 transition-colors">
                          <Globe className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">{t('info.website.label')}</p>
                          <p className="text-white font-medium">{t('info.website.value')}</p>
                        </div>
                      </a>

                      <a
                        href="https://linkedin.com/company/atum-dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-gold-500/30 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-500 group-hover:bg-gold-500/20 transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">{t('info.linkedin.label')}</p>
                          <p className="text-white font-medium">{t('info.linkedin.value')}</p>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="p-6 bg-gradient-to-br from-gold-500/10 to-transparent border border-gold-500/20 rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-gold-500/20 flex items-center justify-center text-gold-500">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium mb-2">
                          {t('info.availability.title')}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {t('info.availability.description')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
