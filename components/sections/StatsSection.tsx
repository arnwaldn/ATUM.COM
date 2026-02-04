'use client';

import { useTranslations } from 'next-intl';
import { FadeUp } from '@/components/animations/FadeUp';
import { Counter } from '@/components/animations/Counter';
import { cn } from '@/lib/utils';

export function StatsSection() {
  const t = useTranslations('stats');

  const stats = [
    {
      key: 'projects',
      value: 50,
      suffix: '+',
      label: t('projects.label'),
    },
    {
      key: 'clients',
      value: 35,
      suffix: '+',
      label: t('clients.label'),
    },
    {
      key: 'experience',
      value: 5,
      suffix: '+',
      label: t('experience.label'),
    },
    {
      key: 'technologies',
      value: 25,
      suffix: '+',
      label: t('technologies.label'),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900/50 to-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <FadeUp
              key={stat.key}
              delay={index * 0.1}
              className="text-center"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gold-500/10 rounded-full blur-3xl opacity-50" />

                {/* Counter */}
                <div className="relative">
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gradient mb-2">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-gray-400 text-sm md:text-base">
                    {stat.label}
                  </span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
