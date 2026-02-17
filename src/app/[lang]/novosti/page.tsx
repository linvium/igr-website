import { NewsListPage } from '@/features/news';
import { getLanguage } from '@/lib/lang';
import { generatePageMetadata } from '@/lib/seo';
import { getSiteSettings, getAllNews, getNewsListPageConfig } from '@/services';
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
    getNewsListPageConfig(lang),
  ]);
  return generatePageMetadata(
    siteSettings,
    config.title,
    config.description || undefined,
  );
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const [allNews, config] = await Promise.all([
    getAllNews(lang),
    getNewsListPageConfig(lang),
  ]);

  return (
    <NewsListPage lang={lang} initialNews={allNews} pageConfig={config} />
  );
}
