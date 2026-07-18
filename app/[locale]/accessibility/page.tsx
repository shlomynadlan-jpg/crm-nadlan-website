import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    he: 'הצהרת נגישות | LS נדל"ן',
    en: 'Accessibility Statement | LS Real Estate',
    fr: 'Déclaration d\'accessibilité | LS Immobilier',
  }
  const descs: Record<string, string> = {
    he: 'הצהרת הנגישות של אתר LS נדל"ן — מה עשינו לנגישות ואיך יוצרים קשר',
    en: 'Accessibility statement for LS Real Estate — what we\'ve done for accessibility and how to contact us',
    fr: 'Déclaration d\'accessibilité de LS Immobilier — nos actions et comment nous contacter',
  }
  return {
    title: titles[locale] ?? titles.he,
    description: descs[locale] ?? descs.he,
    alternates: { canonical: '/accessibility' },
  }
}

export default async function AccessibilityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || '055-2702800'
  const email = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@nadlannow.co.il'

  const titles: Record<string, { title: string; subtitle: string }> = {
    he: { title: 'הצהרת נגישות', subtitle: 'אנחנו מחויבים לנגישות דיגיטלית לכולם' },
    en: { title: 'Accessibility Statement', subtitle: 'We are committed to digital accessibility for everyone' },
    fr: { title: 'Déclaration d\'accessibilité', subtitle: 'Nous nous engageons pour l\'accessibilité numérique pour tous' },
  }
  const { title, subtitle } = titles[locale] ?? titles.he

  if (locale === 'en') return (
    <LegalPage title={title} subtitle={subtitle} updated="13.07.2026">
      <h2>Our Commitment</h2>
      <p>LS Real Estate is committed to making its website accessible to people with disabilities, in accordance with the Equal Rights for Persons with Disabilities Law, 5758-1998, and the Accessibility Regulations (Adjustments for Internet Service), 5774-2013.</p>
      <h2>Accessibility Measures Implemented</h2>
      <ul>
        <li>Semantic HTML structure and proper heading hierarchy.</li>
        <li>Text alternatives for all images.</li>
        <li>Keyboard navigation support throughout the site.</li>
        <li>Color contrast meeting WCAG 2.1 AA standards.</li>
        <li>Skip navigation link for screen reader users.</li>
        <li>ARIA labels on interactive elements.</li>
        <li>Accessibility menu (top of page) to adjust font size, contrast, and motion.</li>
      </ul>
      <h2>Known Limitations</h2>
      <p>Some content embedded from third-party services may not meet full accessibility standards. We are working to improve this.</p>
      <h2>Contact for Accessibility Issues</h2>
      <p>If you encounter any accessibility barrier on the site, please contact us:</p>
      <ul>
        <li>Phone: <a href={`tel:${phone}`}>{phone}</a></li>
        <li>Email: <a href={`mailto:${email}`}>{email}</a></li>
      </ul>
      <p>We aim to respond to accessibility inquiries within 5 business days.</p>
    </LegalPage>
  )

  if (locale === 'fr') return (
    <LegalPage title={title} subtitle={subtitle} updated="13.07.2026">
      <h2>Notre Engagement</h2>
      <p>LS Immobilier s&apos;engage à rendre son site web accessible aux personnes handicapées, conformément aux lois et réglementations applicables en matière d&apos;accessibilité numérique.</p>
      <h2>Mesures d&apos;Accessibilité Mises en Place</h2>
      <ul>
        <li>Structure HTML sémantique et hiérarchie de titres appropriée.</li>
        <li>Textes alternatifs pour toutes les images.</li>
        <li>Navigation au clavier sur l&apos;ensemble du site.</li>
        <li>Contraste des couleurs conforme aux normes WCAG 2.1 AA.</li>
        <li>Lien de navigation rapide pour les utilisateurs de lecteurs d&apos;écran.</li>
        <li>Libellés ARIA sur les éléments interactifs.</li>
        <li>Menu d&apos;accessibilité pour ajuster la taille du texte, le contraste et les animations.</li>
      </ul>
      <h2>Limitations Connues</h2>
      <p>Certains contenus intégrés depuis des services tiers peuvent ne pas répondre entièrement aux normes d&apos;accessibilité. Nous travaillons à améliorer cela.</p>
      <h2>Contact pour Questions d&apos;Accessibilité</h2>
      <p>Si vous rencontrez un obstacle d&apos;accessibilité sur le site, veuillez nous contacter :</p>
      <ul>
        <li>Téléphone : <a href={`tel:${phone}`}>{phone}</a></li>
        <li>E-mail : <a href={`mailto:${email}`}>{email}</a></li>
      </ul>
      <p>Nous nous efforçons de répondre aux demandes d&apos;accessibilité dans un délai de 5 jours ouvrables.</p>
    </LegalPage>
  )

  // Hebrew (default)
  return (
    <LegalPage title={title} subtitle={subtitle} updated="13.07.2026">
      <h2>המחויבות שלנו</h2>
      <p>LS נדל״ן מחויבת להנגשת אתר האינטרנט שלה לאנשים עם מוגבלות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, תשנ״ח–1998, ולתקנות הנגישות (התאמות לשירות אינטרנט), תשע״ד–2013.</p>
      <h2>אמצעי נגישות שיושמו</h2>
      <ul>
        <li>מבנה HTML סמנטי והיררכיית כותרות תקינה.</li>
        <li>תיאורי טקסט חלופי לכל התמונות.</li>
        <li>ניווט מקלדת בכל האתר.</li>
        <li>ניגודיות צבעים בהתאם לתקן WCAG 2.1 AA.</li>
        <li>קישור &quot;דלגו לתוכן&quot; למשתמשי קוראי מסך.</li>
        <li>תוויות ARIA על אלמנטים אינטראקטיביים.</li>
        <li>תפריט נגישות (ראש הדף) לשינוי גודל גופן, ניגודיות ותנועה.</li>
      </ul>
      <h2>מגבלות ידועות</h2>
      <p>חלק מהתכנים המוטמעים משירותי צד שלישי עשויים שלא לעמוד בתקני הנגישות המלאים. אנחנו עובדים על שיפור זה.</p>
      <h2>יצירת קשר בנושאי נגישות</h2>
      <p>נתקלתם במחסום נגישות באתר? אנא צרו קשר:</p>
      <ul>
        <li>טלפון: <a href={`tel:${phone}`}>{phone}</a></li>
        <li>דוא״ל: <a href={`mailto:${email}`}>{email}</a></li>
      </ul>
      <p>אנחנו שואפים לטפל בפניות נגישות תוך 5 ימי עסקים.</p>
    </LegalPage>
  )
}
