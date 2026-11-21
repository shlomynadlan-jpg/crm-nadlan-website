import { supabase } from './supabase'

export interface Campaign {
  id: string
  title: string
  slug: string
  status: string
  template: string
  property_id: string | null
  custom_data: {
    title?: string
    description?: string
    cta?: string
    badge?: string
  }
  theme: {
    primary?: string
  }
  utm_source?: string
  notification_email?: string
  views: number
  created_at: string
}

export interface CampaignWithProperty extends Campaign {
  properties?: any
}

export async function getCampaignBySlug(slug: string): Promise<CampaignWithProperty | null> {
  // explicit public columns only: the result is passed to a client component (owner/contact/internal fields must not reach the browser).
  // Two queries: there is no FK campaigns→properties in the DB, so an embedded `properties(...)` select fails (PGRST200).
  const { data, error } = await supabase
    .from('campaigns')
    .select('id,title,slug,status,template,property_id,custom_data,theme,utm_source,views,created_at')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  if (error || !data) return null

  let properties = null
  if (data.property_id) {
    const res = await supabase
      .from('properties')
      .select('ac,bars,ceiling_height,city,deal_type,description,dock_leveler,elevator,entry_date,floor,furniture,gallery,gallery_size,gross_size,image_urls,meeting_room,net_size,parking_count,price,property_type,rent_price,rooms,underground_parking')
      .eq('id', data.property_id)
      .maybeSingle()
    properties = res.data
  }

  // Increment view count (fire and forget)
  supabase
    .from('campaigns')
    .update({ views: (data.views || 0) + 1 })
    .eq('id', data.id)
    .then(() => {}, () => {})

  return { ...data, properties } as CampaignWithProperty
}

export async function getAgentSettingsForCampaign() {
  const { data } = await supabase
    .from('settings')
    .select('business_name, full_name, phone, whatsapp_signature, license_number')
    .limit(1)
    .single()
  return data
}
