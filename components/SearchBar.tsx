'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCities } from '@/lib/properties'

const PROPERTY_TYPES = ['משרד', 'חנות', 'מחסן', 'דירה', 'פנטהאוז', 'מסחרי', 'תעשייתי', 'קרקע']

export default function SearchBar({ inline = false }: { inline?: boolean }) {
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
        <select value={city} onChange={e => setCity(e.target.value)} className={selectStyle}>
          <option value="">כל הערים</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={type} onChange={e => setType(e.target.value)} className={selectStyle}>
          <option value="">כל סוגי הנכסים</option>
          {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={dealType} onChange={e => setDealType(e.target.value)} className={selectStyle}>
          <option value="">מכירה / השכרה</option>
          <option value="מכירה">למכירה</option>
          <option value="השכרה">להשכרה</option>
        </select>
        <button onClick={handleSearch} className="btn-primary text-sm py-3 px-6 whitespace-nowrap">
          🔍 חפש
        </button>
      </div>
    )
  }

  return (
    <div className="glass rounded-2xl p-5 shadow-xl w-full max-w-3xl mx-auto">
      <div className="flex flex-wrap gap-3 items-end">
        <select value={city} onChange={e => setCity(e.target.value)} className={selectStyle}>
          <option value="">📍 כל הערים</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={type} onChange={e => setType(e.target.value)} className={selectStyle}>
          <option value="">🏢 סוג נכס</option>
          {PROPERTY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select value={dealType} onChange={e => setDealType(e.target.value)} className={selectStyle}>
          <option value="">💼 עסקה</option>
          <option value="מכירה">למכירה</option>
          <option value="השכרה">להשכרה</option>
        </select>
        <button onClick={handleSearch} className="btn-primary py-3 px-8 text-sm whitespace-nowrap">
          🔍 חפש נכסים
        </button>
      </div>
    </div>
  )
}
