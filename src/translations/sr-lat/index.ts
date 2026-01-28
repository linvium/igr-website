import { common } from './common'
import { news } from './news'
import { centers } from './centers'
import { projects } from './projects'
import { gallery } from './gallery'
import { contact } from './contact'
import { about } from './about'
import { home } from './home'

/**
 * Serbian Latin translations
 * This structure will be replaced by Sanity CMS data in the future
 */
export const translations = {
  common,
  news,
  centers,
  projects,
  gallery,
  contact,
  about,
  home,
} as const

export type Translations = typeof translations
export type TranslationNamespace = keyof Translations
