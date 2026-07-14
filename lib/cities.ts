export function citySlug(city: string): string {
  return city.trim().replace(/\s+/g, '-')
}

export function cityFromSlug(slug: string): string {
  return decodeURIComponent(slug).replace(/-/g, ' ').trim()
}
