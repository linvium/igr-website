import type { Project, ProjectStatus } from '@/types/models'
import type { DataSource } from '@/data-sources/types'

/**
 * Projects Repository
 * Handles all business logic for projects data access
 */
export class ProjectsRepository {
  constructor(private dataSource: DataSource<Project>) {}

  async findAll(): Promise<Project[]> {
    return this.dataSource.getAll()
  }

  async findById(id: string): Promise<Project | null> {
    return this.dataSource.getById(id)
  }

  async findBySlug(slug: string): Promise<Project | null> {
    return this.dataSource.getBySlug(slug)
  }

  async findByStatus(status: ProjectStatus): Promise<Project[]> {
    const all = await this.dataSource.getAll()
    return all.filter(item => item.status === status)
  }

  async findRelated(project: Project): Promise<Project[]> {
    if (!project.relatedProjects || project.relatedProjects.length === 0) {
      return []
    }
    const all = await this.dataSource.getAll()
    return all.filter(item => project.relatedProjects?.includes(item.id))
  }

  async findByCategory(category: string): Promise<Project[]> {
    const all = await this.dataSource.getAll()
    return all.filter(item => item.category === category)
  }
}
