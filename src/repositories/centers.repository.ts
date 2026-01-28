import type { Center } from '@/types/models'
import type { DataSource } from '@/data-sources/types'

/**
 * Centers Repository
 * Handles all business logic for centers data access
 */
export class CentersRepository {
  constructor(private dataSource: DataSource<Center>) {}

  async findAll(): Promise<Center[]> {
    return this.dataSource.getAll()
  }

  async findById(id: string): Promise<Center | null> {
    return this.dataSource.getById(id)
  }

  async findBySlug(slug: string): Promise<Center | null> {
    return this.dataSource.getBySlug(slug)
  }

  async findRelated(center: Center): Promise<Center[]> {
    if (!center.relatedCenters || center.relatedCenters.length === 0) {
      return []
    }
    const all = await this.dataSource.getAll()
    return all.filter(item => center.relatedCenters?.includes(item.id))
  }

  async findByCategory(category: string): Promise<Center[]> {
    const all = await this.dataSource.getAll()
    return all.filter(item => item.category === category)
  }
}
