import { centers } from '@/data/centers'
import type { Center } from '@/types/models'
import type { DataSource } from '../types'

/**
 * Static data source for Centers
 * This will be replaced with SanityCentersDataSource in the future
 */
export class StaticCentersDataSource implements DataSource<Center> {
  async getAll(): Promise<Center[]> {
    return Promise.resolve(centers)
  }

  async getById(id: string): Promise<Center | null> {
    const item = centers.find(c => c.id === id)
    return Promise.resolve(item ?? null)
  }

  async getBySlug(slug: string): Promise<Center | null> {
    const item = centers.find(c => c.slug === slug)
    return Promise.resolve(item ?? null)
  }
}
