import { GalleryAlbumPage } from "@/features/gallery"
import { getLanguage } from "@/lib/lang"
import { generatePageMetadata } from "@/lib/seo"
import { getGalleryRepository } from "@/repositories/factory"
import type { Metadata } from "next"
import type { Language } from "@/lib"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const repository = getGalleryRepository()
  const album = await repository.findBySlug(resolvedParams.slug)
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
