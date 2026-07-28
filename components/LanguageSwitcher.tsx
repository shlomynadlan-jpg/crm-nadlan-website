'use client'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const LABELS: Record<string, string> = { he: '🇮🇱', en: '🇬🇧', fr: '🇫🇷', ru: '🇷🇺' }

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next })
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {routing.locales.map(loc => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className="text-lg px-1.5 py-0.5 rounded transition-all leading-none"
          style={{
            background: loc === locale ? '#C9A84C' : 'transparent',
            border: loc === locale ? 'none' : '1px solid rgba(255,255,255,0.2)',
            opacity: loc === locale ? 1 : 0.6,
          }}
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  )
}
