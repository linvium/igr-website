import {
  sanityClient,
  urlForImage,
  pickLocaleString,
  pickLocaleText,
} from '@/lib/sanity';
import type { Language } from '@/lib/lang';
import type { GalleryAlbum, GalleryImage } from '@/types/models';

interface SanityGalleryImage {
  image?: { asset?: { _ref?: string } } | null;
  alt?: { en?: string; sr?: string; srCyr?: string } | null;
  caption?: { en?: string; sr?: string; srCyr?: string } | null;
}

interface SanityGalleryAlbum {
  _id: string;
  slug?: { current?: string } | null;
  title?: { en?: string; sr?: string; srCyr?: string } | null;
  description?: { en?: string; sr?: string; srCyr?: string } | null;
  category?: string | null;
  coverImage?: { asset?: { _ref?: string } } | null;
  images?: SanityGalleryImage[] | null;
  date?: string | null;
  tags?: string[] | null;
}

const ALBUMS_QUERY = `*[_type == "galleryAlbum"] | order(date desc) {
  _id,
  slug,
  title,
  description,
  category,
  coverImage,
  images,
  date,
  tags
}`;

const ALBUM_BY_SLUG_QUERY = `*[_type == "galleryAlbum" && slug.current == $slug][0] {
  _id,
  slug,
  title,
  description,
  category,
  coverImage,
  images,
  date,
  tags
}`;

function mapGalleryImage(
  item: SanityGalleryImage,
  lang: Language,
  index: number,
): GalleryImage {
  return {
    id: `${index}`,
    url: item.image ? urlForImage(item.image) : '',
    alt: pickLocaleString(item.alt, lang),
    caption: pickLocaleString(item.caption, lang),
  };
}

function mapAlbum(raw: SanityGalleryAlbum, lang: Language): GalleryAlbum {
  const slug = raw.slug?.current ?? raw._id;
  const images: GalleryImage[] = (raw.images ?? []).map((img, i) =>
    mapGalleryImage(img, lang, i),
  );
  return {
    id: raw._id,
    slug,
    title: pickLocaleString(raw.title, lang) || '(no title)',
    description: pickLocaleText(raw.description, lang) || '',
    category: (raw.category as GalleryAlbum['category']) ?? 'centri',
    coverImage: raw.coverImage
      ? urlForImage(raw.coverImage)
      : (images[0]?.url ?? ''),
    images,
    date: raw.date ?? new Date().toISOString(),
    tags: raw.tags ?? [],
  };
}

export async function getAllGalleryAlbums(
  lang: Language,
): Promise<GalleryAlbum[]> {
  const raw = await sanityClient.fetch<SanityGalleryAlbum[]>(ALBUMS_QUERY);
  return (raw ?? []).map((a) => mapAlbum(a, lang));
}

export async function getGalleryAlbumBySlug(
  slug: string,
  lang: Language,
): Promise<GalleryAlbum | null> {
  const raw = await sanityClient.fetch<SanityGalleryAlbum | null>(
    ALBUM_BY_SLUG_QUERY,
    { slug },
  );
  if (!raw) return null;
  return mapAlbum(raw, lang);
}
