import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { getSiteSettings } from '@/services/site-settings.service'
import { defaultLanguage } from '@/lib'

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings(defaultLanguage)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://institut-genetika.rs'
  const siteName = siteSettings.name || 'Institut za Genetiku'
  const siteDescription = siteSettings.description || 'Institut za genetiku i primenjenu biologiju - Očuvanje genetičkih resursa i biodiverziteta'

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    keywords: [
      'institut za genetiku',
      'genetika',
      'biologija',
      'biodiverzitet',
      'genetički resursi',
      'istraživanje',
      'Srbija',
      'nauka',
      'očuvanje',
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'sr_RS',
      url: siteUrl,
      siteName,
      title: siteName,
      description: siteDescription,
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: siteDescription,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: siteUrl,
      languages: {
        'sr-Latn': `${siteUrl}/sr-lat`,
        'en': `${siteUrl}/en`,
      },
    },
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sr" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
