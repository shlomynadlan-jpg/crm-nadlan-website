import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('contactPage')
  return {
    title: t('h1'),
    description: t('metaDesc'),
    alternates: { canonical: '/contact' },
  }
}

export default async function ContactPage() {
  const t = await getTranslations('contactPage')
  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || '055-2702800'
  const email = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@nadlannow.co.il'

  return (
    <>
      <Navbar />

      <div
        className="pt-24 pb-10 px-6"
        style={{ background: 'linear-gradient(160deg, #040d1e 0%, #0a1e3d 55%, #091830 100%)' }}
      >
        <div className="max-w-4xl mx-auto text-center py-10">
          <div style={{ width: 40, height: 2, background: '#C9A84C', margin: '0 auto 20px' }} />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">{t('h1')}</h1>
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.55)' }}>{t('subtitle')}</p>
        </div>
      </div>

      <main id="main" style={{ background: '#f4f8fd' }} className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{t('talkTitle')}</h2>
            <div className="space-y-5">
              {[
                { icon: '📞', label: t('labelPhone'), value: phone, href: `tel:${phone}` },
                { icon: '✉️', label: t('labelEmail'), value: email, href: `mailto:${email}` },
                { icon: '💬', label: t('labelWhatsapp'), value: t('whatsappSend'), href: `https://wa.me/972${phone.replace(/\D/g,'').replace(/^0/,'')}` },
              ].map(({ icon, label, value, href }) => (
                <a key={label} href={href} target={href.startsWith('https') ? '_blank' : undefined}
                   rel="noopener noreferrer"
                   className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl" aria-hidden="true">{icon}</div>
                  <div>
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="font-semibold text-slate-800">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, #0077B6, #005A8E)' }}>
              <p className="text-white font-semibold mb-1">⏰ {t('hoursTitle')}</p>
              <p className="text-blue-100 text-sm">{t('hoursSunThu')}</p>
              <p className="text-blue-100 text-sm">{t('hoursFri')}</p>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
      </main>

      <Footer />
    </>
  )
}
