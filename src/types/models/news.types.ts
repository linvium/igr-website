// News type definitions - will map to Sanity schemas later
export type NewsCategory = 
  | 'vesti' 
  | 'dogadjaji' 
  | 'istrazivanja' 
  | 'edukacija' 
  | 'saradnja'

export interface News {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
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
