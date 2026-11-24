import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { buildSeo, INDEXED, BASE } from '@/lib/alternates'
import { citySlug, SERVICE_AREAS } from '@/lib/cities'
import { getCities } from '@/lib/properties'
import { setRequestLocale } from 'next-intl/server'

export const revalidate = 3600

const PATH = '/shlomy-limor'
const NAME = 'שלומי לימור'
const LICENSE = '3151306'
const PHONE = '055-2702800'
const WHATSAPP = 'https://wa.me/972552702800'
const PHOTO = '/shlomy-limor.webp' // square, 1254×1254; the bottom third is a name/phone banner
const TITLE = 'שלומי לימור – תיווך נדל״ן בפתח תקווה | NADLANNOW מבית LS נדל״ן'
const DESC = 'שלומי לימור, מתווך מורשה (רישיון 3151306), NADLANNOW מבית LS נדל״ן: משרדים, מחסנים, מרלו״גים, תעשייה, חנויות, נכסים מניבים, מגורים ותיווך עסקים בפתח תקווה, גוש דן והשרון.'

const FIELDS = [
  { icon: '🏢', name: 'משרדים', text: 'השכרה ומכירה של משרדים, ממשרד קטן ועד קומה שלמה.', href: '/services/office-retail-brokerage-leasing' },
  { icon: '📦', name: 'מחסנים', text: 'שטחי אחסון בגדלים שונים, עם או בלי רמפה.', href: '/services/warehouses-industrial-buildings' },
  { icon: '🚚', name: 'מרלו״גים', text: 'מרכזים לוגיסטיים עם גישה נוחה לצירים ראשיים.', href: '/services/warehouses-industrial-buildings' },
  { icon: '🏭', name: 'תעשייה', text: 'מבני תעשייה ומלאכה לפי ייעוד ושימוש מותר.', href: '/services/warehouses-industrial-buildings' },
  { icon: '🛍️', name: 'חנויות', text: 'חזיתות מסחריות ושטחי מסחר בציר ובמרכזים.', href: '/services/office-retail-brokerage-leasing' },
  { icon: '📈', name: 'נכסים מניבים', text: 'ליווי משקיעים ברכישה ובמכירה של נכסים מושכרים.', href: '/services/commercial-investor-guidance' },
  { icon: '🏠', name: 'מגורים', text: 'דירות למכירה ולהשכרה.', href: '/properties' },
  { icon: '🤝', name: 'תיווך עסקים', text: 'מכירת עסקים פעילים בדיסקרטיות, כולל העברת השכירות.', href: '/services/business-sales' },
]

const ZONES = ['קריית אריה', 'סגולה', 'רמת סיב']

// Same commitments already published on the About page — nothing new is claimed here
const PRINCIPLES = [
  { title: 'מידע מדויק', text: 'כל נכס נבדק לפני שהוא עולה לאתר: שטח, מחיר ומצב משפטי בסיסי.' },
  { title: 'זמינות', text: 'מענה מהיר בטלפון, בוואטסאפ או במייל.' },
  { title: 'ליווי אישי', text: 'סיורים בנכסים, ניהול משא ומתן וליווי עד החתימה.' },
  { title: 'שקיפות', text: 'עמלת התיווך מוגדרת מראש בהזמנת שירותי תיווך כדין.' },
]

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return {
    title: { absolute: TITLE },
    description: DESC,
    // Hebrew-only page: other locales stay reachable but noindex
    ...buildSeo(PATH, locale, INDEXED.heOnly),
    openGraph: {
      title: TITLE,
      description: DESC,
      type: 'profile',
      url: `${BASE}/he${PATH}`,
      locale: 'he_IL',
      images: [{ url: `${BASE}${PHOTO}`, width: 1254, height: 1254, alt: 'שלומי לימור – תיווך נדל״ן מסחרי, פרטי ועסקי' }],
    },
  }
}

