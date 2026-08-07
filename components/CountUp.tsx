'use client'
import { useState, useEffect, useRef } from 'react'

export default function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  // SSR renders the real value so crawlers and no-JS users see it
  const [display, setDisplay] = useState(value)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || value === 0) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.classList.contains('a11y-no-motion')
    if (reduced) return

    const obs = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting || started.current) return
      started.current = true
      obs.disconnect()
      const t0 = performance.now()
      const duration = 1200
      const step = (t: number) => {
        const p = Math.min((t - t0) / duration, 1)
        setDisplay(Math.round(value * (0.5 - Math.cos(Math.PI * p) / 2)))
        if (p < 1) requestAnimationFrame(step)
      }
      setDisplay(0)
      requestAnimationFrame(step)
    }, { threshold: 0.4 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  return <span ref={ref}>{display.toLocaleString('he-IL')}{suffix}</span>
}
