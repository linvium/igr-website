import { Header, Footer } from '@/components/layout';
import { SiteSettingsProvider } from '@/contexts/SiteSettingsContext';
import { getSiteSettings } from '@/services/site-settings.service';
import { getLanguage } from '@/lib/lang';
import type { Language } from '@/lib';

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const siteSettings = await getSiteSettings(lang);

  return (
    <SiteSettingsProvider value={siteSettings}>
      <Header />
      <main className="pt-20">{children}</main>
      <Footer lang={lang} />
    </SiteSettingsProvider>
  );
}
