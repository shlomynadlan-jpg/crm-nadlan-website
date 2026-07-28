'use client'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { useState, useRef, useEffect } from 'react'

const FLAGS: Record<string, string> = {
  he: 'https://flagcdn.com/w40/il.png',
  en: 'https://flagcdn.com/w40/gb.png',
  fr: 'https://flagcdn.com/w40/fr.png',
  ru: 'https://flagcdn.com/w40/ru.png',
}
const NAMES: Record<string, string> = { he: 'עברית', en: 'English', fr: 'Français', ru: 'Русский' }

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  function switchLocale(next: string) {
    setOpen(false)
    router.replace(pathname, { locale: next })
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Change language"
        className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={FLAGS[locale]} alt={NAMES[locale]} width={28} height={20} className="rounded-sm shadow-sm object-cover" style={{ width: 28, height: 20 }} />
      </button>

      {open && (
        <div
          className="absolute top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-1 min-w-[150px] z-50"
          style={{ [locale === 'he' ? 'right' : 'left']: 0 }}
        >
          {routing.locales.map(loc => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 transition-colors text-sm text-slate-700 cursor-pointer"
              style={{ fontWeight: loc === locale ? 700 : 400 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={FLAGS[loc]} alt={NAMES[loc]} width={24} height={17} className="rounded-sm shadow-sm object-cover" style={{ width: 24, height: 17 }} />
              <span>{NAMES[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
