import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { TERMS, tr, trList } from './terms.ts'

test('every term has en/fr/ru without Hebrew letters', () => {
  for (const [he, t] of Object.entries(TERMS)) {
    for (const l of ['en', 'fr', 'ru'] as const) {
      assert.ok(t[l] && !/[֐-׿]/.test(t[l]), `${he} → ${l}`)
    }
  }
})

test('Hebrew stays untouched, unknown terms fall back to the original', () => {
  assert.equal(tr('חנויות', 'he'), 'חנויות')
  assert.equal(tr('בני ברק ', 'en'), 'Bnei Brak')
  assert.equal(tr('מונח-לא-קיים', 'en'), 'מונח-לא-קיים')
  assert.equal(trList('חנות, משרדים', 'ru'), 'Магазин, Офисы')
})

test('all message files share the same keys', () => {
  const keys = (o: Record<string, unknown>, p = ''): string[] =>
    Object.entries(o).flatMap(([k, v]) => v && typeof v === 'object' && !Array.isArray(v) ? keys(v as Record<string, unknown>, `${p}${k}.`) : [`${p}${k}`]).sort()
  const load = (l: string) => keys(JSON.parse(readFileSync(new URL(`../messages/${l}.json`, import.meta.url), 'utf8')))
  const he = load('he')
  for (const l of ['en', 'fr', 'ru']) assert.deepEqual(load(l), he, l)
})
