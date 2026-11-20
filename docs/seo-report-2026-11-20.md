# דוח עבודה — NADLANNOW (nadlannow.co.il), 20.11.2026

מטרת הדוח: לאפשר בדיקה חיצונית של מה שבוצע. כל הטענות נבדקו בפועל (בדיקות אוטומטיות, build, ובדיקה מול האתר החי).

## 1. רקע טכני
- Next.js 16 (App Router) + TypeScript, next-intl (he/en/fr/ru, ברירת מחדל he), Supabase, Vercel (פריסה אוטומטית מ-push ל-master).
- כל הדפים מרונדרים בשרת (SSR/ISR). כתובת בלי שפה (`/properties/624`) → 307 ל-`/he/...`.
- מצב נתונים: 127 נכסים מוצגים; **ל-0 מהם יש תיאור באנגלית/צרפתית**, ולרוסית אין שדה בכלל. אין מנגנון תרגום אוטומטי.

## 2. בעיות שאותרו (לפני התיקון)
1. **Canonical שגוי:** בכל הדפים canonical בלי שפה, למשל `/en/properties/624` → canonical `https://www.nadlannow.co.il/properties/624`, כתובת שמחזירה 307. בנוסף hreflang הצהיר על 4 גרסאות בעוד שכולן הצביעו ל-canonical אחד (סתירה). כנראה המקור של "Alternative page with proper canonical tag" (116) ושל חלק מ-"Page with redirect" (29).
2. **דפים כפולים בשפות זרות:** ~381 דפי נכס ו-84 דפי עיר ב-en/fr/ru עם ממשק מתורגם בלבד — כותרת, meta, סוג נכס, עיר ותיאור בעברית. מועמדים ל-"Discovered/Crawled – currently not indexed" (71+44).
3. **Sitemap:** 676 כתובות, כולל כל הגרסאות הכפולות; ערים כפולות (בני ברק, פתח תקווה, ראשון לציון — רווח בסוף השם ב-DB).
4. **מטא בעברית קשיחה:** כותרת/תיאור האתר, og:locale=he_IL בכל השפות, JSON-LD עם URL בלי שפה, "דלגו לתוכן הראשי".
5. **כפילות מותג בכותרות** בנגישות/פרטיות/תקנון: "Privacy Policy | LS Real Estate | LS Real Estate".
6. בדפי ru: נגישות/פרטיות/תקנון מציגים גוף בעברית, ומאמרי הבלוג גוף באנגלית.

## 3. אסטרטגיה שנבחרה (החלטת בעל האתר)
מדורגת: **שלב א'** — נכסים וערים מאונדקסים בעברית בלבד; שאר השפות נגישות אבל noindex. **שלב ב'** — תרגום AI לכל נכס עם עריכה ואישור אנושי; שפה נכנסת לאינדקס רק אחרי פרסום תרגום מאושר. לא מתרגמים את כל 127 בבת אחת.

## 4. מה בוצע (שלב א') — נפרס לייצור (commit `6738d9a`)
**מנגנון SEO אחיד** — `lib/alternates.ts`, פונקציה `buildSeo(path, locale, indexedLocales)`:
- שפה מאונדקסת → canonical עצמי עם שפה (`https://www.nadlannow.co.il/en/about`).
- hreflang רק כשיש יותר משפה מאונדקסת אחת, הדדי, רק לשפות מאונדקסות, `x-default` → עברית.
- שפה לא מאונדקסת → `robots: noindex, follow`, **בלי canonical ובלי hreflang** (לפי ההנחיה לא לשים canonical עצמי על noindex).

| סוג דף | שפות מאונדקסות |
|---|---|
| נכסים, ערים, שירותים, מאמרי CMS | he |
| מאמרי בלוג סטטיים, נגישות, פרטיות, תקנון | he, en, fr |
| בית, רשימת נכסים, אודות, FAQ, צור קשר, דרושים, בלוג | he, en, fr, ru |

**Sitemap** (`app/sitemap.ts`): רק גרסאות מאונדקסות, 676 → 209 כתובות; ערים מאוחדות לפי slug.

**מילון מונחים סגור** (`lib/terms.ts`): 23 סוגי נכס, 28 ערים, "אין/מידי/גמיש" → en/fr/ru. מונח חסר → מוצג בעברית. תיאורי נכסים **לא** תורגמו; כשאין תרגום מוצג המקור העברי עם תווית "Original description in Hebrew" ו-`lang="he" dir="rtl"`.

