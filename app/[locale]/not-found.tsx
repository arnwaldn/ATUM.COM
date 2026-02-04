import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Home } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('404');

  return (
    <section className="min-h-screen flex items-center justify-center bg-black">
      <div className="container mx-auto px-4 md:px-6 text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <span className="text-[150px] md:text-[200px] font-display font-bold text-gray-900">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl md:text-8xl font-display font-bold text-gradient">
              404
            </span>
          </div>
        </div>

        {/* Content */}
        <h1 className="text-2xl md:text-4xl font-display font-bold text-white mb-4">
          {t('title')}
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          {t('description')}
        </p>

        {/* CTA */}
        <Link href="/">
          <Button size="lg" className="group">
            <Home className="mr-2 w-5 h-5" />
            {t('cta')}
          </Button>
        </Link>
      </div>
    </section>
  );
}
