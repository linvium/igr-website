import {
  sanityClient,
  urlForImage,
  pickLocaleString,
  pickLocaleText,
} from '@/lib/sanity';
import type { Language } from '@/lib/lang';
import type {
  HomePageData,
  ResolvedHomeSection,
  HomeSectionType,
  HomePartner,
} from '@/types/models/home.types';
import type { Project } from '@/types/models/project.types';
import type { News } from '@/types/models/news.types';
import type { Center } from '@/types/models/center.types';
import type { GalleryAlbum } from '@/types/models/gallery.types';
import { getAllProjects } from './projects.service';
import { getAllNews } from './news.service';
import { getAllCenters } from './centers.service';
import { getAllGalleryAlbums } from './gallery.service';
import { getAboutPageConfig } from './about.service';

interface SanityLocaleString {
  en?: string | null;
  sr?: string | null;
  srCyr?: string | null;
}

interface SanityPartner {
  name?: SanityLocaleString | null;
  logo?: { asset?: { _ref?: string } } | null;
  url?: string | null;
}

interface SanityHeroStat {
  number?: string | null;
  label?: { text?: SanityLocaleString } | null;
}

interface SanityHomeSection {
  sectionType?: string | null;
  enabled?: boolean | null;
  badgeLabel?: { text?: SanityLocaleString } | null;
  title?: SanityLocaleString | null;
  description?: SanityLocaleString | null;
  buttonLabel?: { text?: SanityLocaleString } | null;
  readMoreButton?: { text?: SanityLocaleString } | null;
  partnersHeadingLabel?: { text?: SanityLocaleString } | null;
  heroStats?: SanityHeroStat[] | null;
  selectedOverviewCardSlugs?: (string | null)[] | null;
  aboutPartners?: SanityPartner[] | null;
  featuredProjects?: Array<{ _id?: string }> | null;
  projectsLimit?: number | null;
  featuredNews?: Array<{ _id?: string }> | null;
  newsLimit?: number | null;
  featuredCenters?: Array<{ _id?: string }> | null;
  centersLimit?: number | null;
  featuredAlbums?: Array<{ _id?: string }> | null;
  galleryLimit?: number | null;
  partners?: SanityPartner[] | null;
}

interface SanityHomePage {
  _id: string;
  sections?: SanityHomeSection[] | null;
}

const HOMEPAGE_QUERY = `*[_id == "homePage"][0] {
  _id,
  sections[] {
    sectionType,
    enabled,
    "badgeLabel": badgeLabel->{ text },
    title,
    description,
    "buttonLabel": buttonLabel->{ text },
    "readMoreButton": readMoreButton->{ text },
    "partnersHeadingLabel": partnersHeadingLabel->{ text },
    heroStats[] {
      number,
      "label": label->{ text }
    },
    selectedOverviewCardSlugs,
    aboutPartners[] {
      name,
      logo,
      url
    },
    "featuredProjects": featuredProjects[]->{ _id },
    "featuredNews": featuredNews[]->{ _id },
    "featuredCenters": featuredCenters[]->{ _id },
    "featuredAlbums": featuredAlbums[]->{ _id },
    projectsLimit,
    newsLimit,
    centersLimit,
    galleryLimit,
    partners[] {
      name,
      logo,
      url
    }
  }
}`;

function resolveProjects(
  section: SanityHomeSection,
  allProjects: Project[],
): Project[] {
  const ids = section.featuredProjects
    ?.map((r) => r._id)
    .filter((id): id is string => Boolean(id));
  const limit = section.projectsLimit ?? 4;
  if (ids && ids.length > 0) {
    const byId = new Map(allProjects.map((p) => [p.id, p]));
    return ids
      .map((id) => byId.get(id))
      .filter((p): p is Project => Boolean(p));
  }
  return allProjects.slice(0, limit);
}

function resolveNews(section: SanityHomeSection, allNews: News[]): News[] {
  const ids = section.featuredNews
    ?.map((r) => r._id)
    .filter((id): id is string => Boolean(id));
  const limit = section.newsLimit ?? 3;
  if (ids && ids.length > 0) {
    const byId = new Map(allNews.map((n) => [n.id, n]));
    return ids.map((id) => byId.get(id)).filter((n): n is News => Boolean(n));
  }
  return allNews.slice(0, limit);
}

function resolveCenters(
  section: SanityHomeSection,
  allCenters: Center[],
): Center[] {
  const ids = section.featuredCenters
    ?.map((r) => r._id)
    .filter((id): id is string => Boolean(id));
  const limit = section.centersLimit ?? 5;
  if (ids && ids.length > 0) {
    const byId = new Map(allCenters.map((c) => [c.id, c]));
    return ids.map((id) => byId.get(id)).filter((c): c is Center => Boolean(c));
  }
  return allCenters.slice(0, limit);
}

