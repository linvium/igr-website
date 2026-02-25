import { FileText, Download } from 'lucide-react';
import { getLanguage } from '@/lib/lang';
import { generatePageMetadata } from '@/lib/seo';
import { getSiteSettings } from '@/services/site-settings.service';
import {
  getAboutPageConfig,
  getAboutNavItems,
} from '@/services/about.service';
import type { Metadata } from 'next';
import type { Language } from '@/lib';
import { Container } from '@/components/layout';
import { PageHeader, Breadcrumbs } from '@/components/shared';
import { AboutNavigation } from '@/features/about/components/AboutNavigation';
import { routes } from '@/lib/routes';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const siteSettings = await getSiteSettings(lang);
  const aboutConfig = await getAboutPageConfig(lang);
  return generatePageMetadata(
    siteSettings,
    aboutConfig.regulationsSection.title || 'Propisi i Akti',
    aboutConfig.regulationsSection.shortDescription ||
      'Propisi i akti Instituta za Genetičke Resurse',
  );
}

export default async function RegulationsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = getLanguage(resolvedParams.lang as Language);
  const pageConfig = await getAboutPageConfig(lang);
  const section = pageConfig.regulationsSection;
  const navItems = getAboutNavItems(pageConfig, lang);

  return (
    <Container>
      <div className="py-8">
        <Breadcrumbs
          lang={lang}
          items={[
            { label: pageConfig.title, href: routes.about.overview(lang) },
            { label: section.title || 'Propisi i Akti' },
          ]}
        />
      </div>

      <div className="grid lg:grid-cols-4 gap-12 py-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            <AboutNavigation
              heading={pageConfig.navigationHeading}
              items={navItems}
            />
          </div>
        </aside>

        <div className="lg:col-span-3">
          <PageHeader
            title={section.title || 'Propisi i Akti'}
            description={section.shortDescription}
          />

          {section.documents.length > 0 ? (
            <ul className="space-y-4">
              {section.documents.map((doc, index) => (
                <li key={index}>
                  <a
                    href={`${doc.fileUrl}?dl=`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <span className="flex-1 font-medium text-foreground group-hover:text-primary transition-colors">
                      {doc.title}
                    </span>
                    <Download className="w-5 h-5 text-muted-foreground shrink-0" />
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">
              Trenutno nema dostupnih dokumenata.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
}
