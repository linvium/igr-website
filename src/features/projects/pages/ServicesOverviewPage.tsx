'use client';

import { Container } from '@/components/layout';
import { PageHeader, Breadcrumbs } from '@/components/shared';
import { AboutNavigation } from '@/features/about';
import { ProjectsTabs } from '../components/ProjectsTabs';
import { routes, type Language } from '@/lib';
import type { ProjectsServicesNavItem } from '@/services/list-pages.service';
import type { ProjectsListPageConfig } from '@/services/list-pages.service';

interface ServicesOverviewPageProps {
  lang: Language;
  title: string;
  description?: string;
  navItems: ProjectsServicesNavItem[];
  navHeading: string;
  pageConfig: ProjectsListPageConfig;
}

export function ServicesOverviewPage({
  lang,
  title,
  description,
  navItems,
  navHeading,
  pageConfig,
}: ServicesOverviewPageProps) {
  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: pageConfig.title, href: routes.projects.list(lang) },
            {
              label: pageConfig.servicesTabLabel,
              href: routes.projects.services(lang),
            },
          ]}
        />
      </div>

      <ProjectsTabs
        lang={lang}
        projectsTabLabel={pageConfig.projectsTabLabel}
        servicesTabLabel={pageConfig.servicesTabLabel}
      />

      <PageHeader title={title} description={description} className="py-8" />

      <div className="grid lg:grid-cols-4 gap-12 py-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <AboutNavigation
              heading={navHeading}
              items={navItems.map((i) => ({ label: i.label, href: i.href }))}
              activeHref={navItems[0]?.href}
            />
          </div>
        </aside>

        <div className="lg:col-span-3" />
      </div>
    </Container>
  );
}
