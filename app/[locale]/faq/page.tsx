import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import LegalPage from '@/components/LegalPage'
import { buildAlternates } from '@/lib/alternates'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    he: 'שאלות נפוצות',
    en: 'FAQ',
    fr: 'FAQ',
    ru: 'Часто задаваемые вопросы',
  }
  const descs: Record<string, string> = {
    he: 'תשובות לשאלות נפוצות על תיווך נדל"ן מסחרי ומגורים: עמלות, שטחים, תהליך העסקה ועוד.',
    en: 'Answers to frequently asked questions about commercial and residential real estate: fees, areas, the transaction process, and more.',
    fr: 'Réponses aux questions fréquentes sur l\'immobilier commercial et résidentiel : honoraires, surfaces, processus de transaction et plus.',
    ru: 'Ответы на часто задаваемые вопросы о коммерческой и жилой недвижимости: комиссии, площади, процесс сделки и многое другое.',
  }
  return {
    title: titles[locale] ?? titles.he,
    description: descs[locale] ?? descs.he,
    alternates: buildAlternates('/faq'),
  }
}

type FAQ = { q: string; a: string }

const FAQS: Record<string, FAQ[]> = {
  he: [
    { q: 'כמה עולה עמלת תיווך על נכס מסחרי?', a: 'בעסקאות שכירות מסחריות מקובלת עמלה בגובה דמי שכירות של חודש אחד בתוספת מע"מ, ובעסקאות מכר — אחוז ממחיר העסקה (מקובל 1%–2% בתוספת מע"מ). העמלה נקבעת מראש ונחתמת בהזמנת שירותי תיווך לפני תחילת העבודה.' },
    { q: 'מה ההבדל בין שטח ברוטו לשטח נטו?', a: 'שטח נטו הוא השטח שבפועל בתוך קירות הנכס. שטח ברוטו כולל גם חלק יחסי בשטחים המשותפים — לובי, מסדרונות, ממ"ד וכדומה. דמי השכירות המסחריים מחושבים בדרך כלל לפי ברוטו, ולכן חשוב לברר את יחס הברוטו-נטו.' },
    { q: 'מה חשוב לבדוק לפני שכירת משרד?', a: 'דמי ניהול וארנונה, מצב המיזוג, חניות, נגישות לתחבורה ציבורית, תקופת השכירות והאופציות, ערבויות נדרשות, ומי נושא בעלות ההתאמות. אנחנו עוברים על כל הסעיפים האלה יחד איתכם.' },
    { q: 'האם כדאי לשכור או לקנות נכס מסחרי לעסק?', a: 'שכירות שומרת על גמישות והון פנוי, ורכישה בונה נכס לטווח ארוך. השיקולים הם יציבות העסק, זמינות הון עצמי, מחירי האזור ותחזית הצמיחה. מומלץ להתייעץ גם עם רואה חשבון.' },
    { q: 'כמה זמן לוקחת עסקת שכירות מסחרית?', a: 'מרגע שנמצא נכס מתאים, משא ומתן וחתימה אורכים בדרך כלל שבועות בודדים. עסקאות מורכבות יכולות להימשך חודשיים-שלושה.' },
    { q: 'האם אתם עובדים עם עורכי דין ושמאים?', a: 'אנחנו ממליצים לכל לקוח להיעזר בעורך דין מטעמו לפני חתימה, ובמידת הצורך גם בשמאי מקרקעין. נשמח להפנות לאנשי מקצוע מנוסים.' },
    { q: 'אני בעל נכס — איך מפרסמים אצלכם?', a: 'יוצרים קשר בטלפון 055-2702800 או דרך טופס האתר. ניפגש בנכס, נאסוף נתונים ותמונות, נחתום על הזמנת שירות — והנכס יעלה לאתר.' },
    { q: 'באילו אזורים אתם פועלים?', a: 'עיקר הפעילות שלנו במרכז הארץ — פתח תקווה, ראש העין, בני ברק, תל אביב, הוד השרון, כפר סבא, בקעת אונו, אור יהודה, יהוד והרצליה. בנוסף, אנחנו מטפלים בנכסים בכל רחבי הארץ כאשר יש בקשה מיוחדת.' },
    { q: 'האם אתם עובדים עם מתווכים אחרים?', a: 'בהחלט. אנחנו עובדים בשיתוף פעולה מלא עם מתווכים וחברות נדל"ן נוספות. שת"פ בין מתווכים מביא ללקוח יותר אפשרויות ומזרז את מציאת הנכס המתאים.' },
    { q: 'מה זה מקדם העמסה ואיך הוא משפיע על מחיר השכירות?', a: 'מקדם העמסה הוא היחס בין השטח הברוטו לשטח הנטו. בבניינים ישנים הוא עומד על כ-8%, ובמגדלים חדשים יכול להגיע ל-20% ויותר. דמי השכירות מחושבים לפי ברוטו — כלומר, אתם משלמים גם על שטחים משותפים. תמיד השוו עלות למ"ר נטו בין נכסים.' },
    { q: 'האם נדרש עורך דין בעסקת נדל"ן מסחרי?', a: 'כן, בהחלט מומלץ. עורך דין מטעם הלקוח — לא מטעם בעל הנכס — יבדוק את החוזה, יוודא שאין עיקולים, ויגן על האינטרסים שלכם. בעסקאות מכירה, עורך דין הוא חובה.' },
    { q: 'מה זה הזמנת שירותי תיווך?', a: 'הזמנת שירותי תיווך היא מסמך חוקי שמגדיר את שכר הטרחה ותנאי העבודה. לפי חוק המתווכים הישראלי, מתווך אינו זכאי לעמלה ללא הזמנה חתומה. אנחנו חותמים עליה בתחילת העבודה המשותפת — שקיפות מלאה.' },
    { q: 'כמה עולה ארנונה למשרד בישראל?', a: 'ארנונה למשרדים משתנה לפי עיר וסיווג הנכס — בין כ-250 ₪ למ"ר בשנה באזורי תעשייה ועד 400 ₪ ויותר בתל אביב. תמיד בקשו שובר ארנונה אמיתי לנכס, ולא הערכה כללית.' },
    { q: 'מה הם דמי ניהול ומה כוללים?', a: 'דמי ניהול הם תשלום חודשי נוסף לשכר הדירה, המכסה ניקיון, אבטחה, תחזוקת מבנה ותאורת שטחים משותפים. בבניינים מסחריים מקובל 15–30 ₪ למ"ר בחודש — עוד 3,000–6,000 ₪ לחודש על משרד של 200 מ"ר. חשוב לבדוק מה כלול לפני חתימה.' },
    { q: 'כמה הון עצמי צריך לרכישת נכס מסחרי?', a: 'מימון בנקאי לנכסים מסחריים שמרני יותר מאשר לדירות מגורים — הבנקים דורשים בדרך כלל 30%–50% הון עצמי. על נכס של 4 מיליון ₪ מדובר ב-1.2–2 מיליון ₪. תכננו מראש עם יועץ משכנתאות ורואה חשבון.' },
    { q: 'מה ההבדל בין נכס מסחרי לנכס מגורים?', a: 'נכס מסחרי מיועד לשימוש עסקי (משרד, חנות, מחסן) ופועל תחת חוקי תכנון ובנייה שונים, ארנונה גבוהה יותר ורישוי עסק לפי שימוש. תהליך המימון שונה — ערבויות גבוהות יותר ואחוז מימון נמוך יותר מהבנק. אנחנו מתמחים בשניהם.' },
  ],
  en: [
    { q: 'How much is the brokerage fee for a commercial property?', a: 'For commercial rental deals, the standard fee is one month\'s rent plus VAT. For sales, it\'s a percentage of the deal price (typically 1%–2% plus VAT). The exact fee is agreed upfront and signed in a brokerage order before work begins.' },
    { q: 'What\'s the difference between gross and net area?', a: 'Net area is the actual space inside the property walls. Gross area also includes a proportional share of common areas — lobby, corridors, safe room, etc. Commercial rent is usually calculated on gross area, so it\'s important to know the gross-to-net ratio before comparing prices.' },
    { q: 'What should I check before renting an office?', a: 'Beyond price: management fees and property tax (which can significantly add to monthly costs), air conditioning status and hours, parking, public transport access, signage options, lease term and options, required guarantees, and who covers fit-out costs. We go through all these points with you.' },
    { q: 'Should I rent or buy a commercial property for my business?', a: 'Renting preserves flexibility and working capital; buying builds a long-term asset. Key considerations are business stability, equity availability, area prices, and growth forecasts. We also recommend consulting an accountant before deciding.' },
    { q: 'How long does a commercial rental deal take?', a: 'Once a suitable property is found, negotiation and signing typically take a few weeks. More complex deals — with build-outs, regulatory approvals, or thorough legal checks — can take two to three months.' },
    { q: 'Do you work with lawyers and appraisers?', a: 'We recommend every client engage their own lawyer before signing any agreement, and an appraiser when needed. We\'re happy to refer experienced professionals we work with.' },
    { q: 'I\'m a property owner — how do I list with you?', a: 'Simply contact us by phone at 055-2702800 or via the website form. We\'ll visit the property, gather details and photos, sign a brokerage order — and the property will go live on the site.' },
    { q: 'Which areas do you cover?', a: 'Our main activity is in central Israel — Petah Tikva, Rosh HaAyin, Bnei Brak, Tel Aviv, Hod HaSharon, Kfar Saba, Bikat Ono, Or Yehuda, Yehud, and Herzliya. We also handle properties across the entire country when there is a special request.' },
    { q: 'Do you work with other brokers?', a: 'Absolutely. We work in full cooperation with other brokers and real estate companies. Collaboration between brokers gives the client more options and speeds up finding the right property.' },
    { q: 'What is a load factor in commercial real estate?', a: 'The load factor is the ratio between gross area and net area. In older buildings it\'s around 8%; in modern towers it can reach 20% or more. Since rent is charged on gross area, you\'re paying for common spaces too. Always compare the cost per net sqm between properties — not gross.' },
    { q: 'Do I need a lawyer for a commercial property deal?', a: 'Yes, strongly recommended. Your own lawyer — not the landlord\'s — reviews the contract, checks for liens or encumbrances, and protects your interests. For purchase transactions, legal representation is essential.' },
    { q: 'What is a brokerage order (brokerage agreement)?', a: 'A brokerage order is a legal document defining the fee and scope of work. Under Israeli law, a broker is not entitled to any fee without a signed brokerage order. We sign it at the start of every engagement — full transparency from day one.' },
    { q: 'How much is office municipal tax (arnona) in Israel?', a: 'Office municipal tax varies by city and property classification — roughly ₪250 per sqm per year in industrial zones to over ₪400 in Tel Aviv city center. Always request the actual municipal tax bill for the property, not an estimate.' },
    { q: 'What are management fees and what do they cover?', a: 'Management fees are a monthly charge on top of rent, covering cleaning, security, building maintenance, and common area lighting. Typical range: ₪15–₪30 per sqm per month. On a 200 sqm office that\'s an extra ₪3,000–₪6,000/month — always factor this in.' },
    { q: 'How much equity do I need to buy commercial property in Israel?', a: 'Bank financing for commercial properties is more conservative than for apartments — banks typically require 30%–50% equity. On a ₪4 million property that\'s ₪1.2–₪2 million of your own funds. Plan ahead with a mortgage advisor and accountant.' },
  ],
  ru: [
    { q: 'Сколько стоит комиссия за коммерческую недвижимость?', a: 'При аренде коммерческой недвижимости стандартная комиссия составляет один месяц арендной платы плюс НДС. При продаже — процент от цены сделки (обычно 1%–2% плюс НДС). Точная сумма согласовывается заранее и фиксируется в договоре на брокерские услуги до начала работы.' },
    { q: 'В чём разница между площадью брутто и нетто?', a: 'Площадь нетто — это фактическое пространство внутри стен объекта. Площадь брутто включает также пропорциональную долю общих площадей — лобби, коридоры, техпомещения и т.д. Коммерческая аренда, как правило, рассчитывается по брутто, поэтому важно знать соотношение брутто/нетто при сравнении цен.' },
    { q: 'Что важно проверить перед арендой офиса?', a: 'Помимо цены: расходы на управление и муниципальный налог (которые могут существенно увеличить ежемесячные расходы), состояние кондиционирования, парковочные места, доступность общественного транспорта, срок аренды и опции, требуемые гарантии и кто оплачивает отделочные работы. Мы проходим все эти пункты вместе с вами.' },
    { q: 'Арендовать или купить коммерческую недвижимость для бизнеса?', a: 'Аренда сохраняет гибкость и оборотный капитал; покупка создаёт долгосрочный актив. Ключевые факторы: стабильность бизнеса, наличие собственного капитала, цены в районе и прогнозы роста. Рекомендуем также проконсультироваться с бухгалтером перед принятием решения.' },
    { q: 'Сколько времени занимает сделка коммерческой аренды?', a: 'После того как подходящий объект найден, переговоры и подписание обычно занимают несколько недель. Более сложные сделки — с отделкой, согласованиями или тщательной юридической проверкой — могут занять два-три месяца.' },
    { q: 'Работаете ли вы с адвокатами и оценщиками?', a: 'Мы рекомендуем каждому клиенту привлечь собственного адвоката перед подписанием любого соглашения и оценщика при необходимости. Мы с удовольствием порекомендуем опытных специалистов, с которыми сотрудничаем.' },
    { q: 'Я владелец объекта — как разместить его у вас?', a: 'Просто свяжитесь с нами по телефону 055-2702800 или через форму на сайте. Мы посетим объект, соберём данные и фотографии, подпишем договор — и объект появится на сайте.' },
    { q: 'В каких районах вы работаете?', a: 'Основная деятельность — в центральном Израиле: Петах-Тиква, Рош-а-Аин, Бней-Брак, Тель-Авив, Ход-а-Шарон, Кфар-Саба, Бикат-Оно, Ор-Йехуда, Йехуд и Герцлия. Также работаем по всей стране при наличии специального запроса.' },
    { q: 'Работаете ли вы с другими брокерами?', a: 'Абсолютно. Мы работаем в полном сотрудничестве с другими брокерами и компаниями по недвижимости. Сотрудничество между специалистами даёт клиенту больше вариантов и ускоряет поиск подходящего объекта.' },
    { q: 'Что такое коэффициент загрузки в коммерческой недвижимости?', a: 'Коэффициент загрузки — это соотношение между площадью брутто и нетто. В старых зданиях он составляет около 8%; в современных башнях может достигать 20% и более. Поскольку аренда рассчитывается по брутто, вы платите и за общие площади. Всегда сравнивайте стоимость за кв.м нетто между объектами.' },
    { q: 'Нужен ли адвокат при сделке с коммерческой недвижимостью?', a: 'Да, настоятельно рекомендуется. Ваш адвокат — не арендодателя — проверяет договор, ищет обременения и защищает ваши интересы. При сделках купли-продажи юридическое представительство обязательно.' },
    { q: 'Что такое договор на брокерские услуги?', a: 'Договор на брокерские услуги — это юридический документ, определяющий вознаграждение и объём работы. По израильскому закону брокер не имеет права на комиссию без подписанного договора. Мы подписываем его в начале каждого сотрудничества — полная прозрачность с первого дня.' },
    { q: 'Сколько стоит муниципальный налог на офис в Израиле?', a: 'Муниципальный налог на офисы варьируется в зависимости от города и класса объекта — приблизительно от 250 ₪/кв.м в год в промышленных зонах до более 400 ₪ в центре Тель-Авива. Всегда запрашивайте реальную квитанцию об уплате налога, а не приблизительную оценку.' },
    { q: 'Что такое эксплуатационные расходы и что они включают?', a: 'Эксплуатационные расходы — ежемесячный платёж сверх арендной платы, покрывающий уборку, охрану, обслуживание здания и освещение общих площадей. Типичный диапазон: 15–30 ₪/кв.м в месяц. Для офиса 200 кв.м это дополнительные 3 000–6 000 ₪/месяц — всегда учитывайте это.' },
    { q: 'Какой собственный капитал нужен для покупки коммерческой недвижимости?', a: 'Банковское финансирование коммерческой недвижимости более консервативно, чем для жилых квартир — банки обычно требуют 30%–50% собственных средств. Для объекта стоимостью 4 млн ₪ это 1,2–2 млн ₪. Планируйте заранее с ипотечным консультантом и бухгалтером.' },
    { q: 'В чём разница между коммерческой и жилой недвижимостью?', a: 'Коммерческая недвижимость предназначена для бизнеса (офис, магазин, склад) и работает по другим правилам планирования, с более высоким муниципальным налогом и бизнес-лицензиями. Процесс финансирования отличается — более высокие гарантии и меньший процент кредитования. Мы специализируемся на обоих типах.' },
  ],
  fr: [
    { q: 'Combien coûtent les honoraires de courtage pour un bien commercial ?', a: 'Pour les locations commerciales, les honoraires standards sont d\'un mois de loyer plus TVA. Pour les ventes, il s\'agit d\'un pourcentage du prix (généralement 1 % à 2 % plus TVA). Le montant exact est convenu à l\'avance et signé dans un mandat de courtage avant le début du travail.' },
    { q: 'Quelle est la différence entre surface brute et surface nette ?', a: 'La surface nette est l\'espace effectif à l\'intérieur des murs du bien. La surface brute inclut également une part proportionnelle des parties communes — hall, couloirs, local technique, etc. Le loyer commercial est généralement calculé sur la surface brute, d\'où l\'importance de connaître le ratio brut/net avant de comparer les prix.' },
    { q: 'Que faut-il vérifier avant de louer un bureau ?', a: 'Au-delà du prix : charges de gestion et taxe foncière (qui peuvent alourdir significativement le coût mensuel), état de la climatisation, places de parking, accès aux transports en commun, durée du bail et options, garanties exigées, et qui prend en charge les travaux d\'aménagement. Nous passons tous ces points en revue avec vous.' },
    { q: 'Vaut-il mieux louer ou acheter un bien commercial pour mon entreprise ?', a: 'Louer préserve la flexibilité et le capital ; acheter constitue un actif long terme. Les critères clés sont la stabilité de l\'entreprise, les fonds propres disponibles, les prix du secteur et les perspectives de croissance. Nous recommandons également de consulter un expert-comptable avant de décider.' },
    { q: 'Combien de temps prend une transaction de location commerciale ?', a: 'Une fois le bien trouvé, la négociation et la signature prennent généralement quelques semaines. Les transactions plus complexes — avec travaux, autorisations réglementaires ou due diligence juridique approfondie — peuvent durer deux à trois mois.' },
    { q: 'Travaillez-vous avec des avocats et des experts immobiliers ?', a: 'Nous recommandons à chaque client de faire appel à son propre avocat avant de signer tout accord, et à un expert immobilier si nécessaire. Nous sommes heureux de recommander des professionnels expérimentés avec qui nous collaborons.' },
    { q: 'Je suis propriétaire — comment publier mon bien chez vous ?', a: 'Contactez-nous par téléphone au 055-2702800 ou via le formulaire du site. Nous visiterons le bien, collecterons les informations et photos, signerons un mandat — et le bien sera publié sur le site.' },
    { q: 'Dans quelles zones intervenez-vous ?', a: 'Notre activité principale se situe en Israël central — Petah Tikva, Rosh HaAyin, Bnei Brak, Tel Aviv, Hod HaSharon, Kfar Saba, Bikat Ono, Or Yehuda, Yehud et Herzliya. Nous intervenons également dans tout le pays lorsqu\'il y a une demande particulière.' },
    { q: 'Travaillez-vous avec d\'autres agents immobiliers ?', a: 'Absolument. Nous travaillons en pleine collaboration avec d\'autres agents et sociétés immobilières. La coopération entre professionnels offre au client plus d\'options et accélère la recherche du bien idéal.' },
    { q: 'Qu\'est-ce que le coefficient de surface en immobilier commercial ?', a: 'Le coefficient de surface est le rapport entre la surface brute et la surface nette. Dans les bâtiments anciens il est d\'environ 8% ; dans les tours modernes il peut atteindre 20% ou plus. Comme le loyer est calculé sur la surface brute, vous payez aussi pour les parties communes. Comparez toujours le coût au m² net.' },
    { q: 'Ai-je besoin d\'un avocat pour une transaction immobilière commerciale ?', a: 'Oui, fortement recommandé. Votre propre avocat — pas celui du propriétaire — examine le contrat, vérifie l\'absence de charges ou hypothèques, et protège vos intérêts. Pour les transactions d\'achat, la représentation juridique est indispensable.' },
    { q: 'Qu\'est-ce qu\'un mandat de courtage ?', a: 'Le mandat de courtage est un document légal définissant les honoraires et le périmètre de la mission. Selon la loi israélienne, un agent n\'a droit à aucune commission sans mandat signé. Nous le signons au début de chaque collaboration — transparence totale dès le premier jour.' },
    { q: 'Combien faut-il d\'apport pour acheter un bien commercial en Israël ?', a: 'Le financement bancaire pour les biens commerciaux est plus conservateur que pour les appartements — les banques exigent généralement 30 à 50% d\'apport. Sur un bien à 4 millions ₪, c\'est 1,2 à 2 millions ₪ de fonds propres. Planifiez à l\'avance avec un conseiller en crédit et un expert-comptable.' },
    { q: 'Quelles sont les charges de copropriété et que couvrent-elles ?', a: 'Les charges de copropriété sont un paiement mensuel en sus du loyer, couvrant le nettoyage, la sécurité, l\'entretien du bâtiment et l\'éclairage des parties communes. Fourchette typique : 15 à 30 ₪ par m² par mois. Pour un bureau de 200 m², cela représente 3 000 à 6 000 ₪ supplémentaires par mois.' },
  ],
}

