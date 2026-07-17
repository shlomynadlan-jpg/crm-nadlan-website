# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current homepage hero and below-fold sections with a luxury editorial design — full-screen glass-tower photo background, dark right-side overlay, gold accents, and a clean professional layout.

**Architecture:** Create a new `HeroSection` client component (needs `'use client'` for slideshow/animations) that embeds its own navbar. Update `app/page.tsx` to use it, reduce featured properties from 6→3, remove ProcessSection/ImageBanner/final-CTA, and restyle the below-fold sections to match the light professional palette.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS v4, existing `RotatingWord` + `CountUp` components, Unsplash for hero background photo.

---

## File Map

| Action | File | Purpose |
|--------|------|---------|
| **Create** | `components/HeroSection.tsx` | Client component — photo bg, overlay, nav, content, stats |
| **Modify** | `app/page.tsx` | Use HeroSection, trim sections, update styles |
| **Modify** | `components/OwnerBanner.tsx` | Update to solid navy gradient + white CTA button |
| **Modify** | `components/SpecialtiesMarquee.tsx` | Light background (#f8faff) instead of blue gradient |

---

## Task 1: Create HeroSection component

**Files:**
- Create: `components/HeroSection.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/HeroSection.tsx
'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import RotatingWord from '@/components/RotatingWord'
import CountUp from '@/components/CountUp'

interface Props {
  totalCount: number
  forSale: number
  forRent: number
  heroPhotoUrl?: string
}

const DEFAULT_PHOTO = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85'

const SLIDES = [
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85',
  'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1600&q=85',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85',
]

export default function HeroSection({ totalCount, forSale, forRent }: Props) {
  const [slide, setSlide] = useState(0)
  const [fade, setFade] = useState(true)

  const nextSlide = useCallback(() => {
    setFade(false)
    setTimeout(() => {
      setSlide(s => (s + 1) % SLIDES.length)
      setFade(true)
    }, 700)
  }, [])

  useEffect(() => {
    const id = setInterval(nextSlide, 5000)
    return () => clearInterval(id)
  }, [nextSlide])

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">

      {/* Background photo with zoom animation */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${SLIDES[slide]})`,
          opacity: fade ? 1 : 0,
          transition: 'opacity 0.7s ease',
          animation: fade ? 'heroZoom 12s ease-out forwards' : 'none',
        }}
      />

      {/* Overlay — dark RIGHT side (text side in RTL), clear left (photo side) */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(
            to left,
            rgba(4,10,24,0.96) 0%,
            rgba(4,10,24,0.88) 22%,
            rgba(4,10,24,0.65) 45%,
            rgba(4,10,24,0.20) 68%,
            rgba(4,10,24,0.04) 85%,
            transparent 100%
          )`,
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{ height: 160, background: 'linear-gradient(to top, rgba(4,10,24,1) 0%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col flex-1">

        {/* ── NAVBAR ── */}
        <nav
          className="flex items-center justify-between px-10 py-5"
          style={{ borderBottom: '1px solid rgba(201,168,76,0.18)' }}
        >
          <Link href="/" className="text-white font-black text-xl tracking-widest uppercase">
            LS<span style={{ color: '#C9A84C' }}>.</span>נדל״ן
          </Link>
          <div className="hidden md:flex items-center gap-7">
            {[
              { href: '/properties', label: 'נכסים' },
              { href: '/properties?city=', label: 'ערים' },
              { href: '/blog', label: 'בלוג' },
              { href: '/about', label: 'אודות' },
            ].map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-xs font-medium tracking-widest uppercase"
                style={{ color: 'rgba(255,255,255,0.58)' }}
              >
                {label}
              </Link>
            ))}
          </div>
          <a
            href="tel:0552702800"
            className="text-sm font-medium tracking-wide"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            055 <span style={{ color: '#C9A84C' }}>270 2800</span>
          </a>
        </nav>

        {/* ── HERO BODY ── */}
        <div className="flex-1 flex flex-col justify-center px-10 py-10 max-w-2xl">
          {/* Gold accent line */}
          <div style={{ width: 40, height: 2, background: '#C9A84C', marginBottom: 20 }} />

          <p
            className="text-xs font-bold tracking-widest uppercase mb-5"
            style={{ color: 'rgba(201,168,76,0.75)' }}
          >
            נדל״ן מסחרי ומגורים
          </p>

          <h1
            className="font-black leading-none mb-5"
            style={{ fontSize: 'clamp(38px, 5vw, 58px)', color: '#fff', letterSpacing: '-1px', textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
          >
            מוצאים לך את
            <br />
            <RotatingWord />
          </h1>

          <p
            className="text-sm leading-relaxed mb-8"
            style={{ color: 'rgba(255,255,255,0.55)' }}
          >
            מאות נכסים בכל הארץ · ייעוץ מקצועי
            <br />
            ליווי אישי עד סגירת עסקה
          </p>

          {/* Search card */}
          <form
            action="/properties"
            method="GET"
            className="flex items-stretch rounded-xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.97)', boxShadow: '0 12px 40px rgba(0,0,0,0.35)', maxWidth: 560 }}
          >
            <div className="flex-1 px-4 py-3 border-l border-slate-200">
              <label className="block text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">עיר</label>
              <input
                name="city"
                placeholder="תל אביב, רמת גן..."
                className="w-full text-sm text-slate-700 font-medium bg-transparent outline-none"
              />
            </div>
            <div className="flex-1 px-4 py-3 border-l border-slate-200">
              <label className="block text-xs font-bold tracking-widest uppercase text-slate-400 mb-1">סוג נכס</label>
              <select name="property_type" className="w-full text-sm text-slate-700 font-medium bg-transparent outline-none">
                <option value="">הכל</option>
                <option value="משרד">משרד</option>
                <option value="חנות">חנות</option>
                <option value="קרקע">קרקע</option>
                <option value="מחסן">מחסן</option>
                <option value="תעשיה">תעשייה</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-6 text-sm font-black tracking-wide uppercase flex items-center gap-2"
              style={{ background: '#0a1e3d', color: '#C9A84C', minWidth: 90 }}
            >
              🔍 חפש
            </button>
          </form>
        </div>

        {/* ── BOTTOM BAR — stats + slide dots ── */}
        <div className="flex items-end justify-between px-10 pb-8">
          <div className="flex gap-8 items-center">
            {[
              { id: 'total', value: totalCount, label: 'נכסים פעילים', plus: true },
              { id: 'sale', value: forSale, label: 'למכירה', plus: false },
              { id: 'rent', value: forRent, label: 'להשכרה', plus: false },
            ].map(({ id, value, label, plus }, i) => (
              <div key={id}>
                {i > 0 && (
                  <div
                    className="hidden sm:block"
                    style={{ width: 1, height: 44, background: 'rgba(255,255,255,0.12)', display: 'inline-block', marginLeft: 32, verticalAlign: 'middle' }}
                  />
                )}
                <p
                  className="font-black leading-none"
                  style={{ fontSize: 32, color: '#fff', textShadow: '0 2px 16px rgba(0,0,0,0.5)' }}
                >
                  <CountUp value={value} suffix={plus ? '+' : ''} />
                </p>
                <p className="text-xs tracking-widest uppercase mt-1" style={{ color: 'rgba(255,255,255,0.42)' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Slide dots */}
          <div className="flex gap-2 items-center pb-1">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => { setFade(false); setTimeout(() => { setSlide(i); setFade(true) }, 300) }}
                style={{
                  height: 3, borderRadius: 3, border: 'none', cursor: 'pointer',
                  width: i === slide ? 34 : 18,
                  background: i === slide ? '#C9A84C' : 'rgba(255,255,255,0.25)',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add the keyframe animation to globals.css**

Open `app/globals.css` and add before the last line:

```css
@keyframes heroZoom {
  from { transform: scale(1.06); }
  to   { transform: scale(1.00); }
}
```

- [ ] **Step 3: Verify the file has no TypeScript errors**

Run: `npx tsc --noEmit`  
Expected: no errors (or only pre-existing errors unrelated to the new file)

- [ ] **Step 4: Commit**

```bash
cd site
git add components/HeroSection.tsx app/globals.css
git commit -m "feat: add HeroSection client component with photo slideshow and editorial layout"
```

---

## Task 2: Update app/page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace the entire file**

```tsx
// app/page.tsx
import HeroSection from '@/components/HeroSection'
import Footer from '@/components/Footer'
import PropertyCard from '@/components/PropertyCard'
import SpecialtiesMarquee from '@/components/SpecialtiesMarquee'
import OwnerBanner from '@/components/OwnerBanner'
import Reveal from '@/components/Reveal'
import Link from 'next/link'
import { getProperties } from '@/lib/properties'
import type { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default async function HomePage() {
  const allProperties = await getProperties()
  const featured = allProperties.slice(0, 3)
  const forSale = allProperties.filter(p => p.deal_type?.includes('מכירה')).length
  const forRent = allProperties.filter(p => p.deal_type?.includes('השכרה')).length

  return (
    <>
      <main id="main">

        {/* ── Hero ── */}
        <HeroSection
          totalCount={allProperties.length}
          forSale={forSale}
          forRent={forRent}
        />

        {/* ── Specialties Marquee ── */}
        <SpecialtiesMarquee />

        {/* ── Featured Properties ── */}
        <section className="py-16 px-6" style={{ background: '#fff' }}>
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#C9A84C' }}>
                  ✦ נבחרו במיוחד
                </p>
                <h2 className="text-3xl font-black" style={{ color: '#0a1e3d' }}>נכסים מובחרים</h2>
              </div>
              <Link
                href="/properties"
                className="text-sm font-semibold pb-0.5"
                style={{ color: '#0a3d6b', borderBottom: '1px solid #0a3d6b' }}
              >
                צפה בכל הנכסים ←
              </Link>
            </div>

            {featured.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <p className="text-5xl mb-4">🏗️</p>
                <p className="text-lg">אין נכסים זמינים כרגע</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featured.map(p => <PropertyCard key={p.id} p={p} />)}
              </div>
            )}
          </div>
        </section>

        {/* ── Categories ── */}
        <section className="pb-16 px-6" style={{ background: '#fff' }}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#C9A84C' }}>
                סנן לפי סוג
              </p>
              <h2 className="text-2xl font-black" style={{ color: '#0a1e3d' }}>כל סוגי הנכסים</h2>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {[
                { icon: '🏢', label: 'משרדים', type: 'משרד' },
                { icon: '🛍️', label: 'חנויות', type: 'חנות' },
                { icon: '📦', label: 'מחסנים', type: 'מחסן' },
                { icon: '🔧', label: 'תעשייה', type: 'תעשיה' },
                { icon: '🌿', label: 'קרקעות', type: 'קרקע' },
                { icon: '🏗️', label: 'מסחרי', type: 'מסחרי' },
              ].map(({ icon, label, type }, i) => (
                <Reveal key={type} delay={i * 60}>
                  <Link
                    href={`/properties?property_type=${encodeURIComponent(type)}`}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border text-center hover:-translate-y-1 transition-all group"
                    style={{ background: '#f4f8fd', borderColor: '#dde8f5' }}
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
                    <span className="text-xs font-bold" style={{ color: '#2d5a80' }}>{label}</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Us ── */}
        <section className="py-16 px-6" style={{ background: '#f4f8fd', borderTop: '1px solid #dde8f5' }}>
          <div className="max-w-6xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: '#C9A84C' }}>למה אנחנו</p>
            <h2 className="text-3xl font-black mb-10" style={{ color: '#0a1e3d' }}>הבחירה הנכונה לנדל״ן שלך</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '🎯', title: 'מקצועיות ודיוק', desc: 'ניסיון של שנים בשוק הנדל״ן המסחרי והמגורים בכל רחבי הארץ.' },
                { icon: '⚡', title: 'מהירות תגובה', desc: 'נחזור אליך תוך שעות — כי כל עסקה טובה מתחילה בזמן הנכון.' },
                { icon: '🤝', title: 'ליווי אישי', desc: 'מהחיפוש הראשון ועד חתימת החוזה — אתה לא לבד לרגע.' },
              ].map(({ icon, title, desc }, i) => (
                <Reveal key={title} delay={i * 100}>
                  <div
                    className="rounded-2xl p-7 text-center h-full transition-all hover:-translate-y-1"
                    style={{ background: '#fff', border: '1px solid #dde8f5', boxShadow: '0 2px 12px rgba(10,30,62,0.04)' }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mx-auto mb-4"
                      style={{ background: '#e8f3fc', border: '1px solid #c0daf5' }}
                    >
                      {icon}
                    </div>
                    <h3 className="text-base font-black mb-2" style={{ color: '#0a1e3d' }}>{title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: '#6a90b0' }}>{desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Owner Banner ── */}
        <OwnerBanner />

      </main>

      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`  
Expected: no new errors

- [ ] **Step 3: Start dev server and visually verify**

Run: `npm run dev` (port 3105)  
Open: `http://localhost:3105`  
Check:
- Hero section shows glass-tower photo with dark overlay on right
- Navbar appears inside hero (gold dot after LS)
- Title + rotating word visible
- Search card (3 fields + button) visible
- Stats counter animates on load
- Marquee strip appears below hero
- 3 property cards (not 6)
- Categories grid (6 items)
- Why Us 3 cards (light blue background)

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: redesign homepage — editorial hero, 3 featured properties, light professional below-fold"
```

---

## Task 3: Update OwnerBanner to match new palette

**Files:**
- Modify: `components/OwnerBanner.tsx`

- [ ] **Step 1: Replace the file**

```tsx
// components/OwnerBanner.tsx
import Link from 'next/link'

export default function OwnerBanner() {
  return (
    <section
      className="px-6 py-16 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #040d1e 0%, #0a1e3d 40%, #0d2d5c 70%, #091830 100%)',
        borderTop: '1px solid rgba(201,168,76,0.1)',
      }}
    >
      {/* Subtle glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: -60, left: -60, width: 300, height: 300,
          background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'rgba(201,168,76,0.6)' }}>
            לבעלי נכסים
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-2 leading-snug">
            יש לך נכס למכירה<br className="hidden md:block" /> או להשכרה?
          </h2>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            נמצא לו את הקונה הנכון — מהר ובמחיר הטוב ביותר
          </p>
        </div>

        <Link
          href="/contact"
          className="shrink-0 font-black text-sm py-4 px-9 rounded-xl transition-all hover:-translate-y-0.5"
          style={{
            background: '#fff',
            color: '#0a1e3d',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          }}
        >
          פנה אלינו עכשיו ←
        </Link>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify visually**

Open: `http://localhost:3105`  
Scroll to Owner Banner — should be dark navy gradient with white CTA button.

- [ ] **Step 3: Commit**

```bash
git add components/OwnerBanner.tsx
git commit -m "feat: update OwnerBanner to dark navy palette matching new design"
```

---

## Task 4: Update SpecialtiesMarquee to light palette

**Files:**
- Modify: `components/SpecialtiesMarquee.tsx`

- [ ] **Step 1: Replace the file**

```tsx
// components/SpecialtiesMarquee.tsx
const SPECIALTIES = ['משרדים', 'חנויות ומסחר', 'מחסנים ולוגיסטיקה', 'תעשייה', 'קרקעות', 'מגורים', 'מכירת עסקים']

export default function SpecialtiesMarquee() {
  const Row = ({ hidden = false }: { hidden?: boolean }) => (
    <div aria-hidden={hidden || undefined} className="flex items-center shrink-0">
      {SPECIALTIES.map(s => (
        <span key={s} className="flex items-center font-semibold text-sm whitespace-nowrap" style={{ color: '#3a5a78' }}>
          <span className="px-5 md:px-7">{s}</span>
          <span aria-hidden="true" style={{ color: '#C9A84C' }}>◆</span>
        </span>
      ))}
    </div>
  )

  return (
    <section
      aria-label="תחומי ההתמחות שלנו"
      className="overflow-hidden py-3"
      style={{ background: '#f0f6ff', borderBottom: '1px solid #d8eaf8' }}
    >
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify visually**

Open: `http://localhost:3105`  
The marquee strip below the hero should be light blue/white instead of dark blue gradient.

- [ ] **Step 3: Commit**

```bash
git add components/SpecialtiesMarquee.tsx
git commit -m "feat: update SpecialtiesMarquee to light professional palette"
```

---

## Task 5: Mobile check and final polish

**Files:**
- Modify: `components/HeroSection.tsx` (minor responsive fixes if needed)

- [ ] **Step 1: Check mobile view**

In browser devtools, toggle to mobile (375px width).  
Verify:
- Title doesn't overflow
- Search card is readable (fields may stack or scroll horizontally — acceptable for MVP)
- Phone number visible
- Stats readable

- [ ] **Step 2: Fix hero search card on mobile if needed**

If search card overflows on mobile, add scroll:

In `HeroSection.tsx`, find the `<form>` element and update its className:
```tsx
className="flex items-stretch rounded-xl overflow-x-auto"
```

- [ ] **Step 3: Final visual check — full page scroll**

Open: `http://localhost:3105`  
Scroll through the full page and verify:
1. ✅ Hero: photo background, dark overlay right, gold accents, navbar, title, search, stats
2. ✅ Marquee: light blue, moving
3. ✅ 3 property cards with real photos
4. ✅ 6 category links
5. ✅ 3 "Why Us" cards on light blue bg
6. ✅ Owner banner: dark navy, white button
7. ✅ Footer

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: homepage redesign complete — editorial luxury hero with professional below-fold"
```
