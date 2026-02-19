'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/layout';
import { PageHeader, Breadcrumbs } from '@/components/shared';
import { routes, type Language } from '@/lib';
import { urlForImage } from '@/lib/sanity';
import type { CentersListPageConfig } from '@/services/list-pages.service';
import type { Center } from '@/types/models';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const portableTextComponents: PortableTextComponents = {
  types: {
    figure: ({ value }) => {
      const src = value?.asset
        ? urlForImage(value as { asset?: { _ref?: string } })
        : '';
      if (!src) return null;
      return (
        <figure className="my-6">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={src}
              alt={value?.caption || ''}
              fill
              className="object-cover"
            />
          </div>
          {value?.caption && (
            <figcaption className="mt-2 text-sm text-muted-foreground text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

interface CenterDetailPageProps {
  lang: Language;
  slug: string;
  initialCenter: Center;
  initialRelatedCenters: Center[];
  pageConfig: CentersListPageConfig;
}

export function CenterDetailPage({
  lang,
  slug,
  initialCenter,
  initialRelatedCenters,
  pageConfig,
}: CenterDetailPageProps) {
  const [center] = useState<Center>(initialCenter);
  const [relatedCenters] = useState<Center[]>(initialRelatedCenters);

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: pageConfig.title, href: routes.centers.list(lang) },
            { label: center.title },
          ]}
        />
      </div>

      <Button variant="ghost" className="mb-6" asChild>
        <Link href={routes.centers.list(lang)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {pageConfig.back}
        </Link>
      </Button>

      <div className="relative h-96 overflow-hidden mb-12 rounded-[4px]">
        <Image
          src={center.image}
          alt={center.title}
          fill
          className="object-cover"
        />
      </div>

      <PageHeader title={center.title} description={center.excerpt} />

      <div className="grid lg:grid-cols-3 gap-12 py-8">
        <div className="lg:col-span-2">
          <div className="prose prose-lg max-w-none mb-8">
            {center.descriptionBlocks && center.descriptionBlocks.length > 0 ? (
              <PortableText
                value={center.descriptionBlocks as PortableTextBlock[]}
                components={portableTextComponents}
              />
            ) : center.description ? (
              <p>{center.description}</p>
            ) : null}
          </div>
        </div>
      </div>

      {relatedCenters.length > 0 && (
        <div className="py-12 border-t">
          <h2 className="font-serif text-3xl font-bold mb-8">
            {pageConfig.detailRelated}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedCenters.map((related) => (
              <Card key={related.id} className="card-elevated">
                <div className="relative h-48">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-serif">{related.title}</CardTitle>
                  <CardDescription>{related.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="link"
                    className="p-0 h-auto group/btn"
                    asChild
                  >
                    <Link
                      href={routes.centers.detail(lang, related.slug)}
                      className="inline-flex items-center gap-2"
                    >
                      {pageConfig.learnMore}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
