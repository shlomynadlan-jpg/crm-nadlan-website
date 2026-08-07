import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'LS נדל"ן — נכסים מסחריים ומגורים למכירה ולהשכרה'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0F172A 0%, #0077B6 60%, #005A8E 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 28,
            background: 'linear-gradient(135deg, #0077B6, #005A8E)',
            border: '3px solid rgba(255,255,255,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 56,
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          LS
        </div>
        <div style={{ fontSize: 72, fontWeight: 800, display: 'flex' }}>LS נדל&quot;ן</div>
        <div style={{ fontSize: 34, color: '#C9A84C', marginTop: 20, display: 'flex' }}>
          נכסים מסחריים ומגורים • למכירה ולהשכרה
        </div>
        <div style={{ fontSize: 26, color: '#BFDBFE', marginTop: 30, display: 'flex' }}>
          www.nadlannow.co.il
        </div>
      </div>
    ),
    size
  )
}
