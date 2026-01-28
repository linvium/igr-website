"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout"
import { PageHeader, Breadcrumbs } from "@/components/shared"
import { routes, getAlbumBySlug, type Language } from "@/lib"
import { formatDateShort } from "@/lib/format"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface GalleryAlbumPageProps {
  lang: Language
  slug: string
}

export function GalleryAlbumPage({ lang, slug }: GalleryAlbumPageProps) {
  const album = getAlbumBySlug(slug)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  if (!album) {
    return null
  }

  const currentImageIndex = lightboxImage
    ? album.images.findIndex((img) => img.id === lightboxImage)
    : -1

  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setLightboxImage(album.images[currentImageIndex - 1].id)
    } else if (album.images.length > 0) {
      setLightboxImage(album.images[album.images.length - 1].id)
    }
  }

  const handleNext = () => {
    if (currentImageIndex < album.images.length - 1) {
      setLightboxImage(album.images[currentImageIndex + 1].id)
    } else if (album.images.length > 0) {
      setLightboxImage(album.images[0].id)
    }
  }

  const currentImage = album.images.find((img) => img.id === lightboxImage)

  return (
    <>
      <Container>
        <div className="py-8">
          <Breadcrumbs
            lang={lang}
            items={[
              { label: "Galerija", href: routes.gallery.list(lang) },
              { label: album.title },
            ]}
          />
        </div>

        <Button variant="ghost" className="mb-6" asChild>
          <Link href={routes.gallery.list(lang)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Nazad na galeriju
          </Link>
        </Button>

        <PageHeader
          title={album.title}
          description={
            <>
              {album.description}
              <span className="block mt-2 text-sm text-muted-foreground">
                {formatDateShort(album.date)} • {album.images.length}{" "}
                {album.images.length === 1 ? "slika" : "slika"}
              </span>
            </>
          }
        />

        {/* Images Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
          {album.images.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setLightboxImage(image.id)}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors" />
            </div>
          ))}
        </div>
      </Container>

      {/* Lightbox Dialog */}
      <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
        <DialogContent className="max-w-6xl p-0">
          {currentImage && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10"
                onClick={() => setLightboxImage(null)}
              >
                <X className="w-6 h-6" />
              </Button>
              {album.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                    onClick={handlePrev}
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
                    onClick={handleNext}
                  >
                    <ChevronRight className="w-8 h-8" />
                  </Button>
                </>
              )}
              <div className="relative aspect-video">
                <Image
                  src={currentImage.url}
                  alt={currentImage.alt}
                  fill
                  className="object-contain"
                />
              </div>
              {currentImage.caption && (
                <div className="p-4 bg-background">
                  <p className="text-center">{currentImage.caption}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
