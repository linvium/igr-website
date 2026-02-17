import { NewsRepository } from './news.repository'
import { CentersRepository } from './centers.repository'
import { ProjectsRepository } from './projects.repository'
import { GalleryRepository } from './gallery.repository'
import { SanityNewsDataSource } from '@/data-sources/sanity/news.data-source'
import { SanityCentersDataSource } from '@/data-sources/sanity/centers.data-source'
import { SanityProjectsDataSource } from '@/data-sources/sanity/projects.data-source'
import { SanityGalleryDataSource } from '@/data-sources/sanity/gallery.data-source'
import type { Language } from '@/lib/lang'

/**
 * Repository Factory
 * All repositories use Sanity CMS - require lang for localized content
 */

const newsRepositories = new Map<Language, NewsRepository>()
const centersRepositories = new Map<Language, CentersRepository>()
const projectsRepositories = new Map<Language, ProjectsRepository>()
const galleryRepositories = new Map<Language, GalleryRepository>()

export function getNewsRepository(lang: Language): NewsRepository {
  let repo = newsRepositories.get(lang)
  if (!repo) {
    repo = new NewsRepository(new SanityNewsDataSource(lang))
    newsRepositories.set(lang, repo)
  }
  return repo
}

export function getCentersRepository(lang: Language): CentersRepository {
  let repo = centersRepositories.get(lang)
  if (!repo) {
    repo = new CentersRepository(new SanityCentersDataSource(lang))
    centersRepositories.set(lang, repo)
  }
  return repo
}

export function getProjectsRepository(lang: Language): ProjectsRepository {
  let repo = projectsRepositories.get(lang)
  if (!repo) {
    repo = new ProjectsRepository(new SanityProjectsDataSource(lang))
    projectsRepositories.set(lang, repo)
  }
  return repo
}

export function getGalleryRepository(lang: Language): GalleryRepository {
  let repo = galleryRepositories.get(lang)
  if (!repo) {
    repo = new GalleryRepository(new SanityGalleryDataSource(lang))
    galleryRepositories.set(lang, repo)
  }
  return repo
}

// Reset function for testing
export function resetRepositories(): void {
  newsRepositories.clear()
  centersRepositories.clear()
  projectsRepositories.clear()
  galleryRepositories.clear()
}
