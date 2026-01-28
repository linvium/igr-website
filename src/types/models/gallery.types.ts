// Gallery type definitions - will map to Sanity schemas later
export type GalleryCategory = 'centri' | 'projekti' | 'dogadjaji' | 'priroda' | 'istrazivanja'

export interface GalleryImage {
  id: string
  url: string
  alt: string
  caption?: string
}

export interface GalleryAlbum {
  id: string
  slug: string
  title: string
  description: string
  category: GalleryCategory
  coverImage: string
  images: GalleryImage[]
  date: string
  tags: string[]
}

// Optimized types for different use cases
export type GalleryAlbumListItem = Pick<GalleryAlbum, 'id' | 'slug' | 'title' | 'description' | 'coverImage' | 'date' | 'category'>
export type GalleryAlbumDetail = GalleryAlbum
