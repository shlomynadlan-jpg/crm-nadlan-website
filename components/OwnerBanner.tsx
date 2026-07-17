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
