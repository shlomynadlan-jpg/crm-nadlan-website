import Link from 'next/link'

const STEPS: { title: string; items: string[] }[] = [
  {
    title: 'פגישת היכרות',
    items: [
      'היכרות אישית והבנת הצרכים שלכם',
      'הגדרת תקציב, אזור וסוג הנכס המבוקש',
      'הסבר מקיף על תהליך הליווי ב-LS נדל״ן',
      'תיאום ציפיות ותכנון ציר זמן',
    ],
  },
  {
    title: 'איתור נכסים',
    items: [
      'סינון מהמאגר שלנו + עבודת שטח ייעודית',
      'הצגת נכסים מתאימים — כולל כאלה שלא פורסמו',
      'סיורים מרוכזים בנכסים הרלוונטיים',
      'מידע מלא ושקוף על כל נכס: שטח, עלויות, מצב משפטי',
    ],
  },
  {
    title: 'בדיקות ומשא ומתן',
    items: [
      'חישוב העלות האמיתית — ברוטו, נטו, דמי ניהול וארנונה',
      'ניהול משא ומתן מקצועי עבורכם',
      'ליווי בבדיקות משפטיות ותכנוניות עם אנשי מקצוע',
      'השוואה מסודרת בין החלופות לקבלת החלטה',
    ],
  },
  {
    title: 'חתימה וסגירה',
    items: [
      'ליווי צמוד עד חתימת ההסכם',
      'תיאום מול עורכי הדין של שני הצדדים',
      'חיבור ליועץ משכנתאות או מימון — בהתאמה אישית',
      'מסירת מפתח מסודרת',
    ],
  },
  {
    title: 'ליווי אחרי העסקה',
    items: [
      'נשארים זמינים גם אחרי החתימה',
      'רכשתם להשקעה? נעזור באיתור שוכרים ובחתימת חוזה מולם',
      'ייעוץ שוטף לקראת העסקה הבאה שלכם',
    ],
  },
]

export default function ProcessSection() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <p className="text-sm font-medium mb-2" style={{ color: '#C9A84C' }}>איך זה עובד?</p>
        <h2 className="text-3xl font-bold text-slate-900">תהליך הליווי שלנו — שלב אחר שלב</h2>
        <p className="text-slate-500 mt-3 max-w-xl mx-auto">
          מהשיחה הראשונה ועד הרבה אחרי המפתח — כך נראית עסקה מלווה נכון
        </p>
      </div>

      <ol className="relative">
        {STEPS.map((step, i) => (
          <li key={step.title} className="relative flex gap-5 pb-10 last:pb-0">
            {/* Timeline line + number */}
            <div className="flex flex-col items-center shrink-0">
              <span
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md z-10"
                style={{ background: 'linear-gradient(135deg, #0077B6, #005A8E)' }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              {i < STEPS.length - 1 && (
                <span aria-hidden="true" className="w-0.5 flex-1 mt-2" style={{ background: '#C9A84C', opacity: 0.4 }} />
              )}
            </div>

            {/* Content */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex-1">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <ul className="space-y-2">
                {step.items.map(item => (
                  <li key={item} className="flex items-start gap-2 text-slate-600 text-sm leading-relaxed">
                    <span aria-hidden="true" className="mt-1 shrink-0" style={{ color: '#C9A84C' }}>✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <div className="text-center mt-12">
        <Link href="/contact" className="btn-primary text-base py-4 px-10">
          קבעו פגישת היכרות — ללא עלות
        </Link>
      </div>
    </section>
  )
}
