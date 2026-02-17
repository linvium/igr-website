import { getAllNews, getNewsBySlug } from '@/services/news.service';
import type { News } from '@/types/models';
import type { DataSource } from '../types';
import type { Language } from '@/lib/lang';

/**
 * Sanity CMS data source for News
 */
export class SanityNewsDataSource implements DataSource<News> {
  constructor(private lang: Language) {}

  async getAll(): Promise<News[]> {
    return getAllNews(this.lang);
  }

  async getById(id: string): Promise<News | null> {
    const all = await this.getAll();
    return all.find((n) => n.id === id) ?? null;
  }

  async getBySlug(slug: string): Promise<News | null> {
    return getNewsBySlug(slug, this.lang);
  }
}
