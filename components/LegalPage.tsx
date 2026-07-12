import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface Props {
  title: string
  subtitle?: string
  updated?: string
  children: React.ReactNode
}

export default function LegalPage({ title, subtitle, updated, children }: Props) {
  return (
    <>
      <Navbar />

      <div className="pt-24 pb-6 px-6"
        style={{ background: 'linear-gradient(135deg, #0F172A, #0077B6)' }}>
        <div className="max-w-4xl mx-auto text-center text-white py-10">
          <h1 className="text-4xl font-extrabold mb-3">{title}</h1>
          {subtitle && <p className="text-blue-200 text-lg">{subtitle}</p>}
        </div>
      </div>

      <main id="main" className="max-w-3xl mx-auto px-6 py-16 w-full">
        <article className="legal-content bg-white rounded-2xl border border-slate-100 shadow-sm p-8 md:p-10">
          {children}
          {updated && (
            <p className="text-sm text-slate-400 mt-10 pt-6 border-t border-slate-100">
              עודכן לאחרונה: {updated}
            </p>
          )}
        </article>
      </main>

      <Footer />
    </>
  )
}
