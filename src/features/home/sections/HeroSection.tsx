import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout';
import { routes, type Language } from '@/lib';
import type { HeroStat } from '@/types/models/home.types';

interface HeroSectionProps {
  lang: Language;
  title?: string;
  description?: string;
  badgeLabel?: string;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  heroStats?: HeroStat[];
}

const DEFAULT_STATS: HeroStat[] = [
  { number: '30+', label: 'Godina tradicije' },
  { number: '5', label: 'Centara' },
  { number: '50+', label: 'Projekata' },
  { number: '1000+', label: 'Vrsta u banci gena' },
];

export function HeroSection({
  lang,
  title,
  description,
  badgeLabel,
  primaryButtonLabel,
  secondaryButtonLabel,
  heroStats,
}: HeroSectionProps) {
  const stats = heroStats?.length ? heroStats : DEFAULT_STATS;
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
        <Image
          src="/assets/hero-bg.jpg"
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 hero-gradient opacity-85" />

      {/* DNA Pattern Overlay */}
      <div className="absolute inset-0 dna-helix opacity-30" />

      {/* Content */}
      <Container className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          {badgeLabel && (
            <div className="animate-fade-up">
              <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground text-sm font-medium backdrop-blur-sm">
                {badgeLabel}
              </span>
            </div>
          )}

          {/* Heading */}
          {title && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-primary-foreground leading-tight animate-fade-up delay-100">
              {title}
            </h1>
          )}

          {/* Subtitle */}
          {description && (
            <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 max-w-3xl mx-auto animate-fade-up delay-200 font-light">
              {description}
            </p>
          )}

          {/* CTA Buttons */}
          {(primaryButtonLabel || secondaryButtonLabel) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-up delay-300">
              {primaryButtonLabel && (
                <Button variant="hero" size="xl" className="group" asChild>
                  <Link href={routes.about.overview(lang)}>
                    {primaryButtonLabel}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              )}
              {secondaryButtonLabel && (
                <Button variant="heroOutline" size="xl" asChild>
                  <Link href={routes.projects.list(lang)}>
                    {secondaryButtonLabel}
                  </Link>
                </Button>
              )}
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 animate-fade-up delay-400">
            {stats.map((stat, i) => (
              <div key={`${stat.number}-${stat.label}-${i}`} className="text-center">
                <div className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground">
                  {stat.number}
                </div>
                <div className="text-primary-foreground/70 text-sm md:text-base mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <Link
        href={`#about`}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/70 hover:text-primary-foreground transition-colors animate-float"
      >
        <ChevronDown className="w-8 h-8" />
      </Link>
    </section>
  );
}
