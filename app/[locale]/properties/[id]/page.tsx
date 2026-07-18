import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { getProperty, getAgentSettings, getPropertyImage, isPlaceholderImage, formatPrice, getPropertyTypes } from '@/lib/properties'
import { getTranslations } from 'next-intl/server'

export const revalidate = 60

function propertyTitle(types: string, p: { gross_size: number | null; city: string; deal_type: string | null }): string {
  const deal = p.deal_type || ''
  const isRent = deal.includes('השכרה') && !deal.includes('מכירה')
  const isBoth = deal.includes('מכירה') && deal.includes('השכרה')
  const dealText = isRent ? 'להשכרה' : isBoth ? 'למכירה ולהשכרה' : 'למכירה'
  const size = p.gross_size ? ` ${p.gross_size} מ"ר` : ''
  return `${types || 'נכס'}${size} ${dealText}${p.city ? ` ב${p.city}` : ''}`
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id } = await params
  const t = await getTranslations()
  const property = await getProperty(id)
  if (!property) return { title: t('propertyPage.notFound') }

  const types = getPropertyTypes(property)
  const title = propertyTitle(types, property)
  const description = (property.description || '').slice(0, 155) ||
    `${title} — פרטים מלאים, תמונות ויצירת קשר באתר LS נדל"ן.`
  const image = getPropertyImage(property)

  return {
    title,
    description,
    alternates: { canonical: `/properties/${property.id}` },
    openGraph: {
      title,
      description,
      images: [{ url: image, width: 1200, height: 630 }],
      locale: 'he_IL',
      type: 'website',
    },
  }
}

