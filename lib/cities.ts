const CITY_NORMALIZE: Record<string, string> = {
  'פתח תקוה': 'פתח תקווה',
  'פתח-תקוה': 'פתח תקווה',
}

// Central-region cities served (JSON-LD areaServed + personal page); keep in sync with the Google Business Profile
export const SERVICE_AREAS = [
  'פתח תקווה', 'ראש העין', 'בני ברק', 'תל אביב', 'הוד השרון',
  'כפר סבא', 'קריית אונו', 'אור יהודה', 'יהוד', 'הרצליה',
  'ראשון לציון', 'גבעת שמואל', 'רמת גן',
]

export function normalizeCity(city: string): string {
  const trimmed = city.trim()
  return CITY_NORMALIZE[trimmed] ?? trimmed
}

export function citySlug(city: string): string {
  return normalizeCity(city).replace(/\s+/g, '-')
}

export function cityFromSlug(slug: string): string {
  return decodeURIComponent(slug).replace(/-/g, ' ').trim()
}
