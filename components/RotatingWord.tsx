'use client'
import { useState, useEffect } from 'react'

const WORDS = ['הנכס המושלם', 'המשרד המושלם', 'החנות המושלמת', 'המחסן המושלם', 'העסק הבא שלך']

function motionDisabled() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.classList.contains('a11y-no-motion')
}

export default function RotatingWord() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (motionDisabled()) return
      setVisible(false)
      setTimeout(() => {
        setIndex(prev => (prev + 1) % WORDS.length)
        setVisible(true)
      }, 300)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      style={{ color: '#C9A84C', display: 'inline-block', transition: 'opacity .3s', opacity: visible ? 1 : 0 }}
    >
      {WORDS[index]}
    </span>
  )
}
