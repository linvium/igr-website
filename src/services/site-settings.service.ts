import {
  sanityClient,
  urlForImage,
  pickLocaleString,
  pickLocaleText,
} from '@/lib/sanity';
import type { Language } from '@/lib/lang';

type LocaleObj = { en?: string; sr?: string; srCyr?: string } | null;

// Raw type from Sanity (locale objects)
interface SanityNavItem {
  label?: LocaleObj;
  path?: string | null;
  linkType?: string | null;
  externalUrl?: string | null;
}

interface SanityFooterLink {
  label?: LocaleObj;
  path?: string | null;
  linkType?: string | null;
  externalUrl?: string | null;
}

interface SanityFooterSection {
  title?: LocaleObj;
  links?: SanityFooterLink[] | null;
}

export interface SanitySiteSettings {
  _id: string;
  name?: LocaleObj;
  shortName?: LocaleObj;
  description?: { en?: string; sr?: string; srCyr?: string } | null;
  url?: string | null;
  logo?: { asset?: { _ref: string } } | null;
  navbar?: { items?: SanityNavItem[] | null } | null;
  footer?: {
    institut?: SanityFooterSection | null;
    centri?: SanityFooterSection | null;
    organizacija?: SanityFooterSection | null;
    resursi?: SanityFooterSection | null;
  } | null;
  social?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  } | null;
  contact?: {
    email?: string;
    phone?: string;
    address?: string;
  } | null;
  errorMessages?: {
    notFoundTitle?: LocaleObj;
    notFoundDescription?: LocaleObj;
    notFoundHomeButton?: { text?: LocaleObj };
    errorTitle?: LocaleObj;
    errorDescription?: LocaleObj;
    errorRetryButton?: { text?: LocaleObj };
    errorHomeButton?: { text?: LocaleObj };
  } | null;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

// Normalized for frontend (single language)
export interface ErrorMessages {
  notFoundTitle: string;
  notFoundDescription: string;
  notFoundHomeButton: string;
  errorTitle: string;
  errorDescription: string;
  errorRetryButton: string;
  errorHomeButton: string;
}

export interface SiteSettings {
  name: string;
  shortName: string;
  description: string;
  url: string;
  logo: string;
  navbar: NavItem[];
  footer: {
    institut: FooterSection;
    /** @deprecated Use organizacija. Kept for backward compatibility. */
    centri: FooterSection;
    organizacija: FooterSection;
    resursi: FooterSection;
  };
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  errorMessages: ErrorMessages;
}

function resolveNavHref(
  item: SanityNavItem,
  lang: Language,
): string {
  if (item.linkType === 'external' && item.externalUrl) {
    return item.externalUrl;
  }
  const path = item.path?.trim() || '/';
  return path.startsWith('/') ? `/${lang}${path}` : `/${lang}/${path}`;
}

