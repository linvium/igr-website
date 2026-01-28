import { CenterDetailPage } from "@/features/centers"
import { getLanguage } from "@/lib/lang"
import { generatePageMetadata } from "@/lib/seo"
import { getCenterBySlug } from "@/data/centers"
import type { Metadata } from "next"
import type { Language } from "@/lib"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const center = getCenterBySlug(resolvedParams.slug)
  return generatePageMetadata(
    center?.title || "Centar",
    center?.excerpt,
    center?.image
  )
}

export default async function CenterDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const resolvedParams = await params
  const lang = getLanguage(resolvedParams.lang as Language)

  return <CenterDetailPage lang={lang} slug={resolvedParams.slug} />
}
