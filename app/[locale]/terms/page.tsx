import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    he: 'תקנון ותנאי שימוש | LS נדל"ן',
    en: 'Terms of Use | LS Real Estate',
    fr: 'Conditions d\'utilisation | LS Immobilier',
  }
  return {
    title: titles[locale] ?? titles.he,
    alternates: { canonical: '/terms' },
  }
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || 'LS נדל"ן'
  const email = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@nadlannow.co.il'

  const titles: Record<string, { title: string; subtitle: string }> = {
    he: { title: 'תקנון ותנאי שימוש', subtitle: 'תנאי השימוש באתר' },
    en: { title: 'Terms of Use', subtitle: 'Terms governing use of this website' },
    fr: { title: 'Conditions d\'utilisation', subtitle: 'Conditions régissant l\'utilisation de ce site' },
  }
  const { title, subtitle } = titles[locale] ?? titles.he

  if (locale === 'en') return (
    <LegalPage title={title} subtitle={subtitle} updated="13.07.2026">
      <h2>Use of the Website</h2>
      <p>Use of the {companyName} website constitutes acceptance of these terms. The site is intended for informational purposes and does not constitute a binding offer or commitment.</p>
      <h2>Intellectual Property</h2>
      <p>All content on this site — including texts, images, design, and logo — is the property of {companyName} and may not be reproduced without written permission.</p>
      <h2>Property Information</h2>
      <p>Property details displayed on the site are provided in good faith and may change. We recommend verifying current details directly with us before making any decision.</p>
      <h2>Limitation of Liability</h2>
      <p>{companyName} is not liable for any direct or indirect damage arising from use of the site or reliance on the information displayed.</p>
      <h2>Privacy</h2>
      <p>Use of the site is also subject to our Privacy Policy, which forms an integral part of these terms.</p>
      <h2>Changes to Terms</h2>
      <p>We reserve the right to update these terms at any time. Continued use of the site constitutes acceptance of the updated terms.</p>
      <h2>Contact</h2>
      <p>Questions about these terms: <a href={`mailto:${email}`}>{email}</a></p>
    </LegalPage>
  )

  if (locale === 'fr') return (
    <LegalPage title={title} subtitle={subtitle} updated="13.07.2026">
      <h2>Utilisation du Site</h2>
      <p>L&apos;utilisation du site {companyName} implique l&apos;acceptation des présentes conditions. Le site est destiné à des fins d&apos;information et ne constitue pas une offre contraignante.</p>
      <h2>Propriété Intellectuelle</h2>
      <p>Tout le contenu de ce site — textes, images, design et logo — est la propriété de {companyName} et ne peut être reproduit sans autorisation écrite.</p>
      <h2>Informations sur les Biens</h2>
      <p>Les détails des biens affichés sur le site sont fournis de bonne foi et peuvent changer. Nous recommandons de vérifier les informations actuelles directement avec nous avant toute décision.</p>
      <h2>Limitation de Responsabilité</h2>
      <p>{companyName} n&apos;est pas responsable des dommages directs ou indirects résultant de l&apos;utilisation du site ou de la confiance accordée aux informations affichées.</p>
      <h2>Confidentialité</h2>
      <p>L&apos;utilisation du site est également soumise à notre Politique de confidentialité, qui fait partie intégrante des présentes conditions.</p>
      <h2>Modifications des Conditions</h2>
      <p>Nous nous réservons le droit de mettre à jour ces conditions à tout moment. L&apos;utilisation continue du site vaut acceptation des conditions mises à jour.</p>
      <h2>Contact</h2>
      <p>Questions sur ces conditions : <a href={`mailto:${email}`}>{email}</a></p>
    </LegalPage>
  )

  // Hebrew (default) — keep the existing content structure
  return (
    <LegalPage title={title} subtitle={subtitle} updated="13.07.2026">
      <h2>שימוש באתר</h2>
      <p>השימוש באתר {companyName} מהווה הסכמה לתנאים אלה. האתר נועד למטרות מידע ואינו מהווה הצעה מחייבת.</p>
      <h2>קניין רוחני</h2>
      <p>כל התכנים באתר — לרבות טקסטים, תמונות, עיצוב ולוגו — הם רכושה של {companyName} ואין לשכפלם ללא אישור בכתב.</p>
      <h2>מידע על נכסים</h2>
      <p>פרטי הנכסים המוצגים באתר מסופקים בתום לב ועשויים להשתנות. מומלץ לאמת פרטים עדכניים ישירות מולנו לפני קבלת כל החלטה.</p>
      <h2>הגבלת אחריות</h2>
      <p>{companyName} אינה אחראית לנזקים ישירים או עקיפים הנובעים מהשימוש באתר או מהסתמכות על המידע המוצג.</p>
      <h2>פרטיות</h2>
      <p>השימוש באתר כפוף גם למדיניות הפרטיות שלנו, המהווה חלק בלתי נפרד מתנאים אלה.</p>
      <h2>שינויים בתנאים</h2>
      <p>אנחנו שומרים לעצמנו את הזכות לעדכן תנאים אלה בכל עת. המשך השימוש באתר מהווה הסכמה לתנאים המעודכנים.</p>
      <h2>צור קשר</h2>
      <p>שאלות בנוגע לתנאים אלה: <a href={`mailto:${email}`}>{email}</a></p>
    </LegalPage>
  )
}
