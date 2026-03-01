import { redirect } from 'next/navigation';
import { getLanguage } from '@/lib/lang';
import { getProjectsListPageConfig } from '@/services';
import { routes } from '@/lib/routes';
import type { Language } from '@/lib';

export default async function ServicesOverviewPageRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const config = await getProjectsListPageConfig(lang);

  const firstSlug =
    config.servicesNavigationItems[0]?.sectionSlug ?? 'laboratorijske-usluge';

  redirect(routes.projects.serviceDetail(lang, firstSlug));
}
