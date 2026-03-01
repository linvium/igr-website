'use client';

import { Container } from '@/components/layout';
import {
  PageHeader,
  Breadcrumbs,
  PortableTextRenderer,
} from '@/components/shared';
import { AboutNavigation } from '@/features/about';
import { ProjectsTabs } from '../components/ProjectsTabs';
import { routes, type Language } from '@/lib';
import type { ProjectsServicesNavItem } from '@/services/list-pages.service';
import type { ProjectsListPageConfig } from '@/services/list-pages.service';

interface ServicesSubPageProps {
  lang: Language;
  breadcrumbLabel: string;
  serviceTitle: string;
  serviceShortDescription?: string;
  contentBlocks: unknown[];
  navItems: ProjectsServicesNavItem[];
  navHeading: string;
  pageConfig: ProjectsListPageConfig;
}

export function ServicesSubPage({
  lang,
  breadcrumbLabel,
  serviceTitle,
  serviceShortDescription,
  contentBlocks,
  navItems,
  navHeading,
  pageConfig,
}: ServicesSubPageProps) {
  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: pageConfig.title, href: routes.projects.list(lang) },
            { label: pageConfig.servicesTabLabel, href: routes.projects.services(lang) },
            { label: breadcrumbLabel },
          ]}
        />
      </div>

      <ProjectsTabs
        lang={lang}
        projectsTabLabel={pageConfig.projectsTabLabel}
        servicesTabLabel={pageConfig.servicesTabLabel}
      />

      <PageHeader
        title={pageConfig.servicesTabTitle}
        description={pageConfig.servicesTabShortDescription}
        className="py-8"
      />

      <div className="grid lg:grid-cols-4 gap-12 py-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <AboutNavigation
              heading={navHeading}
              items={navItems.map((i) => ({ label: i.label, href: i.href }))}
            />
          </div>
        </aside>

        <div className="lg:col-span-3">
          <div className="mb-8">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">
              {serviceTitle}
            </h2>
            {serviceShortDescription && (
              <p className="text-lg text-muted-foreground">
                {serviceShortDescription}
              </p>
            )}
          </div>
          <PortableTextRenderer value={contentBlocks} />
        </div>
      </div>
    </Container>
  );
}
