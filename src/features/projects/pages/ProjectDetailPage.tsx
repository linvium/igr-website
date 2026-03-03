'use client';

import Link from 'next/link';
import Image from 'next/image';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { ArrowLeft, ArrowRight, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/layout';
import { PageHeader, Breadcrumbs } from '@/components/shared';
import { routes, type Language } from '@/lib';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
// import { formatYear } from '@/lib/format';
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
      const imageSrc = src || PLACEHOLDER_IMAGE;
      return (
        <figure className="my-6">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={imageSrc}
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

      <div className="relative h-96 rounded-[4px] overflow-hidden mb-12">
        <Image
          src={project.image || PLACEHOLDER_IMAGE}
          alt={project.title}
          fill
          className="object-cover"
        />
      </div>

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

          {project.externalLink && (
            <p className="mb-8">
              {(project.externalLinkLabel || pageConfig.externalLinkLabel)?.replace(
                ':',
                ' →'
              )}
              {' '}
              <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium underline underline-offset-4 hover:text-primary/80"
              >
                Link
              </a>
            </p>
          )}

          {project.documents && project.documents.length > 0 && (
            <div className="mb-8 max-w-[50%]">
              {(project.documentsLabel || pageConfig.documentsLabel) && (
                <h3 className="text-sm font-medium mb-3">
                  {project.documentsLabel || pageConfig.documentsLabel}
                </h3>
              )}
              <ul className="space-y-3">
                {project.documents.map((doc, index) => (
                  <li key={index}>
                    <a
                      href={`${doc.fileUrl}?dl=`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <span className="flex-1 font-medium text-foreground group-hover:text-primary transition-colors">
                        {doc.title}
                      </span>
                      <Download className="w-5 h-5 text-muted-foreground shrink-0" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              {project.gallery.map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden"
                >
                  <Image
                    src={img || PLACEHOLDER_IMAGE}
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
                    src={related.image || PLACEHOLDER_IMAGE}
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
                  <Button
                    variant="link"
                    className="p-0 h-auto group/btn"
                    asChild
                  >
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
