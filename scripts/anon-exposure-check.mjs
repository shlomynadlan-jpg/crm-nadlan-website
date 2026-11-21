// Proves from the outside what the public (anon) Supabase key can read — exactly what any visitor can do.
// Read-only GETs; prints status codes only, never row data.
// Usage: node --env-file=.env.local scripts/anon-exposure-check.mjs     (exit 1 = private data still exposed)
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
if (!URL || !KEY) { console.error('missing NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY'); process.exit(2) }

async function get(path) {
  const res = await fetch(`${URL}/rest/v1/${path}`, { headers: { apikey: KEY, Authorization: `Bearer ${KEY}`, Range: '0-0' } })
  const body = await res.text()
  let rows = 0
  try { const j = JSON.parse(body); rows = Array.isArray(j) ? j.length : 0 } catch {}
  return { status: res.status, rows, code: (body.match(/"code":"([^"]+)"/) || [])[1] }
}

// must be refused (HTTP 401/403 with 42501), or at least return no rows
const PRIVATE = [
  'properties?select=source_contact_phone', 'properties?select=source_contact_name', 'properties?select=source_contact_email',
  'properties?select=full_name', 'properties?select=phone', 'properties?select=phone2', 'properties?select=email',
  'properties?select=internal_notes', 'properties?select=agreement_notes', 'properties?select=notes',
  'properties?select=broker_rent_commission', 'properties?select=broker_sale_commission', 'properties?select=referred_by',
  'properties?select=*', 'settings?select=ai_prompt_facebook', 'settings?select=user_id', 'settings?select=*',
  'campaigns?select=notification_email', 'campaigns?select=*',
  'team_messages?select=*', 'property_forms?select=*', 'user_activity_log?select=*', 'agent_cost_status?select=*',
  'clients?select=*', 'profiles?select=*', 'campaign_leads?select=*',
]
// must keep working for the public site
const PUBLIC = [
  'properties?select=management_fee,arnona,vaad&limit=1',
  'properties?select=id,city,property_address,property_type,gross_size,net_size,price,rent_price,rooms,floor,parking_count,description,description_en,description_fr,deal_type,image_urls,entry_date,ac,elevator,furniture,project_name,project_name_en,project_name_fr,status,created_at,ceiling_height,price_per_meter,exclusivity,exclusivity_until,hide_price&show_on_website=eq.true&order=created_at.desc',
  'properties?select=ac,bars,ceiling_height,city,deal_type,description,dock_leveler,elevator,entry_date,floor,furniture,gallery,gallery_size,gross_size,image_urls,meeting_room,net_size,parking_count,price,property_type,rent_price,rooms,underground_parking',
  'settings?select=full_name,phone,business_name,whatsapp_signature,license_number',
  'campaigns?select=id,title,slug,status,template,property_id,custom_data,theme,utm_source,views,created_at',
  'property_requests?select=id,property_type,city,deal_type,size_min,size_max,budget,description,is_urgent,created_at&show_on_website=eq.true',
]

let fail = 0
console.log('PRIVATE (must be blocked):')
for (const p of PRIVATE) {
  const r = await get(p)
  const blocked = r.status >= 400 || r.rows === 0
  if (!blocked) fail++
  console.log(`  ${blocked ? 'ok  ' : 'LEAK'} ${r.status}${r.code ? ' ' + r.code : ''} rows=${r.rows}  ${p.split('&')[0]}`)
}
console.log('PUBLIC (must work):')
for (const p of PUBLIC) {
  const r = await get(p)
  const ok = r.status < 300
  if (!ok) fail++
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${r.status}${r.code ? ' ' + r.code : ''}  ${p.split('?')[0]}`)
}
console.log(fail ? `\n${fail} problem(s)` : '\nOK — no private data readable with the public key; site queries work')
process.exit(fail ? 1 : 0)
