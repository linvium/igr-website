import { OrgActivitiesOverviewPage } from '@/features/org-activities';
import { getLanguage } from '@/lib/lang';
import { generatePageMetadata } from '@/lib/seo';
import { getSiteSettings } from '@/services/site-settings.service';
import { getOrgActivitiesPageConfig } from '@/services/org-activities.service';
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
  const pageConfig = await getOrgActivitiesPageConfig(lang);
  return generatePageMetadata(
    siteSettings,
    pageConfig.title,
    pageConfig.description || undefined,
  );
}

export default async function OrgActivitiesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const pageConfig = await getOrgActivitiesPageConfig(lang);

  return (
    <OrgActivitiesOverviewPage lang={lang} pageConfig={pageConfig} />
  );
}
