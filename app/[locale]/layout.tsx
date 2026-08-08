import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import AccessibilityWidget from '@/components/AccessibilityWidget'
import CookieNotice from '@/components/CookieNotice'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import '../globals.css'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

type Locale = 'he' | 'en' | 'fr' | 'ru'

const BASE = 'https://www.nadlannow.co.il'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default: 'LS נדל"ן — נכסים מסחריים ומגורים למכירה ולהשכרה',
    template: '%s | LS נדל"ן',
  },
  description: 'LS נדל"ן — תיווך נכסים מסחריים ומגורים: משרדים, חנויות, מחסנים, תעשייה, קרקעות ודירות למכירה ולהשכרה. ליווי אישי מהחיפוש ועד החתימה.',
  openGraph: {
    type: 'website',
    siteName: 'LS נדל"ן',
    title: 'LS נדל"ן — נכסים מסחריים ומגורים למכירה ולהשכרה',
    description: 'משרדים, חנויות, מחסנים, תעשייה, קרקעות ודירות למכירה ולהשכרה',
    locale: 'he_IL',
    url: BASE,
  },
  robots: { index: true, follow: true },
  verification: { google: 'CWZUZyy4u6UCK76rQ4f71IBlbL9mMn_EEVpmEIeGIMI' },
  twitter: {
    card: 'summary_large_image',
    title: 'LS נדל"ן — נכסים מסחריים ומגורים',
    description: 'תיווך נדל"ן מסחרי ומגורים — משרדים, חנויות, מחסנים, קרקעות ודירות',
  },
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'LS נדל"ן',
  alternateName: ['LS Real Estate', 'LS Nadlan', 'נדלן נאו'],
  url: BASE,
  inLanguage: ['he', 'en', 'fr', 'ru'],
  potentialAction: {
    '@type': 'SearchAction',
    target: `${BASE}/he/properties?city={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

const SERVICE_AREAS = [
  'פתח תקווה', 'ראש העין', 'בני ברק', 'תל אביב', 'הוד השרון',
  'כפר סבא', 'קריית אונו', 'אור יהודה', 'יהוד', 'הרצליה',
  'ראשון לציון', 'גבעת שמואל', 'רמת גן',
]

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  '@id': `${BASE}/#organization`,
  name: 'LS נדל"ן',
  alternateName: ['LS Real Estate', 'LS Nadlan'],
  url: BASE,
  logo: `${BASE}/logo.png`,
  image: `${BASE}/logo.png`,
  telephone: '+972-55-2702800',
  email: 'info@nadlannow.co.il',
  priceRange: '₪₪',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'פתח תקווה',
    addressRegion: 'מחוז המרכז',
    addressCountry: 'IL',
  },
  areaServed: [
    { '@type': 'Country', name: 'ישראל' },
    ...SERVICE_AREAS.map(city => ({ '@type': 'City', name: city })),
  ],
  knowsLanguage: ['he', 'en', 'fr', 'ru'],
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '09:00', closes: '13:00' },
  ],
  makesOffer: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'תיווך משרדים למכירה ולהשכרה' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'תיווך חנויות ושטחי מסחר' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'תיווך מחסנים ולוגיסטיקה' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'תיווך שטחי תעשייה' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'תיווך קרקעות מסחריות' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'תיווך דירות מגורים' } },
  ],
  foundingDate: '2019',
  slogan: 'תיווך נדל״ן מסחרי ומגורים עם ליווי אישי מהחיפוש ועד החתימה',
}

const homeFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'באילו אזורים אתם פועלים?',
      acceptedAnswer: { '@type': 'Answer', text: 'הבסיס שלנו בפתח תקווה ומרבית הפעילות במרכז הארץ — פתח תקווה, ראש העין, בני ברק, תל אביב, הוד השרון, כפר סבא, קריית אונו, אור יהודה, יהוד, הרצליה, ראשון לציון, גבעת שמואל ורמת גן. אנחנו מטפלים בנכסים בכל הארץ לפי בקשה.' },
    },
    {
      '@type': 'Question',
      name: 'כמה עולה משרד להשכרה בפתח תקווה?',
      acceptedAnswer: { '@type': 'Answer', text: 'המחיר הממוצע לשכירות משרד בפתח תקווה בשנת 2026 עומד על 60–110 ₪ למ״ר ברוטו לחודש. במגדלים חדשים בקריית מטלון: 85–115 ₪. באזור סגולה והתעשייה: 45–75 ₪. יש להוסיף דמי ניהול, ארנונה וחניה.' },
    },
    {
      '@type': 'Question',
      name: 'כמה עולה עמלת תיווך על נכס מסחרי?',
      acceptedAnswer: { '@type': 'Answer', text: 'בעסקאות שכירות מסחריות מקובלת עמלה בגובה דמי שכירות של חודש אחד בתוספת מע״מ. בעסקאות מכר — 1%–2% ממחיר העסקה בתוספת מע״מ. העמלה נקבעת מראש בהזמנת שירותי תיווך חתומה.' },
    },
    {
      '@type': 'Question',
      name: 'אני בעל נכס — איך מפרסמים אצלכם?',
      acceptedAnswer: { '@type': 'Answer', text: 'יוצרים איתנו קשר בטלפון 055-2702800 או דרך טופס האתר. נגיע לנכס, נאסוף פרטים ותמונות, נחתום על הזמנת שירות — והנכס יעלה לאתר תוך ימים ספורים ויוצע ללקוחות הרלוונטיים במאגר שלנו.' },
    },
  ],
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) notFound()

  const messages = await getMessages()
  const dir = locale === 'he' ? 'rtl' : 'ltr'

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Script id="js-flag" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js')"}
        </Script>
        <a href="#main" className="skip-link">דלגו לתוכן הראשי</a>
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieNotice />
          <WhatsAppFloat />
          <AccessibilityWidget />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
