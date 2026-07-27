import Image from 'next/image'

export const dynamic = 'force-dynamic'

const OPACITIES = [
  { label: '10%', value: 0.10 },
  { label: '20%', value: 0.20 },
  { label: '30%', value: 0.30 },
  { label: '40%', value: 0.40 },
  { label: '50%', value: 0.50 },
]

const TEST_IMAGE = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'

export default function WatermarkPreviewPage() {
  return (
    <div dir="rtl" style={{ background: '#0f172a', minHeight: '100vh', padding: '40px 24px' }}>
      <h1 style={{ color: '#C9A84C', fontWeight: 900, fontSize: 28, marginBottom: 8 }}>תצוגת ווטרמרק — בחר שקיפות</h1>
      <p style={{ color: '#94a3b8', marginBottom: 40 }}>תגיד איזה מספר אוהב</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
        {OPACITIES.map(({ label, value }) => (
          <div key={label} style={{ background: '#1e293b', borderRadius: 16, overflow: 'hidden', border: '1px solid #334155' }}>
            <div style={{ position: 'relative', height: 220 }}>
              <Image src={TEST_IMAGE} alt="תמונת נכס לדוגמה" fill style={{ objectFit: 'cover' }} sizes="340px" unoptimized />
              <div style={{ position: 'absolute', bottom: 10, left: 10, pointerEvents: 'none' }}>
                <Image src="/logo.png" alt="watermark" width={100} height={100} style={{ opacity: value, height: 'auto', filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.6))' }} unoptimized />
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
