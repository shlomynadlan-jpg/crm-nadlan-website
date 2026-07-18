import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WantedCard from '@/components/WantedCard'
import { getPropertyRequests } from '@/lib/properties'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('wanted')
  return {
    title: t('pageTitle'),
    description: t('pageSubtitle'),
    alternates: { canonical: '/wanted' },
  }
}

export default async function WantedPage() {
  const t = await getTranslations('wanted')
  const requests = await getPropertyRequests()

  return (
    <>
      <Navbar />

      {/* Header */}
      <div
        className="pt-24 pb-10 px-6"
        style={{ background: 'linear-gradient(160deg, #040d1e 0%, #0a1e3d 55%, #091830 100%)' }}
      >
        <div className="max-w-5xl mx-auto py-10 text-center">
          <div style={{ width: 40, height: 2, background: '#C9A84C', margin: '0 auto 20px' }} />
          <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: 'rgba(201,168,76,0.8)' }}>
            {t('pageLabel')}
          </p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{t('pageTitle')}</h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {t('pageSubtitle')}
          </p>
        </div>
      </div>

      <main id="main" style={{ background: '#f4f8fd' }} className="min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-16">

          {requests.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-xl font-semibold">{t('noResults')}</p>
              <p className="text-base mt-2">{t('checkBack')}</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-sm font-bold tracking-widest uppercase mb-1" style={{ color: '#C9A84C' }}>
                    {t('activeRequestsLabel')}
                  </p>
                  <h2 className="text-3xl font-black" style={{ color: '#0a1e3d' }}>
                    {t('activeRequestsCount', { count: requests.length })}
                  </h2>
                </div>
                <a
                  href="tel:0552702800"
                  className="hidden md:flex items-center gap-2 font-black text-sm px-6 py-3 rounded-xl"
                  style={{ background: '#0a1e3d', color: '#C9A84C' }}
                >
                  📞 055-2702800
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map(r => (
                  <WantedCard key={r.id} r={r} />
                ))}
              </div>
            </>
          )}

          {/* Owner CTA */}
          <div
            className="mt-16 rounded-2xl p-8 text-center"
            style={{ background: 'linear-gradient(135deg, #040d1e 0%, #0a1e3d 100%)', border: '1px solid rgba(201,168,76,0.2)' }}
          >
            <h3 className="text-2xl font-black text-white mb-2">{t('ctaTitle')}</h3>
            <p className="mb-6" style={{ color: 'rgba(255,255,255,0.55)' }}>
              {t('ctaSubtitle')}
            </p>
            <a
              href="tel:0552702800"
              className="inline-block font-black text-sm py-3 px-8 rounded-xl"
              style={{ background: '#C9A84C', color: '#0a1e3d' }}
            >
              {t('callNowBtn')}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
