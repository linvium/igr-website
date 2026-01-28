import { translations, type TranslationNamespace } from '@/translations/sr-lat'

/**
 * Translation hook
 * Simple implementation for now - will be replaced with Sanity data later
 * 
 * Usage:
 * const { t } = useTranslations('news')
 * t('categories.all') // "Sve"
 * t('detail.publishedOn') // "Objavljeno"
 */
export function useTranslations<T extends TranslationNamespace>(namespace: T) {
  const namespaceTranslations = translations[namespace]

  /**
   * Get translation by key
   * Supports nested keys with dot notation: 'categories.all'
   * Supports interpolation: 'Hello {name}' with params { name: 'World' }
   */
  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.')
    let value: any = namespaceTranslations
    
    // Navigate through nested object
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        // Key not found, return the key itself as fallback
        console.warn(`Translation key not found: ${namespace}.${key}`)
        return key
      }
    }
    
    // If final value is not a string, return key as fallback
    if (typeof value !== 'string') {
      console.warn(`Translation value is not a string: ${namespace}.${key}`)
      return key
    }
    
    // Simple interpolation: replace {key} with params[key]
    if (params) {
      return Object.entries(params).reduce(
        (str, [paramKey, paramValue]) => 
          str.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramValue)),
        value
      )
    }
    
    return value
  }

  return {
    t,
    translations: namespaceTranslations,
  }
}

/**
 * Get raw translation object
 * Useful when you need to iterate over translations
 */
export function getTranslations<T extends TranslationNamespace>(namespace: T) {
  return translations[namespace]
}
