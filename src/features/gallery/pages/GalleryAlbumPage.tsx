"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout"
import { PageHeader, Breadcrumbs } from "@/components/shared"
import { routes, type Language } from "@/lib"
import { formatDateShort } from "@/lib/format"
import { useTranslations } from "@/hooks/useTranslations"
import { getGalleryRepository } from "@/repositories/factory"
import type { GalleryAlbum } from "@/types/models"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { notFound } from "next/navigation"

interface GalleryAlbumPageProps {
  lang: Language
  slug: string
}

export function GalleryAlbumPage({ lang, slug }: GalleryAlbumPageProps) {
  const { t } = useTranslations('gallery')
  const { t: tc } = useTranslations('common')
  const [album, setAlbum] = useState<GalleryAlbum | null>(null)
  const [loading, setLoading] = useState(true)
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  useEffect(() => {
    const loadAlbum = async () => {
      try {
        const repository = getGalleryRepository()
        const data = await repository.findBySlug(slug)
        
        if (!data) {
          notFound()
          return
        }
        
        setAlbum(data)
      } catch (error) {
        console.error('Failed to load album:', error)
      } finally {
        setLoading(false)
      }
    }
    loadAlbum()
  }, [slug])

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxImage || !album) return

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = album.images.findIndex((img) => img.id === lightboxImage)
      
      if (e.key === 'Escape') {
        setLightboxImage(null)
      } else if (e.key === 'ArrowLeft') {
        // Previous image
        if (currentIndex > 0) {
          setLightboxImage(album.images[currentIndex - 1].id)
        } else if (album.images.length > 0) {
          setLightboxImage(album.images[album.images.length - 1].id)
        }
      } else if (e.key === 'ArrowRight') {
        // Next image
        if (currentIndex < album.images.length - 1) {
          setLightboxImage(album.images[currentIndex + 1].id)
        } else if (album.images.length > 0) {
          setLightboxImage(album.images[0].id)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImage, album])

  if (loading || !album) {
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
              { label: t('title'), href: routes.gallery.list(lang) },
              { label: album.title },
            ]}
          />
        </div>

        <Button variant="ghost" className="mb-6" asChild>
          <Link href={routes.gallery.list(lang)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {tc('actions.back')}
          </Link>
        </Button>

        <PageHeader
          title={album.title}
          description={`${album.description} • ${formatDateShort(album.date)} • ${album.images.length} ${album.images.length === 1 ? "slika" : "slika"}`}
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
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black border-none overflow-hidden">
          {currentImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white transition-all flex items-center justify-center"
                onClick={() => setLightboxImage(null)}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Navigation Arrows */}
              {album.images.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white transition-all flex items-center justify-center"
                    onClick={handlePrev}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white transition-all flex items-center justify-center"
                    onClick={handleNext}
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image */}
              <div className="relative w-full h-[80vh] flex items-center justify-center p-4">
                <Image
                  src={currentImage.url}
                  alt={currentImage.alt}
                  fill
                  className="object-contain"
                  priority
                  sizes="90vw"
                />
              </div>

              {/* Bottom Info Bar */}
              {(currentImage.caption || album.images.length > 1) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                  <div className="flex items-end justify-between gap-4">
                    {currentImage.caption && (
                      <p className="text-white text-sm leading-relaxed flex-1">
                        {currentImage.caption}
                      </p>
                    )}
                    {album.images.length > 1 && (
                      <div className="text-white/70 text-xs font-medium bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm flex-shrink-0">
                        {currentImageIndex + 1} / {album.images.length}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
