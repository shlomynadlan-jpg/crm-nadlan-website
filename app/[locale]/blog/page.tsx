import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { articles, AUTHOR } from '@/lib/articles'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('blog')
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: { canonical: '/blog' },
  }
}


function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPage() {
  const t = await getTranslations('blog')
  const [featured, ...rest] = articles

  return (
    <>
      <Navbar />
      <main id="main">
        {/* Header */}
        <div className="pt-28 pb-12 px-6"
          style={{ background: 'linear-gradient(135deg, #0F172A, #0077B6)' }}>
          <div className="max-w-6xl mx-auto text-center text-white">
            <p className="text-sm font-medium mb-3" style={{ color: '#C9A84C' }}>{t('knowledge')}</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{t('title')}</h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-14">
          {/* Featured article */}
          <Link href={`/blog/${featured.slug}`} className="group block mb-12">
            <article className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 card-hover">
              <div className="relative h-64 lg:h-auto lg:min-h-[320px]">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <span className="absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full text-white shadow-md"
                  style={{ background: '#C9A84C' }}>
                  {t('featured')}
                </span>
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <p className="text-sm text-slate-400 mb-3">
                  {formatDate(featured.date)} · {t('readingMinutes', { n: featured.readingMinutes })} · {AUTHOR}
                </p>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-slate-500 leading-relaxed mb-6">{featured.description}</p>
                <span className="text-blue-600 font-semibold">{t('readMore')}</span>
              </div>
            </article>
          </Link>

          {/* Rest */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rest.map(a => (
              <Link key={a.slug} href={`/blog/${a.slug}`} className="group block">
                <article className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 card-hover h-full flex flex-col">
                  <div className="relative h-56">
                    <Image
                      src={a.image}
                      alt={a.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-7 flex flex-col flex-1">
                    <p className="text-sm text-slate-400 mb-2">
                      {formatDate(a.date)} · {t('readingMinutes', { n: a.readingMinutes })}
                    </p>
                    <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors">
                      {a.title}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed flex-1">{a.description}</p>
                    <span className="text-blue-600 font-semibold text-sm mt-5">{t('readMore')}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-3xl p-10 text-center text-white"
            style={{ background: 'linear-gradient(135deg, #0F172A, #0077B6)' }}>
            <h2 className="text-2xl font-bold mb-3">{t('ctaTitle')}</h2>
            <p className="text-blue-200 mb-6">{t('ctaSubtitle')}</p>
            <Link href="/contact" className="inline-block bg-white text-slate-900 font-bold text-sm py-3 px-8 rounded-xl hover:bg-blue-50 transition-colors">
              {t('ctaBtn')}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
