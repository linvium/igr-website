// News type definitions - will map to Sanity schemas later
export type NewsCategory =
  | 'vesti'
  | 'dogadjaji'
  | 'istrazivanja'
  | 'edukacija'
  | 'saradnja'

/** Portable text blocks from Sanity (body / detaljan opis) */
export type NewsBodyBlock = unknown;

export interface News {
  id: string
  slug: string
  title: string
  excerpt: string
  /** Plain text fallback when bodyBlocks not used */
  body: string
  /** Sanity portable text blocks for rich body (detaljan opis) */
  bodyBlocks?: NewsBodyBlock[]
  /** Optional external link shown below content (opens in new tab) */
  externalLink?: string
  /** Optional custom label for the link (defaults to URL if not set) */
  externalLinkLabel?: string
  /** Optional PDF documents for download */
  documents?: { title: string; fileUrl: string }[]
  /** Label for documents section (required when documents exist) */
  documentsLabel?: string
  category: NewsCategory
  date: string
  image: string
  tags: string[]
  featured?: boolean
  relatedNews?: string[]
}

// Optimized types for different use cases
export type NewsListItem = Pick<News, 'id' | 'slug' | 'title' | 'excerpt' | 'category' | 'date' | 'image' | 'featured'>
export type NewsDetail = News
