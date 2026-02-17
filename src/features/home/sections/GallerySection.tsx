'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout';
import { routes, type Language } from '@/lib';
import { getGalleryRepository } from '@/repositories/factory';
import type { GalleryAlbum } from '@/types/models';

const DEFAULT_TITLE = 'Galerija';
const DEFAULT_DESCRIPTION =
  'Fotografije naših aktivnosti, događaja i istraživanja.';

interface GallerySectionProps {
  lang: Language;
  title?: string;
  description?: string;
  badgeLabel?: string;
  buttonLabel?: string;
  initialAlbums?: GalleryAlbum[];
}

export function GallerySection({
  lang,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  badgeLabel,
  buttonLabel,
  initialAlbums,
}: GallerySectionProps) {
  const [albums, setAlbums] = useState<GalleryAlbum[]>(initialAlbums ?? []);

  useEffect(() => {
    if (initialAlbums !== undefined) {
      setAlbums(initialAlbums);
      return;
    }
    const loadGallery = async () => {
      try {
        const repository = getGalleryRepository(lang);
        const data = await repository.findRecent(6);
        setAlbums(data);
      } catch (error) {
        console.error('Failed to load gallery:', error);
      }
    };
    loadGallery();
  }, [initialAlbums, lang]);

  return (
    <section id="gallery" className="py-24 relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {badgeLabel ?? 'Galerija'}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            {title}
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-lg text-muted-foreground">{description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <Link
              key={album.id}
              href={routes.gallery.detail(lang, album.slug)}
              className="group relative aspect-square rounded-2xl overflow-hidden card-elevated"
            >
              <Image
                src={album.coverImage}
                alt={album.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-xl font-serif font-bold text-primary-foreground mb-2">
                  {album.title}
                </h3>
                <p className="text-primary-foreground/80 text-sm mb-3">
                  {album.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href={routes.gallery.list(lang)}>
              {buttonLabel ?? 'Pogledaj sve'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
