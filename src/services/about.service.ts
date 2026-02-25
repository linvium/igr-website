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
    members[] {
      image,
      name,
      surname,
      title,
      description,
      category
    }
  },
  partnersSection {
    titleLabel->{ text },
    shortDescription,
    content
  },
  regulationsSection {
    titleLabel->{ text },
    shortDescription,
    documents[] {
      titleLabel,
      "fileUrl": file.asset->url
    }
  }
}`;

export interface AboutOverviewCard {
  title: string;
  description: string;
  icon: string;
  sectionSlug: 'mission' | 'history' | 'team' | 'partners' | 'regulations';
}

export interface RegulationDocument {
  title: string;
  fileUrl: string;
}

export interface RegulationsSection {
  title: string;
  shortDescription: string;
  documents: RegulationDocument[];
}

export interface AboutSection {
  title: string;
  shortDescription: string;
  contentBlocks: unknown[];
}

export type TeamCategorySlug =
  | 'direktor'
  | 'naucno_vijece_instituta'
  | 'administrativno_osoblje'
  | 'stalni_saradnici'
  | 'osoblje_u_naucnom_i_istrazivackom_zvanju';

export interface TeamMember {
  id: string;
  image: string;
  name: string;
  surname: string;
  title: string;
  description: string;
  category: TeamCategorySlug;
}

export interface TeamSection {
  title: string;
  shortDescription: string;
  members: TeamMember[];
}

export const TEAM_CATEGORY_LABELS: Record<TeamCategorySlug, string> = {
  direktor: 'Direktor',
  naucno_vijece_instituta: 'Naučno vijeće instituta',
  administrativno_osoblje: 'Administrativno osoblje',
  stalni_saradnici: 'Stalni saradnici',
  osoblje_u_naucnom_i_istrazivackom_zvanju:
    'Osoblje u naučnom i istraživačkom zvanju',
};

export type AboutNavSectionSlug = 'overview' | 'mission' | 'history' | 'team' | 'partners' | 'regulations';

export interface AboutPageConfig {
  title: string;
  description: string;
  learnMore: string;
  navigationHeading: string;
  navigationItems: { label: string; sectionSlug: AboutNavSectionSlug }[];
  overviewCards: AboutOverviewCard[];
  missionSection: AboutSection;
  historySection: AboutSection;
  teamSection: TeamSection;
  partnersSection: AboutSection;
  regulationsSection: RegulationsSection;
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
  const { overview, mission, history, team, partners, regulations } = routes.about;
  const slugToHref: Record<AboutNavSectionSlug, (l: Language) => string> = {
    overview,
    mission,
    history,
    team,
    partners,
    regulations,
  };
  return config.navigationItems.map((item) => ({
    label: item.label,
    href: (slugToHref[item.sectionSlug] ?? overview)(lang),
  }));
}

import { urlForImage } from '@/lib/sanity';

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
    teamSection?: {
      titleLabel?: { text?: LocaleObj };
      shortDescription?: LocaleObj;
      members?: Array<{
        image?: { asset?: { _ref?: string } };
        name?: LocaleObj;
        surname?: LocaleObj;
        title?: LocaleObj;
        description?: LocaleObj;
        category?: string;
      }>;
    };
    partnersSection?: unknown;
    regulationsSection?: {
      titleLabel?: { text?: LocaleObj };
      shortDescription?: LocaleObj;
      documents?: Array<{
        titleLabel?: LocaleObj;
        fileUrl?: string;
      }>;
    };
  } | null>(ABOUT_PAGE_QUERY);

  const normalizeSectionSlug = (slug?: string): AboutOverviewCard['sectionSlug'] => {
    if (slug === 'lawsAndActs') return 'regulations';
    const valid = ['mission', 'history', 'team', 'partners', 'regulations'] as const;
    return (valid.includes(slug as (typeof valid)[number]) ? slug : 'mission') as AboutOverviewCard['sectionSlug'];
  };
  const overviewCards =
    raw?.overviewCards?.map((c) => ({
      title: resolveText(c.titleLabel?.text, lang),
      description: pickLocaleText(c.shortDescription, lang),
      icon: c.icon || 'target',
      sectionSlug: normalizeSectionSlug(c.sectionSlug),
    })) ?? [
      { title: 'Misija', description: '', icon: 'target', sectionSlug: 'mission' as const },
      { title: 'Vizija', description: '', icon: 'eye', sectionSlug: 'mission' as const },
      { title: 'Istorijat', description: '', icon: 'history', sectionSlug: 'history' as const },
      { title: 'Tim', description: '', icon: 'users', sectionSlug: 'team' as const },
      { title: 'Partneri', description: '', icon: 'handshake', sectionSlug: 'partners' as const },
      { title: 'Propisi i Akti', description: '', icon: 'file-text', sectionSlug: 'regulations' as const },
    ];

  const normalizeNavSlug = (slug?: string): AboutNavSectionSlug => {
    if (slug === 'lawsAndActs') return 'regulations';
    const valid = ['overview', 'mission', 'history', 'team', 'partners', 'regulations'] as const;
    return (valid.includes(slug as (typeof valid)[number]) ? slug : 'overview') as AboutNavSectionSlug;
  };
  const navigationItems =
    raw?.navigationItems?.map((item) => ({
      label: resolveText(item.label?.text, lang),
      sectionSlug: normalizeNavSlug(item.sectionSlug),
    })) ?? [
      { label: 'Pregled', sectionSlug: 'overview' as const },
      { label: 'Misija i Vizija', sectionSlug: 'mission' as const },
      { label: 'Istorijat', sectionSlug: 'history' as const },
      { label: 'Tim', sectionSlug: 'team' as const },
      { label: 'Partneri', sectionSlug: 'partners' as const },
      { label: 'Propisi i Akti', sectionSlug: 'regulations' as const },
    ];

  const missionSection = mapSection(
    raw?.missionSection as Parameters<typeof mapSection>[0],
    lang,
  );
  const historySection = mapSection(
    raw?.historySection as Parameters<typeof mapSection>[0],
    lang,
  );
  const rawTeam = raw?.teamSection;
  const teamSection: TeamSection = {
    title:
      (rawTeam?.titleLabel?.text &&
        pickLocaleString(rawTeam.titleLabel.text as LocaleObj, lang)) ||
      'Tim',
    shortDescription: pickLocaleText(rawTeam?.shortDescription, lang),
    members:
      rawTeam?.members?.map((m, i) => ({
        id: `member-${i}`,
        image: m.image ? urlForImage(m.image) : '',
        name: pickLocaleString(m.name, lang),
        surname: pickLocaleString(m.surname, lang),
        title: pickLocaleString(m.title, lang),
        description: pickLocaleText(m.description, lang),
        category: (m.category || 'direktor') as TeamCategorySlug,
      })) ?? [],
  };
  const partnersSection = mapSection(
    raw?.partnersSection as Parameters<typeof mapSection>[0],
    lang,
  );

  const rawRegulations = raw?.regulationsSection as {
    titleLabel?: { text?: LocaleObj };
    shortDescription?: LocaleObj;
    documents?: Array<{ titleLabel?: LocaleObj; fileUrl?: string }>;
  } | null | undefined;
  const regulationsSection: RegulationsSection = {
    title:
      (rawRegulations?.titleLabel?.text &&
        resolveText(rawRegulations.titleLabel.text, lang)) ||
      'Propisi i Akti',
    shortDescription: pickLocaleText(rawRegulations?.shortDescription, lang),
    documents:
      rawRegulations?.documents
        ?.filter((d): d is { titleLabel?: LocaleObj; fileUrl: string } =>
          Boolean(d?.fileUrl),
        )
        .map((d) => ({
          title: pickLocaleString(d.titleLabel, lang) || 'Dokument',
          fileUrl: d.fileUrl,
        })) ?? [],
  };

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
    regulationsSection,
  };
}
