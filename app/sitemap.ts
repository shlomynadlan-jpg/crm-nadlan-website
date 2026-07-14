import type { MetadataRoute } from 'next'
import { getProperties, getCities } from '@/lib/properties'
import { articles } from '@/lib/articles'
import { citySlug } from '@/lib/cities'

const BASE = 'https://www.nadlannow.co.il'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE}/properties`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    ...articles.map(a => ({
      url: `${BASE}/blog/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    { url: `${BASE}/contact`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/faq`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/accessibility`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${BASE}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ]

  const [properties, cities] = await Promise.all([getProperties(), getCities()])

  const propertyPages: MetadataRoute.Sitemap = properties.map(p => ({
    url: `${BASE}/properties/${p.id}`,
    lastModified: p.created_at ? new Date(p.created_at) : undefined,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const cityPages: MetadataRoute.Sitemap = cities.map(c => ({
    url: `${BASE}/city/${encodeURIComponent(citySlug(c))}`,
    changeFrequency: 'daily',
    priority: 0.8,
  }))

  return [...staticPages, ...cityPages, ...propertyPages]
}
