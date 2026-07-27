const BASE = 'https://www.nadlannow.co.il'

export function buildAlternates(path: string) {
  return {
    canonical: path,
    languages: {
      'he': `${BASE}/he${path}`,
      'en': `${BASE}/en${path}`,
      'fr': `${BASE}/fr${path}`,
      'x-default': `${BASE}/he${path}`,
    },
  }
}
