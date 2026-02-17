export type Language = 'en' | 'sr-cy' | 'sr-lat';

export const supportedLanguages: Language[] = ['en', 'sr-cy', 'sr-lat'];

export const defaultLanguage: Language = 'sr-lat';

export const isValidLanguage = (lang: string | undefined): lang is Language => {
  return lang !== undefined && supportedLanguages.includes(lang as Language);
};

export const getLanguage = (lang: string | undefined): Language => {
  return isValidLanguage(lang) ? lang : defaultLanguage;
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  'sr-cy': 'Српски',
  'sr-lat': 'Srpski',
};
