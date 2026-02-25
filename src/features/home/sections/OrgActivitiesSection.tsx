'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Plus, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout';
import { orgActivitiesSectionRoute, routes, type Language } from '@/lib';
import type { OrgActivitiesOverviewCard } from '@/types/models/home.types';

const DEFAULT_TITLE = 'Organizacija i aktivnosti';
const DEFAULT_DESCRIPTION =
  'Banka gena, Botanička bašta, Poljske kolekcije, Laboratorije i Zaštićeno područje Spomenik parkovske arhitekture „Univerzitetski grad".';

const PLACEHOLDER_IMAGE = '/placeholder.svg';

interface OrgActivitiesSectionProps {
  lang: Language;
  title?: string;
  description?: string;
  badgeLabel?: string;
  buttonLabel?: string;
  readMoreButton?: string;
  orgActivitiesCards?: OrgActivitiesOverviewCard[];
}

export function OrgActivitiesSection({
  lang,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  badgeLabel,
  buttonLabel,
  readMoreButton,
  orgActivitiesCards = [],
}: OrgActivitiesSectionProps) {
  if (orgActivitiesCards.length === 0) return null;

  return (
    <section id="organizacija" className="py-24 content-section-bg relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {badgeLabel ?? 'Organizacija i aktivnosti'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            {title}
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        {/* Kartice - slika lijevo, bijeli boks desno preko slike (alternira lijevo/desno) */}
        <div className="space-y-12">
          {orgActivitiesCards.map((card, index) => {
            const isReversed = index % 2 === 1;
            const href = orgActivitiesSectionRoute(lang, card.sectionSlug);
            const imageSrc = card.image || PLACEHOLDER_IMAGE;
            return (
              <div
                key={`${card.title}-${card.sectionSlug}`}
                className="relative min-h-[320px] md:min-h-[380px] overflow-hidden rounded-[4px] max-md:flex max-md:flex-col"
              >
                {/* Slika - na mobilnom gore, na md+ absolute lijevo/desno */}
                <div
                  className={`absolute inset-0 ring-[0.5px] ring-border/60 rounded-[4px] overflow-hidden max-md:relative max-md:inset-auto max-md:w-full max-md:aspect-[4/3] max-md:shrink-0 ${
                    isReversed ? 'md:left-[38%]' : 'md:right-[38%]'
                  }`}
                >
                  <Image
                    src={imageSrc}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 100vw"
                  />
                  <Link
                    href={href}
                    className={`absolute bottom-4 w-10 h-10 rounded bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors z-10 ${
                      isReversed ? 'right-4' : 'left-4'
                    }`}
                    aria-label={card.title}
                  >
                    <Plus className="w-5 h-5" />
                  </Link>
                </div>

                {/* Bijeli boks - na mobilnom ispod slike, na md+ desno ili lijevo preko slike */}
                <div
                  className={`relative md:absolute md:top-1/2 md:-translate-y-1/2 md:w-[52%] md:max-w-xl w-full mt-4 md:mt-0 z-10 ${
                    isReversed ? 'md:left-[4%]' : 'md:right-[4%]'
                  }`}
                >
                  <div className="bg-white rounded-[4px] shadow-lg p-8 md:p-10 ring-[0.5px] ring-border/40">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground mb-4">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {card.description}
                    </p>
                    <Link
                      href={href}
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
            <Link href={routes.orgActivities.overview(lang)}>
              {buttonLabel ?? 'Pogledaj sve'}
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
