'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

interface Prefs {
  fontScale: number // 100 | 110 | 125 | 140
  grayscale: boolean
  invert: boolean
  links: boolean
  readableFont: boolean
  noMotion: boolean
  bigCursor: boolean
}

const DEFAULTS: Prefs = {
  fontScale: 100,
  grayscale: false,
  invert: false,
  links: false,
  readableFont: false,
  noMotion: false,
  bigCursor: false,
}

const STORAGE_KEY = 'a11y-prefs'

function applyPrefs(p: Prefs) {
  const html = document.documentElement
  html.style.fontSize = p.fontScale === 100 ? '' : `${p.fontScale}%`
  html.classList.toggle('a11y-grayscale', p.grayscale)
  html.classList.toggle('a11y-invert', p.invert)
  html.classList.toggle('a11y-links', p.links)
  html.classList.toggle('a11y-readable', p.readableFont)
  html.classList.toggle('a11y-no-motion', p.noMotion)
  html.classList.toggle('a11y-big-cursor', p.bigCursor)
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false)
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS)
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Load saved preferences on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const p = { ...DEFAULTS, ...JSON.parse(saved) }
        setPrefs(p)
        applyPrefs(p)
      }
    } catch { /* ignore corrupt storage */ }
  }, [])

  const update = useCallback((patch: Partial<Prefs> | ((prev: Prefs) => Partial<Prefs>)) => {
    setPrefs(prev => {
      const next = { ...prev, ...(typeof patch === 'function' ? patch(prev) : patch) }
      applyPrefs(next)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { /* storage unavailable */ }
      return next
    })
  }, [])

  const reset = () => {
    applyPrefs(DEFAULTS)
    setPrefs(DEFAULTS)
    try { localStorage.removeItem(STORAGE_KEY) } catch { /* storage unavailable */ }
  }

  // Close on Escape / click outside
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
    }
  }, [open])

  const toggles: { key: keyof Prefs; label: string }[] = [
    { key: 'invert', label: 'ניגודיות כהה' },
    { key: 'grayscale', label: 'גווני אפור' },
    { key: 'links', label: 'הדגשת קישורים' },
    { key: 'readableFont', label: 'פונט קריא' },
    { key: 'noMotion', label: 'עצירת אנימציות' },
    { key: 'bigCursor', label: 'סמן עכבר גדול' },
  ]

  return (
    <div id="a11y-widget-root" style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: 9999, direction: 'rtl' }}>
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="תפריט נגישות"
          className="mb-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 max-h-[calc(100vh-6rem)] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-slate-900 text-base">תפריט נגישות</h2>
            <button
              onClick={() => { setOpen(false); buttonRef.current?.focus() }}
              aria-label="סגירת תפריט נגישות"
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="4" y1="4" x2="14" y2="14" /><line x1="14" y1="4" x2="4" y2="14" />
              </svg>
            </button>
          </div>

          {/* Font size */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-sm text-slate-700 font-medium">גודל טקסט</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => update(p => ({ fontScale: Math.max(100, p.fontScale - 10) }))}
                disabled={prefs.fontScale <= 100}
                aria-label="הקטנת גודל טקסט"
                className="w-11 h-11 rounded-lg border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer disabled:cursor-default"
              >
                א-
              </button>
              <span className="text-sm text-slate-500 w-10 text-center" aria-live="polite">{prefs.fontScale}%</span>
              <button
                onClick={() => update(p => ({ fontScale: Math.min(140, p.fontScale + 10) }))}
                disabled={prefs.fontScale >= 140}
                aria-label="הגדלת גודל טקסט"
                className="w-11 h-11 rounded-lg border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 cursor-pointer disabled:cursor-default"
              >
                א+
              </button>
            </div>
          </div>

          {/* Toggles */}
          <ul className="py-1">
            {toggles.map(({ key, label }) => (
              <li key={key}>
                <button
                  onClick={() => update(p => ({ [key]: !p[key] } as Partial<Prefs>))}
                  aria-pressed={!!prefs[key]}
                  className="w-full flex items-center justify-between py-3 px-1 text-sm text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer"
                >
                  <span>{label}</span>
                  <span
                    aria-hidden="true"
                    className="inline-block w-9 h-5 rounded-full transition-colors relative"
                    style={{ background: prefs[key] ? '#0077B6' : '#CBD5E1' }}
                  >
                    <span
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all"
                      style={{ right: prefs[key] ? '2px' : '18px' }}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <button onClick={reset} className="text-sm text-slate-500 hover:text-slate-800 underline">
              איפוס הגדרות
            </button>
            <Link href="/accessibility" className="text-sm text-blue-600 hover:underline" onClick={() => setOpen(false)}>
              הצהרת נגישות
            </Link>
          </div>
        </div>
      )}

      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        aria-label="פתיחת תפריט נגישות"
        aria-expanded={open}
        aria-haspopup="dialog"
        title="תפריט נגישות"
        className="w-12 h-12 rounded-full shadow-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer"
        style={{ background: 'linear-gradient(135deg, #0077B6, #005A8E)' }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="4.5" r="2.2" />
          <path d="M12 8c-2.8 0-5.2-.5-6.6-.9a1 1 0 1 0-.6 1.9c1.2.37 3 .77 5.2.94v2.56c0 .4-.07.8-.22 1.17l-2.2 5.6a1 1 0 0 0 1.86.74l1.9-4.8c.2-.5.9-.5 1.1 0l1.9 4.8a1 1 0 1 0 1.86-.73l-2.2-5.6a3.2 3.2 0 0 1-.22-1.18V9.94c2.2-.17 4-.57 5.2-.94a1 1 0 1 0-.6-1.9C17.2 7.5 14.8 8 12 8z" />
        </svg>
      </button>
    </div>
  )
}
