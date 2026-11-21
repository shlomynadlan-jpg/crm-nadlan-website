import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildCosts } from './costs.ts'

test('per-m² costs × gross size; arnona is already a monthly total', () => {
  const c = buildCosts({ management_fee: 15, arnona: 678, vaad: 2 }, 100, 8000)
  assert.deepEqual(c.rows.map(r => [r.key, r.monthly]), [['rent', 8000], ['management_fee', 1500], ['arnona', 678], ['vaad', 200]])
  assert.equal(c.rows.find(r => r.key === 'arnona')?.perSqm, null)
  assert.equal(c.total, 10378)
  assert.equal(c.hasAnyExtra, true)
})

test('no cost data: no total, no extras', () => {
  const c = buildCosts(null, 100, 8000)
  assert.equal(c.total, null)
  assert.equal(c.hasAnyExtra, false)
})

test('missing size: per-m² shown, no monthly or total', () => {
  const c = buildCosts({ management_fee: 15, arnona: null, vaad: null }, null, 8000)
  assert.equal(c.rows.find(r => r.key === 'management_fee')?.perSqm, 15)
  assert.equal(c.rows.find(r => r.key === 'management_fee')?.monthly, null)
  assert.equal(c.total, null)
})

test('sale without rent: no rent row, no total', () => {
  const c = buildCosts({ management_fee: null, arnona: 450, vaad: null }, 50, null)
  assert.equal(c.rows.some(r => r.key === 'rent'), false)
  assert.equal(c.total, null)
  assert.equal(c.rows.find(r => r.key === 'arnona')?.monthly, 450)
  assert.equal(c.hasAnyExtra, true)
})
