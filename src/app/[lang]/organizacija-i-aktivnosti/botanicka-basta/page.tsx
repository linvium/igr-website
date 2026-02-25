import { OrgActivitiesSubPage } from '@/features/org-activities';
import { getLanguage } from '@/lib/lang';
import { generatePageMetadata } from '@/lib/seo';
import { getSiteSettings } from '@/services/site-settings.service';
import {
  getOrgActivitiesPageConfig,
  getOrgActivitiesNavItems,
} from '@/services/org-activities.service';
import type { Metadata } from 'next';
import type { Language } from '@/lib';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const siteSettings = await getSiteSettings(lang);
  const config = await getOrgActivitiesPageConfig(lang);
  const section = config.botanickaBastaSection;
  return generatePageMetadata(
    siteSettings,
    section.title || 'Botanička bašta',
    section.shortDescription || undefined,
  );
}

export default async function BotanickaBastaPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const pageConfig = await getOrgActivitiesPageConfig(lang);
  const section = pageConfig.botanickaBastaSection;
  const navItems = getOrgActivitiesNavItems(pageConfig, lang);

  return (
    <OrgActivitiesSubPage
      lang={lang}
      title={section.title || 'Botanička bašta'}
      description={section.shortDescription}
      breadcrumbLabel={section.title || 'Botanička bašta'}
      overviewBreadcrumbLabel={pageConfig.title}
      contentBlocks={section.contentBlocks}
      navItems={navItems}
      navHeading={pageConfig.navigationHeading}
    />
  );
}
