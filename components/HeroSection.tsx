'use client'
import { useState, useEffect, useCallback } from 'react'
import { Link, useRouter } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import RotatingWord from '@/components/RotatingWord'
import CountUp from '@/components/CountUp'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface Props {
  totalCount: number
  forSale: number
  forRent: number
  wantedCount: number
}

const SLIDES = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85',  // glass tower
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1600&q=85',    // office interior
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85', // workspace
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1600&q=85', // warehouse/logistics
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=85', // shopping mall / retail
]

export default function HeroSection({ totalCount, forSale, forRent, wantedCount }: Props) {
  const t = useTranslations()
  const tTypes = useTranslations('propertyTypes')
  const router = useRouter()
  const [slide, setSlide] = useState(0)
  const [fade, setFade] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  const NAV_LINKS = [
    { href: '/properties', label: t('nav.properties') },
    { href: '/properties?deal_type=מכירה', label: t('nav.forSale') },
    { href: '/properties?deal_type=השכרה', label: t('nav.forRent') },
    { href: '/wanted', label: t('nav.wanted') },
    { href: '/blog', label: t('nav.blog') },
    { href: '/about', label: t('nav.about') },
    { href: '/faq', label: t('nav.faq') },
    { href: '/contact', label: t('nav.contact') },
  ]

  const rotatingWords = t.raw('hero.rotating') as string[]

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

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Background photo with zoom animation */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${SLIDES[slide]})`,
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.7s ease',
          animation: fade ? 'heroZoom 12s ease-out forwards' : 'none',
        }}
      />

      {/* Overlay — dark RIGHT side (text side in RTL), clear left */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(
            to left,
            rgba(4,10,24,0.96) 0%,
            rgba(4,10,24,0.88) 22%,
            rgba(4,10,24,0.65) 45%,
            rgba(4,10,24,0.20) 68%,
            rgba(4,10,24,0.04) 85%,
            transparent 100%
          )`,
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ height: 160, background: 'linear-gradient(to top, rgba(4,10,24,1) 0%, transparent 100%)' }}
      />

      {/* Content */}
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
          {/* Logo */}
          <Link href="/" className="font-black text-xl tracking-widest uppercase shrink-0" style={{ color: '#fff' }}>
            LS<span style={{ color: '#C9A84C' }}>.</span>נדל״ן
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.slice(0, -1).map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-sm font-semibold tracking-wide transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.82)' }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Phone + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:0552702800"
              className="text-sm font-bold"
              style={{ color: '#fff' }}
            >
              <span style={{ color: '#C9A84C' }}>055-2702800</span>
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

          {/* Mobile: phone + burger */}
          <div className="flex lg:hidden items-center gap-4">
            <a
              href="tel:0552702800"
              className="text-sm font-bold"
              style={{ color: '#C9A84C' }}
            >
              055-2702800
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

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="lg:hidden relative z-30 mx-4 mt-2 rounded-2xl p-4 flex flex-col gap-2"
            style={{ background: 'rgba(4,10,24,0.96)', border: '1px solid rgba(201,168,76,0.2)' }}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={label}
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
        <div className="flex-1 flex flex-col justify-center items-center text-center px-6 md:px-10 py-10 w-full">
          {/* Gold accent line */}
          <div style={{ width: 48, height: 2, background: '#C9A84C', marginBottom: 24 }} />

          <p
            className="text-sm font-bold tracking-widest uppercase mb-5"
            style={{ color: 'rgba(201,168,76,0.85)' }}
          >
            {t('hero.tagline')}
          </p>

          <h1
            className="font-black leading-tight mb-6"
            style={{ fontSize: 'clamp(52px, 7vw, 90px)', color: '#fff', letterSpacing: '-2px', textShadow: '0 4px 32px rgba(0,0,0,0.6)' }}
          >
            {t('hero.title1')}
            <br />
            <RotatingWord words={rotatingWords} />
          </h1>

          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: 'rgba(255,255,255,0.65)', whiteSpace: 'pre-line' }}
          >
            {t('hero.subtitle')}
          </p>

          {/* Search card */}
          <form
            onSubmit={handleSearch}
            className="flex items-stretch rounded-xl overflow-x-auto"
            style={{ background: 'rgba(255,255,255,0.97)', boxShadow: '0 12px 40px rgba(0,0,0,0.35)', width: '100%', maxWidth: 600 }}
          >
            <div className="flex-1 px-5 py-4 border-l border-slate-200" style={{ minWidth: 150 }}>
              <label className="block text-xs font-bold tracking-widest uppercase text-slate-400 mb-1.5">{t('hero.cityLabel')}</label>
              <input
                name="city"
                placeholder={t('hero.cityPlaceholder')}
                className="w-full text-base text-slate-700 font-medium bg-transparent outline-none"
              />
            </div>
            <div className="flex-1 px-5 py-4 border-l border-slate-200" style={{ minWidth: 150 }}>
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

        {/* ── BOTTOM — stats centered + slide dots ── */}
        <div className="pb-10 px-6">
          {/* Stats — single row */}
          <div className="flex justify-center items-center flex-wrap gap-0 mb-6">
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
                    style={{ fontSize: 'clamp(26px, 3.2vw, 46px)', color: '#fff', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
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

          {/* Slide dots — centered below stats */}
          <div className="flex justify-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => { setFade(false); setTimeout(() => { setSlide(i); setFade(true) }, 300) }}
                style={{
                  height: 3, borderRadius: 3, border: 'none', cursor: 'pointer',
                  width: i === slide ? 34 : 18,
                  background: i === slide ? '#C9A84C' : 'rgba(255,255,255,0.25)',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
