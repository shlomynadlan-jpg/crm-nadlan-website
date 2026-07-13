import Link from 'next/link'

export default function OwnerBanner() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', borderRight: '6px solid #C9A84C' }}>
        <div>
          <p className="text-sm font-medium mb-2" style={{ color: '#C9A84C' }}>לבעלי נכסים</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            יש לכם נכס למכירה או להשכרה?
          </h2>
          <p className="text-slate-400">
            קבלו הערכת שווי ותוכנית שיווק מותאמת — בלי עלות ובלי התחייבות.
          </p>
        </div>
        <Link href="/contact"
          className="shrink-0 font-bold text-sm py-4 px-8 rounded-xl transition-opacity hover:opacity-90"
          style={{ background: '#C9A84C', color: '#2C2000' }}>
          קבלו הערכה חינם ←
        </Link>
      </div>
    </section>
  )
}
