import type { Language } from './lang'

function getDateLocale(lang: Language): string {
  switch (lang) {
    case 'en':
      return 'en'
    case 'sr-lat':
      return 'sr-Latn-RS'
    case 'sr-cy':
      return 'sr-Cyrl-RS'
    default:
      return 'sr-Latn-RS'
  }
}

export const formatDate = (dateString: string, lang: Language = 'sr-lat'): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(getDateLocale(lang), {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export const formatDateShort = (dateString: string, lang: Language = 'sr-lat'): string => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(getDateLocale(lang), {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

export const formatYear = (year: number): string => {
  return year.toString()
}

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + "..."
}
