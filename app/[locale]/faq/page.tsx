import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import LegalPage from '@/components/LegalPage'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    he: 'שאלות נפוצות',
    en: 'FAQ',
    fr: 'FAQ',
  }
  const descs: Record<string, string> = {
    he: 'תשובות לשאלות נפוצות על תיווך נדל"ן מסחרי ומגורים: עמלות, שטחים, תהליך העסקה ועוד.',
    en: 'Answers to frequently asked questions about commercial and residential real estate: fees, areas, the transaction process, and more.',
    fr: 'Réponses aux questions fréquentes sur l\'immobilier commercial et résidentiel : honoraires, surfaces, processus de transaction et plus.',
  }
  return {
    title: titles[locale] ?? titles.he,
    description: descs[locale] ?? descs.he,
    alternates: { canonical: '/faq' },
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
    { q: 'באילו אזורים אתם פועלים?', a: 'עיקר הפעילות שלנו במרכז הארץ — פתח תקווה, ראש העין, בני ברק, תל אביב והסביבה — אבל אנחנו מטפלים בנכסים מתאימים בכל הארץ.' },
  ],
  en: [
    { q: 'How much is the brokerage fee for a commercial property?', a: 'For commercial rental deals, the standard fee is one month\'s rent plus VAT. For sales, it\'s a percentage of the deal price (typically 1%–2% plus VAT). The exact fee is agreed upfront and signed in a brokerage order before work begins.' },
    { q: 'What\'s the difference between gross and net area?', a: 'Net area is the actual space inside the property walls. Gross area also includes a proportional share of common areas — lobby, corridors, safe room, etc. Commercial rent is usually calculated on gross area, so it\'s important to know the gross-to-net ratio before comparing prices.' },
    { q: 'What should I check before renting an office?', a: 'Beyond price: management fees and property tax (which can significantly add to monthly costs), air conditioning status and hours, parking, public transport access, signage options, lease term and options, required guarantees, and who covers fit-out costs. We go through all these points with you.' },
    { q: 'Should I rent or buy a commercial property for my business?', a: 'Renting preserves flexibility and working capital; buying builds a long-term asset. Key considerations are business stability, equity availability, area prices, and growth forecasts. We also recommend consulting an accountant before deciding.' },
    { q: 'How long does a commercial rental deal take?', a: 'Once a suitable property is found, negotiation and signing typically take a few weeks. More complex deals — with build-outs, regulatory approvals, or thorough legal checks — can take two to three months.' },
    { q: 'Do you work with lawyers and appraisers?', a: 'We recommend every client engage their own lawyer before signing any agreement, and an appraiser when needed. We\'re happy to refer experienced professionals we work with.' },
    { q: 'I\'m a property owner — how do I list with you?', a: 'Simply contact us by phone at 055-2702800 or via the website form. We\'ll visit the property, gather details and photos, sign a brokerage order — and the property will go live on the site.' },
    { q: 'Which areas do you cover?', a: 'Our main activity is in central Israel — Petah Tikva, Rosh HaAyin, Bnei Brak, Tel Aviv and surroundings — but we handle suitable properties across the country.' },
  ],
  fr: [
    { q: 'Combien coûtent les honoraires de courtage pour un bien commercial ?', a: 'Pour les locations commerciales, les honoraires standards sont d\'un mois de loyer plus TVA. Pour les ventes, il s\'agit d\'un pourcentage du prix (généralement 1 % à 2 % plus TVA). Le montant exact est convenu à l\'avance et signé dans un mandat de courtage avant le début du travail.' },
    { q: 'Quelle est la différence entre surface brute et surface nette ?', a: 'La surface nette est l\'espace effectif à l\'intérieur des murs du bien. La surface brute inclut également une part proportionnelle des parties communes — hall, couloirs, local technique, etc. Le loyer commercial est généralement calculé sur la surface brute, d\'où l\'importance de connaître le ratio brut/net avant de comparer les prix.' },
    { q: 'Que faut-il vérifier avant de louer un bureau ?', a: 'Au-delà du prix : charges de gestion et taxe foncière (qui peuvent alourdir significativement le coût mensuel), état de la climatisation, places de parking, accès aux transports en commun, durée du bail et options, garanties exigées, et qui prend en charge les travaux d\'aménagement. Nous passons tous ces points en revue avec vous.' },
    { q: 'Vaut-il mieux louer ou acheter un bien commercial pour mon entreprise ?', a: 'Louer préserve la flexibilité et le capital ; acheter constitue un actif long terme. Les critères clés sont la stabilité de l\'entreprise, les fonds propres disponibles, les prix du secteur et les perspectives de croissance. Nous recommandons également de consulter un expert-comptable avant de décider.' },
    { q: 'Combien de temps prend une transaction de location commerciale ?', a: 'Une fois le bien trouvé, la négociation et la signature prennent généralement quelques semaines. Les transactions plus complexes — avec travaux, autorisations réglementaires ou due diligence juridique approfondie — peuvent durer deux à trois mois.' },
    { q: 'Travaillez-vous avec des avocats et des experts immobiliers ?', a: 'Nous recommandons à chaque client de faire appel à son propre avocat avant de signer tout accord, et à un expert immobilier si nécessaire. Nous sommes heureux de recommander des professionnels expérimentés avec qui nous collaborons.' },
    { q: 'Je suis propriétaire — comment publier mon bien chez vous ?', a: 'Contactez-nous par téléphone au 055-2702800 ou via le formulaire du site. Nous visiterons le bien, collecterons les informations et photos, signerons un mandat — et le bien sera publié sur le site.' },
    { q: 'Dans quelles zones intervenez-vous ?', a: 'Notre activité principale se situe en Israël central — Petah Tikva, Rosh HaAyin, Bnei Brak, Tel Aviv et environs — mais nous traitons les biens appropriés dans tout le pays.' },
  ],
}

const ctaText: Record<string, { text: string; link: string }> = {
  he: { text: 'לא מצאתם תשובה? ', link: 'דברו איתנו' },
  en: { text: "Didn't find your answer? ", link: 'Talk to us' },
  fr: { text: "Vous n'avez pas trouvé votre réponse ? ", link: 'Parlez-nous' },
}

export default async function FaqPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const faqs = FAQS[locale] ?? FAQS.he
  const cta = ctaText[locale] ?? ctaText.he

  const titles: Record<string, { title: string; subtitle: string }> = {
    he: { title: 'שאלות נפוצות', subtitle: 'כל מה שרציתם לדעת על תיווך נדל"ן' },
    en: { title: 'Frequently Asked Questions', subtitle: 'Everything you wanted to know about real estate brokerage' },
    fr: { title: 'Questions Fréquentes', subtitle: 'Tout ce que vous vouliez savoir sur le courtage immobilier' },
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

  return (
    <LegalPage title={title} subtitle={subtitle}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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
