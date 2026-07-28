'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

interface Props {
  images: string[]
  alt: string
  badge?: React.ReactNode
  aiDisclaimer?: React.ReactNode
}

export default function PropertyGallery({ images, alt, badge, aiDisclaimer }: Props) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const prev = useCallback(() => {
    setLightbox(i => (i !== null ? (i - 1 + images.length) % images.length : null))
  }, [images.length])

  const next = useCallback(() => {
    setLightbox(i => (i !== null ? (i + 1) % images.length : null))
  }, [images.length])

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowLeft') next()
      if (e.key === 'ArrowRight') prev()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, next, prev])

  return (
    <>
      {/* Main gallery */}
      <div className="rounded-2xl overflow-hidden mb-6 bg-slate-100 border-2 border-slate-200 shadow-md">
        {/* Main image */}
        <div
          className="relative h-80 md:h-[420px] cursor-zoom-in group"
          onClick={() => setLightbox(active)}
        >
          <Image
            src={images[active]}
            alt={alt}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          {/* Watermark — only on real uploaded images */}
          {!aiDisclaimer && (
            <div className="absolute top-3 left-3 pointer-events-none">
              <Image src="/logo.png" alt="" width={80} height={80} style={{ width: 80, height: 'auto', filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.4))' }} />
            </div>
          )}
          {/* Zoom icon on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-black/40 backdrop-blur-sm rounded-full p-3">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
          {badge && <div className="absolute top-4 right-4">{badge}</div>}
          {aiDisclaimer && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-3">
              {aiDisclaimer}
            </div>
          )}
          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
              {active + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 p-3 overflow-x-auto bg-white border-t border-slate-100">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setLightbox(i) }}
                className={`relative shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  i === active ? 'border-blue-600 shadow-md scale-105' : 'border-transparent hover:border-slate-300'
                }`}
              >
                <Image src={src} alt={`${alt} — תמונה ${i + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          {/* Image container */}
          <div
            className="relative max-w-5xl max-h-[90vh] w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative w-full h-[80vh]">
              <Image
                src={images[lightbox]}
                alt={`${alt} — תמונה ${lightbox + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-sm px-4 py-1.5 rounded-full">
                {lightbox + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Close */}
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 left-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={e => { e.stopPropagation(); prev() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={e => { e.stopPropagation(); next() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white rounded-full p-3 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
          </button>
            </>
          )}
        </div>
      )}
    </>
  )
}
