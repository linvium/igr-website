import { HomePage } from '@/features/home';
import { getLanguage } from '@/lib/lang';
import { generateHomeMetadata } from '@/lib/seo';
import {
  getSiteSettings,
  getHomePageData,
  getNewsListPageConfig,
  getContactPageConfig,
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
  const siteSettings = await getSiteSettings(lang);
  return generateHomeMetadata(siteSettings);
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const [homePageData, newsPageConfig, contactPageConfig] = await Promise.all([
    getHomePageData(lang),
    getNewsListPageConfig(lang),
    getContactPageConfig(lang),
  ]);

  return (
    <HomePage
      lang={lang}
      homePageData={homePageData}
      newsPageConfig={newsPageConfig}
      contactPageConfig={contactPageConfig}
    />
  );
}
