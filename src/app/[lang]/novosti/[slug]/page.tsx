import { NewsDetailPage } from "@/features/news"
import { getLanguage } from "@/lib/lang"
import { generatePageMetadata } from "@/lib/seo"
import { getNewsBySlug } from "@/data/news"
import type { Metadata } from "next"
import type { Language } from "@/lib"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const item = getNewsBySlug(resolvedParams.slug)
  return generatePageMetadata(item?.title || "Novost", item?.excerpt, item?.image)
}

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const resolvedParams = await params
  const lang = getLanguage(resolvedParams.lang as Language)

  return <NewsDetailPage lang={lang} slug={resolvedParams.slug} />
}
