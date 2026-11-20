import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildSeo, propertyLocales, INDEXED, BASE } from './alternates.ts'

test('indexed locale gets a self canonical with the locale prefix', () => {
  const m = buildSeo('/about', 'en')
  assert.equal(m.alternates?.canonical, `${BASE}/en/about`)
  assert.equal('robots' in m, false)
})

test('hreflang is reciprocal, lists only indexed locales, x-default is Hebrew', () => {
  for (const l of INDEXED.legal) {
    const langs = buildSeo('/privacy', l, INDEXED.legal).alternates!.languages!
    assert.deepEqual(Object.keys(langs).sort(), ['en', 'fr', 'he', 'x-default'])
    assert.equal(langs.ru, undefined)
    assert.equal(langs['x-default'], `${BASE}/he/privacy`)
  }
})

test('non-indexed locale is noindex,follow with no canonical and no hreflang', () => {
  const m = buildSeo('/properties/624', 'en', propertyLocales())
  assert.deepEqual(m, { robots: { index: false, follow: true } })
})

test('Hebrew-only page has self canonical and no hreflang', () => {
  const m = buildSeo('/properties/624', 'he', propertyLocales())
  assert.equal(m.alternates?.canonical, `${BASE}/he/properties/624`)
  assert.equal(m.alternates && 'languages' in m.alternates, false)
})

test('home path has no trailing slash', () => {
  assert.equal(buildSeo('/', 'fr').alternates?.canonical, `${BASE}/fr`)
})

test('published translations add locales in a stable order, Hebrew always first', () => {
  assert.deepEqual(propertyLocales(['ru', 'en', 'xx']), ['he', 'en', 'ru'])
})
