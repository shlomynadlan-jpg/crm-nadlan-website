export const BASE = 'https://www.nadlannow.co.il'
export const LOCALES = ['he', 'en', 'fr', 'ru']

// Which locale versions of each page type are meant for Google.
// A locale outside its list stays reachable for visitors but is noindex, with no canonical/hreflang.
export const INDEXED = {
  all: LOCALES,
  legal: ['he', 'en', 'fr'],   // /ru renders the Hebrew body
  article: ['he', 'en', 'fr'], // /ru renders the English body
  heOnly: ['he'],              // services, CMS articles, cities
}

// Properties: Hebrew + every locale whose translation was approved and published.
// Phase A: nothing is published yet, so callers pass [] (see docs/translation-plan.md).
export function propertyLocales(published: string[] = []): string[] {
  return ['he', ...LOCALES.filter(l => l !== 'he' && published.includes(l))]
}

export const OG_LOCALE: Record<string, string> = { he: 'he_IL', en: 'en_US', fr: 'fr_FR', ru: 'ru_RU' }

export function buildSeo(path: string, locale: string, indexed: string[] = INDEXED.all) {
  const p = path === '/' ? '' : path
  if (!indexed.includes(locale)) return { robots: { index: false, follow: true } }
  const languages: Record<string, string> = {}
  if (indexed.length > 1) {
    for (const l of indexed) languages[l] = `${BASE}/${l}${p}`
    languages['x-default'] = `${BASE}/${indexed.includes('he') ? 'he' : indexed[0]}${p}`
  }
  return {
    alternates: {
      canonical: `${BASE}/${locale}${p}`,
      ...(indexed.length > 1 ? { languages } : {}),
    },
  }
}
