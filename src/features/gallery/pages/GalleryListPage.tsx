'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout';
import {
  PageHeader,
  Breadcrumbs,
  FilterPills,
  EmptyState,
} from '@/components/shared';
import { routes, type Language } from '@/lib';
import type { GalleryListPageConfig } from '@/services/list-pages.service';
import type { GalleryAlbum, GalleryCategory } from '@/types/models';
import type { FilterOption } from '@/components/shared/FilterPills';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDateShort } from '@/lib/format';

interface GalleryListPageProps {
  lang: Language;
  initialAlbums?: GalleryAlbum[];
  pageConfig: GalleryListPageConfig;
}

export function GalleryListPage({
  lang,
  initialAlbums = [],
  pageConfig,
}: GalleryListPageProps) {
  const [allAlbums] = useState<GalleryAlbum[]>(initialAlbums);
  const sveCategory = pageConfig.categories.find(
    (c) => c.slug === 'sve' || c.slug === 'all',
  );
  const allValue = sveCategory ? 'sve' : 'all';
  const allLabel = sveCategory?.name || pageConfig.allCategoryLabel || 'Sve';
  const [selectedCategory, setSelectedCategory] = useState<
    GalleryCategory | 'all' | 'sve'
  >(allValue);

  const categoryOptions: FilterOption[] = [
    { value: allValue, label: allLabel },
    ...pageConfig.categories
      .filter((c) => c.slug !== 'all' && c.slug !== 'sve')
      .map((c) => ({ value: c.slug, label: c.name })),
  ];

  const filteredAlbums =
    selectedCategory === 'all' || selectedCategory === 'sve'
      ? allAlbums
      : allAlbums.filter((album) => album.category === selectedCategory);

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs lang={lang} items={[{ label: pageConfig.title }]} />
      </div>

      <PageHeader
        title={pageConfig.title}
        description={pageConfig.description}
      />

      {/* Filters */}
      <div className="py-8">
        <FilterPills
          options={categoryOptions}
          selected={
            selectedCategory === 'all' || selectedCategory === 'sve'
              ? [allValue]
              : [selectedCategory]
          }
          onSelect={(value) =>
            setSelectedCategory(
              value === 'all' || value === 'sve'
                ? (value as 'all' | 'sve')
                : (value as GalleryCategory),
            )
          }
        />
      </div>

      {/* Albums Grid */}
      {filteredAlbums.length === 0 ? (
        <div className="py-12">
          <EmptyState
            title={pageConfig.emptyTitle}
            description={pageConfig.emptyDescription}
          />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
          {filteredAlbums.map((album) => (
            <Card
              key={album.id}
              className="group card-elevated overflow-hidden rounded-[4px]"
            >
              <div className="relative h-64">
                <Image
                  src={album.coverImage}
                  alt={album.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-serif">{album.title}</CardTitle>
                <CardDescription>{album.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {formatDateShort(album.date, lang)}
                  </span>
                </div>
                <Button
                  variant="link"
                  className="p-0 h-auto mt-4 w-full justify-end group/btn"
                  asChild
                >
                  <Link
                    href={routes.gallery.detail(lang, album.slug)}
                    className="inline-flex items-center w-full text-sm font-medium text-primary"
                  >
                    {pageConfig.viewAlbum}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
