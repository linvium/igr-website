'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Container } from '@/components/layout';
import {
  PageHeader,
  Breadcrumbs,
  FilterSelect,
  EmptyState,
} from '@/components/shared';
import { ProjectsTabs } from '../components/ProjectsTabs';
import { routes, type Language } from '@/lib';
import { formatYear } from '@/lib/format';
import type { ProjectsListPageConfig } from '@/services/list-pages.service';
import type { Project, ProjectCategory, ProjectStatus } from '@/types/models';
import type { FilterOption } from '@/components/shared/FilterPills';

interface ProjectsListPageProps {
  lang: Language;
  initialProjects: Project[];
  pageConfig: ProjectsListPageConfig;
}

export function ProjectsListPage({
  lang,
  initialProjects,
  pageConfig,
}: ProjectsListPageProps) {
  const [allProjects] = useState<Project[]>(initialProjects);
  const sveCategory = pageConfig.categoryCategories.find(
    (c) => c.slug === 'sve' || c.slug === 'all',
  );
  const sveStatus = pageConfig.statusCategories.find(
    (c) => c.slug === 'sve' || c.slug === 'all',
  );
  const allValue = sveCategory ? 'sve' : 'all';
  const allStatusValue = sveStatus ? 'sve' : 'all';
  const [selectedCategory, setSelectedCategory] = useState<string>(allValue);
  const [selectedStatus, setSelectedStatus] = useState<string>(allStatusValue);
  const [searchQuery, setSearchQuery] = useState('');

  const categoryOptions: FilterOption[] = [
    {
      value: allValue,
      label: sveCategory?.name || pageConfig.allFilterLabel,
    },
    ...pageConfig.categoryCategories
      .filter((c) => c.slug !== 'all' && c.slug !== 'sve')
      .map((c) => ({ value: c.slug, label: c.name })),
  ];

  const statusOptions: FilterOption[] = [
    {
      value: allStatusValue,
      label: sveStatus?.name || pageConfig.allFilterLabel,
    },
    ...pageConfig.statusCategories
      .filter((c) => c.slug !== 'all' && c.slug !== 'sve')
      .map((c) => ({ value: c.slug, label: c.name })),
  ];

  const filteredProjects = allProjects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      selectedCategory === 'sve' ||
      project.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'all' ||
      selectedStatus === 'sve' ||
      project.status === selectedStatus;
    const matchesSearch =
      searchQuery === '' ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs lang={lang} items={[{ label: pageConfig.title }]} />
      </div>

      <ProjectsTabs
        lang={lang}
        projectsTabLabel={pageConfig.projectsTabLabel}
        servicesTabLabel={pageConfig.servicesTabLabel}
        servicesHref={
          pageConfig.servicesNavigationItems[0]?.sectionSlug
            ? routes.projects.serviceDetail(
                lang,
                pageConfig.servicesNavigationItems[0].sectionSlug,
              )
            : undefined
        }
      />

      <PageHeader
        title={pageConfig.projectsTabTitle}
        description={pageConfig.projectsTabShortDescription}
      />

      {/* Filters */}
      <div className="py-8">
        <div className="flex flex-wrap gap-6 items-end">
          <FilterSelect
            label={pageConfig.categoryFilterLabel}
            options={categoryOptions}
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          />
          <FilterSelect
            label={pageConfig.statusFilterLabel}
            options={statusOptions}
            value={selectedStatus}
            onValueChange={setSelectedStatus}
          />
        </div>
      </div>

      {/* Projects List */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          title={pageConfig.emptyTitle}
          description={pageConfig.emptyDescription}
        />
      ) : (
        <div className="space-y-6 py-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-card rounded-[4px] p-6 md:p-8 card-elevated border border-border/50 hover:border-primary/30 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Slika - lijevo */}
                <div className="relative w-full md:w-48 lg:w-56 flex-shrink-0 aspect-[4/3] md:aspect-auto md:h-36 bg-muted rounded-[4px] overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 224px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                      {pageConfig.noImageLabel}
                    </div>
                  )}
                </div>
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
                    {pageConfig.detailsButton}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
