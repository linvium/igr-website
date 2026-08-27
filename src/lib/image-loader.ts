type ImageLoaderProps = {
  src: string;
  width: number;
  quality?: number;
};

/**
 * Serve Sanity assets from their CDN (already resized/formatted).
 * Avoids Next.js /_next/image, which times out on large remote JPEGs.
 */
export default function imageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (src.startsWith('https://cdn.sanity.io/')) {
    try {
      const url = new URL(src);
      url.searchParams.set('auto', 'format');
      url.searchParams.set('fit', 'max');
      url.searchParams.set('w', String(width));
      url.searchParams.set('q', String(quality ?? 75));
      return url.toString();
    } catch {
      return src;
    }
  }

  const separator = src.includes('?') ? '&' : '?';
  return `${src}${separator}w=${width}`;
}
