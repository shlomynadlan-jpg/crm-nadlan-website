import { supabase } from './supabase'

export interface Property {
  id: string
  city: string
  property_address: string
  property_type: string | string[]
  gross_size: number | null
  net_size: number | null
  price: number | null
  rent_price: number | null
  price_per_meter: number | null
  rooms: number | null
  floor: number | null
  parking_count: number | null
  description: string | null
  deal_type: string | null
  image_urls: string[] | null
  entry_date: string | null
  ceiling_height: number | null
  ac: boolean | null
  elevator: boolean | null
  furniture: boolean | null
  project_name: string | null
  project_name_en?: string | null
  project_name_fr?: string | null
  description_en?: string | null
  description_fr?: string | null
  status: string | null
  created_at: string
}

export interface PropertyFilters {
  city?: string
  property_type?: string
  deal_type?: string
  price_max?: number
  size_min?: number
  size_max?: number
  search?: string
}

export async function getProperties(filters?: PropertyFilters): Promise<Property[]> {
  let query = supabase
    .from('properties')
    .select('id,city,property_address,property_type,gross_size,net_size,price,rent_price,rooms,floor,parking_count,description,description_en,description_fr,deal_type,image_urls,entry_date,ac,elevator,furniture,project_name,project_name_en,project_name_fr,status,created_at,ceiling_height,price_per_meter')
    .eq('show_on_website', true)
    .order('created_at', { ascending: false })

  if (filters?.city) query = query.ilike('city', `%${filters.city}%`)
  if (filters?.deal_type) query = query.ilike('deal_type', `%${filters.deal_type}%`)
  if (filters?.price_max) query = query.lte('price', filters.price_max)
  if (filters?.size_min) query = query.gte('gross_size', filters.size_min)
  if (filters?.size_max) query = query.lte('gross_size', filters.size_max)

  const { data, error } = await query
  if (error) { console.error(error); return [] }
  return data || []
}

export async function getProperty(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('id', Number(id))
    .maybeSingle()

  if (error) { console.error('getProperty error:', error.message); return null }
  return data
}

export async function getCities(): Promise<string[]> {
  const { data } = await supabase
    .from('properties')
    .select('city')
    .eq('show_on_website', true)

  if (!data) return []
  const cities = [...new Set(data.map(d => d.city).filter(Boolean))] as string[]
  return cities.sort()
}

function aiImageUrl(prompt: string, seed: string | number): string {
  const encoded = encodeURIComponent(prompt)
  return `https://image.pollinations.ai/prompt/${encoded}?width=800&height=600&nologo=true&seed=${seed}`
}

function propertyAIPrompt(type: string): string {
  if (type.includes('משרד')) return 'modern glass office interior corporate workspace professional luxury real estate Israel'
  if (type.includes('מחסן') || type.includes('לוגיסטי')) return 'industrial warehouse storage facility professional logistics interior modern real estate Israel'
  if (type.includes('חנות')) return 'modern retail boutique shop commercial storefront elegant interior real estate Israel'
  if (type.includes('מסחרי')) return 'commercial business space interior modern elegant real estate Israel'
  if (type.includes('דירה') || type.includes('פנטהאוז') || type.includes('מגורים')) return 'luxury apartment living room modern interior design real estate Israel'
  if (type.includes('קרקע')) return 'empty land plot aerial view Israel real estate development sunny'
  if (type.includes('תעשיה')) return 'industrial manufacturing building exterior modern Israel commercial real estate'
  return 'commercial real estate building exterior modern glass tower Israel professional'
}

export function isPlaceholderImage(p: Property): boolean {
  return !(p.image_urls && p.image_urls.length > 0 && p.image_urls[0])
}

export function getPropertyImage(p: Property): string {
  if (p.image_urls && p.image_urls.length > 0 && p.image_urls[0]) return p.image_urls[0]
  const type = (Array.isArray(p.property_type) ? p.property_type.join(',') : (p.property_type || '')).toLowerCase()
  const prompt = propertyAIPrompt(type)
  const seed = p.id ? String(p.id).replace(/\D/g, '').slice(0, 8) || '42' : '42'
  return aiImageUrl(prompt, seed)
}

export interface PropertyRequest {
  id: number
  property_type: string
  city: string | null
  deal_type: string
  size_min: number | null
  size_max: number | null
  budget: number | null
  description: string | null
  is_urgent: boolean
  created_at: string
}

export async function getPropertyRequests(): Promise<PropertyRequest[]> {
  const { data, error } = await supabase
    .from('property_requests')
    .select('id,property_type,city,deal_type,size_min,size_max,budget,description,is_urgent,created_at')
    .eq('show_on_website', true)
    .order('created_at', { ascending: false })
  if (error) { console.error(error); return [] }
  return data || []
}

export interface AgentSettings {
  full_name: string
  phone: string
  business_name: string
}

export async function getAgentSettings(): Promise<AgentSettings | null> {
  const { data } = await supabase
    .from('settings')
    .select('full_name,phone,business_name')
    .limit(1)
    .single()
  return data || null
}

export function formatPrice(price: number | null): string {
  if (!price) return 'מחיר לפי פנייה'
  return `₪${price.toLocaleString('he-IL')}`
}

export function getPropertyTypes(p: Property): string {
  if (Array.isArray(p.property_type)) return p.property_type.join(', ')
  return p.property_type || ''
}
