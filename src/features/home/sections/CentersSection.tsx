'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout';
import { routes, type Language } from '@/lib';
import { getCentersRepository } from '@/repositories/factory';
import type { Center } from '@/types/models';

const DEFAULT_TITLE = 'Centri i djelatnosti';
const DEFAULT_DESCRIPTION =
  'Kroz pet specijalizovanih centara, radimo na očuvanju i istraživanju genetičkih resursa i biodiverziteta.';

interface CentersSectionProps {
  lang: Language;
  title?: string;
  description?: string;
  badgeLabel?: string;
  buttonLabel?: string;
  readMoreButton?: string;
  initialCenters?: Center[];
}

export function CentersSection({
  lang,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  badgeLabel,
  buttonLabel,
  readMoreButton,
  initialCenters,
}: CentersSectionProps) {
  const [centers, setCenters] = useState<Center[]>(initialCenters ?? []);

  useEffect(() => {
    if (initialCenters !== undefined) {
      setCenters(initialCenters);
      return;
    }
    const loadCenters = async () => {
      try {
        const repository = getCentersRepository(lang);
        const data = await repository.findAll();
        setCenters(data.slice(0, 5));
      } catch (error) {
        console.error('Failed to load centers:', error);
      }
    };
    loadCenters();
  }, [initialCenters, lang]);

  return (
    <section id="centers" className="py-24 content-section-bg relative">
      <Container>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {badgeLabel ?? 'Centri'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            {title}
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        {/* Centers - alternira: slika lijevo/kartica desno, pa kartica lijevo/slika desno */}
        <div className="space-y-12">
          {centers.map((center, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={center.id}
                className="relative min-h-[320px] md:min-h-[380px] overflow-hidden rounded-[4px]"
              >
                {/* Image - lijevo ili desno ovisno o indexu */}
                <div
                  className={`absolute inset-0 ring-[0.5px] ring-border/60 rounded-[4px] overflow-hidden ${
                    isReversed ? 'md:left-[38%]' : 'md:right-[38%]'
                  }`}
                >
                  <Image
                    src={center.image}
                    alt={center.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 100vw"
                  />
                  <Link
                    href={routes.centers.detail(lang, center.slug)}
                    className={`absolute bottom-4 w-10 h-10 rounded bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors z-10 ${
                      isReversed ? 'right-4' : 'left-4'
                    }`}
                    aria-label={center.title}
                  >
                    <Plus className="w-5 h-5" />
                  </Link>
                </div>

                {/* White card - desno ili lijevo ovisno o indexu */}
                <div
                  className={`relative md:absolute md:top-1/2 md:-translate-y-1/2 md:w-[52%] md:max-w-xl w-full mt-4 md:mt-0 z-10 ${
                    isReversed ? 'md:left-[4%]' : 'md:right-[4%]'
                  }`}
                >
                  <div className="bg-white rounded-[4px] shadow-lg p-8 md:p-10 ring-[0.5px] ring-border/40">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-4">
                      {center.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {center.excerpt}
                    </p>
                    <Link
                      href={routes.centers.detail(lang, center.slug)}
                      className="inline-flex items-center gap-1 text-primary font-medium underline underline-offset-4 hover:text-primary/80 transition-colors"
                    >
                      {readMoreButton ?? buttonLabel ?? 'Saznaj više'}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href={routes.centers.list(lang)}>
              {buttonLabel ?? 'Pogledaj sve'}
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
