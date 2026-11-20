// End-to-end SEO check against a running site.
// Usage: node scripts/seo-check.mjs [baseUrl]   (default http://localhost:3507)
// Rules: every sitemap URL → 200, indexable, self canonical, hreflang targets all in the sitemap,
// no Hebrew in <title> of en/fr/ru pages; non-indexed locales → noindex with no canonical/hreflang.
const PROD = 'https://www.nadlannow.co.il'
const base = (process.argv[2] || 'http://localhost:3507').replace(/\/$/, '')
const local = u => u.replace(PROD, base)
const errors = []
const fail = (url, msg) => errors.push(`${url}: ${msg}`)

async function page(url) {
  const res = await fetch(local(url), { redirect: 'manual' })
  const html = await res.text()
  const head = html.slice(0, html.indexOf('</head>'))
  return {
    status: res.status,
    canonical: head.match(/<link rel="canonical" href="([^"]+)"/)?.[1],
    hreflang: [...head.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map(m => [m[1], m[2]]),
    noindex: /<meta name="robots" content="[^"]*noindex/.test(head),
    title: head.match(/<title>([^<]*)<\/title>/)?.[1] ?? '',
  }
}

const xml = await (await fetch(`${base}/sitemap.xml`)).text()
if (!xml.startsWith('<?xml')) throw new Error('sitemap.xml is not XML')
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
const inSitemap = new Set(urls)
if (inSitemap.size !== urls.length) fail('sitemap', `${urls.length - inSitemap.size} duplicate URLs`)

const queue = [...urls]
await Promise.all(Array.from({ length: 6 }, async () => {
  for (let url; (url = queue.shift());) {
    const p = await page(url)
    if (p.status !== 200) { fail(url, `status ${p.status}`); continue }
    if (p.noindex) fail(url, 'in sitemap but noindex')
    if (p.canonical !== url) fail(url, `canonical ${p.canonical}`)
    for (const [lang, href] of p.hreflang) if (!inSitemap.has(href)) fail(url, `hreflang ${lang} → ${href} not in sitemap`)
    if (!/^https:\/\/[^/]+\/he(\/|$)/.test(url) && /[֐-׿]/.test(p.title)) fail(url, `Hebrew in title: ${p.title}`)
  }
}))

// Non-indexed locale versions of pages that are in the sitemap in Hebrew
const prop = urls.find(u => /\/he\/properties\/\d+$/.test(u))
const city = urls.find(u => u.includes('/he/city/'))
for (const url of [prop?.replace('/he/', '/en/'), city?.replace('/he/', '/ru/'), `${PROD}/ru/privacy`].filter(Boolean)) {
  const p = await page(url)
  if (p.status !== 200) fail(url, `status ${p.status}`)
  if (!p.noindex) fail(url, 'expected noindex')
  if (p.canonical || p.hreflang.length) fail(url, 'noindex page must not declare canonical/hreflang')
  if (inSitemap.has(url)) fail(url, 'noindex page listed in sitemap')
}

console.log(`checked ${urls.length} sitemap URLs + noindex samples against ${base}`)
if (errors.length) { console.error(errors.slice(0, 50).join('\n')); console.error(`${errors.length} problem(s)`); process.exit(1) }
console.log('OK')
