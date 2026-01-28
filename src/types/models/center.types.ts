// Center type definitions - will map to Sanity schemas later
export interface Center {
  id: string
  slug: string
  title: string
  excerpt: string
  description: string
  image: string
  category: string
  established: number
  director?: string
  location?: string
  relatedCenters?: string[]
}

// Optimized types for different use cases
export type CenterListItem = Pick<Center, 'id' | 'slug' | 'title' | 'excerpt' | 'image' | 'category'>
export type CenterDetail = Center
