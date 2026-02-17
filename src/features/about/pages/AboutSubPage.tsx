'use client';

import { Container } from '@/components/layout';
import { PageHeader, Breadcrumbs, PortableTextRenderer } from '@/components/shared';
import { AboutNavigation } from '../components/AboutNavigation';
import { routes, type Language } from '@/lib';
import type { AboutNavItem } from '@/services/about.service';

interface AboutSubPageProps {
  lang: Language;
  title: string;
  description?: string;
  breadcrumbLabel: string;
  overviewBreadcrumbLabel?: string;
  contentBlocks: unknown[];
  navItems: AboutNavItem[];
  navHeading: string;
}

export function AboutSubPage({
  lang,
  title,
  description,
  breadcrumbLabel,
  overviewBreadcrumbLabel = 'O Institutu',
  contentBlocks,
  navItems,
  navHeading,
}: AboutSubPageProps) {
  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: overviewBreadcrumbLabel, href: routes.about.overview(lang) },
            { label: breadcrumbLabel },
          ]}
        />
      </div>

      <div className="grid lg:grid-cols-4 gap-12 py-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <AboutNavigation heading={navHeading} items={navItems} />
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
