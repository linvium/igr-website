'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/layout';
import { PageHeader, Breadcrumbs } from '@/components/shared';
import { routes, type Language } from '@/lib';
import { formatYear } from '@/lib/format';
import { urlForImage } from '@/lib/sanity';
import type { ProjectsListPageConfig } from '@/services/list-pages.service';
import type { Project } from '@/types/models';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const portableTextComponents: PortableTextComponents = {
  types: {
    figure: ({ value }) => {
      const src = value?.asset
        ? urlForImage(value as { asset?: { _ref?: string } })
        : '';
      if (!src) return null;
      return (
        <figure className="my-6">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <Image
              src={src}
              alt={value?.caption || ''}
              fill
              className="object-cover"
            />
          </div>
          {value?.caption && (
            <figcaption className="mt-2 text-sm text-muted-foreground text-center">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

interface ProjectDetailPageProps {
  lang: Language;
  slug: string;
  initialProject: Project;
  initialRelatedProjects: Project[];
  pageConfig: ProjectsListPageConfig;
}

export function ProjectDetailPage({
  lang,
  slug,
  initialProject: project,
  initialRelatedProjects: relatedProjects,
  pageConfig,
}: ProjectDetailPageProps) {
  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: pageConfig.title, href: routes.projects.list(lang) },
            { label: project.title },
          ]}
        />
      </div>

      <Button variant="ghost" className="mb-6" asChild>
        <Link href={routes.projects.list(lang)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {pageConfig.back}
        </Link>
      </Button>

      {project.image ? (
        <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-96 rounded-2xl bg-muted mb-12 flex items-center justify-center">
          <span className="text-muted-foreground">
            {pageConfig.noImageLabel || 'Nema slike'}
          </span>
        </div>
      )}

      <PageHeader title={project.title} description={project.excerpt} />

      <div className="grid lg:grid-cols-3 gap-12 py-8">
        <div className="lg:col-span-2">
          <div className="prose prose-lg max-w-none mb-8">
            {project.bodyBlocks && project.bodyBlocks.length > 0 ? (
              <PortableText
                value={project.bodyBlocks as PortableTextBlock[]}
                components={portableTextComponents}
              />
            ) : project.body ? (
              <p>{project.body}</p>
            ) : null}
          </div>

          {project.gallery && project.gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              {project.gallery.map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`${project.title} - slika ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {relatedProjects.length > 0 && (
        <div className="py-12 border-t">
          <h2 className="font-serif text-3xl font-bold mb-8">
            {pageConfig.detailRelated}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relatedProjects.map((related) => (
              <Card key={related.id} className="card-elevated">
                <div className="relative h-48">
                  <Image
                    src={related.image}
                    alt={related.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-serif">{related.title}</CardTitle>
                  <CardDescription>{related.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0 h-auto group/btn" asChild>
                    <Link
                      href={routes.projects.detail(lang, related.slug)}
                      prefetch={false}
                      className="inline-flex items-center gap-2 text-primary"
                    >
                      {pageConfig.learnMore}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
