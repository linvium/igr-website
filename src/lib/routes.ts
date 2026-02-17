import type { Language } from "./lang"

export const routes = {
  home: (lang: Language) => `/${lang}`,
  about: {
    overview: (lang: Language) => `/${lang}/o-institutu`,
    mission: (lang: Language) => `/${lang}/o-institutu/misija-i-vizija`,
    history: (lang: Language) => `/${lang}/o-institutu/istorijat`,
    team: (lang: Language) => `/${lang}/o-institutu/tim`,
    partners: (lang: Language) => `/${lang}/o-institutu/partneri`,
  },
  centers: {
    list: (lang: Language) => `/${lang}/centri`,
    detail: (lang: Language, slug: string) => `/${lang}/centri/${slug}`,
  },
  projects: {
    list: (lang: Language) => `/${lang}/projekti`,
    detail: (lang: Language, slug: string) => `/${lang}/projekti/${slug}`,
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

export type AboutSectionSlug = 'mission' | 'history' | 'team' | 'partners';

export function aboutSectionRoute(
  lang: Language,
  slug: AboutSectionSlug,
): string {
  const map: Record<AboutSectionSlug, string> = {
    mission: routes.about.mission(lang),
    history: routes.about.history(lang),
    team: routes.about.team(lang),
    partners: routes.about.partners(lang),
  };
  return map[slug] ?? routes.about.overview(lang);
}
