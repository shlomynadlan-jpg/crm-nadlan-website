export interface ArticleBlock {
  type: 'p' | 'h2' | 'ul' | 'tip'
  text?: string
  items?: string[]
}

export interface Article {
  slug: string
  date: string
  readingMinutes: number
  image: string
  // Hebrew (default)
  title: string
  description: string
  imageAlt: string
  blocks: ArticleBlock[]
  // English
  title_en: string
  description_en: string
  blocks_en: ArticleBlock[]
  // French
  title_fr: string
  description_fr: string
  blocks_fr: ArticleBlock[]
  // Russian (optional — falls back to English)
  title_ru?: string
  description_ru?: string
  blocks_ru?: ArticleBlock[]
}

export interface LocalizedArticle {
  slug: string
  date: string
  readingMinutes: number
  image: string
  title: string
  description: string
  imageAlt: string
  blocks: ArticleBlock[]
}

export function localizeArticle(article: Article, locale: string): LocalizedArticle {
  if (locale === 'en') return { slug: article.slug, date: article.date, readingMinutes: article.readingMinutes, image: article.image, title: article.title_en, description: article.description_en, imageAlt: article.imageAlt, blocks: article.blocks_en }
  if (locale === 'fr') return { slug: article.slug, date: article.date, readingMinutes: article.readingMinutes, image: article.image, title: article.title_fr, description: article.description_fr, imageAlt: article.imageAlt, blocks: article.blocks_fr }
  if (locale === 'ru') return { slug: article.slug, date: article.date, readingMinutes: article.readingMinutes, image: article.image, title: article.title_ru ?? article.title_en, description: article.description_ru ?? article.description_en, imageAlt: article.imageAlt, blocks: article.blocks_ru ?? article.blocks_en }
  return { slug: article.slug, date: article.date, readingMinutes: article.readingMinutes, image: article.image, title: article.title, description: article.description, imageAlt: article.imageAlt, blocks: article.blocks }
}

export function getLocalizedArticles(locale: string): LocalizedArticle[] {
  return articles.map(a => localizeArticle(a, locale))
}

export function getLocalizedArticle(slug: string, locale: string): LocalizedArticle | undefined {
  const a = articles.find(a => a.slug === slug)
  return a ? localizeArticle(a, locale) : undefined
}

export const AUTHOR = 'שלומי לימור'

