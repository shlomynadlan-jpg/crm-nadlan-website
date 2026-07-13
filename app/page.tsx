import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PropertyCard from '@/components/PropertyCard'
import SearchBar from '@/components/SearchBar'
import { getProperties } from '@/lib/properties'

export const revalidate = 60

export default async function HomePage() {
  const allProperties = await getProperties()
  const featured = allProperties.slice(0, 6)
  const forSale = allProperties.filter(p => p.deal_type?.includes('מכירה')).length
  const forRent = allProperties.filter(p => p.deal_type?.includes('השכרה')).length

  return (
    <>
      <Navbar />

      <main id="main">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0F172A 0%, #0077B6 60%, #005A8E 100%)' }}>

        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
            style={{ background: '#C9A84C', filter: 'blur(80px)' }} />
          <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full opacity-15"
            style={{ background: '#90E0EF', filter: 'blur(60px)' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
          <div className="text-center text-white mb-12">
            <span className="inline-block text-sm font-medium px-4 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(201,168,76,0.25)', color: '#F0D080', border: '1px solid rgba(201,168,76,0.4)' }}>
              🏆 מומחים בנכסים מסחריים ומגורים
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
              מוצאים לך את<br />
              <span style={{ color: '#C9A84C' }}>הנכס המושלם</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              מגוון נכסים למכירה ולהשכרה — משרדים, חנויות, מחסנים, דירות ועוד.
              מחפשים? אנחנו כאן בשבילכם.
            </p>

            <SearchBar />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mt-10">
            {[
              { num: allProperties.length, label: 'נכסים זמינים', href: '/properties' },
              { num: forSale, label: 'למכירה', href: '/properties?deal_type=מכירה' },
              { num: forRent, label: 'להשכרה', href: '/properties?deal_type=השכרה' },
            ].map(({ num, label, href }) => (
              <Link key={label} href={href} className="text-center glass-dark rounded-xl p-4 hover:opacity-80 transition-opacity"
                style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                <p className="text-3xl font-bold text-white">{num}</p>
                <p className="text-sm text-blue-200">{label}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L1440 80L1440 30C1200 70 800 10 480 40C240 60 80 20 0 30L0 80Z" fill="#F8FAFC"/>
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-sm font-medium mb-2" style={{ color: '#C9A84C' }}>חיפוש לפי קטגוריה</p>
          <h2 className="text-3xl font-bold text-slate-900">מה אתם מחפשים?</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { icon: '🏢', label: 'משרדים', type: 'משרד' },
            { icon: '🛍️', label: 'חנויות', type: 'חנות' },
            { icon: '🏭', label: 'מחסנים', type: 'מחסן' },
            { icon: '🔧', label: 'תעשייה', type: 'תעשיה' },
            { icon: '🌿', label: 'קרקעות', type: 'קרקע' },
            { icon: '🏗️', label: 'מסחרי', type: 'מסחרי' },
          ].map(({ icon, label, type }) => (
            <Link key={type} href={`/properties?property_type=${encodeURIComponent(type)}`}
              className="flex flex-col items-center gap-3 p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all bg-white group">
              <span className="text-4xl group-hover:scale-110 transition-transform" aria-hidden="true">{icon}</span>
              <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-medium mb-2" style={{ color: '#C9A84C' }}>נכסים מובחרים</p>
            <h2 className="text-3xl font-bold text-slate-900">נכסים אחרונים</h2>
          </div>
          <Link href="/properties" className="text-sm font-medium text-blue-600 hover:underline flex items-center gap-1">
            כל הנכסים ←
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
      </section>

      {/* Why Us */}
      <section style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)' }} className="py-20 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-sm font-medium mb-2" style={{ color: '#C9A84C' }}>למה אנחנו?</p>
            <h2 className="text-3xl font-bold">הערך שאנחנו מביאים</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'מקצועיות ודיוק', desc: 'כל נכס עובר בדיקה קפדנית לפני הצגה. אנחנו מספקים מידע מדויק ואמין.' },
              { icon: '⚡', title: 'מהירות תגובה', desc: 'אנחנו זמינים בכל עת. פנייתך תקבל מענה תוך שעות.' },
              { icon: '🤝', title: 'ליווי אישי', desc: 'מהחיפוש ועד החתימה — אנחנו לצידך בכל שלב.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="rounded-2xl p-8 text-center"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">לא מצאתם מה שחיפשתם?</h2>
        <p className="text-slate-500 text-lg mb-8">השאירו פרטים ונחזור אליכם עם הצעות מותאמות אישית</p>
        <Link href="/contact" className="btn-primary text-base py-4 px-10">
          📞 צור קשר עכשיו
        </Link>
        <p className="text-slate-500 mt-6">
          יש לכם שאלות על תיווך, עמלות או תהליך העסקה?{' '}
          <Link href="/faq" className="text-blue-600 font-medium hover:underline">
            כל התשובות בעמוד השאלות הנפוצות
          </Link>
        </p>
      </section>
      </main>

      <Footer />
    </>
  )
}
