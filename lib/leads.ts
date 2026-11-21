// Server-side validation for /api/leads (trust boundary: the request body comes from the browser).

export type LeadInput = {
  name: string
  phone: string
  message?: string
  property_id?: string | number
  property_city?: string
  property_type?: string
  marketing_consent: boolean
}

export type LeadCheck =
  | { ok: true; lead: LeadInput }
  | { ok: false; status: number; error: string; spam?: boolean }

const tooLong = (v: unknown, max: number) => v != null && String(v).length > max

export function validateLead(body: unknown): LeadCheck {
  const b = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>
  // honeypot: hidden "website" field that people never fill
  if (typeof b.website === 'string' && b.website.trim()) return { ok: false, status: 200, error: 'spam', spam: true }

  const { name, phone, message, property_id, property_city, property_type } = b
  if (typeof name !== 'string' || typeof phone !== 'string' || !name.trim() || !phone.trim())
    return { ok: false, status: 400, error: 'שם וטלפון הם שדות חובה' }

  const digits = phone.replace(/\D/g, '')
  if (digits.length < 9 || digits.length > 15 || name.length > 100 || phone.length > 30
    || tooLong(message, 2000) || tooLong(property_city, 100) || tooLong(property_type, 200) || tooLong(property_id, 50))
    return { ok: false, status: 400, error: 'פרטים לא תקינים' }

  if (b.privacy_consent !== true) return { ok: false, status: 400, error: 'נדרש אישור מדיניות פרטיות' }

  const str = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : undefined)
  return {
    ok: true,
    lead: {
      name: name.trim(),
      phone: phone.trim(),
      message: str(message),
      property_id: typeof property_id === 'number' ? property_id : str(property_id),
      property_city: str(property_city),
      property_type: str(property_type),
      marketing_consent: b.marketing_consent === true,
    },
  }
}

// shortcut: per-instance memory, so the limit resets on cold start and is not shared between Vercel instances.
// Upgrade to a shared store (e.g. Upstash/Vercel KV) or a CAPTCHA if spam gets through.
const hits = new Map<string, number[]>()
export const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 }

export function isRateLimited(ip: string, now = Date.now()): boolean {
  const recent = (hits.get(ip) ?? []).filter(t => now - t < RATE_LIMIT.windowMs)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear() // bound memory
  return recent.length > RATE_LIMIT.max
}