function resolveFooterLinkHref(
  link: SanityFooterLink,
  lang: Language,
): string {
  if (link.linkType === 'external' && link.externalUrl) {
    return link.externalUrl;
  }
  let path = (link.path?.trim() || '/').replace(/^\/+/, '');
  if (path === 'projekti') path = 'projekti-i-usluge';
  else if (path.startsWith('projekti/')) path = 'projekti-i-usluge/' + path.slice(9);
  const fullPath = path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${fullPath}`;
}

function mapNavItems(
  items: SanityNavItem[] | null | undefined,
  lang: Language,
): NavItem[] {
  if (!items?.length) return [];
  const langSlug = lang === 'en' ? 'en' : lang === 'sr-cy' ? 'sr-cy' : 'sr-lat';
  const orgActivitiesHref = `/${langSlug}/organizacija-i-aktivnosti`;
  return items
    .filter((i) => pickLocaleString(i.label, lang))
    .map((i) => {
      const label = pickLocaleString(i.label, lang)!;
      let href = resolveNavHref(i, lang);
      // Migracija: Centri -> Organizacija i aktivnosti (href se mijenja, label ostaje iz CMS-a)
      const path = (i.path?.trim() || '').replace(/^\/+/, '');
      if (path === 'centri' || href.endsWith('/centri')) {
        return { label, href: orgActivitiesHref };
      }
      // Projekti i usluge - label i putanja /projekti-i-usluge
      if (path === 'projekti' || path === 'projekti-i-usluge' || href.endsWith('/projekti') || href.endsWith('/projekti-i-usluge')) {
        return { label: 'Projekti i usluge', href: `/${langSlug}/projekti-i-usluge` };
      }
      return { label, href };
    });
}

function mapFooterSection(
  section: SanityFooterSection | null | undefined,
  lang: Language,
): FooterSection {
  const title = section ? pickLocaleString(section.title, lang) : '';
  const links: FooterLink[] = (section?.links ?? [])
    .filter((l) => pickLocaleString(l.label, lang))
    .map((l) => ({
      label: pickLocaleString(l.label, lang)!,
      href: resolveFooterLinkHref(l, lang),
    }));
  return { title, links };
}

const SITE_SETTINGS_QUERY = `coalesce(*[_id == "siteSettings"][0], *[_type == "siteSettings"][0]) {
  _id,
  name,
  shortName,
  description,
  url,
  logo,
  navbar { items[] { label, path, linkType, externalUrl } },
  footer {
    institut { title, links[] { label, path, linkType, externalUrl } },
    centri { title, links[] { label, path, linkType, externalUrl } },
    organizacija { title, links[] { label, path, linkType, externalUrl } },
    resursi { title, links[] { label, path, linkType, externalUrl } }
  },
  social,
  contact,
  "errorMessages": {
    "notFoundTitle": errorMessages.notFoundTitle,
    "notFoundDescription": errorMessages.notFoundDescription,
    "notFoundHomeButton": errorMessages.notFoundHomeButton->{ text },
    "errorTitle": errorMessages.errorTitle,
    "errorDescription": errorMessages.errorDescription,
    "errorRetryButton": errorMessages.errorRetryButton->{ text },
    "errorHomeButton": errorMessages.errorHomeButton->{ text }
  }
}`;

export async function getSiteSettings(lang: Language): Promise<SiteSettings> {
  const raw = await sanityClient.fetch<SanitySiteSettings | null>(
    SITE_SETTINGS_QUERY,
  );
  if (!raw) {
    return getDefaultSiteSettings(lang);
  }

  const navbarItems = mapNavItems(raw.navbar?.items, lang);
  const defaultSettings = getDefaultSiteSettings(lang);

  const mappedInstitut = mapFooterSection(raw.footer?.institut, lang);
  const mappedCentri = mapFooterSection(raw.footer?.centri, lang);
  const mappedOrganizacija = mapFooterSection(raw.footer?.organizacija, lang);
  const mappedResursi = mapFooterSection(raw.footer?.resursi, lang);

  const em = raw.errorMessages;
  const errorMessages: ErrorMessages = {
    notFoundTitle:
      pickLocaleString(em?.notFoundTitle, lang) || 'Stranica nije pronađena',
    notFoundDescription:
      pickLocaleString(em?.notFoundDescription, lang) ||
      'Stranica koju tražite ne postoji ili je premještena.',
    notFoundHomeButton:
      pickLocaleString(em?.notFoundHomeButton?.text, lang) || 'Vrati se na početnu',
    errorTitle:
      pickLocaleString(em?.errorTitle, lang) || 'Nešto je pošlo po zlu',
    errorDescription:
      pickLocaleString(em?.errorDescription, lang) ||
      'Došlo je do neočekivane greške. Molimo pokušajte ponovo ili se vratite na početnu stranicu.',
    errorRetryButton:
      pickLocaleString(em?.errorRetryButton?.text, lang) || 'Pokušaj ponovo',
    errorHomeButton:
      pickLocaleString(em?.errorHomeButton?.text, lang) || 'Početna stranica',
  };

  return {
    name: pickLocaleString(raw.name, lang) || defaultSettings.name,
    shortName: pickLocaleString(raw.shortName, lang) || '',
    description: pickLocaleText(raw.description, lang) || defaultSettings.description,
    url: raw.url || defaultSettings.url,
    logo: raw.logo ? urlForImage(raw.logo) || '/logo.svg' : '/logo.svg',
    navbar: navbarItems.length > 0 ? navbarItems : defaultSettings.navbar,
    footer: {
      institut: raw.footer?.institut
        ? { title: mappedInstitut.title || 'Institut', links: mappedInstitut.links }
        : defaultSettings.footer.institut,
      centri: raw.footer?.centri
        ? { title: mappedCentri.title || 'Centri', links: mappedCentri.links }
        : defaultSettings.footer.centri,
      organizacija:
        raw.footer?.organizacija || raw.footer?.centri
          ? {
              title:
                (mappedOrganizacija.title || mappedCentri.title) ||
                defaultSettings.footer.organizacija.title,
              links:
                mappedOrganizacija.links.length > 0
                  ? mappedOrganizacija.links
                  : defaultSettings.footer.organizacija.links,
            }
          : defaultSettings.footer.organizacija,
      resursi: raw.footer?.resursi
        ? { title: mappedResursi.title || 'Resursi', links: mappedResursi.links }
        : defaultSettings.footer.resursi,
    },
    social: {
      facebook: raw.social?.facebook || '',
      twitter: raw.social?.twitter || '',
      instagram: raw.social?.instagram || '',
      linkedin: raw.social?.linkedin || '',
    },
    contact: {
      email: raw.contact?.email || '',
      phone: raw.contact?.phone || '',
      address: raw.contact?.address || '',
    },
    errorMessages,
  };
}

const DEFAULT_LABELS: Record<
  'en' | 'sr-cy' | 'sr-lat',
  {
    about: string;
    orgActivities: string;
    projectsAndServices: string;
    news: string;
    gallery: string;
    contact: string;
    institut: string;
    aboutUs: string;
    team: string;
    partners: string;
    career: string;
    resources: string;
    publications: string;
    bankaGena: string;
    botanickaBasta: string;
    poljskeKolekcije: string;
    laboratorije: string;
    zasticenoPodrucje: string;
  }
> = {
  en: {
    about: 'About the Institute',
    orgActivities: 'Organization and activities',
    projectsAndServices: 'Projects and services',
    news: 'News',
    gallery: 'Gallery',
    contact: 'Contact',
    institut: 'Institute',
    aboutUs: 'About us',
    team: 'Team',
    partners: 'Partners',
    career: 'Career',
    resources: 'Resources',
    publications: 'Publications',
    bankaGena: 'Gene bank',
    botanickaBasta: 'Botanical garden',
    poljskeKolekcije: 'Field collections',
    laboratorije: 'Laboratories',
    zasticenoPodrucje: 'Protected area',
  },
  'sr-cy': {
    about: 'О Институту',
    orgActivities: 'Организација и активности',
    projectsAndServices: 'Пројекти и услуге',
    news: 'Новости',
    gallery: 'Галерија',
    contact: 'Контакт',
    institut: 'Институт',
    aboutUs: 'О нама',
    team: 'Тим',
    partners: 'Партнери',
    career: 'Каријера',
    resources: 'Ресурси',
    publications: 'Публикације',
    bankaGena: 'Банка гена',
    botanickaBasta: 'Ботаничка башта',
    poljskeKolekcije: 'Пољске колекције',
    laboratorije: 'Лабораторије',
    zasticenoPodrucje: 'Заштићено подручје',
  },
  'sr-lat': {
    about: 'O Institutu',
    orgActivities: 'Organizacija i aktivnosti',
    projectsAndServices: 'Projekti i usluge',
    news: 'Novosti',
    gallery: 'Galerija',
    contact: 'Kontakt',
    institut: 'Institut',
    aboutUs: 'O nama',
    team: 'Tim',
    partners: 'Partneri',
    career: 'Karijera',
    resources: 'Resursi',
    publications: 'Publikacije',
    bankaGena: 'Banka gena',
    botanickaBasta: 'Botanička bašta',
    poljskeKolekcije: 'Poljske kolekcije',
    laboratorije: 'Laboratorije',
    zasticenoPodrucje: 'Zaštićeno područje',
  },
};

function getDefaultSiteSettings(lang: Language): SiteSettings {
  const langSlug = lang === 'en' ? 'en' : lang === 'sr-cy' ? 'sr-cy' : 'sr-lat';
  const t = DEFAULT_LABELS[langSlug];
  const r = (path: string) => `/${langSlug}${path}`;
  return {
    name: 'Institut za Genetičke Resurse',
    shortName: 'IGR',
    description:
      'Institut za Genetičke Resurse - Centar za očuvanje i istraživanje genetičkih resursa',
    url: 'https://igr.rs',
    logo: '/logo.svg',
    navbar: [
      { label: t.about, href: r('/o-institutu') },
      { label: t.orgActivities, href: r('/organizacija-i-aktivnosti') },
      { label: t.projectsAndServices, href: r('/projekti-i-usluge') },
      { label: t.news, href: r('/novosti') },
      { label: t.gallery, href: r('/galerija') },
      { label: t.contact, href: r('/kontakt') },
    ],
    footer: {
      institut: {
        title: t.institut,
        links: [
          { label: t.aboutUs, href: r('/o-institutu') },
          { label: t.team, href: r('/o-institutu/tim') },
          { label: t.partners, href: r('/o-institutu/partneri') },
          { label: t.career, href: r('/o-institutu') },
        ],
      },
      centri: {
        title: 'Centri',
        links: [],
      },
      organizacija: {
        title: t.orgActivities,
        links: [
          { label: t.bankaGena, href: r('/organizacija-i-aktivnosti/banka-gena') },
          { label: t.botanickaBasta, href: r('/organizacija-i-aktivnosti/botanicka-basta') },
          { label: t.poljskeKolekcije, href: r('/organizacija-i-aktivnosti/poljske-kolekcije') },
          { label: t.laboratorije, href: r('/organizacija-i-aktivnosti/laboratorije') },
          {
            label: t.zasticenoPodrucje,
            href: r('/organizacija-i-aktivnosti/zasticeno-podrucje'),
          },
          { label: t.publications, href: r('/organizacija-i-aktivnosti/publikacije') },
        ],
      },
      resursi: {
        title: t.resources,
        links: [
          { label: t.projectsAndServices, href: r('/projekti-i-usluge') },
          { label: t.publications, href: r('/projekti-i-usluge') },
          { label: t.gallery, href: r('/galerija') },
          { label: t.news, href: r('/novosti') },
        ],
      },
    },
    social: {
      facebook: 'https://facebook.com/igr',
      twitter: 'https://twitter.com/igr',
      instagram: 'https://instagram.com/igr',
      linkedin: 'https://linkedin.com/company/igr',
    },
    contact: {
      email: 'info@igr.rs',
      phone: '+381 11 123 4567',
      address: 'Bulevar kralja Aleksandra 1, 11000 Beograd, Srbija',
    },
    errorMessages: {
      notFoundTitle: 'Stranica nije pronađena',
      notFoundDescription:
        'Stranica koju tražite ne postoji ili je premještena.',
      notFoundHomeButton: 'Vrati se na početnu',
      errorTitle: 'Nešto je pošlo po zlu',
      errorDescription:
        'Došlo je do neočekivane greške. Molimo pokušajte ponovo ili se vratite na početnu stranicu.',
      errorRetryButton: 'Pokušaj ponovo',
      errorHomeButton: 'Početna stranica',
    },
  };
}
