import type { MetadataRoute } from 'next'
import { getProperties, getCities } from '@/lib/properties'
import { articles } from '@/lib/articles'
import { citySlug } from '@/lib/cities'

const BASE = 'https://www.nadlannow.co.il'
const LOCALES = ['he', 'en', 'fr']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/properties', '/wanted', '/about', '/faq', '/contact', '/blog', '/accessibility', '/privacy', '/terms']

  const staticEntries: MetadataRoute.Sitemap = LOCALES.flatMap(locale =>
    staticRoutes.map(route => ({
      url: `${BASE}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' || route === '/properties' ? ('daily' as const) : ('weekly' as const),
      priority: route === '' ? 1 : route === '/properties' ? 0.9 : 0.8,
    }))
  )

  const articleEntries: MetadataRoute.Sitemap = LOCALES.flatMap(locale =>
    articles.map(a => ({
      url: `${BASE}/${locale}/blog/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  const [properties, cities] = await Promise.all([getProperties(), getCities()])

  const propertyEntries: MetadataRoute.Sitemap = LOCALES.flatMap(locale =>
    properties.map(p => ({
      url: `${BASE}/${locale}/properties/${p.id}`,
      lastModified: p.created_at ? new Date(p.created_at) : undefined,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  )

  const cityEntries: MetadataRoute.Sitemap = LOCALES.flatMap(locale =>
    cities.map(c => ({
      url: `${BASE}/${locale}/city/${encodeURIComponent(citySlug(c))}`,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }))
  )

  return [...staticEntries, ...articleEntries, ...cityEntries, ...propertyEntries]
}
