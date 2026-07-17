'use client'
import { useState } from 'react'
import Link from 'next/link'

const LINKS = [
  { href: '/', label: 'דף הבית' },
  { href: '/properties', label: 'נכסים' },
  { href: '/properties?deal_type=מכירה', label: 'למכירה' },
  { href: '/properties?deal_type=השכרה', label: 'להשכרה' },
  { href: '/wanted', label: 'דרושים נכסים' },
  { href: '/blog', label: 'מאמרים' },
  { href: '/about', label: 'אודות' },
  { href: '/faq', label: 'שאלות נפוצות' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50" style={{ direction: 'rtl' }}>
      <nav
        className="px-6 py-4 flex items-center justify-between"
        style={{
          background: 'rgba(4,10,24,0.96)',
          borderBottom: '1px solid rgba(201,168,76,0.15)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="font-black text-xl tracking-widest uppercase shrink-0" style={{ color: '#fff' }}>
          LS<span style={{ color: '#C9A84C' }}>.</span>נדל״ן
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-sm font-medium hover:opacity-100 transition-opacity"
              style={{ color: 'rgba(255,255,255,0.62)' }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* CTA + phone */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:0552702800" className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
            055 <span style={{ color: '#C9A84C' }}>270 2800</span>
          </a>
          <Link
            href="/contact"
            className="text-sm font-bold px-4 py-2 rounded-lg"
            style={{ background: '#C9A84C', color: '#0a1e3d' }}
          >
            צור קשר
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="lg:hidden p-2 rounded-lg"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'סגור תפריט' : 'פתח תפריט'}
          aria-expanded={open}
          style={{ color: 'rgba(255,255,255,0.8)' }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden flex flex-col gap-1 px-4 py-3"
          style={{ background: 'rgba(4,10,24,0.98)', borderBottom: '1px solid rgba(201,168,76,0.15)' }}
        >
          {LINKS.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="py-3 px-4 rounded-xl text-base font-medium"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 text-center font-black text-sm py-3 px-4 rounded-xl"
            style={{ background: '#C9A84C', color: '#0a1e3d' }}
          >
            צור קשר
          </Link>
        </div>
      )}
    </header>
  )
}
