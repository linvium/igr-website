import {
  sanityClient,
  urlForImage,
  pickLocaleString,
  pickLocaleText,
  pickLocaleBlocks,
} from '@/lib/sanity';
import type { Language } from '@/lib/lang';
import type { News, NewsCategory } from '@/types/models';

interface SanityNewsDocument {
  titleLabel?: { en?: string; sr?: string; srCyr?: string } | null;
  fileUrl?: string | null;
}

interface SanityNews {
  _id: string;
  slug?: { current?: string } | null;
  title?: { en?: string; sr?: string; srCyr?: string } | null;
  excerpt?: { en?: string; sr?: string; srCyr?: string } | null;
  body?: { en?: unknown[]; sr?: unknown[]; srCyr?: unknown[] } | null;
  externalLink?: string | null;
  externalLinkLabel?: { en?: string; sr?: string; srCyr?: string } | null;
  documents?: SanityNewsDocument[] | null;
  documentsLabel?: { en?: string; sr?: string; srCyr?: string } | null;
  category?: { _ref?: string; slug?: string } | null;
  date?: string | null;
  image?: { asset?: { _ref?: string } } | null;
  tags?: string[] | null;
  featured?: boolean | null;
  relatedNews?: Array<{ _ref?: string }> | null;
}

const NEWS_QUERY = `*[_type == "news"] | order(date desc) {
  _id,
  slug,
  title,
  excerpt,
  body,
  externalLink,
  externalLinkLabel,
  documents[] {
    titleLabel,
    "fileUrl": file.asset->url
  },
  documentsLabel,
  "category": category->{ slug },
  date,
  image,
  tags,
  featured,
  relatedNews
}`;

const NEWS_BY_SLUG_QUERY = `*[_type == "news" && slug.current == $slug][0] {
  _id,
  slug,
  title,
  excerpt,
  body,
  externalLink,
  externalLinkLabel,
  documents[] {
    titleLabel,
    "fileUrl": file.asset->url
  },
  documentsLabel,
  "category": category->{ slug },
  date,
  image,
  tags,
  featured,
  relatedNews
}`;

function mapNews(raw: SanityNews, lang: Language): News {
  const slug = raw.slug?.current ?? raw._id;
  const bodyBlocks = pickLocaleBlocks(raw.body, lang);
  const categorySlug =
    (typeof raw.category === 'object' && raw.category?.slug) ||
    (typeof raw.category === 'string' ? raw.category : null) ||
    'vesti';
  const documents =
    raw.documents
      ?.filter((d): d is SanityNewsDocument & { fileUrl: string } =>
        Boolean(d?.fileUrl),
      )
      .map((d) => ({
        title: pickLocaleString(d.titleLabel, lang) || 'Dokument',
        fileUrl: d.fileUrl,
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
    category: (categorySlug as NewsCategory) || 'vesti',
    date: raw.date ?? new Date().toISOString(),
    image: raw.image ? urlForImage(raw.image) : '',
    tags: raw.tags ?? [],
    featured: raw.featured ?? false,
    relatedNews: raw.relatedNews?.map((r) => r._ref ?? '').filter(Boolean),
  };
}

export async function getAllNews(lang: Language): Promise<News[]> {
  const raw = await sanityClient.fetch<SanityNews[]>(NEWS_QUERY);
  return (raw ?? []).map((n) => mapNews(n, lang));
}

export async function getNewsBySlug(
  slug: string,
  lang: Language,
): Promise<News | null> {
  const raw = await sanityClient.fetch<SanityNews | null>(NEWS_BY_SLUG_QUERY, {
    slug,
  });
  if (!raw) return null;
  return mapNews(raw, lang);
}

const NEWS_BY_IDS_QUERY = `*[_type == "news" && _id in $ids] | order(date desc) {
  _id,
  slug,
  title,
  excerpt,
  body,
  externalLink,
  externalLinkLabel,
  documents[] {
    titleLabel,
    "fileUrl": file.asset->url
  },
  documentsLabel,
  "category": category->{ slug },
  date,
  image,
  tags,
  featured,
  relatedNews
}`;

export async function getRelatedNews(
  newsItem: News,
  lang: Language,
): Promise<News[]> {
  const ids = newsItem.relatedNews;
  if (!ids?.length) return [];
  const raw = await sanityClient.fetch<SanityNews[]>(NEWS_BY_IDS_QUERY, {
    ids,
  });
  return (raw ?? []).map((n) => mapNews(n, lang));
}
