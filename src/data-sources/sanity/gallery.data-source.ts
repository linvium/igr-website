import {
  getAllGalleryAlbums,
  getGalleryAlbumBySlug,
} from '@/services/gallery.service';
import type { GalleryAlbum } from '@/types/models';
import type { DataSource } from '../types';
import type { Language } from '@/lib/lang';

/**
 * Sanity CMS data source for Gallery
 * Fetches albums from Sanity based on language
 */
export class SanityGalleryDataSource implements DataSource<GalleryAlbum> {
  constructor(private lang: Language) {}

  async getAll(): Promise<GalleryAlbum[]> {
    return getAllGalleryAlbums(this.lang);
  }

  async getById(id: string): Promise<GalleryAlbum | null> {
    const albums = await this.getAll();
    return albums.find((a) => a.id === id) ?? null;
  }

  async getBySlug(slug: string): Promise<GalleryAlbum | null> {
    return getGalleryAlbumBySlug(slug, this.lang);
  }
}
