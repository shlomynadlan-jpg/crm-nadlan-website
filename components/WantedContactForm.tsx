'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function WantedContactForm() {
  const t = useTranslations()
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.phone.trim()) return
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
          privacy_consent: true,
          marketing_consent: false,
        }),
      })
      if (!res.ok) throw new Error()
      setStatus('ok')
      setForm({ name: '', phone: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {t('contact.name')} *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="ישראל ישראלי"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {t('contact.phone')} *
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  type="tel"
                  placeholder="05X-XXXXXXX"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {t('wanted.formPropertyDetails')}
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                placeholder={t('wanted.formPropertyPlaceholder')}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff' }}
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-center" style={{ color: '#f87171' }}>{t('contact.error')}</p>
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
