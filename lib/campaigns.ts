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
  const { data, error } = await supabase
    .from('campaigns')
    .select('*, properties(*)')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  if (error || !data) return null

  // Increment view count (fire and forget)
  supabase
    .from('campaigns')
    .update({ views: (data.views || 0) + 1 })
    .eq('id', data.id)
    .then(() => {}, () => {})

  return data as CampaignWithProperty
}

export async function getAgentSettingsForCampaign() {
  const { data } = await supabase
    .from('settings')
    .select('business_name, full_name, phone, whatsapp_signature, license_number')
    .limit(1)
    .single()
  return data
}
