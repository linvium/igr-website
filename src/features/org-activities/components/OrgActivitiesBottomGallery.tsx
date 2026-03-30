'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { routes, type Language } from '@/lib';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { formatDateShort } from '@/lib/format';
import type { GalleryAlbum } from '@/types/models';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface OrgActivitiesBottomGalleryProps {
  lang: Language;
  album: GalleryAlbum;
  /** Tekst gumba za punu stranicu albuma */
  viewFullGalleryLabel?: string;
}

export function OrgActivitiesBottomGallery({
  lang,
  album,
  viewFullGalleryLabel = 'Otvori cijelu galeriju',
}: OrgActivitiesBottomGalleryProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxImage || !album.images.length) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = album.images.findIndex(
        (img) => img.id === lightboxImage,
      );
      if (e.key === 'Escape') setLightboxImage(null);
      else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
          setLightboxImage(album.images[currentIndex - 1].id);
        } else if (album.images.length > 0) {
          setLightboxImage(album.images[album.images.length - 1].id);
        }
      } else if (e.key === 'ArrowRight') {
        if (currentIndex < album.images.length - 1) {
          setLightboxImage(album.images[currentIndex + 1].id);
        } else if (album.images.length > 0) {
          setLightboxImage(album.images[0].id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, album]);

  const currentImageIndex = lightboxImage
    ? album.images.findIndex((img) => img.id === lightboxImage)
    : -1;
  const currentImage = album.images.find((img) => img.id === lightboxImage);

  const handlePrev = () => {
    if (currentImageIndex > 0) {
      setLightboxImage(album.images[currentImageIndex - 1].id);
    } else if (album.images.length > 0) {
      setLightboxImage(album.images[album.images.length - 1].id);
    }
  };

  const handleNext = () => {
    if (currentImageIndex < album.images.length - 1) {
      setLightboxImage(album.images[currentImageIndex + 1].id);
    } else if (album.images.length > 0) {
      setLightboxImage(album.images[0].id);
    }
  };

  if (!album.images.length) return null;

  return (
    <>
      <section
        className="mt-12 pt-10 border-t border-border"
        aria-labelledby="org-activities-bottom-gallery-heading"
      >
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h2
              id="org-activities-bottom-gallery-heading"
              className="text-2xl font-serif font-bold text-foreground"
            >
              {album.title}
            </h2>
            {(album.description || album.date) && (
              <p className="text-muted-foreground mt-2 text-sm">
                {album.description}
                {album.description && album.date ? ' · ' : ''}
                {formatDateShort(album.date, lang)}
              </p>
            )}
          </div>
          <Button variant="outline" size="sm" asChild className="shrink-0">
            <Link
              href={routes.gallery.detail(lang, album.slug)}
              className="inline-flex items-center gap-2"
            >
              {viewFullGalleryLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {album.images.map((image) => (
            <button
              key={image.id}
              type="button"
              className="group relative aspect-square rounded-[4px] overflow-hidden cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setLightboxImage(image.id)}
            >
              <Image
                src={image.url || PLACEHOLDER_IMAGE}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors" />
            </button>
          ))}
        </div>
      </section>

      <Dialog
        open={!!lightboxImage}
        onOpenChange={() => setLightboxImage(null)}
      >
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black border-none overflow-hidden">
          {currentImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              <button
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white transition-all flex items-center justify-center"
                onClick={() => setLightboxImage(null)}
                aria-label="Zatvori"
                type="button"
              >
                <X className="w-5 h-5" />
              </button>

              {album.images.length > 1 && (
                <>
                  <button
                    type="button"
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white transition-all flex items-center justify-center"
                    onClick={handlePrev}
                    aria-label="Prethodna slika"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white transition-all flex items-center justify-center"
                    onClick={handleNext}
                    aria-label="Sljedeća slika"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              <div className="relative w-full h-[80vh] flex items-center justify-center p-4">
                <Image
                  src={currentImage.url || PLACEHOLDER_IMAGE}
                  alt={currentImage.alt}
                  fill
                  className="object-contain"
                  priority
                  sizes="90vw"
                />
              </div>

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
  );
}
