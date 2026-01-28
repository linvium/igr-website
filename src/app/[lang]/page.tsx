import { HomePage } from "@/features/home"
import { getLanguage } from "@/lib/lang"
import { generateHomeMetadata } from "@/lib/seo"
import type { Metadata } from "next"
import type { Language } from "@/lib"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  return generateHomeMetadata()
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const resolvedParams = await params
  const lang = getLanguage(resolvedParams.lang as Language)

  return <HomePage lang={lang} />
}
