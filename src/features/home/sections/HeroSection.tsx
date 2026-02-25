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
  backgroundImage?: string;
}

const DEFAULT_HERO_BG = '/assets/hero-bg.jpg';

export function HeroSection({
  lang,
  title,
  description,
  primaryButtonLabel,
  backgroundImage,
}: HeroSectionProps) {
  const bgSrc = backgroundImage || DEFAULT_HERO_BG;
  return (
    <section className="relative min-h-[65vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
        <Image
          src={bgSrc}
          alt="Hero background"
          fill
          className="object-cover"
          priority
          quality={85}
          sizes="100vw"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 hero-gradient opacity-90" />

      {/* Content - shifted right */}
      <Container className="relative z-10 mr-auto ml-[10%]">
        <div className="max-w-2xl ml-auto md:ml-[20%] lg:ml-[15%] space-y-6 text-left">
          {title && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-up">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-lg md:text-xl text-white/90 animate-fade-up delay-100">
              {description}
            </p>
          )}
          {primaryButtonLabel && (
            <div className="pt-4 animate-fade-up delay-200">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-8 h-12 text-base font-medium"
                asChild
              >
                <Link href={routes.about.overview(lang)} className="group">
                  {primaryButtonLabel}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </Container>

      <Link
        href={`#centers`}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-float"
      >
        <ChevronDown className="w-8 h-8" />
      </Link>
    </section>
  );
}
