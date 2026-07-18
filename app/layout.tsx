import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.nadlannow.co.il'),
  title: { default: 'LS נדל"ן', template: '%s | LS נדל"ן' },
  description: 'נדל"ן מסחרי ומגורים — מוצאים לך את הנכס המושלם',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
