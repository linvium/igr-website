import { CenterDetailPage } from '@/features/centers';
import { getLanguage } from '@/lib/lang';
import { generatePageMetadata } from '@/lib/seo';
import {
  getSiteSettings,
  getCentersListPageConfig,
  getCenterBySlug,
  getAllCenters,
} from '@/services';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { Language } from '@/lib';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const [siteSettings, center] = await Promise.all([
    getSiteSettings(lang),
    getCenterBySlug(resolvedParams.slug, lang),
  ]);
  if (!center) return generatePageMetadata(siteSettings, 'Centar');
  return generatePageMetadata(
    siteSettings,
    center.title,
    center.excerpt,
    center.image,
  );
}

export default async function CenterDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);

  const [center, config] = await Promise.all([
    getCenterBySlug(resolvedParams.slug, lang),
    getCentersListPageConfig(lang),
  ]);

  if (!center) notFound();

  const allCenters = await getAllCenters(lang);
  const relatedCenters = center.relatedCenters?.length
    ? allCenters.filter((c) => center.relatedCenters?.includes(c.id))
    : [];

  return (
    <CenterDetailPage
      lang={lang}
      slug={resolvedParams.slug}
      initialCenter={center}
      initialRelatedCenters={relatedCenters}
      pageConfig={config}
    />
  );
}
