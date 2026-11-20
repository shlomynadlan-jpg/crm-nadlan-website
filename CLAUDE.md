# crm-nadlan-website — כללים

- אתר ציבורי NADLANNOW (Next.js + next-intl, נתונים מ-Supabase של `crm-nadlan`). מיגרציות DB נמצאות ב-`../crm-nadlan/supabase/migrations`, לא כאן.
- **אינדוקס לפי שפה (החלטה 2026-11-20):** כל דף מגדיר את השפות המאונדקסות שלו דרך `buildSeo()` ב-`lib/alternates.ts`. שפה שלא ברשימה = `noindex,follow`, בלי canonical/hreflang, ומחוץ ל-sitemap. נכסים וערים — עברית בלבד עד שיש תרגום מאושר (`docs/translation-plan.md`).
- לא משנים כותרות/תיאורים בעברית של דפים מאונדקסים בלי בקשה מפורשת.
- ערכים מרשימה סגורה (סוג נכס, עיר) מתורגמים רק דרך `lib/terms.ts`. תיאורי נכסים לא מתורגמים אוטומטית.
- ערכי לידים (טופס יצירת קשר) נשלחים תמיד בעברית המקורית.
- לפני פריסה: `npm test`, `npx tsc --noEmit`, `next build`, ואז `npm run seo-check -- http://localhost:3508` מול `next start`.
