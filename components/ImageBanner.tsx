import Image from 'next/image'
import Link from 'next/link'

export default function ImageBanner() {
  return (
    <section className="relative my-6">
      <div className="relative h-[320px] md:h-[380px]">
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80"
          alt="בניין משרדים מודרני עם חזית זכוכית"
          fill className="object-cover" sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(15,23,42,0.74)' }} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-sm font-medium mb-3" style={{ color: '#C9A84C' }}>
            נדל״ן מסחרי · לוגיסטי · מגורים
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 max-w-2xl leading-tight">
            מהמשרד הראשון ועד המגדל הבא
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl">
            ליווי מקצועי ואישי בכל עסקה — מאיתור הנכס ועד חתימת ההסכם
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/contact"
              className="bg-white text-slate-900 font-bold text-sm py-3.5 px-8 rounded-xl hover:bg-blue-50 transition-colors">
              דברו עם מומחה
            </Link>
            <Link href="/properties"
              className="text-white font-bold text-sm py-3.5 px-8 rounded-xl border border-white/40 hover:bg-white/10 transition-colors">
              לכל הנכסים
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