const ctaText: Record<string, { text: string; link: string }> = {
  he: { text: 'לא מצאתם תשובה? ', link: 'דברו איתנו' },
  en: { text: "Didn't find your answer? ", link: 'Talk to us' },
  fr: { text: "Vous n'avez pas trouvé votre réponse ? ", link: 'Parlez-nous' },
  ru: { text: 'Не нашли ответ? ', link: 'Свяжитесь с нами' },
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const faqs = FAQS[locale] ?? FAQS.he
  const cta = ctaText[locale] ?? ctaText.he

  const titles: Record<string, { title: string; subtitle: string }> = {
    he: { title: 'שאלות נפוצות', subtitle: 'כל מה שרציתם לדעת על תיווך נדל"ן' },
    en: { title: 'Frequently Asked Questions', subtitle: 'Everything you wanted to know about real estate brokerage' },
    fr: { title: 'Questions Fréquentes', subtitle: 'Tout ce que vous vouliez savoir sur le courtage immobilier' },
    ru: { title: 'Часто задаваемые вопросы', subtitle: 'Всё, что вы хотели знать о брокерских услугах в сфере недвижимости' },
  }
  const { title, subtitle } = titles[locale] ?? titles.he

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const homeLabels: Record<string, string> = { he: 'דף הבית', en: 'Home', fr: 'Accueil', ru: 'Главная' }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeLabels[locale] ?? homeLabels.he, item: `https://www.nadlannow.co.il/${locale}` },
      { '@type': 'ListItem', position: 2, name: title },
    ],
  }

  return (
    <LegalPage title={title} subtitle={subtitle}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqs.map(f => (
        <section key={f.q}>
          <h2>{f.q}</h2>
          <p>{f.a}</p>
        </section>
      ))}
      <p>
        {cta.text}<Link href="/contact">{cta.link}</Link>
      </p>
    </LegalPage>
  )
}
