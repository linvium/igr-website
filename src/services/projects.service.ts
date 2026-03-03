import {
  sanityClient,
  urlForImage,
  pickLocaleString,
  pickLocaleText,
  pickLocaleBlocks,
} from '@/lib/sanity';
import type { Language } from '@/lib/lang';
import type { Project, ProjectCategory, ProjectStatus } from '@/types/models';

interface SanityProjectDocument {
  titleLabel?: { en?: string; sr?: string; srCyr?: string } | null;
  fileUrl?: string | null;
  showOnPublications?: boolean | null;
}

// Raw from Sanity (locale objects)
interface SanityProject {
  _id: string;
  slug?: { current?: string } | null;
  title?: { en?: string; sr?: string; srCyr?: string } | null;
  excerpt?: { en?: string; sr?: string; srCyr?: string } | null;
  body?: { en?: unknown[]; sr?: unknown[]; srCyr?: unknown[] } | null;
  externalLink?: string | null;
  externalLinkLabel?: { en?: string; sr?: string; srCyr?: string } | null;
  documents?: SanityProjectDocument[] | null;
  documentsLabel?: { en?: string; sr?: string; srCyr?: string } | null;
  category?: string | null;
  status?: string | null;
  year?: number | null;
  image?: { asset?: { _ref?: string } } | null;
  gallery?: Array<{ asset?: { _ref?: string } }> | null;
  tags?: string[] | null;
  relatedProjects?: Array<{ _ref?: string }> | null;
}

const PROJECTS_QUERY = `*[_type == "project"] | order(year desc) {
  _id,
  slug,
  title,
  excerpt,
  body,
  externalLink,
  externalLinkLabel,
  documents[] {
    titleLabel,
    "fileUrl": file.asset->url,
    showOnPublications
  },
  documentsLabel,
  category,
  status,
  year,
  image,
  gallery,
  tags,
  relatedProjects
}`;

const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  slug,
  title,
  excerpt,
  body,
  externalLink,
  externalLinkLabel,
  documents[] {
    titleLabel,
    "fileUrl": file.asset->url,
    showOnPublications
  },
  documentsLabel,
  category,
  status,
  year,
  image,
  gallery,
  tags,
  relatedProjects
}`;

function mapProject(raw: SanityProject, lang: Language): Project {
  const slug = raw.slug?.current ?? raw._id;
  const bodyBlocks = pickLocaleBlocks(raw.body, lang);
  const documents =
    raw.documents
      ?.filter((d): d is SanityProjectDocument & { fileUrl: string } =>
        Boolean(d?.fileUrl),
      )
      .map((d) => ({
        title: pickLocaleString(d.titleLabel, lang) || 'Dokument',
        fileUrl: d.fileUrl,
        showOnPublications: d.showOnPublications ?? false,
      })) ?? [];

  return {
    id: raw._id,
    slug,
    title: pickLocaleString(raw.title, lang) || '(no title)',
    excerpt: pickLocaleText(raw.excerpt, lang) || '',
    body: '',
    bodyBlocks: bodyBlocks.length > 0 ? bodyBlocks : undefined,
    externalLink: raw.externalLink || undefined,
    externalLinkLabel: raw.externalLinkLabel
      ? pickLocaleString(raw.externalLinkLabel, lang)
      : undefined,
    documents: documents.length > 0 ? documents : undefined,
    documentsLabel:
      documents.length > 0 && raw.documentsLabel
        ? pickLocaleString(raw.documentsLabel, lang)
        : undefined,
    category: (raw.category as ProjectCategory) || 'istraživanje',
    status: (raw.status as ProjectStatus) || 'aktivno',
    year: raw.year ?? new Date().getFullYear(),
    image: raw.image ? urlForImage(raw.image) : '',
    gallery: raw.gallery?.map((img) => urlForImage(img)).filter(Boolean),
    tags: raw.tags ?? [],
    relatedProjects: raw.relatedProjects
      ?.map((r) => r._ref)
      .filter((id): id is string => Boolean(id)),
  };
}

export async function getAllProjects(lang: Language): Promise<Project[]> {
  const raw = await sanityClient.fetch<SanityProject[]>(PROJECTS_QUERY);
  const list = raw ?? [];
  if (typeof window !== 'undefined' && list.length === 0) {
    console.warn(
      '[Sanity] No projects returned. Check that NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET match your Sanity studio (sanity.config.ts), and that the project is published.',
    );
  }
  return list.map((p) => mapProject(p, lang));
}

export async function getProjectBySlug(
  slug: string,
  lang: Language,
): Promise<Project | null> {
  const raw = await sanityClient.fetch<SanityProject | null>(
    PROJECT_BY_SLUG_QUERY,
    { slug },
  );
  if (!raw) return null;
  return mapProject(raw, lang);
}

/** PDF documents from projects marked "Dodaj na Publikacije" for the Publications page */
export interface PublicationDocument {
  title: string;
  fileUrl: string;
}

const PUBLICATION_DOCS_QUERY = `*[_type == "project"] {
  documents[] {
    titleLabel,
    "fileUrl": file.asset->url,
    "createdAt": file.asset->_createdAt,
    showOnPublications
  }
}`;

export async function getPublicationDocuments(
  lang: Language,
): Promise<PublicationDocument[]> {
  const raw = await sanityClient.fetch<{
    documents?: Array<{
      titleLabel?: { en?: string; sr?: string; srCyr?: string } | null;
      fileUrl?: string | null;
      createdAt?: string | null;
      showOnPublications?: boolean | null;
    }>;
  }[]>(PUBLICATION_DOCS_QUERY);

  interface DocWithDate extends PublicationDocument {
    createdAt: string;
  }

  const docs: DocWithDate[] = [];
  for (const project of raw ?? []) {
    if (!project.documents) continue;
    for (const doc of project.documents) {
      if (doc.showOnPublications && doc.fileUrl) {
        docs.push({
          title: pickLocaleString(doc.titleLabel, lang) || 'Dokument',
          fileUrl: doc.fileUrl,
          createdAt: doc.createdAt ?? '',
        });
      }
    }
  }

  // Hronološki: najnoviji (zadnji dodan) na vrhu
  docs.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return docs.map(({ title, fileUrl }) => ({ title, fileUrl }));
}
