import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'
import PropertyCard from '@/components/PropertyCard'
import WantedCard from '@/components/WantedCard'
import SpecialtiesMarquee from '@/components/SpecialtiesMarquee'
import OwnerBanner from '@/components/OwnerBanner'
import ProcessSection from '@/components/ProcessSection'
import Reveal from '@/components/Reveal'
import { Link } from '@/i18n/navigation'
import { getProperties, getPropertyRequests } from '@/lib/properties'
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const t = await getTranslations()
  const [allProperties, wantedRequests] = await Promise.all([getProperties(), getPropertyRequests()])
  const featured = allProperties.slice(0, 3)
  const forSale = allProperties.filter(p => p.deal_type?.includes('מכירה')).length
  const forRent = allProperties.filter(p => p.deal_type?.includes('השכרה')).length

  return (
    <>
      <main id="main">

        {/* ── Hero ── */}
        <HeroSection
          totalCount={allProperties.length}
          forSale={forSale}
          forRent={forRent}
          wantedCount={wantedRequests.length}
        />

        {/* ── Specialties Marquee ── */}
        <SpecialtiesMarquee />

        {/* ── Featured Properties ── */}
        <section className="py-16 px-6" style={{ background: '#fff' }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: '#C9A84C' }}>
                  {t('home.featuredLabel')}
                </p>
                <h2 className="text-4xl font-black" style={{ color: '#0a1e3d' }}>{t('home.featuredTitle')}</h2>
              </div>
              <Link
                href="/properties"
                className="text-sm font-semibold pb-0.5"
                style={{ color: '#0a3d6b', borderBottom: '1px solid #0a3d6b' }}
              >
                {t('home.viewAll')}
              </Link>
            </div>

            {featured.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <p className="text-5xl mb-4">🏗️</p>
                <p className="text-lg">{t('home.noProperties')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map(p => <PropertyCard key={p.id} p={p} />)}
              </div>
            )}
          </div>
        </section>

        {/* ── Categories ── */}
        <section className="pb-16 px-6" style={{ background: '#fff' }}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: '#C9A84C' }}>
                {t('home.categoriesLabel')}
              </p>
              <h2 className="text-3xl font-black" style={{ color: '#0a1e3d' }}>{t('home.categoriesTitle')}</h2>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {[
                { icon: '🏢', label: t('propertyTypes.משרד'), type: 'משרד' },
                { icon: '🛍️', label: t('propertyTypes.חנות'), type: 'חנות' },
                { icon: '📦', label: t('propertyTypes.מחסן'), type: 'מחסן' },
                { icon: '🔧', label: t('propertyTypes.תעשיה'), type: 'תעשיה' },
                { icon: '🌿', label: t('propertyTypes.קרקע'), type: 'קרקע' },
                { icon: '🏗️', label: t('propertyTypes.מסחרי'), type: 'מסחרי' },
              ].map(({ icon, label, type }, i) => (
                <Reveal key={type} delay={i * 60}>
                  <Link
                    href={`/properties?property_type=${encodeURIComponent(type)}`}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border text-center hover:-translate-y-1 transition-all group"
                    style={{ background: '#f4f8fd', borderColor: '#dde8f5' }}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
                    <span className="text-sm font-bold" style={{ color: '#2d5a80' }}>{label}</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Us ── */}
        <section className="py-16 px-6" style={{ background: '#f4f8fd', borderTop: '1px solid #dde8f5' }}>
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: '#C9A84C' }}>{t('home.whyLabel')}</p>
            <h2 className="text-4xl font-black mb-10" style={{ color: '#0a1e3d' }}>{t('home.whyTitle')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🎯', title: t('why.profTitle'), desc: t('why.profDesc') },
                { icon: '⚡', title: t('why.speedTitle'), desc: t('why.speedDesc') },
                { icon: '🤝', title: t('why.personalTitle'), desc: t('why.personalDesc') },
                { icon: '🔒', title: t('why.discTitle'), desc: t('why.discDesc') },
              ].map(({ icon, title, desc }, i) => (
                <Reveal key={title} delay={i * 100}>
                  <div
                    className="rounded-2xl p-7 text-center h-full transition-all hover:-translate-y-1"
                    style={{ background: '#fff', border: '1px solid #dde8f5', boxShadow: '0 2px 12px rgba(10,30,62,0.04)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4"
                      style={{ background: '#e8f3fc', border: '1px solid #c0daf5' }}
                    >
                      {icon}
                    </div>
                    <h3 className="text-lg font-black mb-2" style={{ color: '#0a1e3d' }}>{title}</h3>
                    <p className="text-base leading-relaxed" style={{ color: '#6a90b0' }}>{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Wanted / דרושים ── */}
        {wantedRequests.length > 0 && (
          <section
            className="py-16 px-6"
            style={{ background: 'linear-gradient(160deg, #040d1e 0%, #0a1e3d 55%, #091830 100%)' }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: 'rgba(201,168,76,0.8)' }}>
                    {t('home.wantedForOwners')}
                  </p>
                  <h2 className="text-4xl font-black text-white">{t('home.wantedTitle')}</h2>
                  <p className="text-base mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {t('home.wantedSubtitle')}
                  </p>
                </div>
                <Link
                  href="/wanted"
                  className="hidden md:block text-sm font-bold pb-0.5"
                  style={{ color: '#C9A84C', borderBottom: '1px solid rgba(201,168,76,0.5)' }}
                >
                  {t('home.wantedViewAll')}
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wantedRequests.slice(0, 3).map(r => (
                  <WantedCard key={r.id} r={r} />
                ))}
              </div>
              {wantedRequests.length > 3 && (
                <div className="text-center mt-8">
                  <Link
                    href="/wanted"
                    className="inline-block text-sm font-black py-3 px-8 rounded-xl"
                    style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}
                  >
                    {t('home.wantedViewCount', { count: wantedRequests.length })}
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ── Process ── */}
        <ProcessSection />

        {/* ── Owner Banner ── */}
        <OwnerBanner />

      </main>

      <Footer />
    </>
  )
}
