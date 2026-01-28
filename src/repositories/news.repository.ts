import type { News, NewsCategory } from '@/types/models'
import type { DataSource } from '@/data-sources/types'
import { withCache } from '@/lib/cache'

/**
 * Repository for news data with business logic and caching
 * Handles filtering, searching, and related news logic
 */
export class NewsRepository {
  private readonly CACHE_TTL = 5 * 60 * 1000 // 5 minutes

  constructor(private dataSource: DataSource<News>) {}

  async findAll(): Promise<News[]> {
    return withCache('news:all', () => this.dataSource.getAll(), this.CACHE_TTL)
  }

  async findById(id: string): Promise<News | null> {
    return this.dataSource.getById(id)
  }

  async findBySlug(slug: string): Promise<News | null> {
    return this.dataSource.getBySlug(slug)
  }

  async findFeatured(): Promise<News[]> {
    const all = await this.dataSource.getAll()
    return all.filter(item => item.featured === true)
  }

  async findByCategory(category: NewsCategory): Promise<News[]> {
    const all = await this.dataSource.getAll()
    return all.filter(item => item.category === category)
  }

  async findRelated(newsItem: News): Promise<News[]> {
    if (!newsItem.relatedNews || newsItem.relatedNews.length === 0) {
      return []
    }
    const all = await this.dataSource.getAll()
    return all.filter(item => newsItem.relatedNews?.includes(item.id))
  }

  async search(query: string): Promise<News[]> {
    if (!query || query.trim() === '') {
      return this.findAll()
    }
    
    const all = await this.dataSource.getAll()
    const lowerQuery = query.toLowerCase()
    
    return all.filter(item =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.excerpt.toLowerCase().includes(lowerQuery) ||
      item.body.toLowerCase().includes(lowerQuery) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }

  async filterAndSearch(category: NewsCategory | 'all', query: string): Promise<News[]> {
    const all = await this.dataSource.getAll()
    const lowerQuery = query.toLowerCase().trim()
    
    return all.filter(item => {
      const matchesCategory = category === 'all' || item.category === category
      const matchesSearch = 
        lowerQuery === '' ||
        item.title.toLowerCase().includes(lowerQuery) ||
        item.excerpt.toLowerCase().includes(lowerQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      
      return matchesCategory && matchesSearch
    })
  }
}
