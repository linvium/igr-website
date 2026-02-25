import { ProjectsListPage } from '@/features/projects';
import { getLanguage } from '@/lib/lang';
import { generatePageMetadata } from '@/lib/seo';
import { getSiteSettings, getAllProjects, getProjectsListPageConfig } from '@/services';
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
    getProjectsListPageConfig(lang),
  ]);
  return generatePageMetadata(
    siteSettings,
    config.title,
    config.description || undefined,
  );
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const [projects, config] = await Promise.all([
    getAllProjects(lang),
    getProjectsListPageConfig(lang),
  ]);

  return (
    <ProjectsListPage lang={lang} initialProjects={projects} pageConfig={config} />
  );
}