function resolveAlbums(
  section: SanityHomeSection,
  allAlbums: GalleryAlbum[],
): GalleryAlbum[] {
  const ids = section.featuredAlbums
    ?.map((r) => r._id)
    .filter((id): id is string => Boolean(id));
  const limit = section.galleryLimit ?? 4;
  if (ids && ids.length > 0) {
    const byId = new Map(allAlbums.map((a) => [a.id, a]));
    return ids
      .map((id) => byId.get(id))
      .filter((a): a is GalleryAlbum => Boolean(a));
  }
  return allAlbums.slice(0, limit);
}

function mapPartners(
  partners: SanityPartner[] | null | undefined,
  lang: Language,
): HomePartner[] {
  if (!partners?.length) return [];
  return partners.map((p) => ({
    name: pickLocaleString(p.name, lang),
    logo: p.logo ? urlForImage(p.logo) : '',
    url: p.url ?? undefined,
  }));
}

export async function getHomePageData(lang: Language): Promise<HomePageData> {
  const [raw, aboutConfig, allProjects, allNews, allCenters, allAlbums] =
    await Promise.all([
      sanityClient.fetch<SanityHomePage | null>(HOMEPAGE_QUERY),
      getAboutPageConfig(lang),
      getAllProjects(lang),
      getAllNews(lang),
      getAllCenters(lang),
      getAllGalleryAlbums(lang),
    ]);

  const sections = raw?.sections ?? [];
  let resolved: ResolvedHomeSection[] = sections
    .filter((s): s is SanityHomeSection => Boolean(s?.sectionType))
    .map((s) => {
      const sectionType = s.sectionType as HomeSectionType;
      const enabled = s.enabled !== false;
      const title = pickLocaleString(s.title, lang);
      const description = pickLocaleText(s.description, lang);
      const badgeLabel = s.badgeLabel?.text
        ? pickLocaleString(s.badgeLabel.text, lang)
        : '';
      const buttonLabel = s.buttonLabel?.text
        ? pickLocaleString(s.buttonLabel.text, lang)
        : '';
      const readMoreButton = s.readMoreButton?.text
        ? pickLocaleString(s.readMoreButton.text, lang)
        : '';
      const partnersHeadingLabel = s.partnersHeadingLabel?.text
        ? pickLocaleString(s.partnersHeadingLabel.text, lang)
        : '';

      const heroStats = (s.heroStats ?? [])
        .filter((stat) => stat?.number)
        .map((stat) => ({
          number: stat!.number!,
          label: stat?.label?.text
            ? pickLocaleString(stat.label.text, lang)
            : '',
        }))
        .filter((stat) => stat.label);

      const slugs = (s.selectedOverviewCardSlugs ?? []).filter(
        (slug): slug is string => Boolean(slug),
      );
      const aboutFeatures =
        slugs.length > 0 && aboutConfig.overviewCards.length > 0
          ? slugs
              .map((slug) =>
                aboutConfig.overviewCards.find(
                  (c) => c.sectionSlug === slug,
                ),
              )
              .filter(
                (c): c is NonNullable<typeof c> => Boolean(c),
              )
          : aboutConfig.overviewCards.length > 0
            ? [...aboutConfig.overviewCards]
            : undefined;

      const aboutPartners = mapPartners(s.aboutPartners, lang);

      const section: ResolvedHomeSection = {
        sectionType,
        enabled,
        title,
        description,
        badgeLabel,
        buttonLabel,
        readMoreButton,
        partnersHeadingLabel,
        heroStats: heroStats.length > 0 ? heroStats : undefined,
        aboutFeatures:
          aboutFeatures && aboutFeatures.length > 0 ? aboutFeatures : undefined,
        aboutPartners: aboutPartners.length > 0 ? aboutPartners : undefined,
      };

      if (sectionType === 'projects') {
        section.projects = resolveProjects(s, allProjects);
      } else if (sectionType === 'news') {
        section.news = resolveNews(s, allNews);
      } else if (sectionType === 'centers') {
        section.centers = resolveCenters(s, allCenters);
      } else if (sectionType === 'gallery') {
        section.galleryAlbums = resolveAlbums(s, allAlbums);
      } else if (sectionType === 'partners') {
        section.partners = mapPartners(s.partners, lang);
      }

      return section;
    });

  // Fallback: when no sections in CMS, use default order and data
  if (resolved.length === 0) {
    const defaultTypes: HomeSectionType[] = [
      'hero',
      'about',
      'centers',
      'projects',
      'news',
      'gallery',
      'contact',
    ];
    resolved = defaultTypes.map((sectionType) => {
      const section: ResolvedHomeSection = {
        sectionType,
        enabled: true,
        title: '',
        description: '',
        badgeLabel: '',
        buttonLabel: '',
        readMoreButton: '',
        partnersHeadingLabel: '',
      };
      if (sectionType === 'projects')
        section.projects = allProjects.slice(0, 4);
      if (sectionType === 'news') section.news = allNews.slice(0, 3);
      if (sectionType === 'centers') section.centers = allCenters.slice(0, 5);
      if (sectionType === 'gallery')
        section.galleryAlbums = allAlbums.slice(0, 4);
      return section;
    });
  }

  return { sections: resolved };
}
