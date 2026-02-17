import {
  sanityClient,
  urlForImage,
  pickLocaleString,
  pickLocaleText,
  pickLocaleBlocks,
} from '@/lib/sanity';
import type { Language } from '@/lib/lang';
import type { Center } from '@/types/models';

interface SanityCenter {
  _id: string;
  slug?: { current?: string } | null;
  title?: { en?: string; sr?: string; srCyr?: string } | null;
  excerpt?: { en?: string; sr?: string; srCyr?: string } | null;
  description?: { en?: unknown[]; sr?: unknown[]; srCyr?: unknown[] } | null;
  image?: { asset?: { _ref?: string } } | null;
  category?: string | null;
  established?: number | null;
  director?: { en?: string; sr?: string; srCyr?: string } | null;
  location?: { en?: string; sr?: string; srCyr?: string } | null;
  relatedCenters?: Array<{ _ref?: string }> | null;
}

const CENTERS_QUERY = `*[_type == "center"] | order(established desc) {
  _id,
  slug,
  title,
  excerpt,
  description,
  image,
  category,
  established,
  director,
  location,
  relatedCenters
}`;

const CENTER_BY_SLUG_QUERY = `*[_type == "center" && slug.current == $slug][0] {
  _id,
  slug,
  title,
  excerpt,
  description,
  image,
  category,
  established,
  director,
  location,
  relatedCenters
}`;

function mapCenter(raw: SanityCenter, lang: Language): Center {
  const slug = raw.slug?.current ?? raw._id;
  const descriptionBlocks = pickLocaleBlocks(raw.description, lang);
  return {
    id: raw._id,
    slug,
    title: pickLocaleString(raw.title, lang) || '(no title)',
    excerpt: pickLocaleText(raw.excerpt, lang) || '',
    description: '',
    descriptionBlocks:
      descriptionBlocks.length > 0 ? descriptionBlocks : undefined,
    image: raw.image ? urlForImage(raw.image) : '',
    category: raw.category ?? '',
    established: raw.established ?? 0,
    director: pickLocaleString(raw.director, lang),
    location: pickLocaleString(raw.location, lang),
    relatedCenters: raw.relatedCenters
      ?.map((r) => r._ref ?? '')
      .filter(Boolean),
  };
}

export async function getAllCenters(lang: Language): Promise<Center[]> {
  const raw = await sanityClient.fetch<SanityCenter[]>(CENTERS_QUERY);
  return (raw ?? []).map((c) => mapCenter(c, lang));
}

export async function getCenterBySlug(
  slug: string,
  lang: Language,
): Promise<Center | null> {
  const raw = await sanityClient.fetch<SanityCenter | null>(
    CENTER_BY_SLUG_QUERY,
    { slug },
  );
  if (!raw) return null;
  return mapCenter(raw, lang);
}
