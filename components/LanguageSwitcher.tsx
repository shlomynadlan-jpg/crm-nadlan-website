'use client'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'

const FLAGS: Record<string, { src: string; label: string }> = {
  he: { src: 'https://flagcdn.com/w40/il.png', label: 'עברית' },
  en: { src: 'https://flagcdn.com/w40/gb.png', label: 'English' },
  fr: { src: 'https://flagcdn.com/w40/fr.png', label: 'Français' },
  ru: { src: 'https://flagcdn.com/w40/ru.png', label: 'Русский' },
}

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next })
  }

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {routing.locales.map(loc => {
        const flag = FLAGS[loc]
        const isActive = loc === locale
        return (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            aria-label={flag.label}
            title={flag.label}
            className="cursor-pointer transition-all"
            style={{
              opacity: isActive ? 1 : 0.45,
              transform: isActive ? 'scale(1.15)' : 'scale(1)',
              filter: isActive ? 'drop-shadow(0 1px 4px rgba(201,168,76,0.7))' : 'none',
              border: 'none',
              background: 'none',
              padding: 0,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flag.src}
              alt={flag.label}
              width={26}
              height={18}
              className="rounded-sm block"
              style={{ width: 26, height: 18, objectFit: 'cover' }}
            />
          </button>
        )
      })}
    </div>
  )
}
