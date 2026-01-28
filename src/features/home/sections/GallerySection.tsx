"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout"
import { FilterPills } from "@/components/shared"
import { routes, galleryAlbums, type Language } from "@/lib"
import type { GalleryCategory } from "@/data/gallery"

interface GallerySectionProps {
  lang: Language
}

const categories: { value: GalleryCategory | "all"; label: string }[] = [
  { value: "all", label: "Sve" },
  { value: "centri", label: "Centri" },
  { value: "projekti", label: "Projekti" },
  { value: "dogadjaji", label: "Događaji" },
  { value: "priroda", label: "Priroda" },
  { value: "istrazivanja", label: "Istraživanja" },
]

export function GallerySection({ lang }: GallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory | "all">("all")
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const filteredAlbums =
    selectedCategory === "all"
      ? galleryAlbums
      : galleryAlbums.filter((album) => album.category === selectedCategory)

  const allImages = filteredAlbums.flatMap((album) =>
    album.images.map((img) => ({ ...img, albumTitle: album.title }))
  )

  const currentImageIndex = lightboxImage
    ? allImages.findIndex((img) => img.id === lightboxImage)
    : -1

  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setLightboxImage(allImages[currentImageIndex - 1].id)
    } else if (allImages.length > 0) {
      setLightboxImage(allImages[allImages.length - 1].id)
    }
  }

  const handleNext = () => {
    if (currentImageIndex < allImages.length - 1) {
      setLightboxImage(allImages[currentImageIndex + 1].id)
    } else if (allImages.length > 0) {
      setLightboxImage(allImages[0].id)
    }
  }

  const currentImage = allImages.find((img) => img.id === lightboxImage)

  return (
    <>
      <section id="gallery" className="py-24 bg-background relative">
        <Container>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              Galerija
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Foto galerija
            </h2>
            <div className="section-divider mb-6" />
            <p className="text-lg text-muted-foreground">
              Pogledajte fotografije naših centara, projekata i aktivnosti.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <FilterPills
              options={categories}
              selected={selectedCategory === "all" ? [] : [selectedCategory]}
              onSelect={(value) =>
                setSelectedCategory(value === "all" ? "all" : (value as GalleryCategory))
              }
            />
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {filteredAlbums.slice(0, 6).map((album, albumIndex) =>
              album.images.slice(0, albumIndex === 0 ? 2 : 1).map((image, imgIndex) => {
                const isFirst = albumIndex === 0 && imgIndex === 0
                return (
                  <div
                    key={image.id}
                    className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                      isFirst ? "col-span-2 row-span-2" : ""
                    }`}
                    onClick={() => setLightboxImage(image.id)}
                  >
                    <div className={`relative ${isFirst ? "aspect-square md:aspect-[4/3]" : "aspect-square"}`}>
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="px-4 py-2 bg-primary-foreground rounded-full text-primary font-medium">
                          {image.alt}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href={routes.gallery.list(lang)}>Sva galerija</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Lightbox */}
      {lightboxImage && currentImage && (
        <div className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-primary-foreground hover:bg-primary-foreground/10"
            onClick={() => setLightboxImage(null)}
          >
            <X className="w-6 h-6" />
          </Button>
          {allImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={handlePrev}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={handleNext}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </>
          )}
          <div className="max-w-5xl w-full">
            <Image
              src={currentImage.url}
              alt={currentImage.alt}
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] object-contain rounded-lg mx-auto"
            />
            {currentImage.caption && (
              <p className="text-center text-primary-foreground mt-4">{currentImage.caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  )
}
