'use client';

import { cn } from '@/lib/utils';
import {
  Award,
  Lightbulb,
  Users,
  Eye,
  Shield,
  LucideIcon,
} from 'lucide-react';

interface ValueCardProps {
  icon: 'excellence' | 'innovation' | 'collaboration' | 'transparency' | 'reliability';
  title: string;
  description: string;
  className?: string;
}

const iconMap: Record<ValueCardProps['icon'], LucideIcon> = {
  excellence: Award,
  innovation: Lightbulb,
  collaboration: Users,
  transparency: Eye,
  reliability: Shield,
};

export function ValueCard({
  icon,
  title,
  description,
  className,
}: ValueCardProps) {
  const Icon = iconMap[icon];

  return (
    <article
      className={cn(
        'group relative p-6 rounded-xl',
        'bg-gradient-to-br from-gray-900/80 to-gray-900/40',
        'border border-gray-800',
        'transition-all duration-300',
        'hover:border-gold-500/30',
        className
      )}
    >
      {/* Icon */}
      <div className="mb-4">
        <div
          className={cn(
            'w-12 h-12 rounded-lg flex items-center justify-center',
            'bg-gold-500/10 text-gold-500',
            'transition-all duration-300',
            'group-hover:bg-gold-500/20'
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>

      {/* Content */}
      <h3 className="text-lg font-display font-bold text-white mb-2 group-hover:text-gold-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute -top-8 -right-8 w-16 h-16 bg-gold-500/10 rotate-45" />
      </div>
    </article>
  );
}
