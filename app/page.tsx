import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'
import PropertyCard from '@/components/PropertyCard'
import SpecialtiesMarquee from '@/components/SpecialtiesMarquee'
import OwnerBanner from '@/components/OwnerBanner'
import Reveal from '@/components/Reveal'
import Link from 'next/link'
import { getProperties } from '@/lib/properties'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const allProperties = await getProperties()
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
        />

        {/* ── Specialties Marquee ── */}
        <SpecialtiesMarquee />

        {/* ── Featured Properties ── */}
        <section className="py-16 px-6" style={{ background: '#fff' }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: '#C9A84C' }}>
                  ✦ נבחרו במיוחד
                </p>
                <h2 className="text-4xl font-black" style={{ color: '#0a1e3d' }}>נכסים מובחרים</h2>
              </div>
              <Link
                href="/properties"
                className="text-sm font-semibold pb-0.5"
                style={{ color: '#0a3d6b', borderBottom: '1px solid #0a3d6b' }}
              >
                צפה בכל הנכסים ←
              </Link>
            </div>

            {featured.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <p className="text-5xl mb-4">🏗️</p>
                <p className="text-lg">אין נכסים זמינים כרגע</p>
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
                סנן לפי סוג
              </p>
              <h2 className="text-3xl font-black" style={{ color: '#0a1e3d' }}>כל סוגי הנכסים</h2>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {[
                { icon: '🏢', label: 'משרדים', type: 'משרד' },
                { icon: '🛍️', label: 'חנויות', type: 'חנות' },
                { icon: '📦', label: 'מחסנים', type: 'מחסן' },
                { icon: '🔧', label: 'תעשייה', type: 'תעשיה' },
                { icon: '🌿', label: 'קרקעות', type: 'קרקע' },
                { icon: '🏗️', label: 'מסחרי', type: 'מסחרי' },
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
            <p className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: '#C9A84C' }}>למה אנחנו</p>
            <h2 className="text-4xl font-black mb-10" style={{ color: '#0a1e3d' }}>הבחירה הנכונה לנדל״ן שלך</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '🎯', title: 'מקצועיות ודיוק', desc: 'ניסיון של שנים בשוק הנדל״ן המסחרי והמגורים בכל רחבי הארץ.' },
                { icon: '⚡', title: 'מהירות תגובה', desc: 'נחזור אליך תוך שעות — כי כל עסקה טובה מתחילה בזמן הנכון.' },
                { icon: '🤝', title: 'ליווי אישי', desc: 'מהחיפוש הראשון ועד חתימת החוזה — אתה לא לבד לרגע.' },
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

        {/* ── Owner Banner ── */}
        <OwnerBanner />

      </main>

      <Footer />
    </>
  )
}
