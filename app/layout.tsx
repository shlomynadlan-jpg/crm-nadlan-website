import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LS נדל"ן — נכסים למכירה ולהשכרה',
  description: 'מגוון נכסים מסחריים ומגורים למכירה ולהשכרה. משרדים, חנויות, דירות ועוד.',
  openGraph: {
    title: 'LS נדל"ן',
    description: 'נכסים מסחריים ומגורים למכירה ולהשכרה',
    locale: 'he_IL',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  )
}
