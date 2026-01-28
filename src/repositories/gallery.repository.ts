import type { GalleryAlbum } from '@/types/models'
import type { DataSource } from '@/data-sources/types'

/**
 * Gallery Repository
 * Handles all business logic for gallery data access
 */
export class GalleryRepository {
  constructor(private dataSource: DataSource<GalleryAlbum>) {}

  async findAll(): Promise<GalleryAlbum[]> {
    return this.dataSource.getAll()
  }

  async findById(id: string): Promise<GalleryAlbum | null> {
    return this.dataSource.getById(id)
  }

  async findBySlug(slug: string): Promise<GalleryAlbum | null> {
    return this.dataSource.getBySlug(slug)
  }

  async findByCategory(category: string): Promise<GalleryAlbum[]> {
    const all = await this.dataSource.getAll()
    return all.filter(item => item.category === category)
  }

  async findRecent(limit: number = 6): Promise<GalleryAlbum[]> {
    const all = await this.dataSource.getAll()
    return all
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit)
  }
}
