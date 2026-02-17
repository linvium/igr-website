'use client';

import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/layout';
import { routes, type Language } from '@/lib';
import { formatYear } from '@/lib/format';
import type { Project } from '@/types/models';

const DEFAULT_TITLE = 'Projekti';
const DEFAULT_DESCRIPTION =
  'Aktivni i završeni projekti koji doprinose očuvanju genetičkih resursa i biodiverziteta.';

interface ProjectsSectionProps {
  lang: Language;
  title?: string;
  description?: string;
  badgeLabel?: string;
  buttonLabel?: string;
  readMoreButton?: string;
  initialProjects: Project[];
}

export function ProjectsSection({
  lang,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  badgeLabel,
  buttonLabel,
  readMoreButton,
  initialProjects,
}: ProjectsSectionProps) {
  const projects = initialProjects;

  return (
    <section id="projects" className="py-24 relative">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {badgeLabel ?? 'Projekti'}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              {title}
            </h2>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="self-start lg:self-auto"
            asChild
          >
            <Link href={routes.projects.list(lang)}>
              {buttonLabel ?? 'Pogledaj sve'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="space-y-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-2xl p-6 md:p-8 card-elevated border border-border/50 hover:border-primary/30 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium capitalize">
                      {project.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
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
                  <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatYear(project.year)}</span>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <Link
                    href={routes.projects.detail(lang, project.slug)}
                    prefetch={false}
                  >
                    {readMoreButton ?? buttonLabel ?? 'Saznaj više'}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
