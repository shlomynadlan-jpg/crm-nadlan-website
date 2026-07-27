import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import LegalPage from '@/components/LegalPage'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    he: 'אודות',
    en: 'About Us',
    fr: 'À Propos',
  }
  const descs: Record<string, string> = {
    he: 'LS נדל"ן — חברת תיווך המתמחה בנכסים מסחריים ומגורים. הכירו אותנו ואת הדרך שבה אנחנו עובדים.',
    en: 'LS Real Estate — a brokerage specializing in commercial and residential properties. Learn who we are and how we work.',
    fr: 'LS Immobilier — une agence spécialisée dans les biens commerciaux et résidentiels. Découvrez qui nous sommes.',
  }
  return {
    title: titles[locale] ?? titles.he,
    description: descs[locale] ?? descs.he,
    alternates: { canonical: '/about' },
  }
}

type ContentMap = {
  title: string
  subtitle: string
  whoTitle: string
  whoPara: string
  specTitle: string
  specItems: { bold: string; text: string }[]
  howTitle: string
  howItems: { bold: string; text: string }[]
  contactTitle: string
  contactPara: string
  contactPhone: string
  contactPhone2: string
  contactEmail: string
  contactForm: string
  contactHours: string
}

const CONTENT: Record<string, ContentMap> = {
  he: {
    title: 'אודות LS נדל"ן',
    subtitle: 'מי אנחנו ואיך אנחנו עובדים',
    whoTitle: 'מי אנחנו',
    whoPara: 'LS נדל״ן נוסדה בשנת 2019 על ידי שלומי לימור (רישיון תיווך מס׳ 3151306) ולימור קטיעי חיון (רישיון תיווך מס׳ 31927308). החברה מתמחה בנכסים מסחריים ובנכסי מגורים ברחבי מרכז הארץ, ומלווה בעלי נכסים, שוכרים, רוכשים ומשקיעים — מהחיפוש הראשון ועד חתימת ההסכם.',
    specTitle: 'במה אנחנו מתמחים',
    specItems: [
      { bold: 'משרדים', text: ' — השכרה ומכירה של שטחי משרדים, ממשרדי בוטיק ועד קומות שלמות במגדלים.' },
      { bold: 'חנויות ושטחי מסחר', text: ' — חזיתות מסחריות, מרכזים מסחריים ושטחי קמעונאות.' },
      { bold: 'מחסנים ולוגיסטיקה', text: ' — שטחי אחסנה, מרלוגים ותעשייה קלה.' },
      { bold: 'דאטה סנטרים', text: ' — שטחים ייעודיים למרכזי מידע ותשתיות טכנולוגיות.' },
      { bold: 'קרקעות ואדמות', text: ' — קרקעות לבנייה, חקלאות, השקעה ופיתוח.' },
      { bold: 'מגורים', text: ' — דירות ופנטהאוזים למכירה ולהשכרה.' },
      { bold: 'מכירת עסקים', text: ' — ליווי דיסקרטי במכירת עסקים פעילים, כולל טיפול בהעברת זכויות השכירות.' },
    ],
    howTitle: 'איך אנחנו עובדים',
    howItems: [
      { bold: 'מידע מדויק', text: ' — כל נכס נבדק לפני שהוא עולה לאתר, כולל נתוני שטח, מחיר ומצב משפטי בסיסי.' },
      { bold: 'זמינות', text: ' — מענה מהיר לכל פנייה, בטלפון, בוואטסאפ או במייל.' },
      { bold: 'ליווי אישי', text: ' — סיורים בנכסים, ניהול משא ומתן וליווי עד לחתימה.' },
      { bold: 'שקיפות', text: ' — עמלת התיווך וההתחייבויות מוגדרות מראש בהזמנת שירותי תיווך כדין.' },
    ],
    contactTitle: 'יצירת קשר',
    contactPara: 'מחפשים נכס או רוצים לשווק נכס שבבעלותכם? נשמח לדבר:',
    contactPhone: 'שלומי לימור',
    contactPhone2: 'לימור קטיעי חיון',
    contactEmail: 'דוא״ל',
    contactForm: 'טופס יצירת קשר באתר',
    contactHours: 'שעות פעילות: א׳–ה׳ 09:00–18:00, ו׳ 09:00–13:00.',
  },
  en: {
    title: 'About LS Real Estate',
    subtitle: 'Who we are and how we work',
    whoTitle: 'Who We Are',
    whoPara: 'LS Real Estate was founded in 2019 by Shlomi Limor (broker license no. 3151306) and Limor Katia Hayon (broker license no. 31927308). The company specializes in commercial and residential properties across central Israel, guiding property owners, tenants, buyers, and investors — from the first search to signing the agreement.',
    specTitle: 'Our Specialties',
    specItems: [
      { bold: 'Offices', text: ' — Rental and sale of office spaces, from boutique offices to full floors in towers.' },
      { bold: 'Retail & Commercial Spaces', text: ' — Street-front retail, shopping centers, and retail units.' },
      { bold: 'Warehouses & Logistics', text: ' — Storage facilities, logistics centers, and light industrial spaces.' },
      { bold: 'Data Centers', text: ' — Dedicated spaces for data centers and technology infrastructure.' },
      { bold: 'Land & Fields', text: ' — Land for construction, agriculture, investment, and development.' },
      { bold: 'Residential', text: ' — Apartments and penthouses for sale and rent.' },
      { bold: 'Business Sales', text: ' — Discrete guidance in the sale of active businesses, including transfer of lease rights.' },
    ],
    howTitle: 'How We Work',
    howItems: [
      { bold: 'Accurate Information', text: ' — Every property is vetted before listing, including area data, price, and basic legal status.' },
      { bold: 'Availability', text: ' — Fast response to every inquiry, by phone, WhatsApp, or email.' },
      { bold: 'Personal Guidance', text: ' — Property tours, negotiation management, and support through signing.' },
      { bold: 'Transparency', text: ' — Brokerage fees and commitments are defined upfront in a signed brokerage order, as required by law.' },
    ],
    contactTitle: 'Contact Us',
    contactPara: 'Looking for a property or want to list one you own? We\'d love to talk:',
    contactPhone: 'Shlomi Limor',
    contactPhone2: 'Limor Katia Hayon',
    contactEmail: 'Email',
    contactForm: 'Online contact form',
    contactHours: 'Business hours: Sun–Thu 09:00–18:00, Fri 09:00–13:00.',
  },
  fr: {
    title: 'À Propos de LS Immobilier',
    subtitle: 'Qui sommes-nous et comment nous travaillons',
    whoTitle: 'Qui Sommes-Nous',
    whoPara: 'LS Immobilier a été fondée en 2019 par Shlomi Limor (licence d\'agent n° 3151306) et Limor Katia Hayon (licence d\'agent n° 31927308). L\'agence est spécialisée dans les biens commerciaux et résidentiels en Israël et accompagne propriétaires, locataires, acheteurs et investisseurs — de la première recherche jusqu\'à la signature du contrat.',
    specTitle: 'Nos Spécialités',
    specItems: [
      { bold: 'Bureaux', text: ' — Location et vente de bureaux, des petits espaces aux étages entiers en tour.' },
      { bold: 'Commerce & Retail', text: ' — Locaux commerciaux en pied d\'immeuble, centres commerciaux et boutiques.' },
      { bold: 'Entrepôts & Logistique', text: ' — Espaces de stockage, centres logistiques et industrie légère.' },
      { bold: 'Data Centers', text: ' — Espaces dédiés aux centres de données et infrastructures technologiques.' },
      { bold: 'Terrains & Foncier', text: ' — Terrains à bâtir, agricoles, d\'investissement et de développement.' },
      { bold: 'Résidentiel', text: ' — Appartements et penthouses à la vente et à la location.' },
      { bold: 'Cession d\'entreprises', text: ' — Accompagnement discret dans la vente d\'entreprises actives, y compris le transfert des droits de bail.' },
    ],
    howTitle: 'Comment Nous Travaillons',
    howItems: [
      { bold: 'Information précise', text: ' — Chaque bien est vérifié avant publication : superficie, prix et statut juridique de base.' },
      { bold: 'Disponibilité', text: ' — Réponse rapide à chaque demande, par téléphone, WhatsApp ou e-mail.' },
      { bold: 'Accompagnement personnalisé', text: ' — Visites, négociation et suivi jusqu\'à la signature.' },
      { bold: 'Transparence', text: ' — Les honoraires et engagements sont définis à l\'avance dans un mandat signé, conformément à la loi.' },
    ],
    contactTitle: 'Contactez-Nous',
    contactPara: 'Vous cherchez un bien ou souhaitez en vendre un ? Nous serions ravis d\'échanger :',
    contactPhone: 'Shlomi Limor',
    contactPhone2: 'Limor Katia Hayon',
    contactEmail: 'E-mail',
    contactForm: 'Formulaire de contact en ligne',
    contactHours: 'Horaires : Dim–Jeu 09:00–18:00, Ven 09:00–13:00.',
  },
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const c = CONTENT[locale] ?? CONTENT.he
  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || '055-2702800'
  const email = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@nadlannow.co.il'

  return (
    <LegalPage title={c.title} subtitle={c.subtitle}>
      <h2>{c.whoTitle}</h2>
      <p>{c.whoPara}</p>

      <h2>{c.specTitle}</h2>
      <ul>
        {c.specItems.map(item => (
          <li key={item.bold}><strong>{item.bold}</strong>{item.text}</li>
        ))}
      </ul>

      <h2>{c.howTitle}</h2>
      <ul>
        {c.howItems.map(item => (
          <li key={item.bold}><strong>{item.bold}</strong>{item.text}</li>
        ))}
      </ul>

      <h2>{c.contactTitle}</h2>
      <p>{c.contactPara}</p>
      <ul>
        <li>{c.contactPhone}: <a href="tel:0552702800">055-2702800</a></li>
        <li>{c.contactPhone2}: <a href="tel:0529200190">052-9200190</a></li>
        <li>{c.contactEmail}: <a href={`mailto:${email}`}>{email}</a></li>
        <li><Link href="/contact">{c.contactForm}</Link></li>
      </ul>
      <p>{c.contactHours}</p>
    </LegalPage>
  )
}
