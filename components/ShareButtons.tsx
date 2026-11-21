import { getTranslations } from 'next-intl/server'

// Plain links (no JS): WhatsApp, Facebook, email
export default async function ShareButtons({ url, title }: { url: string; title: string }) {
  const t = await getTranslations('propertyPage.share')
  const text = encodeURIComponent(`${title}\n${url}`)
  const links = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${text}`, bg: '#25D366' },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, bg: '#1877F2' },
    { label: t('email'), href: `mailto:?subject=${encodeURIComponent(title)}&body=${text}`, bg: '#475569' },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm text-slate-500 me-1">{t('title')}</span>
      {links.map(l => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
          className="text-xs font-semibold px-3 py-1.5 rounded-full text-white transition-opacity hover:opacity-85"
          style={{ background: l.bg }}>
          {l.label}
        </a>
      ))}
    </div>
  )
}
