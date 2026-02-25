import {
  sanityClient,
  urlForImage,
  pickLocaleString,
  pickLocaleText,
  pickLocaleBlocks,
} from '@/lib/sanity';
import type { Language } from '@/lib/lang';
import { routes } from '@/lib/routes';

type LocaleObj = { en?: string; sr?: string; srCyr?: string } | null;

function resolveText(obj: LocaleObj | null | undefined, lang: Language): string {
  return pickLocaleString(obj, lang) || '';
}

export type OrgActivitiesSectionSlug =
  | 'banka-gena'
  | 'botanicka-basta'
  | 'poljske-kolekcije'
  | 'laboratorije'
  | 'zasticeno-podrucje';

export type OrgActivitiesNavSectionSlug =
  | 'overview'
  | OrgActivitiesSectionSlug;

export interface OrgActivitiesOverviewCard {
  title: string;
  description: string;
  image?: string;
  sectionSlug: OrgActivitiesSectionSlug;
}

export interface OrgActivitiesSection {
  title: string;
  shortDescription: string;
  contentBlocks: unknown[];
}

export interface OrgActivitiesPageConfig {
  title: string;
  description: string;
  learnMore: string;
  navigationHeading: string;
  navigationItems: { label: string; sectionSlug: OrgActivitiesNavSectionSlug }[];
  overviewCards: OrgActivitiesOverviewCard[];
  bankaGenSection: OrgActivitiesSection;
  botanickaBastaSection: OrgActivitiesSection;
  poljskeKolekcijeSection: OrgActivitiesSection;
  laboratorijeSection: OrgActivitiesSection;
  zasticenoPodrucjeSection: OrgActivitiesSection;
}

const ORG_ACTIVITIES_PAGE_QUERY = `coalesce(
  *[_id == "orgActivitiesPage"][0],
  *[_type == "orgActivitiesPage"][0]
) {
  titleLabel->{ text },
  description,
  learnMoreButton->{ text },
  navigationHeadingLabel->{ text },
  navigationItems[] {
    label->{ text },
    sectionSlug
  },
  overviewCards[] {
    titleLabel->{ text },
    shortDescription,
    image,
    sectionSlug
  },
  bankaGenSection {
    titleLabel->{ text },
    shortDescription,
    content
  },
  botanickaBastaSection {
    titleLabel->{ text },
    shortDescription,
    content
  },
  poljskeKolekcijeSection {
    titleLabel->{ text },
    shortDescription,
    content
  },
  laboratorijeSection {
    titleLabel->{ text },
    shortDescription,
    content
  },
  zasticenoPodrucjeSection {
    titleLabel->{ text },
    shortDescription,
    content
  }
}`;

function mapSection(
  raw: {
    titleLabel?: { text?: LocaleObj };
    shortDescription?: LocaleObj;
    content?: { en?: unknown[]; sr?: unknown[]; srCyr?: unknown[] };
  } | null,
  lang: Language,
): OrgActivitiesSection {
  if (!raw) {
    return { title: '', shortDescription: '', contentBlocks: [] };
  }
  return {
    title: resolveText(raw.titleLabel?.text, lang),
    shortDescription: pickLocaleText(raw.shortDescription, lang),
    contentBlocks: pickLocaleBlocks(raw.content, lang),
  };
}

export interface OrgActivitiesNavItem {
  label: string;
  href: string;
}

export function getOrgActivitiesNavItems(
  config: OrgActivitiesPageConfig,
  lang: Language,
): OrgActivitiesNavItem[] {
  const slugToHref: Record<
    OrgActivitiesNavSectionSlug,
    (l: Language) => string
  > = {
    overview: routes.orgActivities.overview,
    'banka-gena': routes.orgActivities.bankaGen,
    'botanicka-basta': routes.orgActivities.botanickaBasta,
    'poljske-kolekcije': routes.orgActivities.poljskeKolekcije,
    laboratorije: routes.orgActivities.laboratorije,
    'zasticeno-podrucje': routes.orgActivities.zasticenoPodrucje,
  };
  return config.navigationItems.map((item) => ({
    label: item.label,
    href: (slugToHref[item.sectionSlug] ?? routes.orgActivities.overview)(lang),
  }));
}

