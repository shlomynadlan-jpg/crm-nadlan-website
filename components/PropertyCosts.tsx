import { getTranslations } from 'next-intl/server'
import { formatPrice } from '@/lib/properties'
import type { CostBreakdown } from '@/lib/costs'

const ICONS = { rent: '🔑', management_fee: '🏢', arnona: '🏛️', vaad: '🧹' } as const

export default async function PropertyCosts({ costs, showRent }: { costs: CostBreakdown; showRent: boolean }) {
  const t = await getTranslations('propertyPage.costs')
  const rows = costs.rows.filter(r => showRent || r.key !== 'rent')

  // No extra-cost data in the CRM: a short, friendly note instead of an empty table
  if (!costs.hasAnyExtra) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-5 mb-6 flex items-start gap-4">
        <span className="text-2xl leading-none" aria-hidden>🧾</span>
        <div className="flex-1">
          <h2 className="font-bold text-slate-900 mb-1">{t('title')}</h2>
          <p className="text-sm text-slate-500 leading-relaxed">{t('emptyNote')}</p>
        </div>
        <a href="#contact" className="shrink-0 self-center text-sm font-semibold px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700 transition-colors">
          {t('ask')}
        </a>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 mb-6">
      <div className="flex items-baseline justify-between mb-4 gap-3">
        <h2 className="font-bold text-slate-900 text-lg">{t('title')}</h2>
        <span className="text-xs text-slate-400">{t('perMonth')}</span>
      </div>

      <ul className="divide-y divide-slate-100">
        {rows.map(r => (
          <li key={r.key} className="flex items-center justify-between gap-3 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-base shrink-0" aria-hidden>{ICONS[r.key]}</span>
              <div className="min-w-0">
                <p className="font-medium text-slate-800 text-sm">{t(r.key)}</p>
                {r.perSqm && <p className="text-xs text-slate-400">{t('perSqm', { n: formatPrice(r.perSqm) })}</p>}
              </div>
            </div>
            {r.monthly
              ? <span className="font-bold text-slate-900 tabular-nums">{formatPrice(r.monthly)}</span>
              : r.perSqm
                ? <span className="text-xs text-slate-400">{t('bySize')}</span>
                : <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">{t('onRequest')}</span>}
          </li>
        ))}
      </ul>

      {showRent && costs.total && (
        <div className="mt-4 rounded-xl p-4 flex items-center justify-between gap-3"
          style={{ background: 'linear-gradient(135deg, rgba(0,119,182,0.08), rgba(201,168,76,0.12))' }}>
          <div>
            <p className="font-bold text-slate-900">{t('total')}</p>
            <p className="text-xs text-slate-500">{t('totalNote')}</p>
          </div>
          <span className="text-2xl font-extrabold tabular-nums" style={{ color: '#0077B6' }}>{formatPrice(costs.total)}</span>
        </div>
      )}
    </div>
  )
}
