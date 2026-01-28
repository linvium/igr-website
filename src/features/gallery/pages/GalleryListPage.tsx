"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/layout"
import { PageHeader, Breadcrumbs, FilterPills } from "@/components/shared"
import { routes, galleryAlbums, type Language, type GalleryCategory } from "@/lib"
import type { FilterOption } from "@/components/shared/FilterPills"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDateShort } from "@/lib/format"

interface GalleryListPageProps {
  lang: Language
}

const categoryOptions: FilterOption[] = [
  { value: "all", label: "Sve" },
  { value: "centri", label: "Centri" },
  { value: "projekti", label: "Projekti" },
  { value: "dogadjaji", label: "Događaji" },
  { value: "priroda", label: "Priroda" },
  { value: "istrazivanja", label: "Istraživanja" },
]

export function GalleryListPage({ lang }: GalleryListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | "all">("all")

  const filteredAlbums =
    selectedCategory === "all"
      ? galleryAlbums
      : galleryAlbums.filter((album) => album.category === selectedCategory)

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs lang={lang} items={[{ label: "Galerija" }]} />
      </div>

      <PageHeader
        title="Galerija"
        description="Fotografije naših centara, projekata i aktivnosti."
      />

      {/* Filters */}
      <div className="py-8">
        <FilterPills
          options={categoryOptions}
          selected={selectedCategory === "all" ? [] : [selectedCategory]}
          onSelect={(value) =>
            setSelectedCategory(value === "all" ? "all" : (value as GalleryCategory))
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
                  {album.images.length} {album.images.length === 1 ? "slika" : "slika"}
                </span>
              </div>
              <Link href={routes.gallery.detail(lang, album.slug)}>
                <button className="w-full mt-4 text-sm font-medium text-primary hover:underline">
                  Pogledaj album
                </button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  )
}