export async function getOrgActivitiesPageConfig(
  lang: Language,
): Promise<OrgActivitiesPageConfig> {
  const raw = await sanityClient.fetch<{
    titleLabel?: { text?: LocaleObj };
    description?: LocaleObj;
    learnMoreButton?: { text?: LocaleObj };
    navigationHeadingLabel?: { text?: LocaleObj };
    navigationItems?: Array<{
      label?: { text?: LocaleObj };
      sectionSlug?: string;
    }>;
    overviewCards?: Array<{
      titleLabel?: { text?: LocaleObj };
      shortDescription?: LocaleObj;
      image?: { asset?: { _ref?: string } };
      sectionSlug?: string;
    }>;
    bankaGenSection?: unknown;
    botanickaBastaSection?: unknown;
    poljskeKolekcijeSection?: unknown;
    laboratorijeSection?: unknown;
    zasticenoPodrucjeSection?: unknown;
  } | null>(ORG_ACTIVITIES_PAGE_QUERY);

  const validSectionSlugs = [
    'banka-gena',
    'botanicka-basta',
    'poljske-kolekcije',
    'laboratorije',
    'zasticeno-podrucje',
  ] as const;
  const validNavSlugs = [
    'overview',
    ...validSectionSlugs,
  ] as OrgActivitiesNavSectionSlug[];

  const normalizeSectionSlug = (
    slug?: string,
  ): OrgActivitiesSectionSlug => {
    return validSectionSlugs.includes(slug as OrgActivitiesSectionSlug)
      ? (slug as OrgActivitiesSectionSlug)
      : 'banka-gena';
  };

  const normalizeNavSlug = (
    slug?: string,
  ): OrgActivitiesNavSectionSlug => {
    return validNavSlugs.includes(slug as OrgActivitiesNavSectionSlug)
      ? (slug as OrgActivitiesNavSectionSlug)
      : 'overview';
  };

  const overviewCards =
    raw?.overviewCards?.map((c) => ({
      title: resolveText(c.titleLabel?.text, lang),
      description: pickLocaleText(c.shortDescription, lang),
      image: c.image ? urlForImage(c.image) : undefined,
      sectionSlug: normalizeSectionSlug(c.sectionSlug),
    })) ?? [
      {
        title: 'Banka gena',
        description: '',
        sectionSlug: 'banka-gena' as const,
      },
      {
        title: 'Botanička bašta',
        description: '',
        sectionSlug: 'botanicka-basta' as const,
      },
      {
        title: 'Poljske kolekcije',
        description: '',
        sectionSlug: 'poljske-kolekcije' as const,
      },
      {
        title: 'Laboratorije',
        description: '',
        sectionSlug: 'laboratorije' as const,
      },
      {
        title: 'Zaštićeno područje',
        description: '',
        sectionSlug: 'zasticeno-podrucje' as const,
      },
    ];

  const navigationItems =
    raw?.navigationItems?.map((item) => ({
      label: resolveText(item.label?.text, lang),
      sectionSlug: normalizeNavSlug(item.sectionSlug),
    })) ?? [
      { label: 'Pregled', sectionSlug: 'overview' as const },
      { label: 'Banka gena', sectionSlug: 'banka-gena' as const },
      { label: 'Botanička bašta', sectionSlug: 'botanicka-basta' as const },
      { label: 'Poljske kolekcije', sectionSlug: 'poljske-kolekcije' as const },
      { label: 'Laboratorije', sectionSlug: 'laboratorije' as const },
      {
        label: 'Zaštićeno područje',
        sectionSlug: 'zasticeno-podrucje' as const,
      },
    ];

  return {
    title: resolveText(raw?.titleLabel?.text, lang) || 'Organizacija i aktivnosti',
    description: pickLocaleText(raw?.description, lang) || '',
    learnMore: resolveText(raw?.learnMoreButton?.text, lang) || 'Saznaj više',
    navigationHeading:
      resolveText(raw?.navigationHeadingLabel?.text, lang) || 'Navigacija',
    navigationItems,
    overviewCards,
    bankaGenSection: mapSection(
      raw?.bankaGenSection as Parameters<typeof mapSection>[0],
      lang,
    ),
    botanickaBastaSection: mapSection(
      raw?.botanickaBastaSection as Parameters<typeof mapSection>[0],
      lang,
    ),
    poljskeKolekcijeSection: mapSection(
      raw?.poljskeKolekcijeSection as Parameters<typeof mapSection>[0],
      lang,
    ),
    laboratorijeSection: mapSection(
      raw?.laboratorijeSection as Parameters<typeof mapSection>[0],
      lang,
    ),
    zasticenoPodrucjeSection: mapSection(
      raw?.zasticenoPodrucjeSection as Parameters<typeof mapSection>[0],
      lang,
    ),
  };
}
