'use client'
import { useState, useId } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export default function WantedContactForm() {
  const t = useTranslations()
  const formId = useId()
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [privacyConsent, setPrivacyConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim() || !privacyConsent || status === 'sending') return
    const website = new FormData(e.currentTarget as HTMLFormElement).get('website')
    setStatus('sending')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          message: form.message,
          property_type: 'פנייה מדף דרושים',
          privacy_consent: privacyConsent,
          marketing_consent: false,
          website,
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('ok')
      setForm({ name: '', phone: '', message: '' })
      setPrivacyConsent(false)
    } catch {
      setStatus('error')
    }
  }

  const consent = t('contactForm.privacyConsent').split('{link}')

  return (
    <div
      className="mt-10 rounded-2xl p-8"
      style={{ background: 'linear-gradient(135deg, #040d1e 0%, #0a1e3d 100%)', border: '1px solid rgba(201,168,76,0.25)' }}
    >
      <div className="max-w-xl mx-auto">
        {/* Title */}
        <div className="text-center mb-6">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'rgba(201,168,76,0.75)' }}>
            {t('wanted.formLabel')}
          </p>
          <h3 className="text-2xl font-black text-white mb-1">{t('wanted.formTitle')}</h3>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{t('wanted.formSubtitle')}</p>
        </div>

        {status === 'ok' ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-lg font-bold text-white mb-1">{t('wanted.formSuccess')}</p>
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{t('wanted.formSuccessNote')}</p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 text-sm font-bold px-6 py-2 rounded-xl"
              style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)' }}
            >
              {t('wanted.formSendAnother')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* honeypot: hidden from people and screen readers, bots fill it */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor={`${formId}-name`} className="block text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {t('contact.name')} *
                </label>
                <input
                  id={`${formId}-name`}
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
                />
              </div>
              <div>
                <label htmlFor={`${formId}-phone`} className="block text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {t('contact.phone')} *
                </label>
                <input
                  id={`${formId}-phone`}
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  type="tel"
                  autoComplete="tel"
                  placeholder="05X-XXXXXXX"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
                />
              </div>
            </div>

            <div>
              <label htmlFor={`${formId}-message`} className="block text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {t('wanted.formPropertyDetails')}
              </label>
              <textarea
                id={`${formId}-message`}
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder={t('wanted.formPropertyPlaceholder')}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
              />
            </div>

            <label className="flex items-start gap-2 text-xs leading-relaxed cursor-pointer" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <input
                type="checkbox" required checked={privacyConsent}
                onChange={e => setPrivacyConsent(e.target.checked)}
                className="mt-0.5 w-4 h-4 shrink-0 cursor-pointer"
                style={{ accentColor: '#C9A84C' }}
              />
              <span>
                {consent[0]}
                <Link href="/privacy" className="underline" style={{ color: '#C9A84C' }}>{t('contactForm.privacyLink')}</Link>
                {consent[1]} <span style={{ color: '#f87171' }}>*</span>
              </span>
            </label>

            {status === 'error' && (
              <p role="alert" className="text-sm text-center" style={{ color: '#f87171' }}>{t('contact.error')}</p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-3.5 rounded-xl font-black text-sm tracking-wide transition-opacity"
              style={{ background: '#C9A84C', color: '#0a1e3d', opacity: status === 'sending' ? 0.7 : 1 }}
            >
              {status === 'sending' ? t('contact.sending') : t('wanted.formSend')}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
