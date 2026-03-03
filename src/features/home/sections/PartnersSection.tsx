'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout';
import { routes, type Language } from '@/lib';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import type { HomePartner } from '@/types/models';

interface PartnersSectionProps {
  lang: Language;
  title?: string;
  description?: string;
  buttonLabel?: string;
  partners: HomePartner[];
}

export function PartnersSection({
  lang,
  title = 'Naši partneri',
  description,
  buttonLabel,
  partners,
}: PartnersSectionProps) {

  if (!partners?.length) return null;

  return (
    <section
      id="partners"
      className="py-24 content-section-bg relative"
    >
      <Container className="relative">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-muted-foreground">{description}</p>
          )}
        </div>
        <div className="flex flex-wrap justify-center items-start gap-10 sm:gap-12">
          {partners.map((partner) => (
            <div
              key={partner.name || partner.logo}
              className="flex flex-col items-center gap-3 w-28 sm:w-32 group"
            >
              {partner.url ? (
                <Link
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-secondary/50 flex items-center justify-center overflow-hidden group-hover:opacity-100 opacity-90 transition-opacity"
                >
                  <Image
                    src={partner.logo || PLACEHOLDER_IMAGE}
                    alt={partner.name}
                    width={96}
                    height={96}
                    className="object-contain p-2"
                  />
                </Link>
              ) : (
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-secondary/50 flex items-center justify-center overflow-hidden">
                  <Image
                    src={partner.logo || PLACEHOLDER_IMAGE}
                    alt={partner.name}
                    width={96}
                    height={96}
                    className="object-contain p-2"
                  />
                </div>
              )}
              <span className="text-sm font-medium text-muted-foreground text-center">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
        {buttonLabel && (
          <div className="mt-10 text-center">
            <Button variant="outline" asChild>
              <Link href={routes.about.partners(lang)}>{buttonLabel}</Link>
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
