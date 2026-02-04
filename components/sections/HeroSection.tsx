'use client';

import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { MagneticButton } from '@/components/animations/MagneticButton';
import { TextScramble } from '@/components/animations/TextScramble';
import { AnimatedLogo } from '@/components/ui/AnimatedLogo';
import { useReducedMotion } from '@/hooks';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  locale: string;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('hero');
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Logo is now animated via video - no GSAP animation needed
      // Wait for video to play before animating text
      tl.to({}, { duration: 1.5 });

      // Title lines are now animated by TextScramble component
      // Just add a small delay for subtitle to sync
      tl.to({}, { duration: 0.8 });

      // Animate subtitle
      tl.from(
        '.hero-subtitle',
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
        },
        '-=0.6'
      );

      // Animate CTA buttons
      tl.from(
        '.hero-cta',
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
        },
        '-=0.4'
      );

      // Animate scroll indicator
      tl.from(
        '.hero-scroll',
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
        },
        '-=0.2'
      );
    }, container);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const scrollToContent = () => {
    const nextSection = document.getElementById('services-preview');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Background - Pure deep black */}
      <div className="absolute inset-0" style={{ backgroundColor: '#000000' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        {/* Hero Logo - Animated on first load */}
        <div className="hero-logo mb-6 md:mb-8 flex justify-center">
          <AnimatedLogo
            className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80"
            videoClassName="w-full h-full scale-90"
            fallbackClassName="w-full h-full mx-auto"
            cropEdges
          />
        </div>

        {/* Title */}
        <h1 className="mb-8">
          <TextScramble
            as="span"
            className="hero-title-line block text-white"
            delay={300}
            duration={1000}
          >
            {t('title.line1')}
          </TextScramble>
          <TextScramble
            as="span"
            className="hero-title-line block text-gradient"
            delay={600}
            duration={1200}
          >
            {t('title.highlight')}
          </TextScramble>
          <TextScramble
            as="span"
            className="hero-title-line block text-white"
            delay={900}
            duration={1000}
          >
            {t('title.line2')}
          </TextScramble>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
          {t('subtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <MagneticButton className="hero-cta">
            <Link href={`/${locale}/contact`}>
              <Button size="lg" className="group">
                {t('cta.primary')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </MagneticButton>
          <MagneticButton className="hero-cta">
            <Link href={`/${locale}/services`}>
              <Button variant="outline" size="lg">
                {t('cta.secondary')}
              </Button>
            </Link>
          </MagneticButton>
        </div>

        {/* Scroll Indicator */}
        <div className="hero-scroll">
          <ScrollIndicator
            text={t('scrollIndicator')}
            onClick={scrollToContent}
          />
        </div>
      </div>
    </section>
  );
}
