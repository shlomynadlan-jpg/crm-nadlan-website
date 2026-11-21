import type { PropertyCosts } from './properties'

export type CostKey = 'rent' | 'management_fee' | 'arnona' | 'vaad'

export interface CostRow {
  key: CostKey
  perSqm: number | null   // null for rent (already a monthly total)
  monthly: number | null  // null when unknown (no value or no size)
}

export interface CostBreakdown {
  rows: CostRow[]
  total: number | null    // only when rent and at least one extra are known
  hasAnyExtra: boolean
}

const EXTRAS: Exclude<CostKey, 'rent'>[] = ['management_fee', 'arnona', 'vaad']
// Entered in the CRM as a monthly total for the whole unit (owner decision 2026-11-21); the others are ₪/m²
const MONTHLY_TOTAL: CostKey[] = ['arnona']

// ₪/m² fields: monthly = ₪/m² × gross m² (same as the CRM cost calculator)
export function buildCosts(costs: PropertyCosts | null, grossSize: number | null, rent: number | null): CostBreakdown {
  const sqm = Number(grossSize) || 0
  const rows: CostRow[] = []
  if (rent) rows.push({ key: 'rent', perSqm: null, monthly: rent })

  for (const key of EXTRAS) {
    const value = Number(costs?.[key]) || null
    if (MONTHLY_TOTAL.includes(key)) rows.push({ key, perSqm: null, monthly: value })
    else rows.push({ key, perSqm: value, monthly: value && sqm ? Math.round(value * sqm) : null })
  }

  const extras = rows.filter(r => r.key !== 'rent')
  const hasAnyExtra = extras.some(r => r.perSqm || r.monthly)
  const knownExtras = extras.filter(r => r.monthly)
  const total = rent && knownExtras.length
    ? rent + knownExtras.reduce((s, r) => s + (r.monthly || 0), 0)
    : null

  return { rows, total, hasAnyExtra }
}
