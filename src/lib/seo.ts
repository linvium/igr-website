import { siteSettings } from "@/data"
import type { Metadata } from "next"

export const generatePageMetadata = (
  title: string,
  description?: string,
  image?: string
): Metadata => {
  const fullTitle = `${title} | ${siteSettings.name}`
  const metaDescription = description || siteSettings.description

  return {
    title: fullTitle,
    description: metaDescription,
    openGraph: {
      title: fullTitle,
      description: metaDescription,
      url: siteSettings.url,
      siteName: siteSettings.name,
      images: image ? [{ url: image }] : [],
      locale: "sr_RS",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: image ? [image] : [],
    },
  }
}

export const generateHomeMetadata = (): Metadata => {
  return generatePageMetadata(
    siteSettings.name,
    siteSettings.description,
    siteSettings.logo
  )
}
