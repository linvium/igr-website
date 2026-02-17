import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://institut-genetika.rs'
const siteName = 'Institut za Genetiku'
const siteDescription = 'Institut za genetiku i primenjenu biologiju - Očuvanje genetičkih resursa i biodiverziteta'

export const defaultMetadata: Metadata = {
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
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ResearchOrganization',
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: `${siteUrl}/leaf.png`,
    sameAs: [
      // Add social media links here
      // 'https://facebook.com/your-page',
      // 'https://twitter.com/your-handle',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RS',
      addressLocality: 'Beograd',
    },
  }
}

/**
 * Generate JSON-LD structured data for articles/news
 */
export function generateArticleSchema(article: {
  title: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image ? `${siteUrl}${article.image}` : undefined,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || siteName,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/leaf.png`,
      },
    },
  }
}

/**
 * Generate JSON-LD breadcrumb list
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  }
}
