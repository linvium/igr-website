'use client';

import Image from 'next/image';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { urlForImage } from '@/lib/sanity';

export const portableTextComponents: PortableTextComponents = {
  types: {
    figure: ({ value }) => {
      const imageSource = value?.image || value?.asset ? (value.image || value) : null;
      const src = imageSource ? urlForImage(imageSource as { asset?: { _ref?: string } }) : '';
      if (!src) return null;
      const alt = value?.alt || value?.caption || '';
      const caption = value?.caption || '';
      return (
        <figure className="my-6">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover"
            />
          </div>
          {caption && (
            <figcaption className="mt-2 text-sm text-muted-foreground text-center">
              {caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="mt-8 mb-4 font-serif text-3xl font-bold">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-4 font-serif text-2xl font-bold">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 mb-3 font-serif text-xl font-semibold">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-4 mb-2 font-serif text-lg font-semibold">{children}</h4>
    ),
    normal: ({ children }) => <p className="mb-4">{children}</p>,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 list-disc pl-6 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 list-decimal pl-6 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};

interface PortableTextRendererProps {
  value: PortableTextBlock[] | unknown[] | null | undefined;
  className?: string;
}

export function PortableTextRenderer({
  value,
  className = 'prose prose-lg max-w-none',
}: PortableTextRendererProps) {
  if (!value || !Array.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <PortableText
        value={value as PortableTextBlock[]}
        components={portableTextComponents}
      />
    </div>
  );
}
