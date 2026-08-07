const CITY_NORMALIZE: Record<string, string> = {
  'פתח תקוה': 'פתח תקווה',
  'פתח-תקוה': 'פתח תקווה',
}

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
