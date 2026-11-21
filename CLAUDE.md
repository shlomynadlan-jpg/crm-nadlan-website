# crm-nadlan-website — כללים

- אתר ציבורי NADLANNOW (Next.js + next-intl, נתונים מ-Supabase של `crm-nadlan`). מיגרציות DB נמצאות ב-`../crm-nadlan/supabase/migrations`, לא כאן.
- **אינדוקס לפי שפה (החלטה 2026-11-20):** כל דף מגדיר את השפות המאונדקסות שלו דרך `buildSeo()` ב-`lib/alternates.ts`. שפה שלא ברשימה = `noindex,follow`, בלי canonical/hreflang, ומחוץ ל-sitemap. נכסים וערים — עברית בלבד עד שיש תרגום מאושר (`docs/translation-plan.md`).
- לא משנים כותרות/תיאורים בעברית של דפים מאונדקסים בלי בקשה מפורשת.
- ערכים מרשימה סגורה (סוג נכס, עיר) מתורגמים רק דרך `lib/terms.ts`. תיאורי נכסים לא מתורגמים אוטומטית.
- **מיתוג (2026-11-20):** "שלומי לימור מבית LS נדל"ן" (`meta.brandName` + `meta.brandOf`) בכותרות גוגל (template), בכותרת האתר, ב-hero ובפוטר.
- ערכי לידים (טופס יצירת קשר) נשלחים תמיד בעברית המקורית.
- המפתח הציבורי (anon) נמצא בדפדפן: שאילתות Supabase באתר בוחרות עמודות מפורשות בלבד (אף פעם `*`), ושום שדה פנימי (בעלים, אנשי קשר, עמלות, הערות) לא עובר לקומפוננטת client.
- לידים: כל טופס חדש עובר דרך `/api/leads` (ולידציה ב-`lib/leads.ts`), עם תיבת הסכמה אמיתית ושדה honeypot `website`.
- לפני פריסה: `npm test`, `npx tsc --noEmit`, `next build`, ואז `npm run seo-check -- http://localhost:3508` מול `next start`.
- **הרשאות anon לפי עמודה (הוחל 2026-11-21):** עמודה חדשה שהאתר קורא מ-properties, settings או campaigns חייבת קודם `grant select (col) on public.<table> to anon`. בלי זה, השאילתה נכשלת עם 42501. הרשימה המלאה נמצאת ב-`docs/security-rls-migration.sql`.
- כל שינוי בהרשאות Supabase או בשאילתות: `npm run anon-check` (exit 0 = אין מידע פרטי למפתח הציבורי). מיגרציות הרשאות: הרצת ניסיון (rollback) לפני commit.
- **עלויות בדף נכס (החלטה 2026-11-21):** ארנונה ב-CRM = סכום כולל לחודש; דמי ניהול וועד בית = ₪ למ"ר לחודש (× שטח ברוטו). נכס עם "מחיר ינתן בפרטי" (`hide_price`) לא מציג אף עלות.