export default async function ShlomyLimorPage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale((await params).locale)
  const email = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@nadlannow.co.il'
  const url = `${BASE}/he${PATH}`
  // Link a city only when it has listings (a city page exists); the rest show as plain chips
  const listed = new Set((await getCities()).map(citySlug))

  const profileJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url,
    name: TITLE,
    inLanguage: 'he',
    mainEntity: {
      '@type': 'Person',
      '@id': `${url}#person`,
      name: NAME,
      alternateName: 'Shlomy Limor',
      jobTitle: 'מתווך נדל״ן מורשה',
      image: `${BASE}${PHOTO}`,
      description: DESC,
      url,
      telephone: '+972-55-2702800',
      email,
      worksFor: { '@type': 'RealEstateAgent', '@id': `${BASE}/#organization`, name: 'LS נדל"ן', url: BASE },
      workLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'פתח תקווה', addressCountry: 'IL' } },
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'license',
        name: 'רישיון תיווך במקרקעין',
        identifier: LICENSE,
      },
      knowsAbout: [...FIELDS.map(f => f.name), 'נדל״ן מסחרי'],
    },
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'בית', item: `${BASE}/he` },
      { '@type': 'ListItem', position: 2, name: NAME, item: url },
    ],
  }

  const btn = 'inline-flex items-center justify-center gap-2 min-h-12 px-6 rounded-xl font-bold text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      <main id="main" dir="rtl" lang="he" className="bg-slate-50">
        {/* Hero */}
        <header className="relative overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #0B1220 0%, #0F172A 45%, #0077B6 100%)' }}>
          <div aria-hidden="true" className="absolute -top-24 -left-24 w-80 h-80 rounded-full opacity-20 blur-3xl" style={{ background: '#C9A227' }} />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-32 pb-14 md:pt-36 md:pb-20">
            <nav aria-label="ניווט משני" className="text-sm text-blue-200 mb-8 flex items-center gap-2">
              <Link href="/" className="hover:text-white">בית</Link>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{NAME}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center gap-8">
              {/* Photo: replace public/shlomy-limor.webp to change it. Without the file the initials show through:
                  a missing CSS background renders nothing (an <img> would show a broken-image icon).
                  Zoomed to the face so the photo's own name/phone banner stays out of the small frame. */}
              <div aria-hidden="true" className="relative shrink-0 w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden ring-4 ring-[#C9A227]/70 bg-white/10 shadow-2xl">
                <span className="absolute inset-0 flex items-center justify-center text-4xl md:text-5xl font-extrabold">ש״ל</span>
                <span className="absolute inset-0 bg-no-repeat" style={{ backgroundImage: `url(${PHOTO})`, backgroundSize: '165%', backgroundPosition: '50% 5%' }} />
              </div>
              <div>
                <p className="text-[#E6C766] font-semibold tracking-wide text-sm mb-3">מתווך נדל״ן מורשה · מבית LS נדל״ן</p>
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
                  {NAME}
                  <span className="sr-only"> – </span>
                  <span className="block text-xl md:text-2xl font-bold text-blue-100 mt-2">תיווך נדל״ן מסחרי ופרטי בפתח תקווה</span>
                </h1>
                <p className="text-blue-100 leading-relaxed max-w-2xl">
                  משרדים, מחסנים, מרלו״גים, תעשייה, חנויות, נכסים מניבים, מגורים ותיווך עסקים — בפתח תקווה, גוש דן והשרון.
                </p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#C9A227]/60 bg-white/5 px-4 py-1.5 text-sm">
                  <span aria-hidden="true">🪪</span> רישיון תיווך מס׳ {LICENSE}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3">
              <a href={`tel:${PHONE.replace(/\D/g, '')}`} className={`${btn} bg-white text-slate-900 hover:bg-blue-50 focus-visible:outline-white`}>
                <span aria-hidden="true">📞</span> התקשרו: <span dir="ltr">{PHONE}</span>
              </a>
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={`${btn} bg-[#25D366] text-slate-900 hover:bg-[#1ebe5b] focus-visible:outline-white`}>
                <span aria-hidden="true">💬</span> WhatsApp<span className="sr-only"> (נפתח בחלון חדש)</span>
              </a>
              <a href="#contact" className={`${btn} border border-white/60 text-white hover:bg-white/10 focus-visible:outline-white`}>
                השאירו פרטים
              </a>
            </div>
          </div>
        </header>

        {/* Fields */}
        <section aria-labelledby="fields-title" className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
          <h2 id="fields-title" className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">תחומי התיווך</h2>
          <p className="text-slate-600 mb-8">נדל״ן מסחרי ופרטי, לשכירות ולמכירה.</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FIELDS.map(f => (
              <li key={f.name}>
                <Link href={f.href} className="group flex h-full items-start gap-4 sm:flex-col sm:gap-3 rounded-2xl bg-white p-4 sm:p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-[#0077B6]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0077B6]">
                  <span aria-hidden="true" className="text-3xl leading-none">{f.icon}</span>
                  <span className="flex flex-col">
                    <span className="font-bold text-slate-900 text-lg mb-1 group-hover:text-[#0077B6]">{f.name}</span>
                    <span className="text-sm text-slate-600 leading-relaxed">{f.text}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Areas */}
        <section aria-labelledby="areas-title" className="bg-white border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
            <h2 id="areas-title" className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">אזורי פעילות</h2>
            <p className="text-slate-600 mb-6">ערי המרכז, גוש דן והשרון.</p>

            <h3 className="font-bold text-slate-900 mb-3">ערים</h3>
            <ul className="flex flex-wrap gap-2.5 mb-8">
              {SERVICE_AREAS.map(city => (
                <li key={city}>
                  {listed.has(citySlug(city)) ? (
                    <Link href={`/city/${citySlug(city)}`} className="inline-flex items-center gap-1.5 rounded-full bg-[#0077B6] px-4 py-2 font-semibold text-white hover:bg-[#005A8E]">
                      <span aria-hidden="true">📍</span>{city}
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-2 font-semibold text-slate-800 ring-1 ring-slate-200">
                      <span aria-hidden="true">📍</span>{city}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <h3 className="font-bold text-slate-900 mb-3">אזורי תעשייה ותעסוקה</h3>
            <ul className="flex flex-wrap gap-2.5">
              {ZONES.map(z => (
                <li key={z} className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-4 py-2 font-semibold text-slate-800 ring-1 ring-[#C9A227]/50">
                  <span aria-hidden="true">🏭</span>{z}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Principles */}
        <section aria-labelledby="how-title" className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
          <h2 id="how-title" className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8">איך אני עובד</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                <span aria-hidden="true" className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-white" style={{ background: 'linear-gradient(135deg, #0077B6, #0F172A)' }}>{i + 1}</span>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Contact */}
        <section id="contact" aria-labelledby="contact-title" className="scroll-mt-28 max-w-5xl mx-auto px-4 sm:px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6 md:p-8 text-white" style={{ background: 'linear-gradient(135deg, #0F172A, #0077B6)' }}>
              <h2 id="contact-title" className="text-2xl font-extrabold mb-2">בואו נדבר</h2>
              <p className="text-blue-100 mb-6">מחפשים נכס, או רוצים לשווק נכס שלכם? אשמח לשמוע.</p>
              <ul className="space-y-4">
                <li>
                  <a href={`tel:${PHONE.replace(/\D/g, '')}`} className="flex items-center gap-3 hover:underline">
                    <span aria-hidden="true" className="text-xl">📞</span>
                    <span>טלפון: <span dir="ltr" className="font-bold">{PHONE}</span></span>
                  </a>
                </li>
                <li>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:underline">
                    <span aria-hidden="true" className="text-xl">💬</span>
                    <span>WhatsApp<span className="sr-only"> (נפתח בחלון חדש)</span></span>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${email}`} className="flex items-center gap-3 hover:underline">
                    <span aria-hidden="true" className="text-xl">✉️</span>
                    <span dir="ltr">{email}</span>
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-xl">🕘</span>
                  <span>א׳–ה׳ <span dir="ltr">09:00–19:00</span>, ו׳ <span dir="ltr">09:00–12:00</span></span>
                </li>
                <li className="flex items-center gap-3">
                  <span aria-hidden="true" className="text-xl">🪪</span>
                  <span>רישיון תיווך מס׳ {LICENSE}</span>
                </li>
              </ul>
              <p className="mt-8 text-sm text-blue-100">
                <Link href="/about" className="underline underline-offset-2 hover:text-white">על LS נדל״ן</Link>
                {' · '}
                <Link href="/properties" className="underline underline-offset-2 hover:text-white">כל הנכסים</Link>
              </p>
            </div>
            <ContactForm agentName={NAME} agentPhone={PHONE} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
