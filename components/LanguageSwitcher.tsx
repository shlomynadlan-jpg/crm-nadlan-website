'use client'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const LABELS: Record<string, string> = { he: 'עב', en: 'EN', fr: 'FR' }

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
          className="text-xs font-bold px-2 py-1 rounded transition-all"
          style={{
            background: loc === locale ? '#C9A84C' : 'transparent',
            color: loc === locale ? '#0a1e3d' : 'rgba(255,255,255,0.6)',
            border: loc === locale ? 'none' : '1px solid rgba(255,255,255,0.2)',
          }}
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  )
}
