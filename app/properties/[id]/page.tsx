import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { getProperty, getAgentSettings, getPropertyImage, formatPrice, getPropertyTypes } from '@/lib/properties'

export const revalidate = 60

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [property, agent] = await Promise.all([getProperty(id), getAgentSettings()])
  if (!property) notFound()

  const images = (property.image_urls || []).filter(Boolean)
  if (images.length === 0) images.push(getPropertyImage(property))

  const types = getPropertyTypes(property)
  const deal = property.deal_type || ''
  const isRent = deal.includes('השכרה') && !deal.includes('מכירה')
  const isBoth = deal.includes('מכירה') && deal.includes('השכרה')
  const badgeText = isRent ? 'להשכרה' : isBoth ? 'מכירה והשכרה' : 'למכירה'
  const badgeColor = isRent ? '#0077B6' : isBoth ? '#7C3AED' : '#C9A84C'

  const salePrice = property.price
  const rentPrice = property.rent_price

  const specs = [
    { label: 'סוג נכס', value: types },
    { label: 'עיר', value: property.city },
    { label: 'כתובת', value: property.property_address },
    { label: 'שטח ברוטו', value: property.gross_size ? `${property.gross_size} מ״ר` : null },
    { label: 'שטח נטו', value: property.net_size ? `${property.net_size} מ״ר` : null },
    { label: 'חדרים', value: property.rooms ? String(property.rooms) : null },
    { label: 'קומה', value: property.floor != null ? String(property.floor) : null },
    { label: 'חניה', value: property.parking_count ? `${property.parking_count} מקומות` : null },
    { label: 'גובה תקרה', value: property.ceiling_height ? `${property.ceiling_height} מ׳` : null },
    { label: 'כניסה', value: property.entry_date || null },
    { label: 'מיזוג אוויר', value: property.ac ? 'כן' : null },
    { label: 'מעלית', value: property.elevator ? 'כן' : null },
    { label: 'ריהוט', value: property.furniture ? 'כן' : null },
    { label: 'שם פרויקט', value: property.project_name || null },
  ].filter(s => s.value)

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">

        {/* Breadcrumb */}
        <nav className="text-sm text-slate-400 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600">בית</Link>
          <span>›</span>
          <Link href="/properties" className="hover:text-blue-600">נכסים</Link>
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
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 p-3 overflow-x-auto">
                  {images.slice(1).map((src, i) => (
                    <div key={i} className="relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden">
                      <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Title & price */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                {types}{property.property_address ? ` — ${property.property_address}` : ''}
              </h1>
              <p className="text-slate-500 text-lg mb-4">📍 {property.city}</p>

              <div className="flex flex-wrap gap-4 items-baseline">
                {salePrice && (
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">מחיר מכירה</p>
                    <p className="text-3xl font-extrabold" style={{ color: '#C9A84C' }}>
                      {formatPrice(salePrice)}
                    </p>
                  </div>
                )}
                {rentPrice && (
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">שכ״ד חודשי</p>
                    <p className="text-3xl font-extrabold" style={{ color: '#0077B6' }}>
                      {formatPrice(rentPrice)}
                    </p>
                  </div>
                )}
                {!salePrice && !rentPrice && (
                  <p className="text-2xl font-bold text-slate-400">מחיר לפי פנייה</p>
                )}
              </div>
            </div>

            {/* Specs grid */}
            {specs.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
                <h2 className="font-bold text-slate-900 text-lg mb-4">פרטי הנכס</h2>
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
            {property.description && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6">
                <h2 className="font-bold text-slate-900 text-lg mb-3">תיאור</h2>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>
            )}
          </div>

          {/* Right — agent + contact form */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 flex flex-col gap-4">

              {/* Agent card */}
              {agent && (
                <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                  <p className="text-xs text-slate-400 mb-3 font-medium">הסוכן המטפל</p>
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
      </div>
      <Footer />
    </>
  )
}
