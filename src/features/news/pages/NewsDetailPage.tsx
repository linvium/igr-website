'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/layout';
import { PageHeader, Breadcrumbs } from '@/components/shared';
import { routes, type Language } from '@/lib';
import { formatDate } from '@/lib/format';
import { urlForImage } from '@/lib/sanity';
import type { NewsListPageConfig } from '@/services/list-pages.service';
import type { News } from '@/types/models';
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
          <div className="relative aspect-video rounded-lg overflow-hidden">
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

interface NewsDetailPageProps {
  lang: Language;
  slug: string;
  initialNews: News;
  initialRelatedNews?: News[];
  pageConfig: NewsListPageConfig;
}

export function NewsDetailPage({
  lang,
  slug,
  initialNews: item,
  initialRelatedNews = [],
  pageConfig,
}: NewsDetailPageProps) {
  const relatedNews = initialRelatedNews;

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: pageConfig.title, href: routes.news.list(lang) },
            { label: item.title },
          ]}
        />
      </div>

      <Button variant="ghost" className="mb-6" asChild>
        <Link href={routes.news.list(lang)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {pageConfig.back}
        </Link>
      </Button>

      {item.image ? (
        <div className="relative h-96 rounded-[4px] overflow-hidden mb-12">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-96 rounded-2xl bg-muted mb-12 flex items-center justify-center">
          <span className="text-muted-foreground">
            {pageConfig.noImageLabel}
          </span>
        </div>
      )}

      <PageHeader title={item.title} description={item.excerpt} />

      <div className="grid lg:grid-cols-2 gap-12 py-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-6">
            <Badge className="capitalize">
              {pageConfig.categories.find((c) => c.slug === item.category)
                ?.name ?? item.category}
            </Badge>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(item.date, lang)}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            {item.bodyBlocks && item.bodyBlocks.length > 0 ? (
              <PortableText
                value={item.bodyBlocks as PortableTextBlock[]}
                components={portableTextComponents}
              />
            ) : item.body ? (
              <p>{item.body}</p>
            ) : null}
          </div>

          {item.externalLink && (
            <p className="mb-8">
              {(item.externalLinkLabel || pageConfig.externalLinkLabel)?.replace(
                ':',
                ' →'
              )}
              {' '}
              <a
                href={item.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium underline underline-offset-4 hover:text-primary/80"
              >
                Link
              </a>
            </p>
          )}

          {item.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">
                {pageConfig.detailTags}
              </h3>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {relatedNews.length > 0 && (
        <div className="py-12 border-t">
          <h2 className="font-serif text-3xl font-bold mb-8">
            {pageConfig.detailRelated}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedNews.map((related) => (
              <Card
                key={related.id}
                className="card-elevated rounded-[4px] overflow-hidden"
              >
                <div className="relative h-48 rounded-[4px]">
                  {related.image ? (
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">
                        {pageConfig.noImageLabel}
                      </span>
                    </div>
                  )}
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
                      href={routes.news.detail(lang, related.slug)}
                      className="inline-flex items-center gap-2 text-primary"
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
