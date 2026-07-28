'use client'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { useState, useRef, useEffect } from 'react'

const FLAGS: Record<string, string> = { he: '🇮🇱', en: '🇬🇧', fr: '🇫🇷', ru: '🇷🇺' }
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
        className="text-2xl leading-none hover:opacity-80 transition-opacity cursor-pointer"
      >
        {FLAGS[locale]}
      </button>

      {open && (
        <div
          className="absolute top-full mt-2 bg-white rounded-xl shadow-xl border border-slate-100 py-1 min-w-[140px] z-50"
          style={{ [locale === 'he' ? 'right' : 'left']: 0 }}
        >
          {routing.locales.map(loc => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-50 transition-colors text-sm text-slate-700 cursor-pointer"
              style={{ fontWeight: loc === locale ? 700 : 400 }}
            >
              <span className="text-lg">{FLAGS[loc]}</span>
              <span>{NAMES[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
