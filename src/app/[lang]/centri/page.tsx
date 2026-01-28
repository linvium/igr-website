import { CentersListPage } from "@/features/centers"
import { getLanguage } from "@/lib/lang"
import { generatePageMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import type { Language } from "@/lib"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  return generatePageMetadata("Centri", "Centri Instituta za Genetičke Resurse")
}

export default async function CentersPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  const lang = getLanguage(resolvedParams.lang as Language)

  return <CentersListPage lang={lang} />
}
