import { getCities } from '@/lib/properties'
import { normalizeCity, citySlug } from '@/lib/cities'
import { SERVICES } from '@/lib/services'
import { BASE } from '@/lib/alternates'

// Generated so service/city links match the sitemap (Hebrew-only pages)
export const revalidate = 3600

export async function GET() {
  const cities = [...new Map((await getCities()).map(c => [citySlug(c), normalizeCity(c)])).entries()]
    .filter(([slug]) => slug)

  const text = `# שלומי לימור מבית LS נדל"ן — nadlannow.co.il

> חברת תיווך נדל"ן ישראלית המתמחה בנכסים מסחריים ומגורים למכירה ולהשכרה:
> משרדים, חנויות, מחסנים, שטחי תעשייה, קרקעות ודירות.

Shlomy Limor of LS Real Estate is an Israeli real-estate brokerage specializing
in commercial and residential properties for sale and rent: offices, retail
stores, warehouses, industrial spaces, land, and apartments.

## פרטי העסק / Business details
- שירותים: תיווך נכסים מסחריים ומגורים — מכירה, השכרה, ליווי עסקאות
- בסיס: פתח תקווה, מחוז המרכז, ישראל
- אזורי פעילות עיקריים: פתח תקווה, ראש העין, בני ברק, תל אביב, הוד השרון, כפר סבא, קריית אונו, אור יהודה, יהוד, הרצליה, ראשון לציון, גבעת שמואל, רמת גן — ובכל הארץ לפי צורך
- שפות שירות: עברית, אנגלית, צרפתית, רוסית
- טלפון: 055-2702800
- דוא"ל: info@nadlannow.co.il
- שעות פעילות: א׳–ה׳ 09:00–19:00, ו׳ 09:00–12:00
- ותק: 7+ שנות פעילות, 200+ עסקאות

## דפים מרכזיים / Key pages
- [כל הנכסים](${BASE}/he/properties): רשימת הנכסים הזמינים למכירה ולהשכרה
- [מבוקשים](${BASE}/he/wanted): נכסים שלקוחות מחפשים כרגע
- [אודות](${BASE}/he/about): על החברה והשירותים
- [שאלות נפוצות](${BASE}/he/faq): מידע על תיווך, עמלות ותהליכי עסקה
- [מאמרים ומדריכים](${BASE}/he/blog): מדריכים מקצועיים על נדל"ן מסחרי — בחירת משרד, חישוב עלויות, שכירות מול רכישה
- [צור קשר](${BASE}/he/contact): טופס פנייה ופרטי התקשרות

## שירותים / Services
${SERVICES.map(s => `- [${s.title}](${BASE}/he/services/${s.slug})`).join('\n')}

## נכסים לפי עיר / Properties by city
${cities.map(([slug, name]) => `- [נכסים ב${name}](${BASE}/he/city/${encodeURIComponent(slug)})`).join('\n')}
`

  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
