import type { Metadata } from 'next'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import AccessibilityWidget from '@/components/AccessibilityWidget'
import CookieNotice from '@/components/CookieNotice'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import './globals.css'

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
}

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'LS נדל"ן',
  url: BASE,
  telephone: '+972-55-2702800',
  email: 'info@nadlannow.co.il',
  areaServed: { '@type': 'Country', name: 'Israel' },
  knowsLanguage: 'he',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '09:00', closes: '13:00' },
  ],
  makesOffer: {
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: 'תיווך נכסים מסחריים ומגורים — מכירה והשכרה' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Script id="js-flag" strategy="beforeInteractive">
          {"document.documentElement.classList.add('js')"}
        </Script>
        <a href="#main" className="skip-link">דלגו לתוכן הראשי</a>
        {children}
        <AccessibilityWidget />
        <CookieNotice />
        <WhatsAppFloat />
        <Analytics />
      </body>
    </html>
  )
}
