import { NewsDetailPage } from '@/features/news';
import { getLanguage } from '@/lib/lang';
import { generatePageMetadata } from '@/lib/seo';
import {
  getSiteSettings,
  getNewsBySlug,
  getRelatedNews,
  getNewsListPageConfig,
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
  const [siteSettings, item] = await Promise.all([
    getSiteSettings(lang),
    getNewsBySlug(resolvedParams.slug, lang),
  ]);
  if (!item) return generatePageMetadata(siteSettings, 'Novost');
  return generatePageMetadata(
    siteSettings,
    item.title,
    item.excerpt,
    item.image,
  );
}

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);

  const [item, config] = await Promise.all([
    getNewsBySlug(resolvedParams.slug, lang),
    getNewsListPageConfig(lang),
  ]);
  if (!item) notFound();

  const relatedNews = await getRelatedNews(item, lang);

  return (
    <NewsDetailPage
      lang={lang}
      slug={resolvedParams.slug}
      initialNews={item}
      initialRelatedNews={relatedNews}
      pageConfig={config}
    />
  );
}
