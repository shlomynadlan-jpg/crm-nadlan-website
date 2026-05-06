import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || '050-0000000'
  const email = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@ls-nadlan.co.il'

  return (
    <>
      <Navbar />

      <div className="pt-24 pb-6 px-6"
        style={{ background: 'linear-gradient(135deg, #0F172A, #0077B6)' }}>
        <div className="max-w-4xl mx-auto text-center text-white py-10">
          <h1 className="text-4xl font-extrabold mb-3">צור קשר</h1>
          <p className="text-blue-200 text-lg">אנחנו כאן לכל שאלה — מוצאים לכם את הנכס המתאים</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">דברו איתנו</h2>
            <div className="space-y-5">
              {[
                { icon: '📞', label: 'טלפון', value: phone, href: `tel:${phone}` },
                { icon: '✉️', label: 'אימייל', value: email, href: `mailto:${email}` },
                { icon: '💬', label: 'וואטסאפ', value: 'שלחו הודעה', href: `https://wa.me/972${phone.replace(/\D/g,'').replace(/^0/,'')}` },
              ].map(({ icon, label, value, href }) => (
                <a key={label} href={href} target={href.startsWith('https') ? '_blank' : undefined}
                   rel="noopener noreferrer"
                   className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl">{icon}</div>
                  <div>
                    <p className="text-xs text-slate-400">{label}</p>
                    <p className="font-semibold text-slate-800">{value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, #0077B6, #005A8E)' }}>
              <p className="text-white font-semibold mb-1">⏰ שעות פעילות</p>
              <p className="text-blue-100 text-sm">א׳–ה׳: 09:00–18:00</p>
              <p className="text-blue-100 text-sm">ו׳: 09:00–13:00</p>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>

      <Footer />
    </>
  )
}
