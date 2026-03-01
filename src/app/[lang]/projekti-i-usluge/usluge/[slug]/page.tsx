import { notFound } from 'next/navigation';
import { getLanguage } from '@/lib/lang';
import { generatePageMetadata } from '@/lib/seo';
import {
  getSiteSettings,
  getProjectsListPageConfig,
  getProjectsServicesNavItems,
} from '@/services';
import { ServicesSubPage } from '@/features/projects';
import type { Metadata } from 'next';
import type { Language } from '@/lib';
import type { ProjectsServicesSectionSlug } from '@/lib/routes';

const VALID_SERVICE_SLUGS: ProjectsServicesSectionSlug[] = [
  'laboratorijske-usluge',
  'savjetodavne-usluge',
  'rasadnik',
];

function getSectionBySlug(
  config: Awaited<ReturnType<typeof getProjectsListPageConfig>>,
  slug: ProjectsServicesSectionSlug,
) {
  switch (slug) {
    case 'laboratorijske-usluge':
      return config.laboratorijskeUslugeSection;
    case 'savjetodavne-usluge':
      return config.savjetodavneUslugeSection;
    case 'rasadnik':
      return config.rasadnikSection;
    default:
      return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const slug = resolvedParams.slug as ProjectsServicesSectionSlug;

  if (!VALID_SERVICE_SLUGS.includes(slug)) {
    return {};
  }

  const [siteSettings, config] = await Promise.all([
    getSiteSettings(lang),
    getProjectsListPageConfig(lang),
  ]);
  const section = getSectionBySlug(config, slug);

  return generatePageMetadata(
    siteSettings,
    section?.title || slug,
    section?.shortDescription || undefined,
  );
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const slug = resolvedParams.slug as ProjectsServicesSectionSlug;

  if (!VALID_SERVICE_SLUGS.includes(slug)) {
    notFound();
  }

  const config = await getProjectsListPageConfig(lang);
  const section = getSectionBySlug(config, slug);
  const navItems = getProjectsServicesNavItems(config, lang);

  if (!section) {
    notFound();
  }

  return (
    <ServicesSubPage
      lang={lang}
      breadcrumbLabel={section.title}
      serviceTitle={section.title}
      serviceShortDescription={section.shortDescription}
      contentBlocks={section.contentBlocks}
      navItems={navItems}
      navHeading={config.servicesNavigationHeading}
      pageConfig={config}
    />
  );
}
