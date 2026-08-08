import { notFound } from 'next/navigation'
import { getCampaignBySlug, getAgentSettingsForCampaign } from '@/lib/campaigns'
import LandingPageClient from './LandingPageClient'

export const revalidate = 30

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const campaign = await getCampaignBySlug(slug)
  if (!campaign) return { title: 'דף לא נמצא' }

  const prop = campaign.properties
  const title = campaign.custom_data?.title || prop?.property_type || campaign.title
  const city = prop?.city || ''

  return {
    title: `${title}${city ? ` | ${city}` : ''} | שחף נכסים`,
    description: campaign.custom_data?.description || prop?.description || 'נכס מסחרי להשכרה/למכירה',
  }
}

export default async function LandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [campaign, agent] = await Promise.all([
    getCampaignBySlug(slug),
    getAgentSettingsForCampaign(),
  ])

  if (!campaign) notFound()

  return <LandingPageClient campaign={campaign} agent={agent} />
}
