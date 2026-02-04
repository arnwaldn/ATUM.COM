'use client';

import { useTranslations } from 'next-intl';
import { FadeUp } from '@/components/animations/FadeUp';
import { TextReveal } from '@/components/animations/TextReveal';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

// Tech stack logos/names
const technologies = [
  { name: 'Next.js', category: 'frontend' },
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'frontend' },
  { name: 'Tailwind CSS', category: 'frontend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Python', category: 'backend' },
  { name: 'Supabase', category: 'backend' },
  { name: 'PostgreSQL', category: 'backend' },
  { name: 'OpenAI', category: 'ai' },
  { name: 'LangChain', category: 'ai' },
  { name: 'React Native', category: 'mobile' },
  { name: 'Flutter', category: 'mobile' },
  { name: 'Figma', category: 'design' },
  { name: 'Framer Motion', category: 'design' },
  { name: 'GSAP', category: 'design' },
  { name: 'Vercel', category: 'devops' },
  { name: 'Docker', category: 'devops' },
  { name: 'GitHub', category: 'devops' },
];

export function TechStack() {
  const t = useTranslations('techStack');

  // Duplicate for infinite scroll
  const duplicatedTech = [...technologies, ...technologies];

  return (
    <section className="py-20 bg-black overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="text-center max-w-3xl mx-auto">
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
      </div>

      {/* Infinite scroll marquee */}
      <div className="relative">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

        {/* Scrolling container */}
        <div className="flex animate-marquee">
          {duplicatedTech.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className={cn(
                'flex-shrink-0 mx-4 px-6 py-3',
                'bg-gray-900/50 border border-gray-800 rounded-xl',
                'hover:border-gold-500/30 hover:bg-gray-800/50',
                'transition-all duration-300 cursor-default'
              )}
            >
              <span className="text-gray-300 font-medium whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
