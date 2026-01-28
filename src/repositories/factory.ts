import { NewsRepository } from './news.repository'
import { CentersRepository } from './centers.repository'
import { ProjectsRepository } from './projects.repository'
import { GalleryRepository } from './gallery.repository'
import { StaticNewsDataSource } from '@/data-sources/static/news.data-source'
import { StaticCentersDataSource } from '@/data-sources/static/centers.data-source'
import { StaticProjectsDataSource } from '@/data-sources/static/projects.data-source'
import { StaticGalleryDataSource } from '@/data-sources/static/gallery.data-source'

/**
 * Repository Factory
 * Provides singleton instances of repositories
 * 
 * To switch to Sanity CMS in the future:
 * 1. Create Sanity data sources (e.g., SanityNewsDataSource)
 * 2. Replace StaticXDataSource with SanityXDataSource below
 * 3. No component changes needed!
 */

// Singleton instances
let newsRepository: NewsRepository | null = null
let centersRepository: CentersRepository | null = null
let projectsRepository: ProjectsRepository | null = null
let galleryRepository: GalleryRepository | null = null

export function getNewsRepository(): NewsRepository {
  if (!newsRepository) {
    newsRepository = new NewsRepository(new StaticNewsDataSource())
  }
  return newsRepository
}

export function getCentersRepository(): CentersRepository {
  if (!centersRepository) {
    centersRepository = new CentersRepository(new StaticCentersDataSource())
  }
  return centersRepository
}

export function getProjectsRepository(): ProjectsRepository {
  if (!projectsRepository) {
    projectsRepository = new ProjectsRepository(new StaticProjectsDataSource())
  }
  return projectsRepository
}

export function getGalleryRepository(): GalleryRepository {
  if (!galleryRepository) {
    galleryRepository = new GalleryRepository(new StaticGalleryDataSource())
  }
  return galleryRepository
}

// Reset function for testing
export function resetRepositories(): void {
  newsRepository = null
  centersRepository = null
  projectsRepository = null
  galleryRepository = null
}
