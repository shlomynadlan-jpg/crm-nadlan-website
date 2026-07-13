import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'אודות',
  description: 'LS נדל"ן — חברת תיווך המתמחה בנכסים מסחריים ומגורים: משרדים, חנויות, מחסנים, תעשייה, קרקעות ודירות. הכירו אותנו ואת הדרך שבה אנחנו עובדים.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || '055-2702800'
  const email = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@nadlannow.co.il'

  return (
    <LegalPage
      title="אודות LS נדל&quot;ן"
      subtitle="מי אנחנו ואיך אנחנו עובדים"
    >
      <h2>מי אנחנו</h2>
      <p>
        LS נדל״ן היא חברת תיווך נדל״ן בראשות שלומי לימור, מתווך מורשה
        (רישיון מס׳ 3151306), המתמחה בנכסים מסחריים ובנכסי מגורים ברחבי מרכז הארץ.
        אנחנו מלווים בעלי נכסים, שוכרים, רוכשים ומשקיעים — מהחיפוש הראשון ועד חתימת ההסכם.
      </p>

      <h2>במה אנחנו מתמחים</h2>
      <ul>
        <li><strong>משרדים</strong> — השכרה ומכירה של שטחי משרדים, ממשרדי בוטיק ועד קומות שלמות במגדלים.</li>
        <li><strong>חנויות ושטחי מסחר</strong> — חזיתות מסחריות, מרכזים מסחריים ושטחי קמעונאות.</li>
        <li><strong>מחסנים ותעשייה</strong> — שטחי אחסנה, לוגיסטיקה ותעשייה קלה.</li>
        <li><strong>קרקעות</strong> — קרקעות לבנייה, חקלאות והשקעה.</li>
        <li><strong>מגורים</strong> — דירות ופנטהאוזים למכירה ולהשכרה.</li>
      </ul>

      <h2>איך אנחנו עובדים</h2>
      <ul>
        <li><strong>מידע מדויק</strong> — כל נכס נבדק לפני שהוא עולה לאתר, כולל נתוני שטח, מחיר ומצב משפטי בסיסי.</li>
        <li><strong>זמינות</strong> — מענה מהיר לכל פנייה, בטלפון, בוואטסאפ או במייל.</li>
        <li><strong>ליווי אישי</strong> — סיורים בנכסים, ניהול משא ומתן וליווי עד לחתימה.</li>
        <li><strong>שקיפות</strong> — עמלת התיווך וההתחייבויות מוגדרות מראש בהזמנת שירותי תיווך כדין.</li>
      </ul>

      <h2>יצירת קשר</h2>
      <p>
        מחפשים נכס או רוצים לשווק נכס שבבעלותכם? נשמח לדבר:
      </p>
      <ul>
        <li>טלפון: <a href={`tel:${phone}`}>{phone}</a></li>
        <li>דוא״ל: <a href={`mailto:${email}`}>{email}</a></li>
        <li><Link href="/contact">טופס יצירת קשר באתר</Link></li>
      </ul>
      <p>
        שעות פעילות: א׳–ה׳ 09:00–18:00, ו׳ 09:00–13:00.
      </p>
    </LegalPage>
  )
}
