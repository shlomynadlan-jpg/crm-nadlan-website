'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import RotatingWord from '@/components/RotatingWord'
import CountUp from '@/components/CountUp'

interface Props {
  totalCount: number
  forSale: number
  forRent: number
}

const SLIDES = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1600&q=85',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85',
]

export default function HeroSection({ totalCount, forSale, forRent }: Props) {
  const [slide, setSlide] = useState(0)
  const [fade, setFade] = useState(true)

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

      {/* Overlay — dark RIGHT side (text side in RTL), clear left (photo side) */}
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
          className="flex items-center justify-between px-10 py-5"
          style={{ borderBottom: '1px solid rgba(201,168,76,0.18)' }}
        >
          <Link href="/" className="text-white font-black text-xl tracking-widest uppercase">
            LS<span style={{ color: '#C9A84C' }}>.</span>נדל״ן
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {[
              { href: '/properties', label: 'נכסים' },
              { href: '/properties?city=', label: 'ערים' },
              { href: '/blog', label: 'בלוג' },
              { href: '/about', label: 'אודות' },
            ].map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: 'rgba(255,255,255,0.58)' }}
              >
                {label}
              </Link>
            ))}
          </div>
          <a
            href="tel:0552702800"
            className="text-sm font-medium tracking-wide"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            055 <span style={{ color: '#C9A84C' }}>270 2800</span>
          </a>
        </nav>

        {/* ── HERO BODY ── */}
        <div className="flex-1 flex flex-col justify-center px-10 py-10 max-w-2xl">
          {/* Gold accent line */}
          <div style={{ width: 40, height: 2, background: '#C9A84C', marginBottom: 20 }} />

          <p
            className="text-xs font-bold tracking-widest uppercase mb-5"
            style={{ color: 'rgba(201,168,76,0.75)' }}
          >
            נדל״ן מסחרי ומגורים
          </p>

          <h1
            className="font-black leading-none mb-5"
            style={{ fontSize: 'clamp(38px, 5vw, 58px)', color: '#fff', letterSpacing: '-1px', textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
          >
            מוצאים לך את
            <br />
            <RotatingWord />
          </h1>

          <p
            className="text-sm leading-relaxed mb-8"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            מאות נכסים בכל הארץ · ייעוץ מקצועי
            <br />
            ליווי אישי עד סגירת עסקה
          </p>

          {/* Search card */}
          <form
            action="/properties"
            method="GET"
            className="flex items-stretch rounded-xl overflow-x-auto"
            style={{ background: 'rgba(255,255,255,0.97)', boxShadow: '0 12px 40px rgba(0,0,0,0.35)', maxWidth: 560 }}
          >
            <div className="flex-1 px-4 py-3 border-l border-slate-200" style={{ minWidth: 140 }}>
              <label className="block text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">עיר</label>
              <input
                name="city"
                placeholder="תל אביב, רמת גן..."
                className="w-full text-sm text-slate-700 font-medium bg-transparent outline-none"
              />
            </div>
            <div className="flex-1 px-4 py-3 border-l border-slate-200" style={{ minWidth: 140 }}>
              <label className="block text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">סוג נכס</label>
              <select name="property_type" className="w-full text-sm text-slate-700 font-medium bg-transparent outline-none">
                <option value="">הכל</option>
                <option value="משרד">משרד</option>
                <option value="חנות">חנות</option>
                <option value="קרקע">קרקע</option>
                <option value="מחסן">מחסן</option>
                <option value="תעשיה">תעשייה</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-6 text-sm font-black tracking-wide uppercase flex items-center gap-2 shrink-0"
              style={{ background: '#0a1e3d', color: '#C9A84C', minWidth: 90 }}
            >
              🔍 חפש
            </button>
          </form>
        </div>

        {/* ── BOTTOM BAR — stats + slide dots ── */}
        <div className="flex items-end justify-between px-10 pb-8">
          <div className="flex gap-8 items-end">
            {[
              { id: 'total', value: totalCount, label: 'נכסים פעילים', plus: true },
              { id: 'sale', value: forSale, label: 'למכירה', plus: false },
              { id: 'rent', value: forRent, label: 'להשכרה', plus: false },
            ].map(({ id, value, label, plus }, i) => (
              <div key={id} className="flex items-end gap-8">
                {i > 0 && (
                  <div style={{ width: 1, height: 44, background: 'rgba(255,255,255,0.12)' }} />
                )}
                <div>
                  <p
                    className="font-black leading-none"
                    style={{ fontSize: 32, color: '#fff', textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}
                  >
                    <CountUp value={value} suffix={plus ? '+' : ''} />
                  </p>
                  <p className="text-xs tracking-widest uppercase mt-1" style={{ color: 'rgba(255,255,255,0.42)' }}>
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Slide dots */}
          <div className="flex gap-2 items-center pb-1">
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
