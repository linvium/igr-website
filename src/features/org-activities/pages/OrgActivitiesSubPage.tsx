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
import type { PublicationDocument } from '@/services/projects.service';
import type { GalleryAlbum } from '@/types/models';
import { OrgActivitiesBottomGallery } from '../components/OrgActivitiesBottomGallery';
import { Download, FileText } from 'lucide-react';

interface OrgActivitiesSubPageProps {
  lang: Language;
  title: string;
  description?: string;
  breadcrumbLabel: string;
  overviewBreadcrumbLabel?: string;
  contentBlocks: unknown[];
  navItems: OrgActivitiesNavItem[];
  navHeading: string;
  /** PDF documents from projects marked "Dodaj na Publikacije" (Publications page only) */
  publicationDocuments?: PublicationDocument[];
  /** Label for PDF documents section (e.g. "Dokumenti za preuzimanje") - from CMS */
  publicationDocumentsLabel?: string;
  /** Album galerije ispod sadržaja (CMS: bottomGallery) */
  bottomGallery?: GalleryAlbum | null;
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
  publicationDocuments,
  publicationDocumentsLabel,
  bottomGallery,
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
          {publicationDocuments && publicationDocuments.length > 0 && (
            <div className="mt-8 max-w-[50%]">
              {publicationDocumentsLabel && (
                <h3 className="text-sm font-medium mb-3">
                  {publicationDocumentsLabel}
                </h3>
              )}
              <ul className="space-y-3">
                {publicationDocuments.map((doc, index) => (
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
          {bottomGallery && bottomGallery.images.length > 0 && (
            <OrgActivitiesBottomGallery lang={lang} album={bottomGallery} />
          )}
        </div>
      </div>
    </Container>
  );
}
