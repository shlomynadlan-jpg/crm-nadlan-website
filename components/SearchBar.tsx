'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { getCities } from '@/lib/properties'

const PROPERTY_TYPES = ['משרד', 'חנות', 'מחסן', 'דירה', 'פנטהאוז', 'מסחרי', 'תעשייתי', 'קרקע', 'עסק למכירה']

export default function SearchBar({ inline = false }: { inline?: boolean }) {
  const t = useTranslations('search')
  const tTypes = useTranslations('propertyTypes')
  const router = useRouter()
  const [cities, setCities] = useState<string[]>([])
  const [city, setCity] = useState('')
  const [type, setType] = useState('')
  const [dealType, setDealType] = useState('')

  useEffect(() => {
    getCities().then(setCities)
  }, [])

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (type) params.set('property_type', type)
    if (dealType) params.set('deal_type', dealType)
    router.push(`/properties?${params.toString()}`)
  }

  const selectStyle = "flex-1 min-w-[140px] px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"

  if (inline) {
    return (
      <div className="flex flex-wrap gap-3 items-end">
        <select value={city} onChange={e => setCity(e.target.value)} className={selectStyle} aria-label={t('cityAriaLabel')}>
          <option value="">{t('allCities')}</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={type} onChange={e => setType(e.target.value)} className={selectStyle} aria-label={t('typeAriaLabel')}>
          <option value="">{t('allTypes')}</option>
          {PROPERTY_TYPES.map(propType => <option key={propType} value={propType}>{tTypes(propType)}</option>)}
        </select>
        <select value={dealType} onChange={e => setDealType(e.target.value)} className={selectStyle} aria-label={t('dealAriaLabel')}>
          <option value="">{t('allDeals')}</option>
          <option value="מכירה">{t('forSale')}</option>
          <option value="השכרה">{t('forRent')}</option>
        </select>
        <button onClick={handleSearch} className="btn-primary text-sm py-3 px-6 whitespace-nowrap">
          {t('searchBtn')}
        </button>
      </div>
    )
  }

  return (
    <div className="glass rounded-2xl p-5 shadow-xl w-full max-w-3xl mx-auto">
      <div className="flex flex-wrap gap-3 items-end">
        <select value={city} onChange={e => setCity(e.target.value)} className={selectStyle} aria-label={t('cityAriaLabel')}>
          <option value="">{t('allCities')}</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={type} onChange={e => setType(e.target.value)} className={selectStyle} aria-label={t('typeAriaLabel')}>
          <option value="">{t('allTypes')}</option>
          {PROPERTY_TYPES.map(propType => <option key={propType} value={propType}>{tTypes(propType)}</option>)}
        </select>
        <select value={dealType} onChange={e => setDealType(e.target.value)} className={selectStyle} aria-label={t('dealAriaLabel')}>
          <option value="">{t('allDeals')}</option>
          <option value="מכירה">{t('forSale')}</option>
          <option value="השכרה">{t('forRent')}</option>
        </select>
        <button onClick={handleSearch} className="btn-primary py-3 px-8 text-sm whitespace-nowrap">
          {t('searchPropertiesBtn')}
        </button>
      </div>
    </div>
  )
}
