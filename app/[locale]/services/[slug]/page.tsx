import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { SERVICES, getService } from '@/lib/services'
import { AUTHOR } from '@/lib/articles'
import { buildSeo, INDEXED, OG_IMAGE } from '@/lib/alternates'

const BASE = 'https://www.nadlannow.co.il'

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }): Promise<Metadata> {
  const { slug, locale } = await params
  const service = getService(slug)
  if (!service) return { title: 'לא נמצא' }
  return {
    title: service.h1,
    description: service.description,
    // Content is Hebrew-only for now: keep other locales out of the index.
    ...buildSeo(`/services/${slug}`, locale, INDEXED.heOnly),
    openGraph: { title: service.h1, description: service.description, type: 'website', images: [OG_IMAGE] },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params
  setRequestLocale(locale)
  const service = getService(slug)
  if (!service) notFound()

  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || '055-2702800'
  const url = `${BASE}/${locale}/services/${slug}`
  const others = SERVICES.filter(s => s.slug !== slug)

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.h1,
    description: service.description,
    url,
    areaServed: { '@type': 'Country', name: 'ישראל' },
    provider: {
      '@type': 'RealEstateAgent',
      name: process.env.NEXT_PUBLIC_COMPANY_NAME || 'LS נדל"ן',
      url: BASE,
      telephone: phone,
      employee: { '@type': 'Person', name: AUTHOR },
    },
  }
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'בית', item: `${BASE}/${locale}` },
      { '@type': 'ListItem', position: 2, name: service.title, item: url },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      <main id="main" dir="rtl">
        <header className="py-16 px-6 text-white" style={{ background: 'linear-gradient(135deg, #0F172A, #0077B6)' }}>
          <div className="max-w-3xl mx-auto">
            <nav aria-label="ניווט משני" className="text-sm text-blue-200 mb-4 flex items-center gap-2">
              <Link href="/" className="hover:text-white">בית</Link>
              <span aria-hidden="true">›</span>
              <span>{service.title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-5">{service.h1}</h1>
            <p className="text-blue-100 leading-relaxed text-lg">{service.answer}</p>
          </div>
        </header>

        <article className="max-w-3xl mx-auto px-6 py-14 text-slate-700 leading-relaxed">
          {service.sections.map(sec => (
            <section key={sec.heading} className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{sec.heading}</h2>
              {sec.paragraphs?.map((p, i) => <p key={i} className="mb-4">{p}</p>)}
              {sec.bullets && (
                <ul className="list-disc list-inside space-y-2">
                  {sec.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              )}
            </section>
          ))}

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">איך זה עובד?</h2>
            <ol className="list-decimal list-inside space-y-2">
              {service.steps.map(s => <li key={s}>{s}</li>)}
            </ol>
          </section>

          <div className="my-10 rounded-2xl p-6 text-white" style={{ background: 'linear-gradient(135deg, #0077B6, #005A8E)' }}>
            <p className="font-bold text-lg mb-2">רוצים לדבר על זה?</p>
            <p className="text-blue-100 mb-4">{AUTHOR} ישמח לשמוע על הצורך שלכם.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="bg-white text-slate-900 font-bold text-sm py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors">יצירת קשר</Link>
              <a href={`tel:${phone.replace(/\D/g, '')}`} className="border border-white/60 text-white font-bold text-sm py-3 px-6 rounded-xl hover:bg-white/10 transition-colors">{phone}</a>
              {service.propertiesLink && (
                <Link href={service.propertiesLink.href} className="border border-white/60 text-white font-bold text-sm py-3 px-6 rounded-xl hover:bg-white/10 transition-colors">{service.propertiesLink.text}</Link>
              )}
            </div>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">שאלות ותשובות</h2>
            <div className="space-y-5">
              {service.faqs.map(f => (
                <div key={f.q}>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">שירותים נוספים</h2>
            <ul className="space-y-2">
              {others.map(o => (
                <li key={o.slug}>
                  <Link href={`/services/${o.slug}`} className="text-blue-700 underline underline-offset-2 hover:text-blue-900">{o.title}</Link>
                </li>
              ))}
              <li><Link href="/blog" className="text-blue-700 underline underline-offset-2 hover:text-blue-900">מאמרים מקצועיים</Link></li>
            </ul>
          </section>

          <p className="mt-12 text-sm text-slate-500">מידע כללי בלבד, ואינו מהווה ייעוץ משפטי, מסחרי או מס.</p>
        </article>
      </main>
      <Footer />
    </>
  )
}
