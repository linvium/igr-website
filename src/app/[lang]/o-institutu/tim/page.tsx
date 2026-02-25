import { TeamPage } from '@/features/about';
import { getLanguage } from '@/lib/lang';
import { generatePageMetadata } from '@/lib/seo';
import { getSiteSettings } from '@/services/site-settings.service';
import {
  getAboutPageConfig,
  getAboutNavItems,
} from '@/services/about.service';
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
  const aboutConfig = await getAboutPageConfig(lang);
  return generatePageMetadata(
    siteSettings,
    aboutConfig.teamSection.title || 'Tim',
    aboutConfig.teamSection.shortDescription ||
      'Tim Instituta za Genetičke Resurse',
  );
}

export default async function TeamRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const pageConfig = await getAboutPageConfig(lang);
  const section = pageConfig.teamSection;
  const navItems = getAboutNavItems(pageConfig, lang);

  return (
    <TeamPage
      lang={lang}
      title={section.title || 'Tim'}
      description={section.shortDescription}
      breadcrumbLabel={section.title || 'Tim'}
      overviewBreadcrumbLabel={pageConfig.title}
      teamSection={section}
      navItems={navItems}
      navHeading={pageConfig.navigationHeading}
    />
  );
}
