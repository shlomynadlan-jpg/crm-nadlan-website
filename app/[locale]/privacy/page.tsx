import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const titles: Record<string, string> = {
    he: 'מדיניות פרטיות | LS נדל"ן',
    en: 'Privacy Policy | LS Real Estate',
    fr: 'Politique de confidentialité | LS Immobilier',
  }
  const descs: Record<string, string> = {
    he: 'מדיניות הפרטיות של אתר LS נדל"ן — איזה מידע נאסף, למה הוא משמש ומהן זכויותיכם',
    en: 'Privacy Policy of LS Real Estate — what data we collect, how it\'s used, and your rights',
    fr: 'Politique de confidentialité de LS Immobilier — quelles données nous collectons, leur usage et vos droits',
  }
  return {
    title: titles[locale] ?? titles.he,
    description: descs[locale] ?? descs.he,
    alternates: { canonical: '/privacy' },
  }
}

function PrivacyHe({ companyName, phone, email }: { companyName: string; phone: string; email: string }) {
  return <>
    <h2>כללי</h2>
    <p>{companyName} (&quot;החברה&quot;) מכבדת את פרטיות המשתמשים באתר זה. מדיניות זו מפרטת איזה מידע נאסף במסגרת השימוש באתר, כיצד הוא נשמר ולאילו מטרות הוא משמש, בהתאם לחוק הגנת הפרטיות, התשמ״א–1981.</p>
    <h2>איזה מידע אנחנו אוספים</h2>
    <ul>
      <li>פרטי יצירת קשר שמסרתם מרצונכם (שם, טלפון, דוא״ל) דרך טפסי האתר.</li>
      <li>מידע טכני: כתובת IP, סוג דפדפן, מכשיר, עמודים שנצפו וזמני גלישה — נאסף אוטומטית לצרכי ניתוח.</li>
      <li>עוגיות (Cookies) לצרכי ניתוח ושיפור חוויית המשתמש (ראו סעיף עוגיות).</li>
    </ul>
    <h2>למה המידע משמש</h2>
    <ul>
      <li>מתן מענה לפניות ויצירת קשר לצורך שירותי תיווך.</li>
      <li>שיפור האתר וניתוח דפוסי שימוש.</li>
      <li>משלוח עדכונים שיווקיים — רק למי שהסכים לכך במפורש.</li>
    </ul>
    <h2>שיתוף מידע עם צדדים שלישיים</h2>
    <p>החברה אינה מוכרת את פרטיכם לצדדים שלישיים. מידע עשוי להיחשף לספקי שירות שמסייעים בהפעלת האתר (כגון Vercel לאחסון ו-Supabase לניהול נתונים), המחויבים לשמירה על סודיות. כמו כן, מידע יועבר לרשויות אם נדרש על פי חוק.</p>
    <h2>עוגיות (Cookies)</h2>
    <p>האתר משתמש בעוגיות טכניות ועוגיות ניתוח (Analytics). ניתן לנהל את העוגיות דרך הגדרות הדפדפן שלכם, או לבטל עוגיות שיווקיות דרך הקישור &quot;הגדרות עוגיות&quot; בתחתית האתר.</p>
    <h2>אבטחת מידע</h2>
    <p>אנחנו נוקטים באמצעי אבטחה מקובלים להגנה על המידע שנמסר לנו. עם זאת, אין אפשרות להבטיח אבטחה מוחלטת בסביבה דיגיטלית.</p>
    <h2>זכויותיכם</h2>
    <ul>
      <li>לעיין במידע שנאסף עליכם.</li>
      <li>לבקש תיקון מידע שגוי.</li>
      <li>לבקש מחיקת המידע, בכפוף לדרישות חוקיות.</li>
      <li>לבטל הסכמה לקבלת דיוורים שיווקיים בכל עת.</li>
    </ul>
    <p>לפניות בנושא פרטיות: <a href={`mailto:${email}`}>{email}</a> | <a href={`tel:${phone}`}>{phone}</a></p>
    <h2>שינויים במדיניות</h2>
    <p>החברה רשאית לעדכן מדיניות זו מעת לעת. השינויים יפורסמו בדף זה עם עדכון תאריך הגרסה.</p>
  </>
}

