import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Space_Grotesk, Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SmoothScrollProvider } from '@/components/layout/SmoothScrollProvider';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { CookieBanner } from '@/components/ui/CookieBanner';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import '@/app/globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: {
      default: t('title'),
      template: `%s | ATUM`,
    },
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'ATUM' }],
    creator: 'ATUM',
    metadataBase: new URL('https://www.atum.dev'),
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      url: 'https://www.atum.dev',
      siteName: 'ATUM',
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: '/images/og-image.svg',
          width: 1200,
          height: 630,
          alt: 'ATUM - Agence Digitale Premium',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/images/og-image.svg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="bg-black text-white antialiased">
        <GoogleAnalytics />
        <CustomCursor />
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <Header locale={locale} />
            <main className="min-h-screen">{children}</main>
            <Footer locale={locale} />
          </SmoothScrollProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#171717',
                border: '1px solid #262626',
                color: '#FAFAFA',
              },
            }}
          />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
