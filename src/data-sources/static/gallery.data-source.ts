import { gallery } from '@/data/gallery'
import type { GalleryAlbum } from '@/types/models'
import type { DataSource } from '../types'

/**
 * Static data source for Gallery
 * This will be replaced with SanityGalleryDataSource in the future
 */
export class StaticGalleryDataSource implements DataSource<GalleryAlbum> {
  async getAll(): Promise<GalleryAlbum[]> {
    return Promise.resolve(gallery)
  }

  async getById(id: string): Promise<GalleryAlbum | null> {
    const item = gallery.find(g => g.id === id)
    return Promise.resolve(item ?? null)
  }

  async getBySlug(slug: string): Promise<GalleryAlbum | null> {
    const item = gallery.find(g => g.slug === slug)
    return Promise.resolve(item ?? null)
  }
}
