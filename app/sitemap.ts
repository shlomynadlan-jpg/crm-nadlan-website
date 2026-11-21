import type { MetadataRoute } from 'next'
import { getProperties, getCities } from '@/lib/properties'
import { articles } from '@/lib/articles'
import { fetchCmsArticles } from '@/lib/cms-articles'
import { citySlug } from '@/lib/cities'
import { SERVICES } from '@/lib/services'
import { BASE, INDEXED, propertyLocales } from '@/lib/alternates'

export const revalidate = 3600

// Only locale versions meant for indexing are listed — must match buildSeo() in each page.
const LEGAL = ['/accessibility', '/privacy', '/terms']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/properties', '/wanted', '/about', '/faq', '/contact', '/blog', '/accessibility', '/privacy', '/terms']

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap(route =>
    (LEGAL.includes(route) ? INDEXED.legal : INDEXED.all).map(locale => ({
      url: `${BASE}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' || route === '/properties' ? ('daily' as const) : ('weekly' as const),
      priority: route === '' ? 1 : route === '/properties' ? 0.9 : 0.8,
    }))
  )

  // Service pages are Hebrew-only for now (other locales are noindex)
  const serviceEntries: MetadataRoute.Sitemap = SERVICES.map(s => ({
    url: `${BASE}/he/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Personal page: Hebrew-only (INDEXED.heOnly in shlomy-limor/page.tsx)
  const personEntries: MetadataRoute.Sitemap = [{
    url: `${BASE}/he/shlomy-limor`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }]

  const articleEntries: MetadataRoute.Sitemap = INDEXED.article.flatMap(locale =>
    articles.map(a => ({
      url: `${BASE}/${locale}/blog/${a.slug}`,
      lastModified: new Date(a.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  const [properties, cities, cms] = await Promise.all([getProperties(), getCities(), fetchCmsArticles()])

  // CMS articles are Hebrew-only (INDEXED.heOnly in blog/[slug])
  const cmsEntries: MetadataRoute.Sitemap = cms.map(a => ({
    url: `${BASE}/he/blog/cms-${a.slug}`,
    lastModified: new Date(a.published_at ?? a.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const propertyEntries: MetadataRoute.Sitemap = properties.flatMap(p =>
    propertyLocales().map(locale => ({
      url: `${BASE}/${locale}/properties/${p.id}`,
      lastModified: p.created_at ? new Date(p.created_at) : undefined,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  )

  // Several raw spellings (e.g. trailing spaces) map to one city page
  const citySlugs = [...new Set(cities.map(citySlug))].filter(Boolean)
  const cityEntries: MetadataRoute.Sitemap = INDEXED.heOnly.flatMap(locale =>
    citySlugs.map(slug => ({
      url: `${BASE}/${locale}/city/${encodeURIComponent(slug)}`,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }))
  )

  return [...staticEntries, ...personEntries, ...serviceEntries, ...articleEntries, ...cmsEntries, ...cityEntries, ...propertyEntries]
}
