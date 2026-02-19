'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout';
import { routes, type Language } from '@/lib';
import { formatDate } from '@/lib/format';
import { getNewsRepository } from '@/repositories/factory';
import type { News } from '@/types/models';
import type { NewsListPageConfig } from '@/services/list-pages.service';

interface NewsSectionProps {
  lang: Language;
  title?: string;
  description?: string;
  badgeLabel?: string;
  buttonLabel?: string;
  readMoreButton?: string;
  initialNews?: News[];
  newsPageConfig?: NewsListPageConfig;
}

export function NewsSection({
  lang,
  title,
  description,
  badgeLabel,
  buttonLabel,
  readMoreButton,
  initialNews,
  newsPageConfig,
}: NewsSectionProps) {
  const displayTitle =
    title || badgeLabel || newsPageConfig?.title || 'Novosti';
  const displayDescription = description || newsPageConfig?.description || '';
  const displayButtonLabel =
    buttonLabel || newsPageConfig?.viewAll || 'Pogledaj sve';
  const displayReadMore =
    readMoreButton ||
    newsPageConfig?.readMore ||
    newsPageConfig?.learnMore ||
    'Pročitaj više';
  const [items, setItems] = useState<News[]>(initialNews ?? []);

  useEffect(() => {
    if (initialNews !== undefined) {
      setItems(initialNews);
      return;
    }
    const loadNews = async () => {
      try {
        const repository = getNewsRepository(lang);
        const newsData = await repository.findAll();
        setItems(newsData.slice(0, 4));
      } catch (error) {
        console.error('Failed to load news:', error);
      }
    };
    loadNews();
  }, [initialNews, lang]);

  return (
    <section id="news" className="py-24 bg-foreground relative">
      <Container>
        {/* Section Header - centered */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            {displayTitle}
          </h2>
          {displayDescription && (
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              {displayDescription}
            </p>
          )}
        </div>

        {/* News Grid - 3x2 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item: News) => (
            <div
              key={item.id}
              className="group bg-white overflow-visible flex flex-col h-full rounded-[4px]"
            >
              <div className="relative h-48 overflow-hidden flex-shrink-0 rounded-[4px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-5 flex flex-col flex-1 bg-white -mt-6 relative z-10 w-full rounded-[4px]">
                <span className="text-xs text-primary font-semibold uppercase tracking-wide mb-2">
                  {formatDate(item.date, lang)}
                </span>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 flex-1">
                  {item.excerpt}
                </p>
                <Link
                  href={routes.news.detail(lang, item.slug)}
                  className="inline-flex items-center gap-1 text-primary font-medium text-sm hover:text-primary/80 group/btn mt-2"
                >
                  {displayReadMore}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-8"
            asChild
          >
            <Link href={routes.news.list(lang)}>
              {displayButtonLabel}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
