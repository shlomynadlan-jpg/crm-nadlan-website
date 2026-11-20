import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PropertyCard from '@/components/PropertyCard'
import ContactForm from '@/components/ContactForm'
import { getProperties } from '@/lib/properties'
import { citySlug, cityFromSlug } from '@/lib/cities'
import { buildSeo, INDEXED, OG_LOCALE } from '@/lib/alternates'
import { tr } from '@/lib/terms'

// Rendered on demand: Vercel's static cache breaks on Hebrew (non-ASCII) route params
export const dynamic = 'force-dynamic'

const BASE = 'https://www.nadlannow.co.il'

export async function generateMetadata({ params }: { params: Promise<{ city: string; locale: string }> }): Promise<Metadata> {
  const t = await getTranslations('city')
  const { city: slug, locale } = await params
  const city = cityFromSlug(slug)
  const title = t('metaTitle', { city: tr(city, locale) })
  return {
    title,
    description: t('metaDesc', { city: tr(city, locale) }),
    // Cities are Hebrew-only in the index until their listings are translated
    ...buildSeo(`/city/${citySlug(city)}`, locale, INDEXED.heOnly),
    openGraph: { title, locale: OG_LOCALE[locale], type: 'website' },
  }
}

export default async function CityPage({ params }: { params: Promise<{ city: string; locale: string }> }) {
  const t = await getTranslations('city')
  const tNav = await getTranslations('nav')
  const tMeta = await getTranslations('meta')
  const { city: slug, locale } = await params
  const city = cityFromSlug(slug)
  const cityName = tr(city, locale)
  const properties = await getProperties({ city })

  const forSale = properties.filter(p => p.deal_type?.includes('מכירה'))
  const forRent = properties.filter(p => p.deal_type?.includes('השכרה'))
  const types = [...new Set(properties.flatMap(p =>
    Array.isArray(p.property_type) ? p.property_type : [p.property_type]).filter(Boolean))]

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: tNav('home'), item: `${BASE}/${locale}` },
      { '@type': 'ListItem', position: 2, name: t('breadcrumbProperties'), item: `${BASE}/${locale}/properties` },
      { '@type': 'ListItem', position: 3, name: t('h1', { city: cityName }) },
    ],
  }

  const itemListJsonLd = properties.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: locale === 'he' ? `נכסים למכירה ולהשכרה ב${city}` : t('h1', { city: cityName }),
    numberOfItems: properties.length,
    itemListElement: properties.slice(0, 20).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${BASE}/${locale}/properties/${p.id}`,
    })),
  } : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {itemListJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      )}
      <Navbar />
      <main id="main">
        {/* Header */}
        <div className="pt-28 pb-12 px-6"
          style={{ background: 'linear-gradient(135deg, #0F172A, #0077B6)' }}>
          <div className="max-w-6xl mx-auto text-center text-white">
            <nav aria-label={tMeta('breadcrumbNav')} className="text-sm text-blue-200 mb-4 flex items-center justify-center gap-2">
              <Link href="/" className="hover:text-white">{tNav('home')}</Link>
              <span aria-hidden="true">›</span>
              <Link href="/properties" className="hover:text-white">{t('breadcrumbProperties')}</Link>
              <span aria-hidden="true">›</span>
              <span>{cityName}</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {t('h1', { city: cityName })}
            </h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              {properties.length > 0
                ? t('subtitle', { count: properties.length, city: cityName, forSale: forSale.length, forRent: forRent.length })
                : t('subtitleContact', { city: cityName })}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-14">
          {/* Intro */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-slate-600 leading-relaxed">
              {t('intro1', { city: cityName })}
              {t('intro2')}
            </p>
          </div>

          {/* Properties */}
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
              {properties.map(p => <PropertyCard key={p.id} p={p} />)}
            </div>
          ) : (
            <div className="text-center py-14 text-slate-400 mb-10">
              <p className="text-5xl mb-4" aria-hidden="true">🏙️</p>
              <p className="text-xl font-medium text-slate-600">{t('empty', { city: cityName })}</p>
              <p className="text-slate-400 mt-2">{t('emptySub')}</p>
            </div>
          )}

          {/* CTA + form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('ctaTitle', { city: cityName })}</h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                {t('ctaPara1', { city: cityName })}
              </p>
              <p className="text-slate-500 leading-relaxed">
                {t('ctaPara2')}
              </p>
            </div>
            <ContactForm propertyCity={city} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
