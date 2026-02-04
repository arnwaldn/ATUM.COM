import { getTranslations } from 'next-intl/server';
import { FadeUp } from '@/components/animations/FadeUp';
import { StaggerChildren } from '@/components/animations/StaggerChildren';
import { Badge } from '@/components/ui/Badge';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { CTASection } from '@/components/sections/CTASection';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  return {
    title: locale === 'fr' ? 'Réalisations' : 'Projects',
    description: t('subtitle'),
  };
}

// Placeholder projects data
const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Plateforme e-commerce moderne avec paiement intégré et gestion des stocks en temps réel.',
    descriptionEn: 'Modern e-commerce platform with integrated payment and real-time inventory management.',
    category: 'Web',
    image: '/images/project-placeholder-1.svg',
    tags: ['Next.js', 'Stripe', 'Supabase'],
  },
  {
    id: 2,
    title: 'AI Assistant App',
    description: 'Application mobile d\'assistant IA avec reconnaissance vocale et génération de contenu.',
    descriptionEn: 'AI assistant mobile app with voice recognition and content generation.',
    category: 'Mobile',
    image: '/images/project-placeholder-2.svg',
    tags: ['React Native', 'OpenAI', 'Firebase'],
  },
  {
    id: 3,
    title: 'Dashboard Analytics',
    description: 'Dashboard d\'analyse de données avec visualisations interactives et rapports automatisés.',
    descriptionEn: 'Data analytics dashboard with interactive visualizations and automated reports.',
    category: 'Web',
    image: '/images/project-placeholder-3.svg',
    tags: ['React', 'D3.js', 'PostgreSQL'],
  },
  {
    id: 4,
    title: 'Smart Home Controller',
    description: 'Application de contrôle domotique avec automatisations intelligentes et intégration IoT.',
    descriptionEn: 'Smart home control app with intelligent automations and IoT integration.',
    category: 'Mobile',
    image: '/images/project-placeholder-4.svg',
    tags: ['Flutter', 'MQTT', 'Node.js'],
  },
  {
    id: 5,
    title: 'Marketing Automation',
    description: 'Plateforme d\'automatisation marketing avec IA pour personnalisation des campagnes.',
    descriptionEn: 'Marketing automation platform with AI for campaign personalization.',
    category: 'AI',
    image: '/images/project-placeholder-5.svg',
    tags: ['Python', 'TensorFlow', 'AWS'],
  },
  {
    id: 6,
    title: 'Brand Identity Design',
    description: 'Refonte complète de l\'identité visuelle et design system pour une startup tech.',
    descriptionEn: 'Complete visual identity redesign and design system for a tech startup.',
    category: 'Design',
    image: '/images/project-placeholder-6.svg',
    tags: ['Figma', 'Brand Strategy', 'UI/UX'],
  },
];

export default async function RealisationsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('projects');

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

      {/* Projects Grid */}
      <section className="py-20 bg-gray-900/30">
        <div className="container mx-auto px-4 md:px-6">
          <StaggerChildren
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            childSelector=".project-card"
            stagger={0.1}
          >
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <ProjectCard
                  title={project.title}
                  description={locale === 'en' ? project.descriptionEn : project.description}
                  category={project.category}
                  image={project.image}
                  tags={project.tags}
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
