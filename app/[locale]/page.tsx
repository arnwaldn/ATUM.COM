import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesPreview } from '@/components/sections/ServicesPreview';
import { ProjectsShowcase } from '@/components/sections/ProjectsShowcase';
import { StatsSection } from '@/components/sections/StatsSection';
import { TechStack } from '@/components/sections/TechStack';
import { CTASection } from '@/components/sections/CTASection';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;

  return (
    <>
      <HeroSection locale={locale} />
      <ServicesPreview locale={locale} />
      <ProjectsShowcase locale={locale} />
      <StatsSection />
      <TechStack />
      <CTASection locale={locale} />
    </>
  );
}
