'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
  Globe,
  Smartphone,
  Brain,
  Zap,
  Palette,
  MessageSquare,
  LucideIcon,
} from 'lucide-react';

interface ServiceCardProps {
  icon: 'web' | 'mobile' | 'ai' | 'automation' | 'design' | 'consulting';
  title: string;
  description: string;
  features?: string[];
  className?: string;
  image?: string;
}

const iconMap: Record<ServiceCardProps['icon'], LucideIcon> = {
  web: Globe,
  mobile: Smartphone,
  ai: Brain,
  automation: Zap,
  design: Palette,
  consulting: MessageSquare,
};

export function ServiceCard({
  icon,
  title,
  description,
  features,
  className,
  image,
}: ServiceCardProps) {
  const Icon = iconMap[icon];

  return (
    <article
      className={cn(
        'group relative p-6 md:p-8 rounded-2xl overflow-hidden',
        'bg-gray-900/50 border border-gray-800',
        'transition-all duration-500',
        'hover:bg-gray-800/50 hover:border-gold-500/50',
        'hover:shadow-[0_0_30px_rgba(201,163,13,0.15)]',
        className
      )}
    >
      {/* Background image */}
      {image && (
        <div className="absolute inset-0 z-0">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
        </div>
      )}

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 group-hover:to-transparent transition-all duration-500 z-[1]" />

      {/* Icon */}
      <div className="relative z-[2] mb-6">
        <div
          className={cn(
            'w-14 h-14 rounded-xl flex items-center justify-center',
            'bg-gold-500/10 text-gold-500',
            'transition-all duration-300',
            'group-hover:bg-gold-500/20 group-hover:scale-110'
          )}
        >
          <Icon className="w-7 h-7" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-[2]">
        <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-gold-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 leading-relaxed mb-4">{description}</p>

        {/* Features */}
        {features && features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-gray-500"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl z-[2]">
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-gold-500/10 to-transparent rotate-45 group-hover:from-gold-500/20 transition-all duration-500" />
      </div>
    </article>
  );
}
