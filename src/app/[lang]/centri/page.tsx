import { CentersListPage } from '@/features/centers';
import { getLanguage } from '@/lib/lang';
import { generatePageMetadata } from '@/lib/seo';
import {
  getSiteSettings,
  getCentersListPageConfig,
  getAllCenters,
} from '@/services';
import type { Metadata } from 'next';
import type { Language } from '@/lib';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const [siteSettings, config] = await Promise.all([
    getSiteSettings(lang),
    getCentersListPageConfig(lang),
  ]);
  return generatePageMetadata(
    siteSettings,
    config.title,
    config.description || undefined,
  );
}

export default async function CentersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const [centers, config] = await Promise.all([
    getAllCenters(lang),
    getCentersListPageConfig(lang),
  ]);

  return (
    <CentersListPage lang={lang} initialCenters={centers} pageConfig={config} />
  );
}
