import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { articles, getArticle, AUTHOR, type ArticleBlock } from '@/lib/articles'

const BASE = 'https://www.nadlannow.co.il'

export function generateStaticParams() {
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return { title: 'מאמר לא נמצא' }
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      authors: [AUTHOR],
      images: [{ url: article.image, width: 1200, height: 630 }],
      locale: 'he_IL',
    },
  }
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">{block.text}</h2>
    case 'ul':
      return (
        <ul className="list-disc pr-6 space-y-2 text-slate-600 leading-relaxed mb-5">
          {block.items?.map(item => <li key={item}>{item}</li>)}
        </ul>
      )
    case 'tip':
      return (
        <aside className="my-8 rounded-2xl p-6 border-r-4"
          style={{ background: 'rgba(201,168,76,0.08)', borderColor: '#C9A84C' }}>
          <p className="text-slate-700 leading-relaxed font-medium">💡 {block.text}</p>
        </aside>
      )
    default:
      return <p className="text-slate-600 leading-relaxed text-lg mb-5">{block.text}</p>
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  const others = articles.filter(a => a.slug !== article.slug).slice(0, 2)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: 'he',
    author: { '@type': 'Person', name: AUTHOR, jobTitle: 'מתווך נדל"ן מורשה' },
    publisher: { '@type': 'RealEstateAgent', name: 'LS נדל"ן', url: BASE },
    mainEntityOfPage: `${BASE}/blog/${article.slug}`,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'בית', item: BASE },
      { '@type': 'ListItem', position: 2, name: 'מאמרים', item: `${BASE}/blog` },
      { '@type': 'ListItem', position: 3, name: article.title },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Navbar />
      <main id="main">
        {/* Hero */}
        <div className="relative h-[420px] md:h-[480px]">
          <Image src={article.image} alt={article.imageAlt} fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.35) 60%, rgba(15,23,42,0.45) 100%)' }} />
          <div className="absolute bottom-0 right-0 left-0 pb-10 px-6">
            <div className="max-w-3xl mx-auto text-white">
              <nav aria-label="ניווט משני" className="text-sm text-blue-200 mb-4 flex items-center gap-2">
                <Link href="/" className="hover:text-white">בית</Link>
                <span aria-hidden="true">›</span>
                <Link href="/blog" className="hover:text-white">מאמרים</Link>
              </nav>
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">{article.title}</h1>
              <p className="text-blue-100 text-sm">
                {AUTHOR} · {new Date(article.date).toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' })} · {article.readingMinutes} דקות קריאה
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <article className="max-w-3xl mx-auto px-6 py-14">
          {article.blocks.map((block, i) => <Block key={i} block={block} />)}

          {/* Author box */}
          <div className="mt-14 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0"
              style={{ background: 'linear-gradient(135deg, #0077B6, #005A8E)' }}>
              של
            </div>
            <div>
              <p className="font-bold text-slate-900">{AUTHOR}</p>
              <p className="text-sm text-slate-500">
                מתווך נדל״ן מורשה (רישיון 3151306), מתמחה בנכסים מסחריים ומגורים.{' '}
                <Link href="/contact" className="text-blue-600 hover:underline">דברו איתי</Link>
              </p>
            </div>
          </div>
        </article>

        {/* More articles */}
        {others.length > 0 && (
          <div className="max-w-6xl mx-auto px-6 pb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">עוד מאמרים שיעניינו אתכם</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {others.map(a => (
                <Link key={a.slug} href={`/blog/${a.slug}`} className="group block">
                  <article className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 card-hover h-full flex flex-col">
                    <div className="relative h-48">
                      <Image src={a.image} alt={a.imageAlt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{a.title}</h3>
                      <span className="text-blue-600 font-semibold text-sm mt-3 inline-block">לקריאה ←</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
