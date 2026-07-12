'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PropertyCard from '@/components/PropertyCard'
import SearchBar from '@/components/SearchBar'
import { getProperties, Property } from '@/lib/properties'

function PropertiesContent() {
  const params = useSearchParams()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [sizeMin, setSizeMin] = useState('')
  const [sizeMax, setSizeMax] = useState('')

  const city = params.get('city') || ''
  const propertyType = params.get('property_type') || ''
  const dealType = params.get('deal_type') || ''

  useEffect(() => {
    setLoading(true)
    getProperties({ city, deal_type: dealType, size_min: sizeMin ? Number(sizeMin) : undefined, size_max: sizeMax ? Number(sizeMax) : undefined })
      .then(data => {
        let filtered = data
        if (propertyType) {
          filtered = data.filter(p => {
            const types = Array.isArray(p.property_type) ? p.property_type.join(',') : (p.property_type || '')
            return types.includes(propertyType)
          })
        }
        setProperties(filtered)
      })
      .finally(() => setLoading(false))
  }, [city, propertyType, dealType, sizeMin, sizeMax])

  const title = dealType.includes('מכירה') && !dealType.includes('השכרה') ? 'נכסים למכירה' : dealType.includes('השכרה') && !dealType.includes('מכירה') ? 'נכסים להשכרה' : 'כל הנכסים'

  const buildTabHref = (dt: string) => {
    const p = new URLSearchParams()
    if (city) p.set('city', city)
    if (propertyType) p.set('property_type', propertyType)
    if (dt) p.set('deal_type', dt)
    return `/properties?${p.toString()}`
  }

  const activeTab = dealType.includes('מכירה') && !dealType.includes('השכרה') ? 'מכירה'
    : dealType.includes('השכרה') && !dealType.includes('מכירה') ? 'השכרה' : ''

  return (
    <>
      {/* Header */}
      <div className="pt-28 pb-10 px-6"
        style={{ background: 'linear-gradient(135deg, #0F172A, #0077B6)' }}>
        <div className="max-w-6xl mx-auto text-center text-white">
          <h1 className="text-4xl font-extrabold mb-2">{title}</h1>
          {city && <p className="text-blue-200 text-lg">📍 {city}</p>}
          {propertyType && <p className="text-blue-200 text-lg">🏢 {propertyType}</p>}
        </div>

        {/* טאבים */}
        <div className="max-w-6xl mx-auto mt-6 flex justify-center gap-2">
          {[
            { label: '🏠 הכל', value: '' },
            { label: '💰 למכירה', value: 'מכירה' },
            { label: '🔑 להשכרה', value: 'השכרה' },
          ].map(tab => (
            <a key={tab.value} href={buildTabHref(tab.value)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === tab.value
                  ? 'bg-white text-slate-900'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}>
              {tab.label}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-8 border border-slate-100">
          <SearchBar inline />
          <div className="flex gap-3 mt-3 flex-wrap">
            <input
              type="number" placeholder="שטח מינימום (מ״ר)"
              value={sizeMin} onChange={e => setSizeMin(e.target.value)}
              className="flex-1 min-w-[160px] px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="number" placeholder="שטח מקסימום (מ״ר)"
              value={sizeMax} onChange={e => setSizeMax(e.target.value)}
              className="flex-1 min-w-[160px] px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-sm text-slate-500 mb-6">
            נמצאו <strong className="text-slate-800">{properties.length}</strong> נכסים
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-52 bg-slate-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                  <div className="h-5 bg-slate-200 rounded w-1/3 mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <p className="text-6xl mb-4">🔍</p>
            <p className="text-xl font-medium text-slate-600">לא נמצאו נכסים</p>
            <p className="text-slate-400 mt-2">נסו לשנות את פרמטרי החיפוש</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(p => <PropertyCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </>
  )
}

export default function PropertiesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Suspense fallback={<div className="pt-28 text-center p-20 text-slate-400">טוען...</div>}>
          <PropertiesContent />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
