import { AboutSubPage } from '@/features/about';
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
    aboutConfig.historySection.title || 'Istorijat',
    aboutConfig.historySection.shortDescription ||
      'Istorija Instituta za Genetičke Resurse',
  );
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const pageConfig = await getAboutPageConfig(lang);
  const section = pageConfig.historySection;
  const navItems = getAboutNavItems(pageConfig, lang);

  return (
    <AboutSubPage
      lang={lang}
      title={section.title || 'Istorijat'}
      description={section.shortDescription}
      breadcrumbLabel={section.title || 'Istorijat'}
      overviewBreadcrumbLabel={pageConfig.title}
      contentBlocks={section.contentBlocks}
      navItems={navItems}
      navHeading={pageConfig.navigationHeading}
    />
  );
}
