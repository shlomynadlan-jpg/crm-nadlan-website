'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'cookie-consent' // 'all' | 'essential'
const LEGACY_KEY = 'cookie-notice-ack'

/* eslint-disable @typescript-eslint/no-explicit-any */
function loadGA(id: string) {
  if (document.getElementById('ga4-script')) return
  const s = document.createElement('script')
  s.id = 'ga4-script'
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
  document.head.appendChild(s)
  const w = window as any
  w.dataLayer = w.dataLayer || []
  function gtag(..._args: any[]) { w.dataLayer.push(arguments) }
  gtag('js', new Date())
  gtag('config', id, { anonymize_ip: true })
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default function CookieNotice() {
  const [visible, setVisible] = useState(false)
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  useEffect(() => {
    try {
      const consent = localStorage.getItem(STORAGE_KEY)
      if (consent === 'all' && gaId) loadGA(gaId)
      // Show banner if no choice was made yet (legacy "ack" counts as essential-only)
      if (!consent && !localStorage.getItem(LEGACY_KEY)) setVisible(true)
    } catch {
      setVisible(true)
    }
    // Reopen from "הגדרות עוגיות" link in the footer
    const reopen = () => setVisible(true)
    window.addEventListener('open-cookie-settings', reopen)
    return () => window.removeEventListener('open-cookie-settings', reopen)
  }, [gaId])

  const choose = (choice: 'all' | 'essential') => {
    let hadGA = false
    try {
      hadGA = localStorage.getItem(STORAGE_KEY) === 'all'
      localStorage.setItem(STORAGE_KEY, choice)
      localStorage.removeItem(LEGACY_KEY)
    } catch { /* storage unavailable */ }
    setVisible(false)
    if (choice === 'all' && gaId) loadGA(gaId)
    // Downgrading from 'all' — reload so already-loaded analytics scripts are dropped
    if (choice === 'essential' && hadGA && document.getElementById('ga4-script')) {
      window.location.reload()
    }
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="הודעה על שימוש בעוגיות"
      className="fixed bottom-0 left-0 right-0 z-[9998] px-4 pb-4 pointer-events-none"
      style={{ direction: 'rtl' }}
    >
      <div className="pointer-events-auto max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 md:px-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 md:ml-20">
        <p className="text-sm text-slate-700 leading-relaxed flex-1">
          האתר משתמש בעוגיות חיוניות לתפעולו, ובכפוף להסכמתכם — גם בעוגיות למדידת
          שימוש ושיפור השירות. פרטים ב
          <Link href="/privacy" className="text-blue-600 underline hover:text-blue-800">מדיניות הפרטיות</Link>.
        </p>
        <div className="flex gap-2 self-end sm:self-auto">
          <button
            onClick={() => choose('essential')}
            className="text-sm py-2.5 px-4 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 whitespace-nowrap cursor-pointer"
          >
            רק הכרחי
          </button>
          <button
            onClick={() => choose('all')}
            className="btn-primary text-sm py-2.5 px-6 whitespace-nowrap cursor-pointer"
          >
            מאשר/ת
          </button>
        </div>
      </div>
    </div>
  )
}