export default async function PropertyPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale } = await params
  const t = await getTranslations()
  const [property, agent] = await Promise.all([getProperty(id), getAgentSettings()])
  if (!property) notFound()

  const images = (property.image_urls || []).filter(Boolean)
  const isAI = isPlaceholderImage(property)
  if (images.length === 0) images.push(getPropertyImage(property))

  const types = getPropertyTypes(property)
  const deal = property.deal_type || ''
  const isRent = deal.includes('השכרה') && !deal.includes('מכירה')
  const isBoth = deal.includes('מכירה') && deal.includes('השכרה')
  const badgeText = isRent ? t('deal.forRent') : isBoth ? t('deal.both') : t('deal.forSale')
  const badgeColor = isRent ? '#0077B6' : isBoth ? '#7C3AED' : '#C9A84C'

  const salePrice = property.price
  const rentPrice = property.rent_price

  const description = locale === 'en'
    ? (property.description_en || property.description)
    : locale === 'fr'
    ? (property.description_fr || property.description)
    : property.description

  const projectName = locale === 'en'
    ? (property.project_name_en || property.project_name)
    : locale === 'fr'
    ? (property.project_name_fr || property.project_name)
    : property.project_name

  const specs = [
    { label: t('propertyPage.specLabels.type'), value: types },
    { label: t('propertyPage.specLabels.city'), value: property.city },
    { label: t('propertyPage.address'), value: null },
    { label: t('propertyPage.specLabels.gross'), value: property.gross_size ? `${property.gross_size} ${t('propertyPage.specLabels.sqm')}` : null },
    { label: t('propertyPage.specLabels.net'), value: property.net_size ? `${property.net_size} ${t('propertyPage.specLabels.sqm')}` : null },
    { label: t('propertyPage.specLabels.rooms'), value: property.rooms ? String(property.rooms) : null },
    { label: t('propertyPage.specLabels.floor'), value: property.floor != null ? String(property.floor) : null },
    { label: t('propertyPage.specLabels.parking'), value: property.parking_count ? t('propertyPage.specLabels.parkingSpots', { n: property.parking_count }) : null },
    { label: t('propertyPage.specLabels.ceiling'), value: property.ceiling_height ? `${property.ceiling_height} ${t('propertyPage.specLabels.meters')}` : null },
    { label: t('propertyPage.specLabels.entry'), value: property.entry_date || null },
    { label: t('propertyPage.specLabels.ac'), value: property.ac ? t('propertyPage.specLabels.yes') : null },
    { label: t('propertyPage.specLabels.elevator'), value: property.elevator ? t('propertyPage.specLabels.yes') : null },
    { label: t('propertyPage.specLabels.furniture'), value: property.furniture ? t('propertyPage.specLabels.yes') : null },
    { label: t('propertyPage.specLabels.project'), value: projectName || null },
  ].filter(s => s.value)

  const listingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: propertyTitle(types, property),
    url: `https://www.nadlannow.co.il/properties/${property.id}`,
    image: images[0],
    description: property.description || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: property.property_address || undefined,
      addressLocality: property.city || undefined,
      addressCountry: 'IL',
    },
    ...(property.gross_size ? {
      floorSize: { '@type': 'QuantitativeValue', value: property.gross_size, unitCode: 'MTK' },
    } : {}),
    offers: {
      '@type': 'Offer',
      price: (isRent ? rentPrice : salePrice) || undefined,
      priceCurrency: 'ILS',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'RealEstateAgent', name: 'LS נדל"ן', telephone: '+972-55-2702800' },
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('propertyPage.home'), item: 'https://www.nadlannow.co.il' },
      { '@type': 'ListItem', position: 2, name: t('propertyPage.properties'), item: 'https://www.nadlannow.co.il/properties' },
      { '@type': 'ListItem', position: 3, name: propertyTitle(types, property) },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      <main id="main" className="max-w-6xl mx-auto px-6 pt-28 pb-16 w-full">

        {/* Breadcrumb */}
        <nav aria-label="ניווט משני" className="text-sm text-slate-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600">{t('propertyPage.home')}</Link>
          <span>›</span>
          <Link href="/properties" className="hover:text-blue-600">{t('propertyPage.properties')}</Link>
          <span>›</span>
          <span className="text-slate-600">{property.city}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left — details */}
          <div className="lg:col-span-2">

            {/* Gallery */}
            <div className="rounded-2xl overflow-hidden mb-6 bg-slate-100">
              <div className="relative h-80 md:h-[420px]">
                <Image
                  src={images[0]}
                  alt={`${types} ב${property.city}`}
                  fill className="object-cover" priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute top-4 right-4">
                  <span className="text-sm font-semibold px-4 py-1.5 rounded-full text-white shadow-lg"
                    style={{ background: badgeColor }}>
                    {badgeText}
                  </span>
                </div>
                {isAI && (
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-3">
                    <span
                      className="text-xs px-4 py-1.5 rounded-full"
                      style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(4px)' }}
                    >
                      {t('card.aiDisclaimer')}
                    </span>
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {images.slice(1).map((src, i) => (
                    <div key={i} className="relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden">
                      <Image src={src} alt={`${types} ב${property.city} — תמונה ${i + 2}`} fill className="object-cover" sizes="80px" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Title & price */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                {types}
              </h1>
              <p className="text-slate-500 text-lg mb-4">📍 {property.city}</p>

              <div className="flex flex-wrap gap-4 items-baseline">
                {salePrice && (
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">{t('deal.salePrice')}</p>
                    <p className="text-3xl font-extrabold" style={{ color: '#C9A84C' }}>
                      {formatPrice(salePrice)}
                    </p>
                  </div>
                )}
                {rentPrice && (
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">{t('deal.rentPrice')}</p>
                    <p className="text-3xl font-extrabold" style={{ color: '#0077B6' }}>
                      {formatPrice(rentPrice)}
                    </p>
                  </div>
                )}
                {!salePrice && !rentPrice && (
                  <p className="text-2xl font-bold text-slate-400">{t('deal.priceOnRequest')}</p>
                )}
              </div>
            </div>

            {/* Specs grid */}
            {specs.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
                <h2 className="font-bold text-slate-900 text-lg mb-4">{t('propertyPage.specsTitle')}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {specs.map(({ label, value }) => (
                    <div key={label} className="bg-slate-50 rounded-xl p-3">
                      <p className="text-xs text-slate-400 mb-1">{label}</p>
                      <p className="font-semibold text-slate-800 text-sm">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {description && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h2 className="font-bold text-slate-900 text-lg mb-3">{t('propertyPage.descTitle')}</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{description}</p>
              </div>
            )}
          </div>

          {/* Right — agent + contact form */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 flex flex-col gap-4">

              {/* Agent card */}
              {agent && (
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                  <p className="text-xs text-slate-400 mb-3 font-medium">{t('propertyPage.agent')}</p>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #0077B6, #023E8A)' }}>
                      {agent.full_name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{agent.full_name}</p>
                      {agent.business_name && (
                        <p className="text-xs text-slate-500">{agent.business_name}</p>
                      )}
                    </div>
                  </div>
                  {agent.phone && (
                    <a
                      href={`tel:${agent.phone.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90"
                      style={{ background: 'linear-gradient(135deg, #0077B6, #023E8A)' }}
                    >
                      📞 {agent.phone}
                    </a>
                  )}
                </div>
              )}

              <ContactForm
                propertyId={property.id}
                propertyCity={property.city}
                propertyType={types}
                agentPhone={agent?.phone}
                agentName={agent?.full_name}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
