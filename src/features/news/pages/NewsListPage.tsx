'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout';
import {
  PageHeader,
  Breadcrumbs,
  FilterPills,
  EmptyState,
} from '@/components/shared';
import { routes, type Language } from '@/lib';
import { formatDateShort } from '@/lib/format';
import type { NewsListPageConfig } from '@/services/list-pages.service';
import type { News, NewsCategory } from '@/types/models';
import type { FilterOption } from '@/components/shared/FilterPills';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface NewsListPageProps {
  lang: Language;
  initialNews?: News[];
  pageConfig: NewsListPageConfig;
}

export function NewsListPage({
  lang,
  initialNews = [],
  pageConfig,
}: NewsListPageProps) {
  const [allNews] = useState<News[]>(initialNews);
  const sveCategory = pageConfig.categories.find(
    (c) => c.slug === 'sve' || c.slug === 'all',
  );
  const allValue = sveCategory ? 'sve' : 'all';
  // Vući iz kategorija kao ostale – bez hardkodovanja
  const allLabel = sveCategory?.name || pageConfig.allCategoryLabel;
  const [selectedCategory, setSelectedCategory] = useState<
    NewsCategory | 'all' | 'sve'
  >(allValue);
  const [searchQuery, setSearchQuery] = useState('');

  const categoryOptions: FilterOption[] = [
    { value: allValue, label: allLabel },
    ...pageConfig.categories
      .filter((c) => c.slug !== 'all' && c.slug !== 'sve')
      .map((c) => ({ value: c.slug, label: c.name })),
  ];

  const featured = allNews.find((n) => n.featured);
  const regularNews = allNews.filter((n) => !n.featured);

  const filteredNews = regularNews.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      selectedCategory === 'sve' ||
      item.category?.toLowerCase() === selectedCategory?.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs lang={lang} items={[{ label: pageConfig.title }]} />
      </div>

      <PageHeader
        title={pageConfig.title}
        description={pageConfig.description}
      />

      {/* Featured News */}
      {featured && (
        <div className="py-8 pt-4">
          <h2 className="font-serif text-2xl font-semibold mb-6">
            {pageConfig.featured}
          </h2>
          <Card className="group card-elevated overflow-hidden rounded-[4px]">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-full">
                {featured.image ? (
                  <Image
                    src={featured.image}
                    alt={featured.title}
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
              <CardHeader className="p-8">
                <span className="w-fit inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3 capitalize">
                  {pageConfig.categories.find(
                    (c) => c.slug === featured.category,
                  )?.name ?? featured.category}
                </span>
                <CardTitle className="text-2xl font-serif mb-3">
                  {featured.title}
                </CardTitle>
                <CardDescription className="mb-4">
                  {featured.excerpt}
                </CardDescription>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDateShort(featured.date, lang)}</span>
                </div>
                <Button asChild className="group/btn">
                  <Link
                    href={routes.news.detail(lang, featured.slug)}
                    className="inline-flex items-center gap-2"
                  >
                    {pageConfig.readMore}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardHeader>
            </div>
          </Card>
        </div>
      )}

      {/* Filters */}
      <div className="space-y-6 py-8">
        <div>
          <h3 className="text-sm font-medium mb-2">
            {pageConfig.categoryFilterLabel}
          </h3>
          <FilterPills
            options={categoryOptions}
            selected={
              selectedCategory === 'all' || selectedCategory === 'sve'
                ? [allValue]
                : [selectedCategory]
            }
            onSelect={(value) =>
              setSelectedCategory(value as NewsCategory | 'all' | 'sve')
            }
          />
        </div>
      </div>

      {/* News List */}
      {filteredNews.length === 0 ? (
        <EmptyState
          title={pageConfig.emptyTitle}
          description={pageConfig.emptyDescription}
        />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {filteredNews.map((item) => (
            <Card
              key={item.id}
              className="group card-elevated overflow-hidden rounded-[4px]"
            >
              <Link
                href={routes.news.detail(lang, item.slug)}
                className="block"
              >
                <div className="relative h-48">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.title}
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
              </Link>
              <CardHeader>
                <span className="w-fit inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-2 capitalize">
                  {pageConfig.categories.find((c) => c.slug === item.category)
                    ?.name ?? item.category}
                </span>
                <CardTitle className="font-serif group-hover:text-primary transition-colors">
                  <Link
                    href={routes.news.detail(lang, item.slug)}
                    className="hover:underline"
                  >
                    {item.title}
                  </Link>
                </CardTitle>
                <CardDescription>{item.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDateShort(item.date, lang)}</span>
                  </div>
                  <Button
                    variant="link"
                    className="p-0 h-auto group/btn"
                    asChild
                  >
                    <Link
                      href={routes.news.detail(lang, item.slug)}
                      className="inline-flex items-center gap-2 text-primary"
                    >
                      {pageConfig.learnMore}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
