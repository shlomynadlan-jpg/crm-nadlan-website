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

## פיילוט: 10 נכסים, אנגלית בלבד (עודכן 2026-11-21)
**מועמדים** (תיאור ≥150 תווים, עיר תקינה, סוג נכס נקי; עדיפות למחיר/תמונה אמיתית/פ"ת):
638, 623, 624, 639, 630, 619, 627, 708, 693, 695.
לפני תרגום: להשלים מחיר ותמונות אמיתיות לפחות ל-630/619/627 — תרגום של דף בלי מחיר ותמונה לא ישפר המרות.

**שלבים:**
1. אישור והרצת `docs/translation-migration.sql` (טבלה + RLS + טריגר stale).
2. CRM: כפתור "תרגם לאנגלית" → טיוטת AI (`status='draft'`, `source='ai'`, `model`, `source_hash`). המונחון `lib/terms.ts` נשלח למודל; מספרים, כתובות ושמות פרויקטים לא מתורגמים.
3. CRM: מסך עברית↔אנגלית, עריכה אנושית, כפתור "אשר ופרסם" → `published` + `reviewed_by/at`.
4. אתר: ~15 שורות (סעיף "חיבור באתר"). `/en/properties/<id>` נכנס לאינדקס רק עם `published`, עם canonical עצמי ו-hreflang he↔en.
5. שינוי בתיאור העברי → הטריגר מסמן `stale` → הדף האנגלי חוזר ל-noindex עד אישור מחדש (אין פרסום תרגום מיושן).
6. בדיקות: `npm test` (propertyLocales), `seo-check` (sitemap↔canonical↔hreflang), בדיקה ידנית של 10 הדפים.
7. מדידה 3–4 שבועות ב-Search Console (חשיפות/קליקים ב-/en/properties/*) → החלטה על fr/ru ועל הרחבה.

**הרחבה ל-fr/ru:** אותה טבלה ואותה זרימה (`locale in ('en','fr','ru')` כבר במיגרציה), בלי שינוי סכמה.
**שים לב:** בטבלת `properties` קיימות עמודות `description_en/description_fr` (ריקות ב-127 הנכסים). האתר מציג אותן אם ימולאו, **בלי** סטטוס אישור — לא למלא אותן ידנית; הפיילוט עובר רק דרך `property_translations`.
- לא מתרגמים את כל 127 בבת אחת.

## החלטות פתוחות
- מודל ה-AI וספק (נדרש מפתח API בצד ה-CRM, לא באתר).
- מי מאשר תרגומים ומאיזה מסך ב-CRM.
- ערים: יאונדקסו בשפה זרה כשרוב הנכסים בעיר מתורגמים? (כרגע עברית בלבד).
