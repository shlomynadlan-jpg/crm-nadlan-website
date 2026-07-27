'use client'
import { useState, useEffect, useCallback } from 'react'
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import RotatingWord from '@/components/RotatingWord'
import CountUp from '@/components/CountUp'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { formatPrice, getPropertyImage, getPropertyTypes } from '@/lib/properties'
import type { Property } from '@/lib/properties'

interface Props {
  totalCount: number
  forSale: number
  forRent: number
  wantedCount: number
  featuredProperties: Property[]
}

const SLIDES = [
  { url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85', label: 'מגדל משרדים' },
  { url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1600&q=85', label: 'משרד פרימיום' },
  { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85', label: 'סביבת עבודה' },
  { url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=85', label: 'לוגיסטיקה' },
  { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=85', label: 'מסחרי' },
]

export default function HeroSection({ totalCount, forSale, forRent, wantedCount, featuredProperties }: Props) {
  const t = useTranslations()
  const tTypes = useTranslations('propertyTypes')
  const router = useRouter()

  const [slide, setSlide] = useState(0)
  const [fade, setFade] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cardIndex, setCardIndex] = useState(0)
  const [cardVisible, setCardVisible] = useState(true)

  const rotatingWords = t.raw('hero.rotating') as string[]

  // ── background slideshow ──
  const nextSlide = useCallback(() => {
    setFade(false)
    setTimeout(() => {
      setSlide(s => (s + 1) % SLIDES.length)
      setFade(true)
    }, 700)
  }, [])

  useEffect(() => {
    const id = setInterval(nextSlide, 5000)
    return () => clearInterval(id)
  }, [nextSlide])

  function goToSlide(i: number) {
    setFade(false)
    setTimeout(() => { setSlide(i); setFade(true) }, 300)
  }

  // ── floating property cards cycling ──
  useEffect(() => {
    if (featuredProperties.length < 2) return
    const id = setInterval(() => {
      setCardVisible(false)
      setTimeout(() => {
        setCardIndex(i => (i + 1) % featuredProperties.length)
        setCardVisible(true)
      }, 500)
    }, 4000)
    return () => clearInterval(id)
  }, [featuredProperties.length])

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const params = new URLSearchParams()
    const city = data.get('city') as string
    const type = data.get('property_type') as string
    if (city) params.set('city', city)
    if (type) params.set('property_type', type)
    router.push(`/properties${params.toString() ? '?' + params.toString() : ''}`)
  }

  // pick 3 cards to show (wrap around)
  const cards = featuredProperties.length >= 3
    ? [
        featuredProperties[cardIndex % featuredProperties.length],
        featuredProperties[(cardIndex + 1) % featuredProperties.length],
        featuredProperties[(cardIndex + 2) % featuredProperties.length],
      ]
    : featuredProperties.length === 2
    ? [featuredProperties[0], featuredProperties[1]]
    : []

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* ── Background slideshow ── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${SLIDES[slide].url})`,
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.7s ease',
          animation: fade ? 'heroZoom 12s ease-out forwards' : 'none',
        }}
      />

      {/* ── Cinematic overlay: heavy right (text side), clear left ── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(
            to left,
            rgba(4,10,24,0.97) 0%,
            rgba(4,10,24,0.90) 25%,
            rgba(4,10,24,0.60) 50%,
            rgba(4,10,24,0.15) 72%,
            rgba(4,10,24,0.02) 88%,
            transparent 100%
          )`,
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ height: 180, background: 'linear-gradient(to top, rgba(4,10,24,1) 0%, transparent 100%)' }}
      />
      {/* Top fade */}
      <div
        className="absolute top-0 left-0 right-0 z-10"
        style={{ height: 120, background: 'linear-gradient(to bottom, rgba(4,10,24,0.7) 0%, transparent 100%)' }}
      />

      {/* ── Content ── */}
      <div className="relative z-20 flex flex-col flex-1">

        {/* ── NAVBAR ── */}
        <nav
          className="flex items-center justify-between px-6 md:px-10 py-4"
          style={{
            background: 'rgba(4,10,24,0.82)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(201,168,76,0.28)',
          }}
        >
          <Link href="/" className="font-black text-xl tracking-widest uppercase shrink-0" style={{ color: '#fff' }}>
            LS<span style={{ color: '#C9A84C' }}>.</span>נדל״ן
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {[
              { href: '/properties', label: t('nav.properties') },
              { href: '/properties?deal_type=מכירה', label: t('nav.forSale') },
              { href: '/properties?deal_type=השכרה', label: t('nav.forRent') },
              { href: '/wanted', label: t('nav.wanted') },
              { href: '/blog', label: t('nav.blog') },
              { href: '/about', label: t('nav.about') },
              { href: '/faq', label: t('nav.faq') },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-semibold tracking-wide transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.82)' }}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:0552702800" className="text-sm font-bold whitespace-nowrap" style={{ color: '#fff' }}>
              055-<span style={{ color: '#C9A84C' }}>2702800</span>
            </a>
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="text-sm font-black px-4 py-2 rounded-lg"
              style={{ background: '#C9A84C', color: '#0a1e3d' }}
            >
              {t('nav.contact')}
            </Link>
          </div>

          <div className="flex lg:hidden items-center gap-4">
            <a href="tel:0552702800" className="text-sm font-bold whitespace-nowrap" style={{ color: '#fff' }}>
              055-<span style={{ color: '#C9A84C' }}>2702800</span>
            </a>
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="p-2 rounded-lg"
              style={{ color: '#fff' }}
              aria-label={menuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                {menuOpen
                  ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                  : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                }
              </svg>
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div
            className="lg:hidden relative z-30 mx-4 mt-2 rounded-2xl p-4 flex flex-col gap-2"
            style={{ background: 'rgba(4,10,24,0.96)', border: '1px solid rgba(201,168,76,0.2)' }}
          >
            {[
              { href: '/properties', label: t('nav.properties') },
              { href: '/properties?deal_type=מכירה', label: t('nav.forSale') },
              { href: '/properties?deal_type=השכרה', label: t('nav.forRent') },
              { href: '/wanted', label: t('nav.wanted') },
              { href: '/blog', label: t('nav.blog') },
              { href: '/about', label: t('nav.about') },
              { href: '/faq', label: t('nav.faq') },
              { href: '/contact', label: t('nav.contact') },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="py-3 px-4 rounded-xl text-base font-semibold"
                style={{ color: 'rgba(255,255,255,0.8)' }}
              >
                {label}
              </Link>
            ))}
            <LanguageSwitcher className="mt-2 justify-center" />
          </div>
        )}

        {/* ── HERO BODY ── */}
        <div className="flex-1 flex items-center justify-center relative px-6 md:px-10 py-10">

          {/* ── Floating property cards — desktop only ── */}
          {cards.length >= 2 && (
            <div
              className="absolute hidden lg:flex flex-col gap-3"
              style={{
                left: 40,
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: cardVisible ? 1 : 0,
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                zIndex: 10,
              }}
            >
              {cards.map((p, i) => {
                const img = getPropertyImage(p)
                const types = getPropertyTypes(p)
                const deal = p.deal_type || ''
                const isRent = deal.includes('השכרה') && !deal.includes('מכירה')
                const price = isRent ? p.rent_price : p.price
                const badgeText = isRent ? t('deal.forRent') : t('deal.forSale')
                const badgeColor = isRent ? '#0077B6' : '#C9A84C'

                return (
                  <Link
                    key={p.id}
                    href={`/properties/${p.id}`}
                    style={{
                      width: 270,
                      background: 'rgba(4,10,24,0.85)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 16,
                      overflow: 'hidden',
                      display: 'block',
                      textDecoration: 'none',
                      transform: `translateY(${cardVisible ? 0 : (i === 0 ? -12 : 12)}px)`,
                      transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
                      boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
                    }}
                  >
                    {/* image */}
                    <div style={{ position: 'relative', height: 120, overflow: 'hidden' }}>
                      <img
                        src={img}
                        alt={`${types} ב${p.city}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(4,10,24,0.7) 0%, transparent 60%)' }} />
                      <span
                        style={{
                          position: 'absolute', top: 8, right: 8,
                          background: badgeColor, color: '#fff',
                          fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                        }}
                      >
                        {badgeText}
                      </span>
                    </div>
                    {/* info */}
                    <div style={{ padding: '12px 14px' }}>
                      <p style={{ fontSize: 11, color: '#C9A84C', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>
                        {types}
                      </p>
                      <p style={{ fontSize: 14, color: '#fff', fontWeight: 700, marginBottom: 5 }}>
                        {p.city}
                        {p.gross_size ? <span style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 400, fontSize: 12 }}> · {p.gross_size} מ״ר</span> : null}
                      </p>
                      {price ? (
                        <p style={{ fontSize: 15, color: '#C9A84C', fontWeight: 800 }}>
                          {formatPrice(price)}
                          {isRent ? <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}> /מ</span> : null}
                        </p>
                      ) : (
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{t('deal.priceOnRequest')}</p>
                      )}
                    </div>
                  </Link>
                )
              })}

              {/* cards counter */}
              <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginTop: 4 }}>
                {featuredProperties.map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: i === cardIndex % featuredProperties.length ? 20 : 6,
                      height: 3,
                      borderRadius: 3,
                      background: i === cardIndex % featuredProperties.length ? '#C9A84C' : 'rgba(255,255,255,0.2)',
                      transition: 'all 0.3s',
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Center: tagline + title + search ── */}
          <div className="flex flex-col items-center text-center w-full" style={{ maxWidth: 680 }}>
            <div style={{ width: 48, height: 2, background: '#C9A84C', marginBottom: 24 }} />

            <p
              className="text-sm font-bold tracking-widest uppercase mb-5"
              style={{ color: 'rgba(201,168,76,0.85)' }}
            >
              {t('hero.tagline')}
            </p>

            <h1
              className="font-black leading-tight mb-6"
              style={{ fontSize: 'clamp(48px, 6.5vw, 86px)', color: '#fff', letterSpacing: '-2px', textShadow: '0 4px 32px rgba(0,0,0,0.7)', minHeight: 'clamp(180px, 27vw, 325px)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
            >
              <span>{t('hero.title1')}</span>
              <span><RotatingWord words={rotatingWords} /></span>
            </h1>

            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: 'rgba(255,255,255,0.62)', whiteSpace: 'pre-line' }}
            >
              {t('hero.subtitle')}
            </p>

            {/* Search card */}
            <form
              onSubmit={handleSearch}
              className="flex items-stretch rounded-xl overflow-hidden w-full"
              style={{ background: 'rgba(255,255,255,0.97)', boxShadow: '0 16px 48px rgba(0,0,0,0.45)', maxWidth: 600 }}
            >
              <div className="flex-1 px-5 py-4 border-l border-slate-200" style={{ minWidth: 140 }}>
                <label className="block text-xs font-bold tracking-widest uppercase text-slate-400 mb-1.5">{t('hero.cityLabel')}</label>
                <input
                  name="city"
                  placeholder={t('hero.cityPlaceholder')}
                  className="w-full text-base text-slate-700 font-medium bg-transparent outline-none"
                />
              </div>
              <div className="flex-1 px-5 py-4 border-l border-slate-200" style={{ minWidth: 140 }}>
                <label className="block text-xs font-bold tracking-widest uppercase text-slate-400 mb-1.5">{t('hero.typeLabel')}</label>
                <select name="property_type" className="w-full text-base text-slate-700 font-medium bg-transparent outline-none">
                  <option value="">{t('hero.typeAll')}</option>
                  <option value="משרד">{tTypes('משרד')}</option>
                  <option value="חנות">{tTypes('חנות')}</option>
                  <option value="קרקע">{tTypes('קרקע')}</option>
                  <option value="מחסן">{tTypes('מחסן')}</option>
                  <option value="תעשיה">{tTypes('תעשיה')}</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-7 text-base font-black tracking-wide flex items-center gap-2 shrink-0"
                style={{ background: '#0a1e3d', color: '#C9A84C', minWidth: 100 }}
              >
                {t('hero.searchBtn')}
              </button>
            </form>
          </div>

          {/* ── Scroll indicator — desktop ── */}
          <div
            className="absolute hidden md:flex flex-col items-center gap-2"
            style={{ bottom: -60, left: '50%', transform: 'translateX(-50%)' }}
          >
            <div style={{
              width: 1,
              height: 48,
              background: 'linear-gradient(to bottom, rgba(201,168,76,0.8), transparent)',
              animation: 'scrollPulse 2s ease-in-out infinite',
            }} />
          </div>
        </div>

        {/* ── BOTTOM: stats + thumbnail strip ── */}
        <div className="pb-8 px-6">

          {/* Stats */}
          <div className="flex justify-center items-center flex-wrap gap-0 mb-8">
            {[
              { id: 'years',  value: 7,           label: t('stats.years'),            suffix: '' },
              { id: 'deals',  value: 200,         label: t('stats.deals'),            suffix: '+' },
              { id: 'total',  value: totalCount,  label: t('stats.activeProperties'), suffix: '+' },
              { id: 'rent',   value: forRent,     label: t('stats.forRent'),          suffix: '' },
              { id: 'sale',   value: forSale,     label: t('stats.forSale'),          suffix: '' },
              { id: 'wanted', value: wantedCount, label: t('stats.wanted'),           suffix: '+' },
            ].map(({ id, value, label, suffix }, i) => (
              <div key={id} className="flex items-stretch">
                {i > 0 && (
                  <div className="self-center mx-4 md:mx-6" style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.15)' }} />
                )}
                <div className="text-center">
                  <p
                    className="font-black leading-none"
                    style={{ fontSize: 'clamp(24px, 3vw, 44px)', color: '#fff', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
                  >
                    <CountUp value={value} suffix={suffix} />
                  </p>
                  <p className="text-xs font-semibold tracking-widest uppercase mt-1.5" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Thumbnail strip (replaces dots) ── */}
          <div className="flex justify-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={s.label}
                style={{
                  position: 'relative',
                  width: i === slide ? 72 : 48,
                  height: 40,
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: i === slide ? '2px solid #C9A84C' : '2px solid rgba(255,255,255,0.12)',
                  opacity: i === slide ? 1 : 0.45,
                  transition: 'all 0.35s ease',
                  cursor: 'pointer',
                  padding: 0,
                  flexShrink: 0,
                }}
              >
                <img
                  src={s.url.replace('w=1600', 'w=120').replace('q=85', 'q=60')}
                  alt={s.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* active gold bar at bottom */}
                {i === slide && (
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: 2, background: '#C9A84C',
                  }} />
                )}
              </button>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </section>
  )
}
