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
    .select('id,city,property_address,property_type,gross_size,net_size,price,rent_price,rooms,floor,parking_count,description,deal_type,image_urls,entry_date,ac,elevator,furniture,project_name,status,created_at,ceiling_height,price_per_meter')
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

export function getPropertyImage(p: Property): string {
  if (p.image_urls && p.image_urls.length > 0 && p.image_urls[0]) return p.image_urls[0]
  const type = (Array.isArray(p.property_type) ? p.property_type.join(',') : (p.property_type || '')).toLowerCase()
  if (type.includes('משרד')) return 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
  if (type.includes('מחסן') || type.includes('לוגיסטי')) return 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80'
  if (type.includes('חנות') || type.includes('מסחרי')) return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80'
  if (type.includes('דירה') || type.includes('פנטהאוז')) return 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
  return 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
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
