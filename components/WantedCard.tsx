import { getTranslations } from 'next-intl/server'
import type { PropertyRequest } from '@/lib/properties'

function formatBudget(budget: number | null, dealType: string, t: any): string {
  if (!budget) return t('budgetOnRequest')
  const formatted = `₪${budget.toLocaleString('he-IL')}`
  return dealType.includes('השכרה') ? `${formatted} / חודש` : formatted
}

export default async function WantedCard({ r }: { r: PropertyRequest }) {
  const t = await getTranslations('wanted')

  const sizeText = r.size_min && r.size_max
    ? t('sizeRange', { min: r.size_min, max: r.size_max })
    : r.size_min ? t('sizeFrom', { min: r.size_min })
    : r.size_max ? t('sizeTo', { max: r.size_max })
    : null

  const dealColor = r.deal_type.includes('מכירה') ? '#C9A84C' : '#0a3d6b'

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-4 h-full"
      style={{
        background: 'linear-gradient(135deg, #040d1e 0%, #0a1e3d 100%)',
        border: '1px solid rgba(201,168,76,0.25)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full"
            style={{ background: dealColor, color: '#fff' }}
          >
            {r.deal_type}
          </span>
          {r.is_urgent && (
            <span
              className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}
            >
              {t('urgent')}
            </span>
          )}
        </div>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full shrink-0"
          style={{ background: 'rgba(201,168,76,0.12)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)' }}
        >
          {r.property_type}
        </span>
      </div>

      {/* Specs */}
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {r.city && (
          <span className="text-sm font-semibold" style={{ color: '#fff' }}>
            📍 {r.city}
          </span>
        )}
        {sizeText && (
          <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
            📐 {sizeText}
          </span>
        )}
        <span className="text-sm font-semibold" style={{ color: '#C9A84C' }}>
          💰 {formatBudget(r.budget, r.deal_type, t)}
        </span>
      </div>

      {/* Description */}
      {r.description && (
        <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {r.description}
        </p>
      )}

      {/* CTA */}
      <div className="mt-auto pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <a
          href={`https://wa.me/9720552702800?text=${encodeURIComponent(`שלום, יש לי נכס מתאים לבקשה: ${r.property_type}${r.city ? ` ב${r.city}` : ''}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold transition-all hover:opacity-90"
          style={{ background: '#25D366', color: '#fff' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {t('hasProperty')}
        </a>
      </div>
    </div>
  )
}
