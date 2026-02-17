import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { PartnersSection } from './sections/PartnersSection';
import { CentersSection } from './sections/CentersSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { NewsSection } from './sections/NewsSection';
import { GallerySection } from './sections/GallerySection';
import { ContactSection } from './sections/ContactSection';
import type { Language } from '@/lib';
import type { HomePageData, ResolvedHomeSection } from '@/types/models';
import type {
  NewsListPageConfig,
  ContactPageConfig,
} from '@/services/list-pages.service';

interface HomePageProps {
  lang: Language;
  homePageData: HomePageData;
  newsPageConfig?: NewsListPageConfig;
  contactPageConfig?: ContactPageConfig;
}

function SectionByType({
  section,
  lang,
  newsPageConfig,
  contactPageConfig,
}: {
  section: ResolvedHomeSection;
  lang: Language;
  newsPageConfig?: NewsListPageConfig;
  contactPageConfig?: ContactPageConfig;
}) {
  const { sectionType, title, description, badgeLabel, buttonLabel, readMoreButton, enabled } = section;
  if (!enabled) return null;

  switch (sectionType) {
    case 'hero':
      return (
        <HeroSection
          lang={lang}
          title={title || undefined}
          description={description || undefined}
          badgeLabel={badgeLabel}
          primaryButtonLabel={buttonLabel}
          secondaryButtonLabel={readMoreButton}
          heroStats={section.heroStats}
        />
      );
    case 'about':
      return (
        <AboutSection
          lang={lang}
          title={title || undefined}
          description={description || undefined}
          badgeLabel={badgeLabel}
          readMoreButton={readMoreButton}
          partnersHeadingLabel={section.partnersHeadingLabel}
          allPartnersButtonLabel={buttonLabel}
          features={section.aboutFeatures}
          partners={section.aboutPartners}
        />
      );
    case 'partners':
      return (
        <PartnersSection
          lang={lang}
          title={title || undefined}
          description={description || undefined}
          badgeLabel={badgeLabel}
          buttonLabel={buttonLabel}
          partners={section.partners ?? []}
        />
      );
    case 'centers':
      return (
        <CentersSection
          lang={lang}
          title={title || undefined}
          description={description || undefined}
          badgeLabel={badgeLabel}
          buttonLabel={buttonLabel}
          readMoreButton={readMoreButton}
          initialCenters={section.centers ?? []}
        />
      );
    case 'projects':
      return (
        <ProjectsSection
          lang={lang}
          title={title || undefined}
          description={description || undefined}
          badgeLabel={badgeLabel}
          buttonLabel={buttonLabel}
          readMoreButton={readMoreButton}
          initialProjects={section.projects ?? []}
        />
      );
    case 'news':
      return (
        <NewsSection
          lang={lang}
          title={title || undefined}
          description={description || undefined}
          badgeLabel={badgeLabel}
          buttonLabel={buttonLabel}
          readMoreButton={readMoreButton}
          initialNews={section.news ?? []}
          newsPageConfig={newsPageConfig}
        />
      );
    case 'gallery':
      return (
        <GallerySection
          lang={lang}
          title={title || undefined}
          description={description || undefined}
          badgeLabel={badgeLabel}
          buttonLabel={buttonLabel}
          initialAlbums={section.galleryAlbums ?? []}
        />
      );
    case 'contact':
      return (
        <ContactSection
          lang={lang}
          title={title || undefined}
          description={description || undefined}
          contactPageConfig={contactPageConfig}
        />
      );
    default:
      return null;
  }
}

export function HomePage({
  lang,
  homePageData,
  newsPageConfig,
  contactPageConfig,
}: HomePageProps) {
  const { sections } = homePageData;

  return (
    <>
      {sections.map((section, index) => (
        <SectionByType
          key={`${section.sectionType}-${index}`}
          section={section}
          lang={lang}
          newsPageConfig={newsPageConfig}
          contactPageConfig={contactPageConfig}
        />
      ))}
    </>
  );
}
