import { GalleryAlbumPage } from '@/features/gallery';
import { getLanguage } from '@/lib/lang';
import { generatePageMetadata } from '@/lib/seo';
import {
  getSiteSettings,
  getGalleryListPageConfig,
  getGalleryAlbumBySlug,
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
  const [siteSettings, album] = await Promise.all([
    getSiteSettings(lang),
    getGalleryAlbumBySlug(resolvedParams.slug, lang),
  ]);
  if (!album) return generatePageMetadata(siteSettings, 'Album');
  return generatePageMetadata(
    siteSettings,
    album.title,
    album.description,
    album.coverImage,
  );
}

export default async function GalleryAlbum({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);

  const [album, config] = await Promise.all([
    getGalleryAlbumBySlug(resolvedParams.slug, lang),
    getGalleryListPageConfig(lang),
  ]);

  if (!album) notFound();

  return (
    <GalleryAlbumPage
      lang={lang}
      slug={resolvedParams.slug}
      initialAlbum={album}
      pageConfig={config}
    />
  );
}
