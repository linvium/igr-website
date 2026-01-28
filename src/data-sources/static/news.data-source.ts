import { news } from '@/data/news'
import type { News } from '@/types/models'
import type { DataSource } from '../types'

/**
 * Static data source for News
 * This will be replaced with SanityNewsDataSource in the future
 */
export class StaticNewsDataSource implements DataSource<News> {
  async getAll(): Promise<News[]> {
    // Simulate async operation (future API call)
    return Promise.resolve(news)
  }

  async getById(id: string): Promise<News | null> {
    const item = news.find(n => n.id === id)
    return Promise.resolve(item ?? null)
  }

  async getBySlug(slug: string): Promise<News | null> {
    const item = news.find(n => n.slug === slug)
    return Promise.resolve(item ?? null)
  }
}
