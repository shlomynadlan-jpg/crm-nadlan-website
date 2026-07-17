# Homepage Redesign — nadlannow.co.il
**Date:** 2026-07-17  
**Status:** Approved by Shlomi — Design M (Editorial)

---

## Summary

Redesign the homepage (`site/app/page.tsx`) to feel luxury, professional, and elevated — at the level of JLL / Sotheby's International Realty. The hero uses a real office/glass-tower photo as background with a dark overlay only on the right side (RTL: text side), leaving the building visible on the left.

---

## Hero Section

**Concept:** Full-screen real property photo background. Editorial typography. Dark overlay only on text side. Gold accent line.

**Background photo:**
- Real photo of a glass office tower (from Unsplash or replaced with actual property photos from the database)
- CSS `background-image` with `background-size: cover`
- Slow zoom animation: `scale(1.04) → scale(1.0)` over 10s on mount

**Overlay:**
- Gradient from RIGHT to LEFT (RTL): `rgba(5,12,28,.92)` → `rgba(5,12,28,.75)` → `rgba(5,12,28,.2)` → `transparent`
- Text side is dark and readable, photo side is visible

**Navbar:**
- Transparent background (sits on top of hero)
- Bottom border: `1px solid rgba(201,168,76,.2)` (subtle gold)
- Logo: `LS.נדל״ן` — uppercase, letter-spacing, gold dot
- Links: נכסים / ערים / אודות — small uppercase, muted white
- No CTA button in navbar (clean editorial look)

**Hero content (right-aligned, RTL):**
- Gold accent line: `32px × 2px` solid `#C9A84C`, margin-bottom
- Title line 1: `נדל״ן` — large, white, bold
- Title line 2: `מסחרי יוקרתי` — gold (`#C9A84C`), displayed as block
- Subtitle: `מאות נכסים · ייעוץ · ליווי אישי` — small, uppercase, muted, letter-spacing
- Search card: white `rgba(255,255,255,.95)`, rounded, input + dark navy button with gold text saying "חפש"

**No stats in hero** — keeps it clean and editorial

---

## Below-Fold Sections

### 1. Specialties Marquee
- Scrolling horizontal strip
- Light background (`#f0f6ff`) with blue text — matches professional tone
- Items: 🏢 משרדים · 🏪 חנויות · 🏭 תעשייה · 🌿 קרקעות · 📦 מחסנים · 🏬 מסחרי · 🏠 מגורים

### 2. Featured Properties
- Heading with small gold tag above: `✦ נבחרו במיוחד`
- Section title: `נכסים מובחרים`
- 3 property cards (pulled from Supabase via `getProperties()`)
- Card: rounded, white bg, real photo, badge (מכירה/השכרה), type, name, city, price
- Hover: lift + navy border

### 3. Categories
- 6 property type icons (emoji + label)
- Clean pill/card on white background
- Link to `/properties?type=X`

### 4. Why Us
- 3 value props with icon: מקצועיות / מהירות / ליווי אישי
- Light blue-grey background, white cards

### 5. Owner Banner
- Full-width, navy gradient background
- White text + white CTA button (dark text)
- "יש לך נכס למכירה או השכרה?"

---

## Color Palette

| Role | Value |
|------|-------|
| Gold accent | `#C9A84C` |
| Navy dark | `#05112a` / `#0a1e3d` |
| Hero overlay | `rgba(5,12,28,.92→0)` |
| Below-fold bg | `#fff` / `#f4f8fd` |
| Blue accent | `#0a3d6b` |
| Text muted | `rgba(255,255,255,.55)` on dark, `#6a90b0` on light |

---

## Technical Notes

- Framework: Next.js App Router, TypeScript, Tailwind CSS v4
- Hero background: `style={{ backgroundImage: "url(...)" }}` on a `div` with `position: absolute; inset: 0`
- Animation: CSS `@keyframes` for zoom, or Tailwind custom animation
- Photo source: Initially Unsplash URL; later replaced with actual property photos from Supabase
- Rotating word: reuse existing `RotatingWord` component (optional — not in hero, could add below title)
- RTL: all layouts must respect `dir="rtl"`
- Responsive: hero `min-height: 100svh` on desktop, `70svh` on mobile

---

## Out of Scope

- No changes to other pages
- No new database fields
- No new third-party services
- No video background (keep it fast)
