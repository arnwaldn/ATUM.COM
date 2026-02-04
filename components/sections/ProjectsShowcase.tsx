'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FadeUp } from '@/components/animations/FadeUp';
import { TextReveal } from '@/components/animations/TextReveal';
import { StaggerChildren } from '@/components/animations/StaggerChildren';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { ArrowRight } from 'lucide-react';

interface ProjectsShowcaseProps {
  locale: string;
}

// Placeholder projects data
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Plateforme e-commerce moderne avec paiement intégré et gestion des stocks en temps réel.',
    category: 'Web',
    image: '/images/project-ecommerce.png',
    tags: ['Next.js', 'Stripe', 'Supabase'],
  },
  {
    id: 2,
    title: 'AI Assistant App',
    description: 'Application mobile d\'assistant IA avec reconnaissance vocale et génération de contenu.',
    category: 'Mobile',
    image: '/images/project-ai-assistant.png',
    tags: ['React Native', 'OpenAI', 'Firebase'],
  },
  {
    id: 3,
    title: 'Dashboard Analytics',
    description: 'Dashboard d\'analyse de données avec visualisations interactives et rapports automatisés.',
    category: 'Web',
    image: '/images/project-dashboard.png',
    tags: ['React', 'D3.js', 'PostgreSQL'],
  },
];

export function ProjectsShowcase({ locale }: ProjectsShowcaseProps) {
  const t = useTranslations('projects');

  return (
    <section className="py-24 md:py-32 bg-gray-900/30">
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

        {/* Projects Grid */}
        <StaggerChildren
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          childSelector=".project-card"
          stagger={0.15}
          scale={0.96}
          y={40}
          rotateX={4}
          blur={3}
          duration={1.3}
        >
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <ProjectCard
                title={project.title}
                description={project.description}
                category={project.category}
                image={project.image}
                tags={project.tags}
                href={`/${locale}/realisations/${project.id}`}
              />
            </div>
          ))}
        </StaggerChildren>

        {/* CTA */}
        <FadeUp className="text-center">
          <Link href={`/${locale}/realisations`}>
            <Button variant="outline" className="group">
              {t('viewAll')}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
