import { ProjectDetailPage } from "@/features/projects"
import { getLanguage } from "@/lib/lang"
import { generatePageMetadata } from "@/lib/seo"
import { getProjectBySlug } from "@/data/projects"
import type { Metadata } from "next"
import type { Language } from "@/lib"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const project = getProjectBySlug(resolvedParams.slug)
  return generatePageMetadata(
    project?.title || "Projekat",
    project?.excerpt,
    project?.image
  )
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const resolvedParams = await params
  const lang = getLanguage(resolvedParams.lang as Language)

  return <ProjectDetailPage lang={lang} slug={resolvedParams.slug} />
}
