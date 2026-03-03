'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout';
import { routes, type Language } from '@/lib';
import { PLACEHOLDER_IMAGE } from '@/lib/constants';
import { formatYear } from '@/lib/format';
import type { Project } from '@/types/models';

interface ProjectsSectionProps {
  lang: Language;
  title?: string;
  description?: string;
  buttonLabel?: string;
  readMoreButton?: string;
  initialProjects: Project[];
}

export function ProjectsSection({
  lang,
  title,
  description,
  buttonLabel,
  readMoreButton,
  initialProjects,
}: ProjectsSectionProps) {
  const projects = initialProjects;

  return (
    <section id="projects" className="py-16 content-section-bg relative">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            {title && (
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-base text-muted-foreground">{description}</p>
            )}
          </div>
          {buttonLabel && (
            <Button
              variant="outline"
              size="lg"
              className="self-start lg:self-auto"
              asChild
            >
              <Link href={routes.projects.list(lang)}>
                {buttonLabel}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={project.id}
                className={`group rounded-[4px] flex flex-col overflow-hidden bg-card transition-all ${
                  isReversed ? 'md:flex-col-reverse' : ''
                }`}
              >
                {/* Slika */}
                <div className="relative rounded-[4px] w-full flex-shrink-0 aspect-[16/10] bg-muted overflow-hidden">
                  <Image
                    src={project.image || PLACEHOLDER_IMAGE}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 256px"
                  />
                </div>
                {/* Tekst */}
                <div className="flex flex-1 flex-col justify-center p-4 md:p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium capitalize">
                      {project.category}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                        project.status === 'aktivno'
                          ? 'bg-primary/10 text-primary'
                          : project.status === 'završeno'
                            ? 'bg-muted text-muted-foreground'
                            : 'bg-accent/10 text-accent'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-serif font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {project.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatYear(project.year)}</span>
                    </div>
                    {(readMoreButton || buttonLabel) && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs"
                        asChild
                      >
                        <Link
                          href={routes.projects.detail(lang, project.slug)}
                          prefetch={false}
                        >
                          {readMoreButton ?? buttonLabel}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
