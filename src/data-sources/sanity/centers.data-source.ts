import { getAllCenters, getCenterBySlug } from '@/services/centers.service';
import type { Center } from '@/types/models';
import type { DataSource } from '../types';
import type { Language } from '@/lib/lang';

/**
 * Sanity CMS data source for Centers
 */
export class SanityCentersDataSource implements DataSource<Center> {
  constructor(private lang: Language) {}

  async getAll(): Promise<Center[]> {
    return getAllCenters(this.lang);
  }

  async getById(id: string): Promise<Center | null> {
    const all = await this.getAll();
    return all.find((c) => c.id === id) ?? null;
  }

  async getBySlug(slug: string): Promise<Center | null> {
    return getCenterBySlug(slug, this.lang);
  }
}
