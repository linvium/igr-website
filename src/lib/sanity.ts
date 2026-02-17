import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { Language } from './lang';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'zqdw4srh';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

// Use CDN only in production when explicitly enabled (skip CDN to avoid stale empty results)
const useCdn =
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
});

export const imageBuilder = createImageUrlBuilder({ projectId, dataset });

export function urlForImage(
  source: { asset?: { _ref?: string } } | string | null | undefined,
): string {
  if (!source) return '';
  if (typeof source === 'string') return source;
  const ref = source.asset?._ref;
  if (!ref) return '';
  return imageBuilder.image(source).auto('format').url();
}

/**
 * Map portal Language to Sanity locale object key
 */
export function sanityLocaleKey(lang: Language): 'en' | 'sr' | 'srCyr' {
  switch (lang) {
    case 'en':
      return 'en';
    case 'sr-lat':
      return 'sr';
    case 'sr-cy':
      return 'srCyr';
    default:
      return 'sr';
  }
}

/**
 * Pick string from locale object by language (fallback: en -> sr -> srCyr)
 */
export function pickLocaleString(
  locale:
    | { en?: string | null; sr?: string | null; srCyr?: string | null }
    | null
    | undefined,
  lang: Language,
): string {
  if (!locale) return '';
  const key = sanityLocaleKey(lang);
  const value = locale[key] ?? locale.en ?? locale.sr ?? locale.srCyr;
  return value ?? '';
}

/**
 * Pick text from locale object
 */
export function pickLocaleText(
  locale:
    | { en?: string | null; sr?: string | null; srCyr?: string | null }
    | null
    | undefined,
  lang: Language,
): string {
  return pickLocaleString(locale, lang);
}

/**
 * Pick portable text blocks from locale object (body / detaljan opis)
 */
export function pickLocaleBlocks(
  locale:
    | { en?: unknown[]; sr?: unknown[]; srCyr?: unknown[] }
    | null
    | undefined,
  lang: Language,
): unknown[] {
  if (!locale) return [];
  const key = sanityLocaleKey(lang);
  const value = locale[key] ?? locale.en ?? locale.sr ?? locale.srCyr;
  return Array.isArray(value) ? value : [];
}
