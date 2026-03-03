import type { Language } from "./lang"

export const routes = {
  home: (lang: Language) => `/${lang}`,
  about: {
    overview: (lang: Language) => `/${lang}/o-institutu`,
    mission: (lang: Language) => `/${lang}/o-institutu/misija-i-vizija`,
    history: (lang: Language) => `/${lang}/o-institutu/istorijat`,
    team: (lang: Language) => `/${lang}/o-institutu/tim`,
    partners: (lang: Language) => `/${lang}/o-institutu/partneri`,
    regulations: (lang: Language) => `/${lang}/o-institutu/propisi-i-akti`,
  },
  centers: {
    list: (lang: Language) => `/${lang}/centri`,
    detail: (lang: Language, slug: string) => `/${lang}/centri/${slug}`,
  },
  orgActivities: {
    overview: (lang: Language) => `/${lang}/organizacija-i-aktivnosti`,
    bankaGen: (lang: Language) => `/${lang}/organizacija-i-aktivnosti/banka-gena`,
    botanickaBasta: (lang: Language) =>
      `/${lang}/organizacija-i-aktivnosti/botanicka-basta`,
    poljskeKolekcije: (lang: Language) =>
      `/${lang}/organizacija-i-aktivnosti/poljske-kolekcije`,
    laboratorije: (lang: Language) =>
      `/${lang}/organizacija-i-aktivnosti/laboratorije`,
    zasticenoPodrucje: (lang: Language) =>
      `/${lang}/organizacija-i-aktivnosti/zasticeno-podrucje`,
    publikacije: (lang: Language) =>
      `/${lang}/organizacija-i-aktivnosti/publikacije`,
  },
  projects: {
    list: (lang: Language) => `/${lang}/projekti-i-usluge`,
    detail: (lang: Language, slug: string) =>
      `/${lang}/projekti-i-usluge/${slug}`,
    services: (lang: Language) => `/${lang}/projekti-i-usluge/usluge`,
    serviceDetail: (lang: Language, slug: string) =>
      `/${lang}/projekti-i-usluge/usluge/${slug}`,
  },
  news: {
    list: (lang: Language) => `/${lang}/novosti`,
    detail: (lang: Language, slug: string) => `/${lang}/novosti/${slug}`,
  },
  gallery: {
    list: (lang: Language) => `/${lang}/galerija`,
    detail: (lang: Language, slug: string) => `/${lang}/galerija/${slug}`,
  },
  contact: (lang: Language) => `/${lang}/kontakt`,
};

export type AboutSectionSlug = 'mission' | 'history' | 'team' | 'partners' | 'regulations';

export type OrgActivitiesSectionSlug =
  | 'banka-gena'
  | 'botanicka-basta'
  | 'poljske-kolekcije'
  | 'laboratorije'
  | 'zasticeno-podrucje'
  | 'publikacije';

export function orgActivitiesSectionRoute(
  lang: Language,
  slug: OrgActivitiesSectionSlug,
): string {
  const map: Record<OrgActivitiesSectionSlug, string> = {
    'banka-gena': routes.orgActivities.bankaGen(lang),
    'botanicka-basta': routes.orgActivities.botanickaBasta(lang),
    'poljske-kolekcije': routes.orgActivities.poljskeKolekcije(lang),
    laboratorije: routes.orgActivities.laboratorije(lang),
    'zasticeno-podrucje': routes.orgActivities.zasticenoPodrucje(lang),
    publikacije: routes.orgActivities.publikacije(lang),
  };
  return map[slug] ?? routes.orgActivities.overview(lang);
}

export function aboutSectionRoute(
  lang: Language,
  slug: AboutSectionSlug,
): string {
  const map: Record<AboutSectionSlug, string> = {
    mission: routes.about.mission(lang),
    history: routes.about.history(lang),
    team: routes.about.team(lang),
    partners: routes.about.partners(lang),
    regulations: routes.about.regulations(lang),
  };
  return map[slug] ?? routes.about.overview(lang);
}

export type ProjectsServicesSectionSlug =
  | 'laboratorijske-usluge'
  | 'savjetodavne-usluge'
  | 'rasadnik';

export function projectsServicesSectionRoute(
  lang: Language,
  slug: ProjectsServicesSectionSlug,
): string {
  return routes.projects.serviceDetail(lang, slug);
}
