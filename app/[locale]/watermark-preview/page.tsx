import Image from 'next/image'
import { getProperties } from '@/lib/properties'

const OPACITIES = [
  { label: '10%', value: 0.10 },
  { label: '20%', value: 0.20 },
  { label: '30%', value: 0.30 },
  { label: '40%', value: 0.40 },
  { label: '50%', value: 0.50 },
]

export default async function WatermarkPreviewPage() {
  const properties = await getProperties()
  const withImage = properties.find(p => p.image_urls && p.image_urls.length > 0)
  const testImage = withImage?.image_urls?.[0] || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800'

  return (
    <div dir="rtl" style={{ background: '#0f172a', minHeight: '100vh', padding: '40px 24px' }}>
      <h1 style={{ color: '#C9A84C', fontWeight: 900, fontSize: 28, marginBottom: 8 }}>תצוגת ווטרמרק — בחר שקיפות</h1>
      <p style={{ color: '#94a3b8', marginBottom: 40 }}>לחץ על האפשרות המועדפת ושלח לי את המספר</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
        {OPACITIES.map(({ label, value }) => (
          <div key={label} style={{ background: '#1e293b', borderRadius: 16, overflow: 'hidden', border: '1px solid #334155' }}>
            <div style={{ position: 'relative', height: 220 }}>
              <Image src={testImage} alt="תמונת נכס לדוגמה" fill style={{ objectFit: 'cover' }} sizes="340px" />
              {/* Watermark */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', padding: 12, pointerEvents: 'none' }}>
                <Image src="/logo.png" alt="watermark" width={110} height={110} style={{ opacity: value, width: 110, height: 'auto', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.5))' }} />
              </div>
            </div>
            <div style={{ padding: '12px 16px', textAlign: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>שקיפות {label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
