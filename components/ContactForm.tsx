'use client'
import { useState, useId } from 'react'
import Link from 'next/link'

interface Props {
  propertyId?: string
  propertyCity?: string
  propertyType?: string
  agentPhone?: string
  agentName?: string
}

export default function ContactForm({ propertyId, propertyCity, propertyType, agentPhone, agentName }: Props) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const formId = useId()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) return
    setStatus('sending')
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_CRM_URL || 'http://localhost:3000'}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message, property_id: propertyId, property_city: propertyCity, property_type: propertyType }),
      })
      if (!res.ok) throw new Error()
      setStatus('done')
      setName(''); setPhone(''); setMessage('')
    } catch {
      setStatus('error')
    }
  }

  const rawPhone = (agentPhone || process.env.NEXT_PUBLIC_COMPANY_PHONE || '').replace(/\D/g, '')
  const waPhone = rawPhone.startsWith('972') ? rawPhone : '972' + rawPhone.replace(/^0/, '')
  const telHref = `tel:${agentPhone || process.env.NEXT_PUBLIC_COMPANY_PHONE || ''}`

  // WhatsApp message with property context
  const waText = encodeURIComponent(
    `שלום${agentName ? ` ${agentName}` : ''},\nאני מעוניין/ת לשמוע פרטים על הנכס${propertyCity ? ` ב${propertyCity}` : ''}${propertyType ? ` (${propertyType})` : ''}.`
  )
  const waHref = `https://wa.me/${waPhone}?text=${waText}`

  const inputStyle = "w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white transition-all"

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-1">מעוניינים בנכס?</h3>
      <p className="text-sm text-slate-500 mb-5">השאירו פרטים ונחזור אליכם בהקדם</p>

      {status === 'done' ? (
        <div className="text-center py-8">
          <div className="text-5xl mb-3">✅</div>
          <p className="font-semibold text-slate-800">קיבלנו את פנייתכם!</p>
          <p className="text-slate-500 text-sm mt-1">נחזור אליכם בהקדם האפשרי</p>
          <button onClick={() => setStatus('idle')} className="mt-4 text-blue-600 text-sm hover:underline">
            שלח פנייה נוספת
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <label htmlFor={`${formId}-name`} className="sr-only">שם מלא (חובה)</label>
          <input
            id={`${formId}-name`} name="name"
            type="text" placeholder="שם מלא *" value={name}
            onChange={e => setName(e.target.value)} className={inputStyle} required
          />
          <label htmlFor={`${formId}-phone`} className="sr-only">טלפון (חובה)</label>
          <input
            id={`${formId}-phone`} name="phone"
            type="tel" placeholder="טלפון *" value={phone}
            onChange={e => setPhone(e.target.value)} className={inputStyle} required
          />
          <label htmlFor={`${formId}-message`} className="sr-only">הודעה (אופציונלי)</label>
          <textarea
            id={`${formId}-message`} name="message"
            placeholder="הודעה (אופציונלי)" value={message}
            onChange={e => setMessage(e.target.value)}
            rows={3} className={inputStyle + ' resize-none'}
          />
          {status === 'error' && (
            <p role="alert" className="text-red-500 text-sm">שגיאה בשליחה, נסו שוב</p>
          )}
          <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center text-sm">
            {status === 'sending' ? '⏳ שולח...' : '📩 שלח פנייה'}
          </button>
          <p className="text-xs text-slate-400 leading-relaxed">
            הפרטים ישמשו ליצירת קשר בלבד, בהתאם ל
            <Link href="/privacy" className="underline hover:text-slate-600">מדיניות הפרטיות</Link>.
          </p>
        </form>
      )}

      {/* Quick contact */}
      <div className="border-t border-slate-100 mt-5 pt-4 flex gap-3">
        <a href={telHref}
           className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50 transition-colors">
          📞 התקשר
        </a>
        <a href={waHref}
           target="_blank" rel="noopener noreferrer"
           className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-medium transition-colors"
           style={{ background: '#25D366' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          וואטסאפ
        </a>
      </div>
    </div>
  )
}
