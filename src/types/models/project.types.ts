// Project type definitions - will map to Sanity schemas later
export type ProjectStatus = 'aktivno' | 'završeno' | 'planirano';
export type ProjectCategory =
  | 'istraživanje'
  | 'očuvanje'
  | 'edukacija'
  | 'razvoj';

/** Portable text blocks from Sanity (for body / detaljan opis) */
export type PortableTextBlock = unknown;

export interface Project {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Plain text fallback when bodyBlocks not used */
  body: string;
  /** Sanity portable text blocks for rich body (detaljan opis) */
  bodyBlocks?: PortableTextBlock[];
  /** Optional external link shown below content (opens in new tab) */
  externalLink?: string;
  /** Optional custom label for the link (defaults to page config if not set) */
  externalLinkLabel?: string;
  /** Optional PDF documents for download */
  documents?: { title: string; fileUrl: string; showOnPublications?: boolean }[];
  /** Label for documents section (required when documents exist) */
  documentsLabel?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: number;
  image: string;
  gallery?: string[];
  tags: string[];
  relatedProjects?: string[];
}

// Optimized types for different use cases
export type ProjectListItem = Pick<
  Project,
  'id' | 'slug' | 'title' | 'excerpt' | 'image' | 'category' | 'status' | 'year'
>;
export type ProjectDetail = Project;
