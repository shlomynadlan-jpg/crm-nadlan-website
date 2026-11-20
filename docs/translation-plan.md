# תוכנית תרגום נכסים (שלב ב')

**מצב:** טיוטה, לא הופעל. המיגרציה: `docs/translation-migration.sql` (לא הורצה).

## עיקרון
- דף נכס בשפה זרה נכנס לאינדקס **רק** כשיש לו שורה `status='published'` ב-`property_translations`.
- עד אז: הדף נגיש, `noindex,follow`, בלי canonical/hreflang, מחוץ ל-sitemap (שלב א', פעיל).
- מונחים מרשימה סגורה (סוג, עיר, "מידי"...) — מילון קבוע `lib/terms.ts`, לא AI.

## זרימה
1. **טיוטה (CRM):** כפתור "תרגם" לנכס → שרת ה-CRM שולח לـAI את התיאור העברי + מילון `TERMS` כמונחון → שומר `draft`, `source='ai'`, `source_hash=md5(description)`.
2. **עריכה ואישור (CRM):** מסך השוואה עברית/תרגום, עריכה חופשית → `published` (נשמרים `reviewed_by`, `reviewed_at`).
3. **שינוי בעברית:** טריגר מעביר תרגום מפורסם ל-`stale` → האתר חוזר אוטומטית ל-noindex עד אישור מחדש.

## חיבור באתר (אחרי הרצת המיגרציה — ~15 שורות)
- `lib/properties.ts`: `getPublishedTranslations(ids)` — שאילתה אחת, מחזירה `{property_id, locale, title, description}`.
- דף נכס: תיאור/כותרת מהתרגום; `buildSeo(path, locale, propertyLocales(published))`.
- `app/sitemap.ts`: `propertyLocales(publishedByProperty[p.id])` במקום `propertyLocales()`.
- `scripts/seo-check.mjs` כבר בודק שכל URL ב-sitemap מאונדקס עם canonical עצמי ו-hreflang הדדי.

## פיילוט מומלץ
- 10 נכסים עם תיאור ≥ 150 תווים, אנגלית בלבד → בדיקה ב-Search Console אחרי 3–4 שבועות → הרחבה ל-ru/fr.
- לא מתרגמים את כל 127 בבת אחת.

## החלטות פתוחות
- מודל ה-AI וספק (נדרש מפתח API בצד ה-CRM, לא באתר).
- מי מאשר תרגומים ומאיזה מסך ב-CRM.
- ערים: יאונדקסו בשפה זרה כשרוב הנכסים בעיר מתורגמים? (כרגע עברית בלבד).
