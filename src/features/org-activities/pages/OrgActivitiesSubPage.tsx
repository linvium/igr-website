'use client';

import { Container } from '@/components/layout';
import {
  PageHeader,
  Breadcrumbs,
  PortableTextRenderer,
} from '@/components/shared';
import { AboutNavigation } from '@/features/about';
import { routes, type Language } from '@/lib';
import type { OrgActivitiesNavItem } from '@/services/org-activities.service';

interface OrgActivitiesSubPageProps {
  lang: Language;
  title: string;
  description?: string;
  breadcrumbLabel: string;
  overviewBreadcrumbLabel?: string;
  contentBlocks: unknown[];
  navItems: OrgActivitiesNavItem[];
  navHeading: string;
}

export function OrgActivitiesSubPage({
  lang,
  title,
  description,
  breadcrumbLabel,
  overviewBreadcrumbLabel = 'Organizacija i aktivnosti',
  contentBlocks,
  navItems,
  navHeading,
}: OrgActivitiesSubPageProps) {
  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs
          lang={lang}
          items={[
            {
              label: overviewBreadcrumbLabel,
              href: routes.orgActivities.overview(lang),
            },
            { label: breadcrumbLabel },
          ]}
        />
      </div>

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
          <PageHeader title={title} description={description} />
          <PortableTextRenderer value={contentBlocks} />
        </div>
      </div>
    </Container>
  );
}
