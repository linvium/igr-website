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
    centri: FooterSection;
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
  const path = link.path?.trim() || '/';
  return path.startsWith('/') ? `/${lang}${path}` : `/${lang}/${path}`;
}

function mapNavItems(
  items: SanityNavItem[] | null | undefined,
  lang: Language,
): NavItem[] {
  if (!items?.length) return [];
  return items
    .filter((i) => pickLocaleString(i.label, lang))
    .map((i) => ({
      label: pickLocaleString(i.label, lang)!,
      href: resolveNavHref(i, lang),
    }));
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

function getDefaultSiteSettings(lang: Language): SiteSettings {
  const langSlug = lang === 'en' ? 'en' : lang === 'sr-cy' ? 'sr-cy' : 'sr-lat';
  const r = (path: string) => `/${langSlug}${path}`;
  return {
    name: 'Institut za Genetičke Resurse',
    shortName: 'IGR',
    description:
      'Institut za Genetičke Resurse - Centar za očuvanje i istraživanje genetičkih resursa',
    url: 'https://igr.rs',
    logo: '/logo.svg',
    navbar: [
      { label: 'O Institutu', href: r('/o-institutu') },
      { label: 'Centri', href: r('/centri') },
      { label: 'Projekti', href: r('/projekti') },
      { label: 'Novosti', href: r('/novosti') },
      { label: 'Galerija', href: r('/galerija') },
      { label: 'Kontakt', href: r('/kontakt') },
    ],
    footer: {
      institut: {
        title: 'Institut',
        links: [
          { label: 'O nama', href: r('/o-institutu') },
          { label: 'Tim', href: r('/o-institutu/tim') },
          { label: 'Partneri', href: r('/o-institutu/partneri') },
          { label: 'Karijera', href: r('/o-institutu') },
        ],
      },
      centri: {
        title: 'Centri',
        links: [
          { label: 'Centar za biodiverzitet', href: r('/centri') },
          { label: 'Banka gena', href: r('/centri') },
          { label: 'Botanička bašta', href: r('/centri') },
          { label: 'Rasadnik', href: r('/centri') },
        ],
      },
      resursi: {
        title: 'Resursi',
        links: [
          { label: 'Projekti', href: r('/projekti') },
          { label: 'Publikacije', href: r('/projekti') },
          { label: 'Galerija', href: r('/galerija') },
          { label: 'Novosti', href: r('/novosti') },
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
