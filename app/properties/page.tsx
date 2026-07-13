import type { Metadata } from 'next'
import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PropertiesContent from '@/components/PropertiesContent'
import { getProperties } from '@/lib/properties'

type SearchParams = Promise<{ city?: string; property_type?: string; deal_type?: string }>

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { city, deal_type } = await searchParams
  const dealText = deal_type?.includes('מכירה') || deal_type === 'sale' ? 'נכסים למכירה'
    : deal_type?.includes('השכרה') || deal_type === 'rent' ? 'נכסים להשכרה'
    : 'כל הנכסים'
  const title = city ? `${dealText} ב${city}` : dealText
  return {
    title,
    description: `${title} — משרדים, חנויות, מחסנים, תעשייה, קרקעות ודירות. כל הנכסים המעודכנים של LS נדל"ן במקום אחד.`,
    alternates: { canonical: '/properties' },
  }
}

export default async function PropertiesPage({ searchParams }: { searchParams: SearchParams }) {
  const { city = '', property_type = '', deal_type = '' } = await searchParams

  // Server-render the initial list so search engines and AI crawlers see the content
  const data = await getProperties({ city, deal_type })
  const initialProperties = property_type
    ? data.filter(p => {
        const types = Array.isArray(p.property_type) ? p.property_type.join(',') : (p.property_type || '')
        return types.includes(property_type)
      })
    : data

  return (
    <>
      <Navbar />
      <main id="main">
        <Suspense fallback={<div className="pt-28 text-center p-20 text-slate-400">טוען...</div>}>
          <PropertiesContent initialProperties={initialProperties} />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
