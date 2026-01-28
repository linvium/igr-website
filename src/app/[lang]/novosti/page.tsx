import { NewsListPage } from "@/features/news"
import { getLanguage } from "@/lib/lang"
import { generatePageMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import type { Language } from "@/lib"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  return generatePageMetadata("Novosti", "Novosti Instituta za Genetičke Resurse")
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  const lang = getLanguage(resolvedParams.lang as Language)

  return <NewsListPage lang={lang} />
}
