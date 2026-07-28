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
          className="text-2xl transition-all leading-none"
          style={{ opacity: loc === locale ? 1 : 0.4 }}
        >
          {LABELS[loc]}
        </button>
      ))}
    </div>
  )
}