function PrivacyEn({ companyName, phone, email }: { companyName: string; phone: string; email: string }) {
  return <>
    <h2>General</h2>
    <p>{companyName} (&quot;the Company&quot;) respects the privacy of users of this website. This policy details what information is collected when using the site, how it is stored and for what purposes, in accordance with applicable privacy laws.</p>
    <h2>What Information We Collect</h2>
    <ul>
      <li>Contact details voluntarily provided (name, phone, email) via website forms.</li>
      <li>Technical data: IP address, browser type, device, pages viewed, and browsing times — collected automatically for analytics purposes.</li>
      <li>Cookies for analytics and improving user experience (see Cookies section).</li>
    </ul>
    <h2>How Information Is Used</h2>
    <ul>
      <li>Responding to inquiries and contact for brokerage services.</li>
      <li>Improving the website and analyzing usage patterns.</li>
      <li>Sending marketing updates — only to those who have explicitly consented.</li>
    </ul>
    <h2>Sharing Information with Third Parties</h2>
    <p>The Company does not sell your details to third parties. Information may be disclosed to service providers assisting in operating the site (such as Vercel for hosting and Supabase for data management), who are obligated to maintain confidentiality. Information may also be transferred to authorities if required by law.</p>
    <h2>Cookies</h2>
    <p>The site uses technical and analytics cookies. You can manage cookies through your browser settings, or disable marketing cookies via the &quot;Cookie Settings&quot; link at the bottom of the site.</p>
    <h2>Data Security</h2>
    <p>We take standard security measures to protect information provided to us. However, absolute security cannot be guaranteed in a digital environment.</p>
    <h2>Your Rights</h2>
    <ul>
      <li>Access information collected about you.</li>
      <li>Request correction of inaccurate information.</li>
      <li>Request deletion of information, subject to legal requirements.</li>
      <li>Withdraw consent to marketing communications at any time.</li>
    </ul>
    <p>For privacy inquiries: <a href={`mailto:${email}`}>{email}</a> | <a href={`tel:${phone}`}>{phone}</a></p>
    <h2>Policy Changes</h2>
    <p>The Company may update this policy from time to time. Changes will be published on this page with an updated version date.</p>
  </>
}

function PrivacyFr({ companyName, phone, email }: { companyName: string; phone: string; email: string }) {
  return <>
    <h2>Généralités</h2>
    <p>{companyName} (&quot;la Société&quot;) respecte la vie privée des utilisateurs de ce site. Cette politique décrit quelles informations sont collectées lors de l&apos;utilisation du site, comment elles sont stockées et à quelles fins, conformément aux lois applicables en matière de protection des données.</p>
    <h2>Informations Collectées</h2>
    <ul>
      <li>Coordonnées fournies volontairement (nom, téléphone, e-mail) via les formulaires du site.</li>
      <li>Données techniques : adresse IP, type de navigateur, appareil, pages consultées et temps de navigation — collectées automatiquement à des fins d&apos;analyse.</li>
      <li>Cookies à des fins d&apos;analyse et d&apos;amélioration de l&apos;expérience utilisateur (voir section Cookies).</li>
    </ul>
    <h2>Utilisation des Informations</h2>
    <ul>
      <li>Réponse aux demandes et prise de contact pour les services de courtage.</li>
      <li>Amélioration du site et analyse des habitudes d&apos;utilisation.</li>
      <li>Envoi de communications marketing — uniquement aux personnes ayant explicitement consenti.</li>
    </ul>
    <h2>Partage avec des Tiers</h2>
    <p>La Société ne vend pas vos données à des tiers. Les informations peuvent être communiquées à des prestataires de services aidant à l&apos;exploitation du site (tels que Vercel pour l&apos;hébergement et Supabase pour la gestion des données), tenus à la confidentialité. Les informations peuvent également être transmises aux autorités si la loi l&apos;exige.</p>
    <h2>Cookies</h2>
    <p>Le site utilise des cookies techniques et analytiques. Vous pouvez gérer les cookies via les paramètres de votre navigateur, ou désactiver les cookies marketing via le lien &quot;Paramètres des cookies&quot; en bas du site.</p>
    <h2>Sécurité des Données</h2>
    <p>Nous prenons des mesures de sécurité standard pour protéger les informations qui nous sont fournies. Toutefois, une sécurité absolue ne peut être garantie dans un environnement numérique.</p>
    <h2>Vos Droits</h2>
    <ul>
      <li>Accéder aux informations collectées vous concernant.</li>
      <li>Demander la correction d&apos;informations inexactes.</li>
      <li>Demander la suppression des informations, sous réserve des exigences légales.</li>
      <li>Retirer votre consentement aux communications marketing à tout moment.</li>
    </ul>
    <p>Pour toute question relative à la vie privée : <a href={`mailto:${email}`}>{email}</a> | <a href={`tel:${phone}`}>{phone}</a></p>
    <h2>Modifications de la Politique</h2>
    <p>La Société peut mettre à jour cette politique de temps à autre. Les modifications seront publiées sur cette page avec une date de version mise à jour.</p>
  </>
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || 'LS נדל"ן'
  const phone = process.env.NEXT_PUBLIC_COMPANY_PHONE || '055-2702800'
  const email = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'info@nadlannow.co.il'

  const titles: Record<string, { title: string; subtitle: string }> = {
    he: { title: 'מדיניות פרטיות', subtitle: 'איך אנחנו שומרים על המידע שלכם' },
    en: { title: 'Privacy Policy', subtitle: 'How we protect your information' },
    fr: { title: 'Politique de Confidentialité', subtitle: 'Comment nous protégeons vos informations' },
  }
  const { title, subtitle } = titles[locale] ?? titles.he

  return (
    <LegalPage title={title} subtitle={subtitle} updated="13.07.2026">
      {locale === 'en' && <PrivacyEn companyName={companyName} phone={phone} email={email} />}
      {locale === 'fr' && <PrivacyFr companyName={companyName} phone={phone} email={email} />}
      {(locale === 'he' || !['en','fr'].includes(locale)) && <PrivacyHe companyName={companyName} phone={phone} email={email} />}
    </LegalPage>
  )
}
