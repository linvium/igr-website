import { projects } from '@/data/projects'
import type { Project } from '@/types/models'
import type { DataSource } from '../types'

/**
 * Static data source for Projects
 * This will be replaced with SanityProjectsDataSource in the future
 */
export class StaticProjectsDataSource implements DataSource<Project> {
  async getAll(): Promise<Project[]> {
    return Promise.resolve(projects)
  }

  async getById(id: string): Promise<Project | null> {
    const item = projects.find(p => p.id === id)
    return Promise.resolve(item ?? null)
  }

  async getBySlug(slug: string): Promise<Project | null> {
    const item = projects.find(p => p.slug === slug)
    return Promise.resolve(item ?? null)
  }
}
