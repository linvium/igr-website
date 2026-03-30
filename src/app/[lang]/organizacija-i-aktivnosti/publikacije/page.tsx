import { OrgActivitiesSubPage } from '@/features/org-activities';
import { getLanguage } from '@/lib/lang';
import { generatePageMetadata } from '@/lib/seo';
import { getSiteSettings } from '@/services/site-settings.service';
import {
  getOrgActivitiesPageConfig,
  getOrgActivitiesNavItems,
} from '@/services/org-activities.service';
import { getPublicationDocuments } from '@/services/projects.service';
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
  const section = config.publikacijeSection;
  return generatePageMetadata(
    siteSettings,
    section.title || 'Publikacije',
    section.shortDescription || undefined,
  );
}

export default async function PublikacijePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const [pageConfig, publicationDocuments] = await Promise.all([
    getOrgActivitiesPageConfig(lang),
    getPublicationDocuments(lang),
  ]);
  const section = pageConfig.publikacijeSection;
  const navItems = getOrgActivitiesNavItems(pageConfig, lang);

  return (
    <OrgActivitiesSubPage
      lang={lang}
      title={section.title || 'Publikacije'}
      description={section.shortDescription}
      breadcrumbLabel={section.title || 'Publikacije'}
      overviewBreadcrumbLabel={pageConfig.title}
      contentBlocks={section.contentBlocks}
      navItems={navItems}
      navHeading={pageConfig.navigationHeading}
      publicationDocuments={publicationDocuments}
      publicationDocumentsLabel={pageConfig.publicationDocumentsLabel}
      bottomGallery={section.bottomGallery}
    />
  );
}
