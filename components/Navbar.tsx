'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || 'LS נדל"ן'

  return (
    <header className="fixed top-0 w-full z-50" style={{ direction: 'rtl' }}>
      <nav className="glass mx-4 mt-3 rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md"
            style={{ background: 'linear-gradient(135deg, #0077B6, #005A8E)' }}>
            LS
          </div>
          <span className="font-bold text-xl" style={{ color: '#0F172A' }}>{companyName}</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">דף הבית</Link>
          <Link href="/properties" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">נכסים</Link>
          <Link href="/properties?deal_type=sale" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">למכירה</Link>
          <Link href="/properties?deal_type=rent" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">להשכרה</Link>
          <Link href="/about" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">אודות</Link>
          <Link href="/contact" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">צור קשר</Link>
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href="/contact" className="btn-primary text-sm py-2 px-5">
            📞 דבר איתנו
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-600"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'סגירת תפריט ניווט' : 'פתיחת תפריט ניווט'}
          aria-expanded={open}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="glass mx-4 mt-2 rounded-2xl p-4 flex flex-col gap-3 shadow-xl md:hidden">
          <Link href="/" className="font-medium text-slate-700 py-2 px-3 rounded-lg hover:bg-blue-50" onClick={() => setOpen(false)}>דף הבית</Link>
          <Link href="/properties" className="font-medium text-slate-700 py-2 px-3 rounded-lg hover:bg-blue-50" onClick={() => setOpen(false)}>כל הנכסים</Link>
          <Link href="/properties?deal_type=sale" className="font-medium text-slate-700 py-2 px-3 rounded-lg hover:bg-blue-50" onClick={() => setOpen(false)}>למכירה</Link>
          <Link href="/properties?deal_type=rent" className="font-medium text-slate-700 py-2 px-3 rounded-lg hover:bg-blue-50" onClick={() => setOpen(false)}>להשכרה</Link>
          <Link href="/about" className="font-medium text-slate-700 py-2 px-3 rounded-lg hover:bg-blue-50" onClick={() => setOpen(false)}>אודות</Link>
          <Link href="/faq" className="font-medium text-slate-700 py-2 px-3 rounded-lg hover:bg-blue-50" onClick={() => setOpen(false)}>שאלות נפוצות</Link>
          <Link href="/contact" className="btn-primary text-center" onClick={() => setOpen(false)}>צור קשר</Link>
        </div>
      )}
    </header>
  )
}
