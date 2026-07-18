import Link from 'next/link'
import Image from 'next/image'
import { Property, getPropertyImage, isPlaceholderImage, formatPrice, getPropertyTypes } from '@/lib/properties'

export default function PropertyCard({ p }: { p: Property }) {
  const img = getPropertyImage(p)
  const isAI = isPlaceholderImage(p)
  const types = getPropertyTypes(p)
  const deal = p.deal_type || ''
  const isRent = deal.includes('השכרה') && !deal.includes('מכירה')
  const isBoth = deal.includes('מכירה') && deal.includes('השכרה')
  const isSale = deal.includes('מכירה') && !deal.includes('השכרה')
  const priceLabel = isRent ? 'שכ"ד חודשי' : isBoth ? 'מכירה / שכירות' : 'מחיר מכירה'
  const price = isRent ? p.rent_price : p.price
  const badgeText = isRent ? 'להשכרה' : isBoth ? 'מכירה והשכרה' : 'למכירה'
  const badgeColor = isRent ? '#0077B6' : isBoth ? '#7C3AED' : '#C9A84C'

  return (
    <Link href={`/properties/${p.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm card-hover border border-slate-100 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-52 overflow-hidden">
          <Image
            src={img}
            alt={`${types} ב${p.city}`}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {/* Badge */}
          <div className="absolute top-3 right-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full text-white shadow-md"
              style={{ background: badgeColor }}>
              {badgeText}
            </span>
          </div>
          {types && (
            <div className="absolute top-3 left-3">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-white/90 text-slate-700 shadow-sm">
                {types}
              </span>
            </div>
          )}
          {/* AI placeholder label */}
          {isAI && (
            <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2">
              <span
                className="text-xs px-3 py-1 rounded-full"
                style={{ background: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(4px)' }}
              >
                התמונה להמחשה בלבד
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-semibold text-slate-900 text-base mb-1 line-clamp-1">
            {p.city}
          </h3>

          {/* Specs row */}
          <div className="flex items-center gap-4 text-slate-500 text-sm my-3">
            {p.gross_size && (
              <span className="flex items-center gap-1">
                <span>📐</span> {p.gross_size} מ״ר
              </span>
            )}
            {p.rooms && (
              <span className="flex items-center gap-1">
                <span>🚪</span> {p.rooms} חד׳
              </span>
            )}
            {p.floor != null && (
              <span className="flex items-center gap-1">
                <span>🏢</span> קומה {p.floor}
              </span>
            )}
            {p.parking_count != null && p.parking_count > 0 && (
              <span className="flex items-center gap-1">
                <span>🅿️</span> {p.parking_count}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="mt-auto pt-3 border-t border-slate-100 flex items-end justify-between">
            <div>
              <p className="text-xs text-slate-400 mb-0.5">{priceLabel}</p>
              <p className="font-bold text-lg" style={{ color: '#0077B6' }}>
                {formatPrice(price)}
              </p>
            </div>
            <span className="text-xs font-medium text-blue-600 hover:underline">
              פרטים ←
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
