'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'cookie-notice-ack'

export default function CookieNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      // storage unavailable — show the notice each visit
      setVisible(true)
    }
  }, [])

  const dismiss = () => {
    try { localStorage.setItem(STORAGE_KEY, new Date().toISOString()) } catch { /* storage unavailable */ }
    setVisible(false)
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
          האתר משתמש בעוגיות ובאחסון מקומי לצרכים תפעוליים ולשמירת ההעדפות שלכם בלבד —
          ללא עוגיות מעקב או פרסום. פרטים נוספים ב
          <Link href="/privacy" className="text-blue-600 underline hover:text-blue-800">מדיניות הפרטיות</Link>.
        </p>
        <button
          onClick={dismiss}
          className="btn-primary text-sm py-2.5 px-6 whitespace-nowrap cursor-pointer self-end sm:self-auto"
        >
          הבנתי
        </button>
      </div>
    </div>
  )
}
