import { GalleryAlbumPage } from "@/features/gallery"
import { getLanguage } from "@/lib/lang"
import { generatePageMetadata } from "@/lib/seo"
import { getAlbumBySlug } from "@/data/gallery"
import type { Metadata } from "next"
import type { Language } from "@/lib"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const album = getAlbumBySlug(resolvedParams.slug)
  return generatePageMetadata(
    album?.title || "Album",
    album?.description,
    album?.coverImage
  )
}

export default async function GalleryAlbum({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const resolvedParams = await params
  const lang = getLanguage(resolvedParams.lang as Language)

  return <GalleryAlbumPage lang={lang} slug={resolvedParams.slug} />
}
