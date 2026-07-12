import Link from 'next/link'

export default function Footer() {
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || 'LS נדל"ן'
  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || '050-0000000'
  const email = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@ls-nadlan.co.il'

  return (
    <footer style={{ background: '#0F172A', direction: 'rtl' }} className="text-white mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                style={{ background: 'linear-gradient(135deg, #0077B6, #005A8E)' }}>
                LS
              </div>
              <span className="font-bold text-xl">{companyName}</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              מומחים בתיווך נכסים מסחריים ומגורים.<br />
              מחויבים למצוא לכם את הנכס המושלם.
            </p>
          </div>

          {/* Links */}
          <div>
            <h2 className="font-semibold mb-4" style={{ color: '#C9A84C' }}>ניווט מהיר</h2>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">דף הבית</Link></li>
              <li><Link href="/properties" className="hover:text-white transition-colors">כל הנכסים</Link></li>
              <li><Link href="/properties?deal_type=sale" className="hover:text-white transition-colors">נכסים למכירה</Link></li>
              <li><Link href="/properties?deal_type=rent" className="hover:text-white transition-colors">נכסים להשכרה</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">צור קשר</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h2 className="font-semibold mb-4" style={{ color: '#C9A84C' }}>מידע ומדיניות</h2>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><Link href="/accessibility" className="hover:text-white transition-colors">הצהרת נגישות</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">מדיניות פרטיות</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">תקנון ותנאי שימוש</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-semibold mb-4" style={{ color: '#C9A84C' }}>יצירת קשר</h2>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-center gap-2">
                <span aria-hidden="true">📞</span>
                <a href={`tel:${phone}`} className="hover:text-white transition-colors">{phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">✉️</span>
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
              </li>
              <li className="flex items-center gap-2">
                <span aria-hidden="true">💬</span>
                <a href={`https://wa.me/972${phone.replace(/\D/g,'').replace(/^0/,'')}`}
                   target="_blank" rel="noopener noreferrer"
                   className="hover:text-white transition-colors">
                  וואטסאפ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-10 pt-6 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} {companyName} — כל הזכויות שמורות
        </div>
      </div>
    </footer>
  )
}
