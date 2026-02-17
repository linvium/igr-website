import { ContactPage } from '@/features/contact';
import { getLanguage } from '@/lib/lang';
import { generatePageMetadata } from '@/lib/seo';
import {
  getSiteSettings,
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
  const [siteSettings, pageConfig] = await Promise.all([
    getSiteSettings(lang),
    getContactPageConfig(lang),
  ]);
  return generatePageMetadata(
    siteSettings,
    pageConfig.title,
    pageConfig.description,
  );
}

export default async function Contact({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const pageConfig = await getContactPageConfig(lang);

  return <ContactPage lang={lang} pageConfig={pageConfig} />;
}
