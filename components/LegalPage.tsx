import { getTranslations } from 'next-intl/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Props {
  title: string
  subtitle?: string
  updated?: string
  children: React.ReactNode
}

export default async function LegalPage({ title, subtitle, updated, children }: Props) {
  const t = await getTranslations('legal')
  return (
    <>
      <Navbar />

      {/* Page header */}
      <div
        className="pt-24 pb-10 px-6"
        style={{ background: 'linear-gradient(160deg, #040d1e 0%, #0a1e3d 55%, #091830 100%)' }}
      >
        <div className="max-w-4xl mx-auto text-center py-10">
          <div style={{ width: 40, height: 2, background: '#C9A84C', margin: '0 auto 20px' }} />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">{title}</h1>
          {subtitle && (
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.55)' }}>{subtitle}</p>
          )}
        </div>
      </div>

      <main id="main" style={{ background: '#f4f8fd' }} className="min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-16 w-full">
          <article
            className="legal-content rounded-2xl p-8 md:p-10"
            style={{
              background: '#fff',
              border: '1px solid #dde8f5',
              boxShadow: '0 4px 24px rgba(10,30,62,0.06)',
            }}
          >
            {children}
            {updated && (
              <p className="text-sm mt-10 pt-6 border-t" style={{ color: '#9ab2c8', borderColor: '#dde8f5' }}>
                {t('lastUpdated', { date: updated })}
              </p>
            )}
          </article>
        </div>
      </main>

      <Footer />
    </>
  )
}
