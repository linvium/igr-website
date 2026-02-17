import { getAllProjects, getProjectBySlug } from '@/services/projects.service';
import type { Project } from '@/types/models';
import type { DataSource } from '../types';
import type { Language } from '@/lib/lang';

/**
 * Sanity CMS data source for Projects
 */
export class SanityProjectsDataSource implements DataSource<Project> {
  constructor(private lang: Language) {}

  async getAll(): Promise<Project[]> {
    return getAllProjects(this.lang);
  }

  async getById(id: string): Promise<Project | null> {
    const all = await this.getAll();
    return all.find((p) => p.id === id) ?? null;
  }

  async getBySlug(slug: string): Promise<Project | null> {
    return getProjectBySlug(slug, this.lang);
  }
}
