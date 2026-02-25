import { ProjectDetailPage } from '@/features/projects/pages/ProjectDetailPage';
import { getLanguage } from '@/lib/lang';
import { generatePageMetadata } from '@/lib/seo';
import { getSiteSettings, getAllProjects, getProjectBySlug, getProjectsListPageConfig } from '@/services';
import type { Metadata } from 'next';
import type { Language } from '@/lib';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const [siteSettings, project] = await Promise.all([
    getSiteSettings(lang),
    getProjectBySlug(resolvedParams.slug, lang),
  ]);
  return generatePageMetadata(
    siteSettings,
    project?.title || 'Projekat',
    project?.excerpt,
    project?.image,
  );
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const slug = resolvedParams.slug;

  const [project, allProjects, config] = await Promise.all([
    getProjectBySlug(slug, lang),
    getAllProjects(lang),
    getProjectsListPageConfig(lang),
  ]);

  if (!project) {
    notFound();
  }

  const relatedProjects = allProjects.filter((p) =>
    project.relatedProjects?.includes(p.id),
  );

  return (
    <ProjectDetailPage
      lang={lang}
      slug={slug}
      initialProject={project}
      initialRelatedProjects={relatedProjects}
      pageConfig={config}
    />
  );
}
