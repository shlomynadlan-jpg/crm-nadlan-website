import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateLead, isRateLimited, RATE_LIMIT } from './leads.ts'

const good = { name: ' דנה ', phone: '052-1234567', privacy_consent: true }

test('valid lead is trimmed and accepted', () => {
  const r = validateLead({ ...good, message: ' שלום ', property_id: 624, marketing_consent: true })
  assert.equal(r.ok, true)
  if (r.ok) {
    assert.equal(r.lead.name, 'דנה')
    assert.equal(r.lead.message, 'שלום')
    assert.equal(r.lead.property_id, 624)
    assert.equal(r.lead.marketing_consent, true)
  }
})

test('privacy consent must be literally true', () => {
  for (const privacy_consent of [undefined, false, 'yes', 1]) {
    const r = validateLead({ ...good, privacy_consent })
    assert.equal(r.ok, false)
    if (!r.ok) assert.equal(r.status, 400)
  }
})

test('required fields, bad phone and oversized fields are rejected', () => {
  for (const body of [
    null, {}, { ...good, name: '  ' }, { ...good, phone: 123 }, { ...good, phone: '123' },
    { ...good, phone: '1'.repeat(16) }, { ...good, name: 'x'.repeat(101) }, { ...good, message: 'x'.repeat(2001) },
  ]) assert.equal(validateLead(body).ok, false, JSON.stringify(body)?.slice(0, 40))
})

test('honeypot filled → silent spam result', () => {
  const r = validateLead({ ...good, website: 'http://spam' })
  assert.equal(r.ok, false)
  if (!r.ok) { assert.equal(r.spam, true); assert.equal(r.status, 200) }
})

test('rate limit after max requests per window, per IP', () => {
  const t = 1_000_000
  for (let i = 0; i < RATE_LIMIT.max; i++) assert.equal(isRateLimited('1.1.1.1', t + i), false)
  assert.equal(isRateLimited('1.1.1.1', t + 10), true)
  assert.equal(isRateLimited('2.2.2.2', t + 10), false)
  assert.equal(isRateLimited('1.1.1.1', t + RATE_LIMIT.windowMs + 100), false)
})