**מטא ותרגום ממשק:** כותרת/תיאור לדף נכס ועיר בכל שפה (למשל `Shops 33 sqm For Rent in Petah Tikva`), כותרת/תיאור האתר, og:locale לפי שפה, JSON-LD עם URL כולל שפה, skip-link, aria-label של breadcrumb, כרטיסי נכס.
**נשמר בכוונה:** כותרות ותיאורים בעברית של דפים מאונדקסים — זהים לחלוטין לפני ואחרי (נבדק על 172 דפים). נתוני לידים מהטופס נשלחים בעברית המקורית.

**בדיקות אוטומטיות:**
- `npm test` — 9 בדיקות יחידה: canonical/hreflang/noindex, שלמות המילון, זהות מפתחות בין 4 קבצי השפה.
- `npm run seo-check -- <url>` — בדיקה מקצה לקצה: כל כתובת ב-sitemap מחזירה 200, לא noindex, canonical = עצמה, כל hreflang מצביע לכתובת שב-sitemap, אין עברית בכותרות של en/fr/ru; דגימות noindex בלי canonical/hreflang ולא ב-sitemap.
- תוצאות: TypeScript ✔, build ✔, seo-check מקומי ✔, **seo-check מול האתר החי אחרי הפריסה ✔ (209 כתובות)**. lint: 2 שגיאות ו-6 אזהרות קיימות מראש, לא בקוד ששונה.

## 5. מיתוג (commit `6e2c96a`) — נפרס לייצור, seo-check מול האתר החי ✔ (209 כתובות)
- "שלומי לימור / מבית LS נדל"ן" ליד הלוגו בכל הדפים, בשורת ה-hero בעמוד הבית ובפוטר.
- תבנית כותרת: `<כותרת> | שלומי לימור מבית LS נדל"ן` (en: `Shlomy Limor of LS Real Estate`, fr: `Shlomy Limor de LS Immobilier`, ru: `Шломи Лимор — LS Недвижимость`). עמוד הבית: `שלומי לימור מבית LS נדל"ן — נכסים מסחריים ומגורים למכירה ולהשכרה`.
- תוקנה כפילות המותג בכותרות (סעיף 2.5). דפי נחיתה `/l/...` (מותג "שחף נכסים") לא שונו.
- **שינוי מכוון בכותרות העבריות המאונדקסות** — ייקח לגוגל ימים-שבועות לעדכן; כותרות ארוכות (מאמרים) ייחתכו בתוצאות.

## 6. שלב ב' — מוכן, לא הופעל
- `docs/translation-migration.sql` (**לא הורץ**): טבלה `property_translations` (property_id, locale en/fr/ru, title, description, status: draft/in_review/published/rejected/stale, source ai/human, model, source_hash, reviewed_by/at, published_at), unique(property_id, locale); RLS: anon קורא רק published של נכסים מוצגים; טריגר שמעביר תרגום ל-stale כשהתיאור העברי משתנה (→ הדף חוזר ל-noindex); כולל rollback.
- `docs/translation-plan.md`: זרימה (טיוטת AI ב-CRM → עריכה → אישור → פרסום), חיבור באתר (~15 שורות: `propertyLocales(published)` כבר קיים), פיילוט 10 נכסים באנגלית.
- החלטות פתוחות: מודל/ספק AI, מי מאשר ומאיזה מסך, מתי לאנדקס ערים בשפות זרות.

## 7. פתוח / לא טופל
- כרטיסי "דרושים" ורשימות החיפוש עדיין מציגים מונחים בעברית בשפות זרות.
- 60 מתוך 127 נכסים עם תיאור קצר מ-80 תווים — בעיית תוכן.
- הפריסה כללה גם עבודה קודמת שלא פורסמה: דפי שירותים (`/he/services/*`) ושיפור רינדור מאמרי CMS.

## 8. פעולות ב-Google Search Console
1. Sitemaps → להגיש מחדש `https://www.nadlannow.co.il/sitemap.xml`.
2. URL Inspection על `/he/properties/624` (צפוי: ניתן לאינדוקס, canonical עצמי) ועל `/en/properties/624` (צפוי: Excluded by noindex) → Request indexing לגרסה העברית.
3. Validate fix ב-"Alternative page with proper canonical tag" וב-"Crawled – currently not indexed".
4. צפוי בשבועות הקרובים: עלייה ב-"Excluded by noindex" (מכוון), ירידה ב-"Alternative page" וב-"Discovered/Crawled – not indexed". מעקב 2–4 שבועות.

## 9. שאלות מומלצות לבודק
- האם נכון להשאיר דפי נכס בשפות זרות ב-noindex,follow בלי canonical (במקום canonical לעברית)?
- האם hreflang רק כשיש 2+ שפות מאונדקסות תקין, ו-x-default → עברית?
- האם להוסיף את שם הסוכן לכל הכותרות או רק לעמוד הבית ולדפי מפתח?
- סדר עדיפויות לשלב ב': אילו נכסים לתרגם ראשונים?
