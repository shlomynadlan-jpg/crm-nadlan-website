'use client'
import { useState } from 'react'
import Image from 'next/image'
import { Link, usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const t = useTranslations('nav')
  const pathname = usePathname()
  const isHome = pathname === '/'

  const LINKS = [
    { href: '/properties', label: t('properties') },
    { href: '/properties?deal_type=מכירה', label: t('forSale') },
    { href: '/properties?deal_type=השכרה', label: t('forRent') },
    { href: '/wanted', label: t('wanted') },
    { href: '/blog', label: t('blog') },
    { href: '/about', label: t('about') },
    { href: '/faq', label: t('faq') },
  ]

  return (
    <header className="fixed top-0 w-full z-50" style={{ direction: 'rtl' }}>
      <nav
        className="px-6 md:px-10 flex items-center justify-between"
        style={{
          height: '90px',
          background: 'rgba(4,10,24,0.82)',
          borderBottom: '1px solid rgba(201,168,76,0.28)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Logo */}
        <Link href="/" className="shrink-0 h-full flex items-center" style={{ margin: '3px 0' }}>
          <Image
            src="/logo.png"
            alt="LS נדל״ן"
            width={300}
            height={300}
            className="w-auto drop-shadow-lg"
            style={{ height: 'calc(90px - 6px)' }}
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-6">
          {!isHome && (
            <Link
              href="/"
              className="text-sm font-semibold tracking-wide transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.82)' }}
            >
              {t('home')}
            </Link>
          )}
          {LINKS.map(({ href, label }) => (
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

        {/* CTA + phone */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <a href="tel:0552702800" className="text-sm font-bold whitespace-nowrap" style={{ color: '#fff' }}>
            055-<span style={{ color: '#C9A84C' }}>2702800</span>
          </a>
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="text-sm font-black px-4 py-2 rounded-lg"
            style={{ background: '#C9A84C', color: '#0a1e3d' }}
          >
            {t('contact')}
          </Link>
        </div>

        {/* Mobile: phone + burger */}
        <div className="flex lg:hidden items-center gap-4">
          <a href="tel:0552702800" className="text-sm font-bold whitespace-nowrap" style={{ color: '#fff' }}>
            055-<span style={{ color: '#C9A84C' }}>2702800</span>
          </a>
          <button
            className="p-2 rounded-lg"
            onClick={() => setOpen(!open)}
            aria-label={open ? t('closeMenu') : t('openMenu')}
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
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="lg:hidden flex flex-col gap-1 px-4 py-3"
          style={{ background: 'rgba(4,10,24,0.96)', border: '1px solid rgba(201,168,76,0.2)', margin: '0 16px', borderRadius: 16, marginTop: 8 }}
        >
          {!isHome && (
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="py-3 px-4 rounded-xl text-base font-semibold"
              style={{ color: 'rgba(255,255,255,0.82)' }}
            >
              {t('home')}
            </Link>
          )}
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="py-3 px-4 rounded-xl text-base font-semibold"
              style={{ color: 'rgba(255,255,255,0.82)' }}
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
            {t('contact')}
          </Link>
          <LanguageSwitcher className="mt-2 justify-center" />
        </div>
      )}
    </header>
  )
}
