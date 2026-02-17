import { GalleryListPage } from '@/features/gallery';
import { getLanguage } from '@/lib/lang';
import { generatePageMetadata } from '@/lib/seo';
import {
  getSiteSettings,
  getGalleryListPageConfig,
  getAllGalleryAlbums,
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
    getGalleryListPageConfig(lang),
  ]);
  return generatePageMetadata(
    siteSettings,
    config.title,
    config.description || undefined,
  );
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const [allAlbums, config] = await Promise.all([
    getAllGalleryAlbums(lang),
    getGalleryListPageConfig(lang),
  ]);

  return (
    <GalleryListPage lang={lang} initialAlbums={allAlbums} pageConfig={config} />
  );
}
