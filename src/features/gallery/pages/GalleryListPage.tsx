"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/layout"
import { PageHeader, Breadcrumbs, FilterPills } from "@/components/shared"
import { routes, type Language } from "@/lib"
import { useTranslations } from "@/hooks/useTranslations"
import { GalleryListSkeleton } from "@/components/skeletons"
import { getGalleryRepository } from "@/repositories/factory"
import type { GalleryAlbum, GalleryCategory } from "@/types/models"
import type { FilterOption } from "@/components/shared/FilterPills"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDateShort } from "@/lib/format"

interface GalleryListPageProps {
  lang: Language
}

export function GalleryListPage({ lang }: GalleryListPageProps) {
  const { t } = useTranslations('gallery')
  const [allAlbums, setAllAlbums] = useState<GalleryAlbum[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | 'all'>('all')

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const repository = getGalleryRepository()
        const data = await repository.findAll()
        setAllAlbums(data)
      } catch (error) {
        console.error('Failed to load gallery:', error)
      } finally {
        setLoading(false)
      }
    }
    loadGallery()
  }, [])

  const categoryOptions: FilterOption[] = [
    { value: 'all', label: 'Sve' },
    { value: 'centri', label: 'Centri' },
    { value: 'projekti', label: 'Projekti' },
    { value: 'dogadjaji', label: 'Događaji' },
    { value: 'priroda', label: 'Priroda' },
    { value: 'istrazivanja', label: 'Istraživanja' },
  ]

  const filteredAlbums =
    selectedCategory === 'all'
      ? allAlbums
      : allAlbums.filter((album) => album.category === selectedCategory)

  if (loading) {
    return <GalleryListSkeleton />
  }

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs lang={lang} items={[{ label: t('title') }]} />
      </div>

      <PageHeader
        title={t('title')}
        description={t('description')}
      />

      {/* Filters */}
      <div className="py-8">
        <FilterPills
          options={categoryOptions}
          selected={selectedCategory === 'all' ? [] : [selectedCategory]}
          onSelect={(value) =>
            setSelectedCategory(value === 'all' ? 'all' : (value as GalleryCategory))
          }
        />
      </div>

      {/* Albums Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {filteredAlbums.map((album) => (
          <Card key={album.id} className="group card-elevated overflow-hidden">
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
                  {formatDateShort(album.date)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {album.images.length} {album.images.length === 1 ? 'slika' : 'slika'}
                </span>
              </div>
              <Link href={routes.gallery.detail(lang, album.slug)}>
                <button className="w-full mt-4 text-sm font-medium text-primary hover:underline">
                  {t('viewAlbum')}
                </button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  )
}
