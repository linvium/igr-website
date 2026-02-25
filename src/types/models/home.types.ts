import type { Project } from './project.types';
import type { News } from './news.types';
import type { Center } from './center.types';
import type { GalleryAlbum } from './gallery.types';

export type HomeSectionType =
  | 'hero'
  | 'about'
  | 'partners'
  | 'centers'
  | 'projects'
  | 'news'
  | 'gallery'
  | 'contact';

export interface HomePartner {
  name: string;
  logo: string;
  url?: string;
}

export interface HeroStat {
  number: string;
  label: string;
}

export interface AboutFeature {
  title: string;
  description: string;
  icon: string;
  sectionSlug: 'mission' | 'history' | 'team' | 'partners' | 'regulations';
}

/** Resolved section: title/description in current lang, data resolved from refs or defaults */
export interface ResolvedHomeSection {
  sectionType: HomeSectionType;
  enabled: boolean;
  title: string;
  description: string;
  /** Badge label from CMS (e.g. "Novosti", "Centri") */
  badgeLabel?: string;
  /** Button label from CMS (e.g. "Pogledaj sve") */
  buttonLabel?: string;
  /** Read more button (e.g. "Pročitaj više", "Saznaj više") */
  readMoreButton?: string;
  /** Partners heading (about section only, e.g. "Naši partneri") */
  partnersHeadingLabel?: string;
  /** Hero stats (hero section only) */
  heroStats?: HeroStat[];
  /** Hero background image URL (hero section only) */
  heroBackgroundImage?: string;
  /** About features cards (about section only) */
  aboutFeatures?: AboutFeature[];
  /** About section partners (about section only) */
  aboutPartners?: HomePartner[];
  /** For projects section */
  projects?: Project[];
  /** For news section */
  news?: News[];
  /** For centers section */
  centers?: Center[];
  /** For gallery section */
  galleryAlbums?: GalleryAlbum[];
  /** For partners section */
  partners?: HomePartner[];
}

export interface HomePageData {
  sections: ResolvedHomeSection[];
}
