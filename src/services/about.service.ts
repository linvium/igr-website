import { sanityClient, pickLocaleString, pickLocaleText, pickLocaleBlocks } from '@/lib/sanity';
import type { Language } from '@/lib/lang';

type LocaleObj = { en?: string; sr?: string; srCyr?: string } | null;

function resolveText(obj: LocaleObj | null | undefined, lang: Language): string {
  return pickLocaleString(obj, lang) || '';
}

const ABOUT_PAGE_QUERY = `coalesce(
  *[_id == "aboutPage"][0],
  *[_type == "aboutPage"][0]
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
    icon,
    sectionSlug
  },
  missionSection {
    titleLabel->{ text },
    shortDescription,
    content
  },
  historySection {
    titleLabel->{ text },
    shortDescription,
    content
  },
  teamSection {
    titleLabel->{ text },
    shortDescription,
    content
  },
  partnersSection {
    titleLabel->{ text },
    shortDescription,
    content
  }
}`;

export interface AboutOverviewCard {
  title: string;
  description: string;
  icon: string;
  sectionSlug: 'mission' | 'history' | 'team' | 'partners';
}

export interface AboutSection {
  title: string;
  shortDescription: string;
  contentBlocks: unknown[];
}

export type AboutNavSectionSlug = 'overview' | 'mission' | 'history' | 'team' | 'partners';

export interface AboutPageConfig {
  title: string;
  description: string;
  learnMore: string;
  navigationHeading: string;
  navigationItems: { label: string; sectionSlug: AboutNavSectionSlug }[];
  overviewCards: AboutOverviewCard[];
  missionSection: AboutSection;
  historySection: AboutSection;
  teamSection: AboutSection;
  partnersSection: AboutSection;
}

function mapSection(
  raw: {
    titleLabel?: { text?: LocaleObj };
    shortDescription?: LocaleObj;
    content?: { en?: unknown[]; sr?: unknown[]; srCyr?: unknown[] };
  } | null,
  lang: Language,
): AboutSection {
  if (!raw) {
    return { title: '', shortDescription: '', contentBlocks: [] };
  }
  return {
    title: resolveText(raw.titleLabel?.text, lang),
    shortDescription: pickLocaleText(raw.shortDescription, lang),
    contentBlocks: pickLocaleBlocks(raw.content, lang),
  };
}

import { routes } from '@/lib/routes';

export interface AboutNavItem {
  label: string;
  href: string;
}

export function getAboutNavItems(
  config: AboutPageConfig,
  lang: Language,
): AboutNavItem[] {
  const { overview, mission, history, team, partners } = routes.about;
  const slugToHref: Record<AboutNavSectionSlug, (l: Language) => string> = {
    overview,
    mission,
    history,
    team,
    partners,
  };
  return config.navigationItems.map((item) => ({
    label: item.label,
    href: (slugToHref[item.sectionSlug] ?? overview)(lang),
  }));
}

export async function getAboutPageConfig(lang: Language): Promise<AboutPageConfig> {
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
      icon?: string;
      sectionSlug?: string;
    }>;
    missionSection?: unknown;
    historySection?: unknown;
    teamSection?: unknown;
    partnersSection?: unknown;
  } | null>(ABOUT_PAGE_QUERY);

  const overviewCards =
    raw?.overviewCards?.map((c) => ({
      title: resolveText(c.titleLabel?.text, lang),
      description: pickLocaleText(c.shortDescription, lang),
      icon: c.icon || 'target',
      sectionSlug: (c.sectionSlug || 'mission') as AboutOverviewCard['sectionSlug'],
    })) ?? [
      { title: 'Misija', description: '', icon: 'target', sectionSlug: 'mission' as const },
      { title: 'Vizija', description: '', icon: 'eye', sectionSlug: 'mission' as const },
      { title: 'Istorijat', description: '', icon: 'history', sectionSlug: 'history' as const },
      { title: 'Tim', description: '', icon: 'users', sectionSlug: 'team' as const },
      { title: 'Partneri', description: '', icon: 'handshake', sectionSlug: 'partners' as const },
    ];

  const navigationItems =
    raw?.navigationItems?.map((item) => ({
      label: resolveText(item.label?.text, lang),
      sectionSlug: (item.sectionSlug || 'overview') as AboutNavSectionSlug,
    })) ?? [
      { label: 'Pregled', sectionSlug: 'overview' as const },
      { label: 'Misija i Vizija', sectionSlug: 'mission' as const },
      { label: 'Istorijat', sectionSlug: 'history' as const },
      { label: 'Tim', sectionSlug: 'team' as const },
      { label: 'Partneri', sectionSlug: 'partners' as const },
    ];

  const missionSection = mapSection(
    raw?.missionSection as Parameters<typeof mapSection>[0],
    lang,
  );
  const historySection = mapSection(
    raw?.historySection as Parameters<typeof mapSection>[0],
    lang,
  );
  const teamSection = mapSection(
    raw?.teamSection as Parameters<typeof mapSection>[0],
    lang,
  );
  const partnersSection = mapSection(
    raw?.partnersSection as Parameters<typeof mapSection>[0],
    lang,
  );

  return {
    title: resolveText(raw?.titleLabel?.text, lang) || 'O Institutu',
    description: pickLocaleText(raw?.description, lang) || '',
    learnMore: resolveText(raw?.learnMoreButton?.text, lang) || 'Saznaj više',
    navigationHeading:
      resolveText(raw?.navigationHeadingLabel?.text, lang) || 'Navigacija',
    navigationItems,
    overviewCards,
    missionSection,
    historySection,
    teamSection,
    partnersSection,
  };
}