export const articles: Article[] = [
  {
    slug: 'selling-a-business',
    title: 'מוכרים עסק פעיל? כך עושים את זה נכון — בלי להרוס אותו בדרך',
    description: 'הערכת שווי, שמירה על סודיות, סינון קונים והעברת השכירות — המדריך המלא למכירת עסק חי, מהניסיון בשטח.',
    title_en: 'Selling an Active Business? How to Do It Right — Without Ruining It Along the Way',
    description_en: 'Valuation, confidentiality, buyer screening, and lease transfer — the complete guide to selling a live business, from real field experience.',
    title_fr: 'Vous vendez une entreprise active ? Comment bien s\'y prendre — sans la détruire en chemin',
    description_fr: 'Évaluation, confidentialité, sélection des acheteurs et transfert de bail — le guide complet pour vendre une entreprise active, tiré de l\'expérience terrain.',
    title_ru: 'Продажа действующего бизнеса? Как сделать это правильно — не разрушив его по пути',
    description_ru: 'Оценка стоимости, конфиденциальность, отбор покупателей и передача аренды — полный гид по продаже действующего бизнеса из реального опыта.',
    date: '2026-07-14',
    readingMinutes: 7,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'לחיצת יד בין שני אנשי עסקים בסגירת עסקה',
    blocks_en: [
      { type: 'p', text: 'Selling an active business differs from any other real estate transaction in one fundamental way: the asset breathes. It has employees, customers, suppliers, and a reputation — and any mistake in the sale process can damage its value before a deal is even signed. After guiding quite a few such transactions, I\'ve compiled here everything every business owner needs to know before they start.' },
      { type: 'h2', text: 'Step One: What Is Your Business Actually Worth?' },
      { type: 'p', text: 'Most business owners value their business from the heart, not from the numbers. In the Israeli market, small and medium businesses are typically sold using a multiple of annual operating profit — usually between 2 and 4, depending on the sector, income stability, and how dependent the business is on its owner. A business earning ₪400,000 per year that can function without the owner is worth more than one earning ₪600,000 that collapses the day the owner walks out the door.' },
      { type: 'ul', items: ['Representative operating profit — 3-year average, adjusted for one-time expenses and extraordinary owner salary', 'Equipment and inventory value — counted separately or included, but must be clearly defined', 'Goodwill and repeat customers — signed contracts and subscribers are worth more than a "loyal customer base" with no documentation', 'The lease agreement — we\'ll discuss this in detail, because it\'s the heart of the deal'] },
      { type: 'h2', text: 'The Point Everyone Misses: The Lease Is Half the Deal' },
      { type: 'p', text: 'A business without a location is not a business. A successful restaurant with a lease expiring in a year and no options is worth half of what you think. Before going to market, check: how many years remain on the lease including options? Does the lease allow assignment (transfer of rights) to the buyer? And what is the landlord\'s position? Most leases require landlord consent to transfer — and it\'s worth sounding them out early, gently. This is exactly where our experience as real estate brokers meets the world of business sales.' },
      { type: 'h2', text: 'Confidentiality: The Best Sale Is One Nobody Heard About' },
      { type: 'p', text: 'The moment employees, suppliers, or competitors hear the business is for sale — damage begins: employees start job hunting, suppliers tighten terms, and competitors tell your customers you\'re "closing down." So the right process works like this:' },
      { type: 'ul', items: ['Anonymous listing — "food industry business in the central region," no name, no address', 'Signing a confidentiality agreement (NDA) before disclosing any identifying details', 'Serious buyer screening: proof of financial capacity before opening the books', 'Employees are informed at a late stage — in a version you control'] },
      { type: 'h2', text: 'Preparing the Books — A Year Ahead If Possible' },
      { type: 'p', text: 'A serious buyer will request profit and loss statements, VAT reports, and bank statements. A business where some income is "off the books" discovers a painful truth at this stage: what isn\'t reported doesn\'t exist, and can\'t be sold either. If you\'re planning a sale in one to two years, now is the time to get full reporting in order. Every ₪1 of reported profit can be worth ₪2–4 in the sale price.' },
      { type: 'h2', text: 'Deal Structure: Assets or Shares?' },
      { type: 'p', text: 'In most small businesses, what\'s sold is the "operations" (assets, equipment, goodwill, and name) rather than the company itself — so the buyer doesn\'t inherit historical debts and liabilities. The transaction has different tax implications for each party, so an accountant and lawyer aren\'t a recommendation — they\'re a condition. And importantly: a defined handover period (usually 1–3 months) where you teach the buyer the business is part of the deal and should be priced in from the start.' },
      { type: 'tip', text: 'Field tip: The average time to sell a business in Israel is 6–12 months. Sellers who close quickly and at a good price are those who came prepared — with organized books, a long lease, and answers to every question. Don\'t wait for "a buyer to show up" to start preparing.' },
      { type: 'p', text: 'Considering whether to sell? Want a discreet valuation of your business and property? Talk to us — 055-2702800. Full confidentiality guaranteed.' },
    ],
    blocks_fr: [
      { type: 'p', text: 'La vente d\'une entreprise active diffère de toute autre transaction immobilière par un point essentiel : l\'actif est vivant. Il y a des employés, des clients, des fournisseurs et une réputation — et la moindre erreur dans le processus de vente peut nuire à sa valeur avant même qu\'une transaction soit signée. Après avoir accompagné de nombreuses transactions de ce type, j\'ai rassemblé ici tout ce que chaque chef d\'entreprise doit savoir avant de commencer.' },
      { type: 'h2', text: 'Première étape : combien vaut vraiment votre entreprise ?' },
      { type: 'p', text: 'La plupart des chefs d\'entreprise évaluent leur entreprise avec le cœur, pas avec les chiffres. Sur le marché israélien, les petites et moyennes entreprises se vendent généralement sur la base d\'un multiple du bénéfice d\'exploitation annuel — habituellement entre 2 et 4, selon le secteur, la stabilité des revenus et la dépendance de l\'entreprise envers son propriétaire. Une entreprise qui génère 400 000 ₪ par an et peut fonctionner sans son propriétaire vaut plus qu\'une entreprise générant 600 000 ₪ qui s\'effondre dès que le propriétaire part.' },
      { type: 'ul', items: ['Bénéfice d\'exploitation représentatif — moyenne sur 3 ans, ajustée des dépenses exceptionnelles et du salaire extraordinaire du propriétaire', 'Valeur du matériel et des stocks — comptés séparément ou inclus, mais doivent être clairement définis', 'Fonds commercial et clients fidèles — les contrats signés et abonnements valent plus qu\'une "clientèle fidèle" sans documentation', 'Le bail commercial — nous en parlerons en détail, car c\'est le cœur de la transaction'] },
      { type: 'h2', text: 'Le point que tout le monde rate : le bail, c\'est la moitié de la transaction' },
      { type: 'p', text: 'Une entreprise sans local n\'est pas une entreprise. Un restaurant prospère avec un bail expirant dans un an et sans option vaut la moitié de ce que vous pensez. Avant de vous lancer sur le marché, vérifiez : combien d\'années reste-t-il sur le bail, options comprises ? Le bail autorise-t-il la cession à l\'acheteur ? La plupart des baux nécessitent l\'accord du propriétaire pour la cession — mieux vaut le sonder tôt, en douceur. C\'est exactement là que notre expérience d\'agents immobiliers rejoint le monde de la cession d\'entreprises.' },
      { type: 'h2', text: 'Confidentialité : la meilleure vente est celle dont personne n\'a entendu parler' },
      { type: 'p', text: 'Dès que les employés, fournisseurs ou concurrents apprennent que l\'entreprise est à vendre — les dégâts commencent : les employés cherchent du travail, les fournisseurs durcissent leurs conditions, les concurrents disent à vos clients que vous "fermez". Le bon processus fonctionne donc ainsi :' },
      { type: 'ul', items: ['Annonce anonyme — "entreprise du secteur alimentaire en région centrale", sans nom ni adresse', 'Signature d\'un accord de confidentialité (NDA) avant de divulguer tout détail identifiant', 'Sélection sérieuse des acheteurs : preuve de capacité financière avant d\'ouvrir les livres', 'Les employés sont informés à un stade tardif — dans une version que vous contrôlez'] },
      { type: 'h2', text: 'Préparer les comptes — un an à l\'avance si possible' },
      { type: 'p', text: 'Un acheteur sérieux demandera des comptes de résultat, des déclarations de TVA et des relevés bancaires. Une entreprise dont une partie des revenus est "au noir" découvre une vérité douloureuse : ce qui n\'est pas déclaré n\'existe pas, et ne peut pas se vendre non plus. Si vous planifiez une vente dans un à deux ans, c\'est maintenant qu\'il faut mettre les déclarations en ordre. Chaque shekel de bénéfice déclaré peut valoir 2 à 4 shekels dans le prix de vente.' },
      { type: 'h2', text: 'Structure de la transaction : actifs ou actions ?' },
      { type: 'p', text: 'Dans la plupart des petites entreprises, ce qui se vend c\'est l\'"activité" (actifs, matériel, fonds commercial et enseigne) et non la société elle-même — ainsi l\'acheteur n\'hérite pas des dettes et engagements passés. La transaction a des implications fiscales différentes pour chaque partie, donc comptable et avocat ne sont pas une recommandation — ils sont une condition. Et important : une période de passation définie (généralement 1 à 3 mois) fait partie de la transaction et doit être valorisée dès le départ.' },
      { type: 'tip', text: 'Conseil terrain : le délai moyen pour vendre une entreprise en Israël est de 6 à 12 mois. Les vendeurs qui concluent rapidement et à bon prix sont ceux qui sont venus préparés — avec une comptabilité en ordre, un bail long et des réponses à toutes les questions. N\'attendez pas qu\'un acheteur se présente pour commencer à vous préparer.' },
      { type: 'p', text: 'Vous vous demandez si vendre ? Vous souhaitez une évaluation discrète de votre entreprise ? Parlez-nous — 055-2702800. Confidentialité totale garantie.' },
    ],
    blocks: [
      { type: 'p', text: 'מכירת עסק פעיל שונה מכל עסקת נדל״ן אחרת בדבר אחד מהותי: הנכס נושם. יש בו עובדים, לקוחות, ספקים ומוניטין — וכל טעות בתהליך המכירה יכולה לפגוע בשווי שלו עוד לפני שנחתמה עסקה. אחרי ליווי של לא מעט עסקאות כאלה, ריכזתי כאן את מה שכל בעל עסק חייב לדעת לפני שהוא מתחיל.' },
      { type: 'h2', text: 'שלב ראשון: כמה העסק שלכם באמת שווה?' },
      { type: 'p', text: 'רוב בעלי העסקים מעריכים את העסק שלהם לפי הלב, לא לפי המספרים. בשוק הישראלי, עסקים קטנים ובינוניים נמכרים לרוב לפי מכפיל על הרווח התפעולי השנתי — בדרך כלל בין 2 ל-4, תלוי בענף, ביציבות ההכנסות ובתלות של העסק בבעלים. עסק שמרוויח 400 אלף ₪ בשנה ויכול לתפקד בלי הבעלים — שווה יותר מעסק שמרוויח 600 אלף אבל קורס ביום שהבעלים יוצא מהדלת.' },
      { type: 'ul', items: [
        'רווח תפעולי מייצג — ממוצע 3 שנים, מנוטרל הוצאות חד-פעמיות ושכר בעלים חריג',
        'שווי הציוד והמלאי — נספרים בנפרד או נכללים, אבל חייבים להיות מוגדרים',
        'מוניטין ולקוחות חוזרים — חוזים חתומים ומנויים שווים יותר מ"קהל נאמן" שאין לו תיעוד',
        'חוזה השכירות — נדבר עליו בהרחבה, כי הוא לב העסקה',
      ] },
      { type: 'h2', text: 'הנקודה שכולם מפספסים: השכירות היא חצי מהעסקה' },
      { type: 'p', text: 'עסק בלי מקום הוא לא עסק. מסעדה מצליחה עם חוזה שכירות שנגמר בעוד שנה ובלי אופציות — שווה חצי ממה שנדמה לכם. לפני שיוצאים לשוק, בדקו: כמה שנים נשארו בחוזה כולל אופציות? האם החוזה מתיר הסבה (העברת זכויות) לרוכש? ומה עמדת בעל הנכס? ברוב החוזים נדרשת הסכמתו להעברה — וכדאי לגשש מולו מוקדם, בעדינות. זה בדיוק המקום שבו הניסיון שלנו כמתווכי נדל״ן פוגש את עולם מכירת העסקים.' },
      { type: 'h2', text: 'סודיות: המכירה הכי טובה היא זו שאף אחד לא שמע עליה' },
      { type: 'p', text: 'ברגע שעובדים, ספקים או מתחרים שומעים שהעסק למכירה — מתחיל נזק: עובדים מתחילים לחפש עבודה, ספקים מקשיחים תנאים, ומתחרים מספרים ללקוחות שלכם ש"הם נסגרים". לכן התהליך הנכון עובד כך:' },
      { type: 'ul', items: [
        'פרסום אנונימי — "עסק מתחום המזון באזור המרכז", בלי שם ובלי כתובת',
        'חתימה על הסכם סודיות (NDA) לפני חשיפת כל פרט מזהה',
        'סינון רציני של קונים: הוכחת יכולת פיננסית לפני שנכנסים לספרים',
        'העובדים מעודכנים בשלב מאוחר — ובגרסה שאתם שולטים בה',
      ] },
      { type: 'h2', text: 'להכין את הספרים — שנה מראש אם אפשר' },
      { type: 'p', text: 'קונה רציני יבקש דוחות רווח והפסד, דוחות מע״מ ותנועות בנק. עסק שחלק מהכנסותיו "לא רשומות" מגלה בשלב הזה אמת כואבת: מה שלא מדווח — לא קיים, וגם לא נמכר. אם אתם מתכננים מכירה בעוד שנה-שנתיים, זה הזמן לסדר דיווח מלא. כל שקל רווח מדווח יכול לשוות 2–4 שקלים במחיר המכירה.' },
      { type: 'h2', text: 'מבנה העסקה: נכסים או מניות?' },
      { type: 'p', text: 'ברוב העסקים הקטנים מוכרים "פעילות" (נכסים, ציוד, מוניטין ושם) ולא את החברה עצמה — כך הקונה לא יורש חובות והתחייבויות היסטוריות. לעסקה יש השלכות מס שונות לכל צד, ולכן רואה חשבון ועורך דין הם לא המלצה — הם תנאי. וחשוב: תקופת חפיפה מוגדרת (בדרך כלל 1–3 חודשים) שבה אתם מלמדים את הקונה את העסק, היא חלק מהעסקה וכדאי לתמחר אותה מראש.' },
      { type: 'tip', text: 'טיפ מהשטח: הזמן הממוצע למכירת עסק בישראל הוא 6–12 חודשים. המוכרים שסוגרים מהר ובמחיר טוב הם אלה שהגיעו מוכנים — עם ספרים מסודרים, חוזה שכירות ארוך ותשובות לכל שאלה. אל תחכו ש"יגיע קונה" כדי להתחיל להתכונן.' },
      { type: 'p', text: 'מתלבטים אם למכור? רוצים הערכה דיסקרטית של שווי העסק והנכס? דברו איתנו — 055-2702800. דיסקרטיות מלאה מובטחת.' },
    ],
  },
  {
    slug: 'office-lease-checklist',
    title: '10 דברים שחייבים לבדוק לפני שחותמים על חוזה שכירות למשרד',
    description: 'דמי ניהול, מקדם העמסה, שעות מיזוג, אופציות יציאה — הצ׳קליסט המלא שיחסוך לכם הפתעות יקרות בחוזה השכירות הבא.',
    title_en: '10 Things You Must Check Before Signing an Office Lease',
    description_en: 'Management fees, load factor, AC hours, exit options — the complete checklist that will save you from expensive surprises in your next office lease.',
    title_fr: '10 choses à vérifier absolument avant de signer un bail de bureau',
    description_fr: 'Charges de copropriété, coefficient de surface, horaires de climatisation, options de sortie — la checklist complète qui vous évitera de coûteuses surprises.',
    title_ru: '10 вещей, которые нужно проверить перед подписанием договора аренды офиса',
    description_ru: 'Расходы на управление, коэффициент загрузки, часы работы кондиционера, опции выхода — полный чеклист, который защитит вас от дорогих сюрпризов.',
    date: '2026-07-13',
    readingMinutes: 6,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'חלל משרדים מודרני עם עמדות עבודה',
    blocks_en: [
      { type: 'p', text: 'Found an office you love? Before you sign, stop. After hundreds of leases I\'ve guided, I can tell you one thing with certainty: the expensive surprises are never in the price per sqm. They hide in the fine print. Here are the ten things I check for every client — before they take out a pen.' },
      { type: 'h2', text: '1. Management Fees — Your Second Rent' },
      { type: 'p', text: 'In office buildings, management fees typically range from ₪15 to ₪25 per sqm, and in newer towers can climb even higher. On a 150 sqm office that\'s another ₪2,500–₪3,500 per month — before you\'ve paid a shekel in rent. Always ask to see exactly what\'s included: cleaning? security? AC maintenance? And what happens when management fees are updated.' },
      { type: 'h2', text: '2. Load Factor — How Many Sqm You\'re Actually Getting' },
      { type: 'p', text: 'The price is set per gross area, but you work in net area. The difference — the load factor — ranges from 8% in older buildings to 20% and more in towers with grand lobbies. A "150 sqm" office with an 18% load factor gives you roughly 123 sqm to work in. Always compare prices per net sqm.' },
      { type: 'h2', text: '3. AC Hours' },
      { type: 'p', text: 'Sounds trivial? Absolutely not. In many buildings the central AC operates Sunday–Thursday until 18:00 or 19:00. If your business works evenings, Fridays, or Saturdays — find out how much extra AC hours cost. I\'ve seen tech companies paying thousands of shekels per month just for that.' },
      { type: 'h2', text: '4. Parking — How Many, Where, and at What Cost' },
      { type: 'p', text: 'The parking standard in office buildings is usually one space per 30–50 sqm. Check: how many spaces are tied to the property? Are they dedicated or "floating"? And how much does an additional employee space cost — in central Tel Aviv towers that can reach ₪700–₪1,000 per month per space.' },
      { type: 'h2', text: '5. Option Period and Its Terms' },
      { type: 'p', text: 'A good lease gives you certainty without locking you in. Pay attention not just to how many option years there are, but at what price: an option "at market rates" isn\'t really certainty. Better to have a defined mechanism — for example, linked to CPI plus a known fixed percentage.' },
      { type: 'h2', text: '6. Early Exit Clause' },
      { type: 'p', text: 'Businesses change. If there\'s any chance you\'ll grow (or shrink) before the lease ends, try to anchor an exit clause — for example, after 24 months with 3–4 months\' notice, or the right to bring a substitute tenant. A landlord who refuses all flexibility is telling you something about themselves.' },
      { type: 'h2', text: '7. Who Pays for Fit-Out' },
      { type: 'p', text: 'Fitting out an office — walls, flooring, kitchenette, meeting rooms — easily costs ₪1,500–₪3,500 per sqm. In a strong tenant\'s market you can get significant landlord contribution or a rent-free period. This is one of the most worthwhile items to negotiate hard on.' },
      { type: 'h2', text: '8. Guarantees and Securities' },
      { type: 'p', text: 'A bank guarantee of 3–6 months\' rent is the standard. A bank guarantee "locks" your credit line — check if the landlord will settle for a corporate guarantee plus a promissory note, or a cash deposit. The difference in cash flow can be significant for a young business.' },
      { type: 'h2', text: '9. Municipal Tax — Check the Classification' },
      { type: 'p', text: 'Office municipal tax varies dramatically between cities and between classifications within the same city — from ₪250 per sqm per year to ₪400 and more in major city centers. Ask for an actual municipal tax bill for the property, not an estimate. And confirm the registered classification matches your intended use.' },
      { type: 'h2', text: '10. Legal Status and Permits' },
      { type: 'p', text: 'Is there a permit for office use? Is the property properly registered? Businesses requiring an operating license (clinics, beauty salons, restaurants) must verify the property can even receive one. A lawyer acting for you — not the landlord — needs to review the contract. Always.' },
      { type: 'tip', text: 'Field tip: Ask to visit the property twice — once in the morning and once in the afternoon. Noise, parking, direct sunlight through the glass — things you don\'t see in one quick tour with the broker.' },
      { type: 'p', text: 'Looking for an office? At LS Real Estate we go through this entire list together with you, for every property. Talk to us — 055-2702800.' },
    ],
    blocks_fr: [
      { type: 'p', text: 'Vous avez trouvé le bureau de vos rêves ? Avant de signer, arrêtez-vous. Après des centaines de baux que j\'ai accompagnés, je peux vous dire une chose avec certitude : les mauvaises surprises coûteuses ne se trouvent jamais dans le prix au m². Elles se cachent dans les petites clauses. Voici les dix choses que je vérifie pour chaque client — avant qu\'il ne sorte son stylo.' },
      { type: 'h2', text: '1. Les charges de copropriété — votre second loyer' },
      { type: 'p', text: 'Dans les immeubles de bureaux, les charges de copropriété s\'élèvent généralement entre 15 et 25 ₪ par m², et dans les nouvelles tours peuvent dépasser ce montant. Pour un bureau de 150 m², c\'est encore 2 500 à 3 500 ₪ par mois — avant de payer un shekel de loyer. Demandez toujours à voir exactement ce qui est inclus : nettoyage ? sécurité ? entretien de la climatisation ? Et ce qui se passe quand les charges sont révisées.' },
      { type: 'h2', text: '2. Le coefficient de surface — combien de m² vous obtenez vraiment' },
      { type: 'p', text: 'Le prix est fixé sur la surface brute, mais vous travaillez sur la surface nette. La différence — le coefficient de surface — varie de 8% dans les bâtiments anciens à 20% et plus dans les tours avec des halls somptueux. Un bureau de "150 m²" avec un coefficient de 18% vous donne en pratique environ 123 m² utilisables. Comparez toujours les prix au m² net.' },
      { type: 'h2', text: '3. Les horaires de climatisation' },
      { type: 'p', text: 'Ça semble insignifiant ? Absolument pas. Dans beaucoup de bâtiments, la climatisation centrale fonctionne du dimanche au jeudi jusqu\'à 18h ou 19h. Si votre entreprise travaille en soirée, le vendredi ou le samedi — renseignez-vous sur le coût d\'une heure de climatisation supplémentaire. J\'ai vu des sociétés high-tech payer des milliers de shekels par mois rien que pour ça.' },
      { type: 'h2', text: '4. Les places de parking — combien, où, et à quel prix' },
      { type: 'p', text: 'Le standard de stationnement dans les immeubles de bureaux est généralement d\'une place pour 30 à 50 m². Vérifiez : combien de places sont attachées au bien ? Sont-elles dédiées ou "flottantes" ? Et combien coûte une place supplémentaire — dans les tours du centre de Tel-Aviv, cela peut atteindre 700 à 1 000 ₪ par mois.' },
      { type: 'h2', text: '5. La période d\'option et ses conditions' },
      { type: 'p', text: 'Un bon bail vous donne de la visibilité sans vous enfermer. Attention non seulement au nombre d\'années d\'option, mais aussi au prix : une option "aux prix du marché" n\'est pas vraiment une garantie. Il vaut mieux un mécanisme défini — par exemple, indexé sur l\'inflation plus un pourcentage fixe connu à l\'avance.' },
      { type: 'h2', text: '6. La clause de sortie anticipée' },
      { type: 'p', text: 'Les entreprises évoluent. Si vous avez une chance de croître (ou de réduire) avant la fin du bail, essayez d\'ancrer une clause de sortie — par exemple, après 24 mois avec un préavis de 3 à 4 mois, ou le droit de trouver un locataire de substitution. Un propriétaire qui refuse toute flexibilité vous dit quelque chose sur lui-même.' },
      { type: 'h2', text: '7. Qui paie l\'aménagement' },
      { type: 'p', text: 'Aménager un bureau — cloisons, sol, kitchenette, salles de réunion — coûte facilement 1 500 à 3 500 ₪ par m². Dans un marché favorable aux locataires, vous pouvez obtenir une participation significative du propriétaire ou une période de franchise de loyer. C\'est l\'un des points les plus rentables à négocier.' },
      { type: 'h2', text: '8. Garanties et cautions' },
      { type: 'p', text: 'Une garantie bancaire de 3 à 6 mois de loyer est le standard. Elle "bloque" votre ligne de crédit — vérifiez si le propriétaire accepte une garantie d\'entreprise plus un billet à ordre, ou un dépôt de garantie. La différence en trésorerie peut être significative pour une jeune entreprise.' },
      { type: 'h2', text: '9. La taxe municipale — vérifiez la classification' },
      { type: 'p', text: 'La taxe municipale pour les bureaux varie considérablement selon les villes — de 250 ₪ par m² par an à 400 ₪ et plus dans les centres-villes. Demandez une vraie quittance de taxe municipale pour le bien, pas une estimation. Et assurez-vous que la classification enregistrée correspond à votre utilisation prévue.' },
      { type: 'h2', text: '10. Statut juridique et permis' },
      { type: 'p', text: 'Y a-t-il un permis pour un usage de bureau ? Le bien est-il correctement enregistré ? Les entreprises nécessitant une licence d\'exploitation doivent vérifier que le bien peut même en obtenir une. Un avocat mandaté par vous — pas par le propriétaire — doit examiner le contrat. Toujours.' },
      { type: 'tip', text: 'Conseil terrain : demandez à visiter le bien deux fois — une fois le matin et une fois l\'après-midi. Le bruit, le stationnement, le soleil direct à travers les vitres — des choses qu\'on ne voit pas lors d\'une seule visite rapide.' },
      { type: 'p', text: 'Vous cherchez un bureau ? Chez LS Immobilier, nous passons toute cette liste avec vous, pour chaque bien. Parlez-nous — 055-2702800.' },
    ],
    blocks: [
      { type: 'p', text: 'מצאתם משרד שאתם מתים עליו? רגע לפני החתימה, עצרו. אחרי מאות עסקאות שכירות שליוויתי, אני יכול להגיד לכם דבר אחד בביטחון: ההפתעות היקרות אף פעם לא נמצאות במחיר למ״ר. הן מסתתרות בסעיפים הקטנים. הנה עשרת הדברים שאני בודק עבור כל לקוח — לפני שהוא מוציא עט מהכיס.' },
      { type: 'h2', text: '1. דמי ניהול — השכר דירה השני שלכם' },
      { type: 'p', text: 'בבנייני משרדים דמי הניהול נעים בדרך כלל בין 15 ל-25 ₪ למ״ר, ובמגדלים חדשים יכולים לטפס גם מעבר לזה. על משרד של 150 מ״ר זה עוד 2,500–3,500 ₪ בחודש — לפני ששילמתם שקל שכירות. תמיד תבקשו לראות מה בדיוק כלול: ניקיון? אבטחה? תחזוקת מיזוג? ומה קורה כשדמי הניהול מתעדכנים.' },
      { type: 'h2', text: '2. מקדם ההעמסה — כמה מ״ר אתם באמת מקבלים' },
      { type: 'p', text: 'המחיר נקבע לפי שטח ברוטו, אבל אתם עובדים בשטח נטו. ההפרש — מקדם ההעמסה — נע בין 8% בבניינים ישנים ל-20% ואף יותר במגדלים עם לובי מפואר. משרד "150 מ״ר" עם מקדם של 18% נותן לכם בפועל כ-123 מ״ר לעבוד בהם. תשוו מחירים תמיד לפי העלות למ״ר נטו.' },
      { type: 'h2', text: '3. שעות המיזוג' },
      { type: 'p', text: 'נשמע שולי? ממש לא. בהרבה בניינים המיזוג המרכזי עובד א׳–ה׳ עד 18:00 או 19:00. אם העסק שלכם עובד בערבים, בימי שישי או בשבתות — תבררו כמה עולה שעת מיזוג נוספת. ראיתי חברות הייטק שמשלמות אלפי שקלים בחודש רק על זה.' },
      { type: 'h2', text: '4. חניות — כמה, איפה, ובכמה' },
      { type: 'p', text: 'תקן החניות בבנייני משרדים הוא בדרך כלל חניה אחת לכל 30–50 מ״ר. תבדקו: כמה חניות מוצמדות לנכס? האם הן צמודות או "צפות"? וכמה עולה חניה נוספת לעובד — במגדלי מרכז תל אביב זה יכול להגיע ל-700–1,000 ₪ לחודש לחניה.' },
      { type: 'h2', text: '5. תקופת האופציה ותנאיה' },
      { type: 'p', text: 'חוזה טוב נותן לכם ודאות בלי לכלוא אתכם. שימו לב לא רק לכמה שנות אופציה יש, אלא באיזה מחיר: אופציה עם "עדכון לפי מחירי השוק" היא לא באמת ודאות. עדיף מנגנון מוגדר — למשל הצמדה למדד בתוספת אחוז ידוע מראש.' },
      { type: 'h2', text: '6. סעיף יציאה מוקדמת' },
      { type: 'p', text: 'עסקים משתנים. אם יש סיכוי שתגדלו (או תתכווצו) לפני תום החוזה, נסו לעגן סעיף יציאה — למשל אחרי 24 חודשים עם הודעה מוקדמת של 3–4 חודשים, או זכות להביא שוכר חלופי. בעל נכס שמסרב לכל גמישות מספר לכם משהו על עצמו.' },
      { type: 'h2', text: '7. מי משלם על ההתאמות (פיטאוט)' },
      { type: 'p', text: 'התאמת משרד — קירות, רצפה, מטבחון, חדרי ישיבות — עולה בקלות 1,500–3,500 ₪ למ״ר. בשוק שוכרים חזק אפשר לקבל מבעל הנכס השתתפות משמעותית או תקופת גרייס בשכירות. זה אחד הסעיפים שהכי שווה להתמקח עליהם.' },
      { type: 'h2', text: '8. ערבויות ובטחונות' },
      { type: 'p', text: 'ערבות בנקאית של 3–6 חודשי שכירות היא הסטנדרט. ערבות בנקאית "נועלת" לכם מסגרת אשראי — תבדקו אם בעל הנכס יסתפק בערבות חברה + שטר חוב, או בפיקדון. ההבדל בתזרים יכול להיות משמעותי לעסק צעיר.' },
      { type: 'h2', text: '9. ארנונה — תבדקו את הסיווג' },
      { type: 'p', text: 'ארנונה למשרדים משתנה דרמטית בין ערים ובין סיווגים באותה עיר — מ-250 ₪ למ״ר לשנה ועד 400 ₪ ויותר במרכזי הערים הגדולות. תבקשו שובר ארנונה אמיתי של הנכס, לא הערכה. ותוודאו שהסיווג הרשום מתאים לשימוש שלכם.' },
      { type: 'h2', text: '10. מצב משפטי ורישוי' },
      { type: 'p', text: 'האם יש היתר לשימוש משרדי? האם הנכס רשום כדין? עסקים שדורשים רישיון עסק (מרפאות, מכוני יופי, מסעדנות) חייבים לוודא שהנכס בכלל יכול לקבל אותו. עורך דין מטעמכם — לא מטעם בעל הנכס — צריך לעבור על החוזה. תמיד.' },
      { type: 'tip', text: 'טיפ מהשטח: תבקשו לבקר בנכס פעמיים — פעם בשעות הבוקר ופעם אחר הצהריים. רעש, חניה, שמש ישירה על הזכוכית — דברים שלא רואים בסיור אחד קצר עם המתווך.' },
      { type: 'p', text: 'מחפשים משרד? אנחנו ב-LS נדל״ן עוברים על כל הרשימה הזאת יחד אתכם, על כל נכס. דברו איתנו — 055-2702800.' },
    ],
  },
  {
    slug: 'gross-net-real-cost',
    title: 'ברוטו, נטו ומה שביניהם: כך מחשבים את העלות האמיתית של משרד',
    description: 'שכר הדירה הוא רק ההתחלה. חישוב מלא ומפורט — עם דוגמה מספרית אמיתית — של כל מה שמשרד להשכרה באמת עולה לעסק שלכם בחודש.',
    title_en: 'Gross, Net, and What\'s in Between: How to Calculate the Real Cost of an Office',
    description_en: 'Rent is just the start. A complete and detailed calculation — with a real numerical example — of everything an office for rent truly costs your business per month.',
    title_fr: 'Brut, net et ce qui se passe entre les deux : comment calculer le coût réel d\'un bureau',
    description_fr: 'Le loyer n\'est que le début. Calcul complet et détaillé — avec un exemple chiffré réel — de tout ce que coûte vraiment un bureau en location à votre entreprise chaque mois.',
    title_ru: 'Брутто, нетто и что между ними: как рассчитать реальную стоимость офиса',
    description_ru: 'Аренда — это только начало. Полный расчёт с реальным примером — всё, что офис в аренду действительно стоит вашему бизнесу в месяц.',
    date: '2026-07-13',
    readingMinutes: 5,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'מחשבון ומסמכים פיננסיים על שולחן עבודה',
    blocks_en: [
      { type: 'p', text: '"How much does this office cost?" — that\'s the first question every tenant asks, and almost always the answer they get covers only a third of the picture. The stated rent is a starting point. The real cost — the one that will appear in your profit and loss report — is 40% to 70% higher. Let\'s break it down, shekel by shekel.' },
      { type: 'h2', text: 'Step 1: Translating Gross to Net' },
      { type: 'p', text: 'Gross area includes your proportional share of common areas: lobby, corridors, elevators, safe room. The ratio between gross and net is called the load factor, and it\'s the first number to clarify. Let\'s take an example we\'ll follow throughout: an office at 120 sqm gross at ₪85 per sqm, with a load factor of 15%. The area you\'ll actually receive: approximately 104 sqm net. The real price per net sqm: not ₪85 but approximately ₪98.' },
      { type: 'h2', text: 'Step 2: Adding the Fixed Costs' },
      { type: 'ul', items: ['Rent: 120 sqm × ₪85 = ₪10,200 per month', 'Management fees: 120 sqm × ₪20 = ₪2,400 per month', 'Municipal tax: at ₪320 per sqm per year ≈ ₪3,200 per month', 'Electricity for AC and lighting: typically ₪800–₪1,500 per month', 'Contents and third-party insurance: ₪200–₪400 per month'] },
      { type: 'p', text: 'Running total: the "₪10,200" office actually costs approximately ₪17,000–₪17,700 per month. And that\'s still not the full picture.' },
      { type: 'h2', text: 'Step 3: The One-Time Costs Everyone Forgets' },
      { type: 'ul', items: ['Fit-out: even at a basic level — paint, kitchenette, two plasterboard walls — budget ₪150,000–₪400,000, or spread over the lease if the landlord participates', 'Bank guarantee: annual fee of approximately 1%–2% of the guarantee amount, plus the credit line it ties up', 'Brokerage fee: one month\'s rent plus VAT (one-time)', 'Moving costs: removals, IT infrastructure, signage — typically ₪30,000–₪80,000'] },
      { type: 'h2', text: 'Step 4: The Number That Really Matters — Total Cost Per Net Sqm' },
      { type: 'p', text: 'Take the total monthly cost (₪17,500 in our example) and divide by the net area (104 sqm): approximately ₪168 per net sqm per month. This is the comparison number between properties. A "cheap" office with a high load factor, expensive management fees, and downtown municipal tax rates can end up more expensive than an "expensive" office in an efficient building.' },
      { type: 'tip', text: 'Rule of thumb I give clients: when comparing two properties, build one table with rent + management + municipal tax per net sqm. In roughly one out of every three comparisons — the winner flips.' },
      { type: 'p', text: 'Want us to run this calculation for you on a specific property? Send us the details and we\'ll get back to you with the full picture — no surprises.' },
    ],
    blocks_fr: [
      { type: 'p', text: '"Combien coûte ce bureau ?" — c\'est la première question que pose chaque locataire, et presque toujours la réponse qu\'il obtient ne couvre qu\'un tiers du tableau. Le loyer affiché est un point de départ. Le coût réel — celui qui apparaîtra dans votre compte de résultat — est supérieur de 40% à 70%. Décomposons-le, shekel par shekel.' },
      { type: 'h2', text: 'Étape 1 : traduire le brut en net' },
      { type: 'p', text: 'La surface brute inclut votre part proportionnelle des parties communes : hall, couloirs, ascenseurs, abri. Le rapport entre brut et net s\'appelle le coefficient de surface, et c\'est le premier chiffre à clarifier. Prenons un exemple : un bureau proposé à 120 m² brut à 85 ₪ le m², avec un coefficient de surface de 15%. La surface réelle : environ 104 m² net. Le prix réel au m² net : non pas 85 ₪ mais environ 98 ₪.' },
      { type: 'h2', text: 'Étape 2 : ajouter les coûts fixes' },
      { type: 'ul', items: ['Loyer : 120 m² × 85 ₪ = 10 200 ₪ par mois', 'Charges de copropriété : 120 m² × 20 ₪ = 2 400 ₪ par mois', 'Taxe municipale : à 320 ₪ le m² par an ≈ 3 200 ₪ par mois', 'Électricité pour la climatisation et l\'éclairage : généralement 800 à 1 500 ₪ par mois', 'Assurance contenu et responsabilité civile : 200 à 400 ₪ par mois'] },
      { type: 'p', text: 'Total intermédiaire : le bureau à "10 200 ₪" coûte en réalité environ 17 000 à 17 700 ₪ par mois. Et ce n\'est toujours pas le tableau complet.' },
      { type: 'h2', text: 'Étape 3 : les coûts ponctuels que tout le monde oublie' },
      { type: 'ul', items: ['Aménagement : même à un niveau basique — peinture, kitchenette, deux cloisons — prévoyez 150 000 à 400 000 ₪, ou étalé sur le bail si le propriétaire participe', 'Garantie bancaire : commission annuelle d\'environ 1 à 2% du montant, plus la ligne de crédit qu\'elle bloque', 'Commission d\'agence : un mois de loyer plus TVA (ponctuel)', 'Frais de déménagement : transport, infrastructure informatique, signalétique — généralement 30 000 à 80 000 ₪'] },
      { type: 'h2', text: 'Étape 4 : le chiffre qui compte vraiment — coût total au m² net' },
      { type: 'p', text: 'Prenez le coût mensuel total (17 500 ₪ dans notre exemple) et divisez par la surface nette (104 m²) : environ 168 ₪ par m² net par mois. C\'est le chiffre de comparaison entre les biens. Un bureau "bon marché" avec un coefficient élevé, des charges chères et une taxe municipale au tarif centre-ville peut s\'avérer plus cher qu\'un bureau "cher" dans un bâtiment efficient.' },
      { type: 'tip', text: 'Règle empirique que je donne à mes clients : quand vous comparez deux biens, construisez un tableau avec loyer + charges + taxe municipale au m² net. Dans environ une comparaison sur trois — le gagnant s\'inverse.' },
      { type: 'p', text: 'Vous souhaitez que nous fassions ce calcul pour vous sur un bien spécifique ? Envoyez-nous les détails et nous vous répondrons avec le tableau complet — sans surprises.' },
    ],
    blocks: [
      { type: 'p', text: '"כמה עולה המשרד הזה?" — זו השאלה הראשונה שכל שוכר שואל, וכמעט תמיד התשובה שהוא מקבל היא רק שליש מהתמונה. שכר הדירה הנקוב הוא נקודת פתיחה. העלות האמיתית — זו שתופיע בדוח רווח והפסד שלכם — גבוהה ממנו ב-40% עד 70%. בואו נפרק אותה, שקל אחרי שקל.' },
      { type: 'h2', text: 'שלב 1: מתרגמים ברוטו לנטו' },
      { type: 'p', text: 'שטח ברוטו כולל את החלק היחסי שלכם בשטחים הציבוריים: לובי, מסדרונות, מעליות, ממ״ד. היחס בין ברוטו לנטו נקרא מקדם העמסה, והוא המספר הראשון שצריך לברר. ניקח דוגמה שנפגוש לאורך כל המאמר: משרד המוצע כ-120 מ״ר ברוטו במחיר 85 ₪ למ״ר, עם מקדם העמסה של 15%. השטח שתקבלו בפועל: כ-104 מ״ר נטו. המחיר האמיתי למ״ר נטו: לא 85 ₪ אלא כ-98 ₪.' },
      { type: 'h2', text: 'שלב 2: מוסיפים את הקבועות' },
      { type: 'ul', items: [
        'שכר דירה: 120 מ״ר × 85 ₪ = 10,200 ₪ לחודש',
        'דמי ניהול: 120 מ״ר × 20 ₪ = 2,400 ₪ לחודש',
        'ארנונה: לפי 320 ₪ למ״ר לשנה ≈ 3,200 ₪ לחודש',
        'חשמל למיזוג ותאורה: בדרך כלל 800–1,500 ₪ לחודש למשרד בגודל כזה',
        'ביטוח תכולה וצד ג׳: 200–400 ₪ לחודש',
      ] },
      { type: 'p', text: 'סיכום ביניים: המשרד של "10,200 ₪" עולה בפועל כ-17,000–17,700 ₪ בחודש. וזו עוד לא כל התמונה.' },
      { type: 'h2', text: 'שלב 3: העלויות החד-פעמיות שכולם שוכחים' },
      { type: 'ul', items: [
        'התאמות (פיטאוט): גם ברמה בסיסית — צבע, מטבחון, שני קירות גבס — תכננו 150–400 אלף ₪ למשרד כזה, או פריסה בשכירות אם בעל הנכס משתתף',
        'ערבות בנקאית: עמלה שנתית של כ-1%–2% מסכום הערבות, בנוסף למסגרת שהיא תופסת',
        'עמלת תיווך: חודש שכירות + מע״מ (חד-פעמי)',
        'עלות מעבר: הובלה, תשתיות מחשוב, שילוט — לרוב 30–80 אלף ₪',
      ] },
      { type: 'h2', text: 'שלב 4: המספר שבאמת חשוב — עלות למ״ר נטו כולל הכל' },
      { type: 'p', text: 'קחו את סך העלות החודשית (17,500 ₪ בדוגמה שלנו) וחלקו בשטח הנטו (104 מ״ר): כ-168 ₪ למ״ר נטו לחודש. זה המספר להשוואה בין נכסים. משרד "זול" עם מקדם העמסה גבוה, דמי ניהול יקרים וארנונה של מרכז העיר יכול לצאת יקר יותר ממשרד "יקר" בבניין יעיל.' },
      { type: 'tip', text: 'כלל אצבע שאני נותן ללקוחות: כשמשווים שני נכסים, תבנו טבלה אחת עם שכ״ד + ניהול + ארנונה למ״ר נטו. בערך אחת מכל שלוש השוואות — הזוכה מתהפך.' },
      { type: 'p', text: 'רוצים שנעשה את החישוב הזה עבורכם על נכס ספציפי? שלחו לנו את הפרטים ונחזור אליכם עם התמונה המלאה — בלי הפתעות.' },
    ],
  },
  {
    slug: 'rent-or-buy-commercial',
    title: 'לשכור או לקנות נכס מסחרי לעסק? כך מחליטים נכון',
    description: 'ההחלטה הפיננסית הגדולה ביותר של רוב בעלי העסקים: מתי שכירות היא הצעד החכם, מתי רכישה בונה נכס אמיתי — ואיך עושים את החשבון.',
    title_en: 'Rent or Buy Commercial Property for Your Business? How to Decide Correctly',
    description_en: 'The biggest financial decision for most business owners: when leasing is the smart move, when buying builds real wealth — and how to run the numbers.',
    title_fr: 'Louer ou acheter un bien commercial pour votre entreprise ? Comment décider correctement',
    description_fr: 'La plus grande décision financière de la plupart des chefs d\'entreprise : quand la location est le choix intelligent, quand l\'achat construit un vrai patrimoine — et comment faire les calculs.',
    title_ru: 'Арендовать или купить коммерческую недвижимость? Как принять правильное решение',
    description_ru: 'Главное финансовое решение большинства владельцев бизнеса: когда аренда — умный шаг, когда покупка строит реальный актив — и как считать.',
    date: '2026-07-13',
    readingMinutes: 6,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    imageAlt: 'בניין משרדים מודרני עם חזית זכוכית',
    blocks_en: [
      { type: 'p', text: 'This is one of the questions I hear most from successful business owners: "I\'ve been paying rent for ten years — maybe it\'s time to buy?" The honest answer: it depends. Not because there\'s no answer, but because it\'s different for every business. Here\'s the framework I go through with every client who\'s weighing it up.' },
      { type: 'h2', text: 'The Case for Renting: Flexibility and Available Capital' },
      { type: 'p', text: 'A growing business is a changing business. A company of 15 employees today can be 40 in three years — or 8. Renting allows you to match the real estate to the business, not the other way around. But the truly strong argument is capital: buying commercial property requires 30%–50% equity (bank financing for commercial properties is more conservative than for apartments). On a ₪4 million property, that\'s ₪1.5–₪2 million leaving the business.' },
      { type: 'p', text: 'The critical question: what is the return on that shekel inside your business? If your business generates a 20%–30% return on invested capital — inventory, marketing, workforce — then locking up capital in walls yielding 6%–7% is an expensive trade-off.' },
      { type: 'h2', text: 'The Case for Buying: Locking In Costs and Building an Asset' },
      { type: 'p', text: 'On the other hand — there\'s a stage where a business stabilizes. You know where you want to be over the next decade, the location is critical to your customers, and management is tired of rent increase notices. Buying gives three things renting never will: locking in costs (fixed mortgage repayment vs. ever-rising rent), full control over the property (renovations, modifications, signage — without asking permission), and building value — at the end of the period you have an asset, not a pile of receipts.' },
      { type: 'p', text: 'An additional advantage that\'s talked about less: stability with banks. Property ownership strengthens the balance sheet and improves credit terms for the entire business.' },
      { type: 'h2', text: 'The Calculation Itself — An Example' },
      { type: 'ul', items: ['Example property: 200 sqm office priced at ₪4 million + VAT', 'Renting alternative: same property at approximately ₪20,000 per month (6% yield for landlord)', 'Buying alternative: ₪1.6 million equity, ₪2.4 million mortgage for 15 years ≈ ₪19,000–₪21,000 monthly repayment', 'Monthly repayment is similar to rent — but after 15 years: in the buying scenario you hold a property; in the renting scenario you\'ve paid approximately ₪4 million and have nothing left', 'On the other hand: in the buying scenario you gave up ₪1.6 million in free capital — and its alternative return must be added to the renting side'] },
      { type: 'h2', text: 'So What Do You Do?' },
      { type: 'ul', items: ['Rent if: the business is young or growing fast, capital is needed for operations, or the local market is overpriced', 'Buy if: the business is stable and profitable, there\'s equity that doesn\'t hurt cash flow, the location is strategically important long-term — or you see the property as a pension investment too', 'And there\'s a third option: buying through a separate holding company that rents to the business — a common structure with tax and risk management advantages. Must be planned with an accountant'] },
      { type: 'tip', text: 'Common mistake I see: comparing mortgage repayments to rent and stopping there. Don\'t forget on the buying side: purchase tax (6% on commercial property), building maintenance, and variable interest rates. And don\'t forget on the renting side: increases of 2%–4% per year.' },
      { type: 'p', text: 'Weighing it yourself? This is exactly the conversation we love most. No obligation — 055-2702800.' },
    ],
    blocks_fr: [
      { type: 'p', text: 'C\'est l\'une des questions que j\'entends le plus de la part de chefs d\'entreprise prospères : "Je paye un loyer depuis dix ans — peut-être qu\'il est temps d\'acheter ?" La réponse honnête : ça dépend. Non pas parce qu\'il n\'y a pas de réponse, mais parce qu\'elle est différente pour chaque entreprise. Voici le cadre que je passe en revue avec chaque client qui hésite.' },
      { type: 'h2', text: 'L\'argument pour la location : flexibilité et capital disponible' },
      { type: 'p', text: 'Une entreprise en croissance est une entreprise en évolution. Une société de 15 employés aujourd\'hui peut en avoir 40 dans trois ans — ou 8. La location vous permet d\'adapter l\'immobilier à l\'entreprise, et non l\'inverse. Mais l\'argument vraiment fort, c\'est le capital : l\'achat d\'un bien commercial nécessite 30% à 50% d\'apport personnel. Sur un bien à 4 millions ₪, c\'est 1,5 à 2 millions ₪ qui quittent l\'entreprise.' },
      { type: 'p', text: 'La question critique : quel est le rendement de ce shekel à l\'intérieur de votre entreprise ? Si votre entreprise génère un rendement de 20% à 30% sur le capital investi, alors bloquer du capital dans des murs qui rapportent 6% à 7% est un sacrifice coûteux.' },
      { type: 'h2', text: 'L\'argument pour l\'achat : fixer les coûts et construire un patrimoine' },
      { type: 'p', text: 'D\'un autre côté — il y a un stade où une entreprise se stabilise. Vous savez où vous voulez être dans les dix prochaines années, l\'emplacement est crucial pour vos clients, et la direction en a assez des avis d\'augmentation de loyer. L\'achat vous donne trois choses que la location ne donnera jamais : fixer les coûts (remboursement hypothécaire fixe vs loyer toujours croissant), contrôle total du bien (rénovations, aménagements, signalétique — sans demander la permission), et construction de valeur — à la fin de la période il vous reste un bien, pas une pile de quittances.' },
      { type: 'p', text: 'Un avantage supplémentaire dont on parle moins : la stabilité auprès des banques. La propriété immobilière renforce le bilan et améliore les conditions de crédit pour l\'ensemble de l\'entreprise.' },
      { type: 'h2', text: 'Le calcul lui-même — un exemple' },
      { type: 'ul', items: ['Bien exemple : bureau de 200 m² au prix de 4 millions ₪ + TVA', 'Alternative location : même bien à environ 20 000 ₪ par mois (rendement de 6% pour le propriétaire)', 'Alternative achat : apport de 1,6 million ₪, prêt de 2,4 millions ₪ sur 15 ans ≈ 19 000 à 21 000 ₪ de remboursement mensuel', 'Le remboursement mensuel est similaire au loyer — mais après 15 ans : dans le scénario achat vous détenez un bien ; dans le scénario location vous avez payé environ 4 millions ₪ et il ne reste rien', 'D\'un autre côté : dans le scénario achat vous avez renoncé à 1,6 million ₪ de capital disponible — et son rendement alternatif doit être ajouté du côté de la location'] },
      { type: 'h2', text: 'Alors que faire ?' },
      { type: 'ul', items: ['Louez si : l\'entreprise est jeune ou en croissance rapide, le capital est nécessaire à l\'exploitation, ou le marché local est surévalué', 'Achetez si : l\'entreprise est stable et rentable, il y a des fonds propres qui ne pèsent pas sur la trésorerie, l\'emplacement est stratégiquement important à long terme — ou vous voyez le bien aussi comme un investissement retraite', 'Et il y a une troisième option : l\'achat via une société foncière distincte qui loue à l\'entreprise — une structure courante avec des avantages fiscaux et de gestion des risques. Doit être planifiée avec un comptable'] },
      { type: 'tip', text: 'Erreur courante que je vois : comparer les remboursements hypothécaires au loyer et s\'arrêter là. N\'oubliez pas du côté achat : droits d\'enregistrement (6% sur un bien commercial), entretien du bâtiment, et taux d\'intérêt variables. Et n\'oubliez pas du côté location : des augmentations de 2% à 4% par an.' },
      { type: 'p', text: 'Vous hésitez vous-même ? C\'est exactement la conversation que nous aimons le plus tenir. Sans engagement — 055-2702800.' },
    ],
    blocks: [
      { type: 'p', text: 'זו אחת השאלות שאני שומע הכי הרבה מבעלי עסקים מצליחים: "אני משלם שכירות כבר עשר שנים — אולי הגיע הזמן לקנות?" התשובה הכנה: תלוי. לא בגלל שאין תשובה, אלא בגלל שהיא שונה לכל עסק. הנה המסגרת שאני עובר עליה עם כל לקוח שמתלבט.' },
      { type: 'h2', text: 'המקרה לשכירות: גמישות והון פנוי' },
      { type: 'p', text: 'עסק צומח הוא עסק שמשתנה. חברה של 15 עובדים היום יכולה להיות 40 בעוד שלוש שנים — או 8. שכירות מאפשרת לכם להתאים את הנדל״ן לעסק, ולא להפך. אבל הטיעון החזק באמת הוא ההון: רכישת נכס מסחרי דורשת הון עצמי של 30%–50% (המימון הבנקאי לנכסים מסחריים שמרני יותר מדירות). על נכס של 4 מיליון ₪ מדובר ב-1.5–2 מיליון ₪ שיוצאים מהעסק.' },
      { type: 'p', text: 'השאלה הקריטית: מה התשואה של השקל הזה בתוך העסק שלכם? אם העסק שלכם מייצר תשואה של 20%–30% על הון מושקע — מלאי, שיווק, כוח אדם — הרי שנעילת ההון בקירות שמניבים 6%–7% היא ויתור יקר.' },
      { type: 'h2', text: 'המקרה לרכישה: קיבוע עלויות ובניית נכס' },
      { type: 'p', text: 'מנגד — יש שלב שבו עסק מתייצב. אתם יודעים איפה אתם רוצים להיות בעשור הקרוב, המיקום קריטי ללקוחות שלכם, וההנהלה שבעה מהודעות העלאת שכר דירה. רכישה נותנת שלושה דברים ששכירות לא תיתן: קיבוע העלות (החזר משכנתא קבוע מול שכ״ד שעולה), שליטה מלאה בנכס (שיפוצים, התאמות, שילוט — בלי לבקש רשות), ובניית שווי — בסוף התקופה נשאר לכם נכס, לא ערימת קבלות.' },
      { type: 'p', text: 'יתרון נוסף שפחות מדברים עליו: יציבות מול הבנקים. נכס בבעלות מחזק מאזן ומשפר תנאי אשראי לעסק כולו.' },
      { type: 'h2', text: 'החשבון עצמו — דוגמה' },
      { type: 'ul', items: [
        'נכס לדוגמה: משרד 200 מ״ר במחיר 4 מיליון ₪ + מע״מ',
        'חלופת שכירות: אותו נכס בכ-20,000 ₪ לחודש (240 אלף ₪ בשנה, תשואה של 6% למשכיר)',
        'חלופת רכישה: הון עצמי 1.6 מיליון ₪, משכנתא 2.4 מיליון ₪ ל-15 שנה ≈ 19–21 אלף ₪ החזר חודשי',
        'ההחזר החודשי דומה לשכירות — אבל בתום 15 שנה: בתרחיש רכישה יש בידיכם נכס; בתרחיש שכירות שילמתם כ-4 מיליון ₪ (עם התייקרויות) ולא נשאר דבר',
        'מנגד: בתרחיש רכישה ויתרתם על 1.6 מיליון ₪ הון פנוי למשך כל התקופה — ואת התשואה האלטרנטיבית שלו צריך להוסיף לצד של השכירות',
      ] },
      { type: 'h2', text: 'אז מה עושים?' },
      { type: 'ul', items: [
        'שכרו אם: העסק צעיר או צומח מהר, ההון נדרש לפעילות, או שהשוק המקומי מתומחר גבוה מדי',
        'קנו אם: העסק יציב ורווחי, יש הון עצמי שלא פוגע בתזרים, המיקום אסטרטגי לטווח ארוך — או שאתם רואים בנכס גם השקעה פנסיונית',
        'ויש דרך שלישית: רכישה דרך חברת נכסים נפרדת שמשכירה לעסק — מבנה נפוץ עם יתרונות מיסוי וניהול סיכונים. חובה לתכנן עם רואה חשבון',
      ] },
      { type: 'tip', text: 'טעות נפוצה שאני רואה: להשוות החזר משכנתא לשכ״ד ולעצור שם. אל תשכחו בצד הרכישה: מס רכישה (6% בנכס מסחרי), תחזוקת מבנה, וריבית שיכולה להשתנות. ואל תשכחו בצד השכירות: התייקרות של 2%–4% בשנה.' },
      { type: 'p', text: 'מתלבטים בעצמכם? זו בדיוק השיחה שאנחנו הכי אוהבים לעשות. בלי התחייבות — 055-2702800.' },
    ],
  },
]

export function getArticle(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}
