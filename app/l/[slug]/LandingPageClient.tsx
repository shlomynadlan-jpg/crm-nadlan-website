'use client'
import { useState, useEffect, useRef } from 'react'
import { CampaignWithProperty } from '@/lib/campaigns'

interface Props {
  campaign: CampaignWithProperty
  agent: any
}

export default function LandingPageClient({ campaign, agent }: Props) {
  const prop = campaign.properties
  const custom = campaign.custom_data || {}
  const theme = campaign.theme || {}
  const primary = theme.primary || '#c9a84c'

  // UTM source from URL
  const [utmSource, setUtmSource] = useState(campaign.utm_source || 'direct')
  const [utmMedium, setUtmMedium] = useState('')
  const [utmCampaign, setUtmCampaign] = useState('')
  const [navScrolled, setNavScrolled] = useState(false)

  // Form state
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('utm_source')) setUtmSource(params.get('utm_source')!)
    if (params.get('utm_medium')) setUtmMedium(params.get('utm_medium')!)
    if (params.get('utm_campaign')) setUtmCampaign(params.get('utm_campaign')!)

    const onScroll = () => setNavScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.sr')
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('sr-visible') })
    }, { threshold: 0.1 })
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !phone.trim()) { setError('שם וטלפון הם שדות חובה'); return }
    setError('')
    setSubmitting(true)

    try {
      // Use local proxy to avoid CORS issues
      const res = await fetch(`/api/campaign-lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          campaign_id: campaign.id,
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          message: message.trim() || undefined,
          source: utmSource,
          utm_source: utmSource,
          utm_medium: utmMedium || undefined,
          utm_campaign: utmCampaign || undefined,
        }),
      })
      if (!res.ok) throw new Error('שגיאה')
      setSubmitted(true)
    } catch {
      setError('שגיאה בשליחה — נסו שוב או התקשרו ישירות')
    } finally {
      setSubmitting(false)
    }
  }

  const deal = prop?.deal_type || ''
  const isRent = deal.includes('השכרה') && !deal.includes('מכירה')
  const badgeText = custom.badge || (isRent ? 'להשכרה' : deal.includes('מכירה') ? 'למכירה' : 'לחצות')
  const headline = custom.title || prop?.property_type || campaign.title
  const city = prop?.city || ''
  const desc = custom.description || prop?.description || ''
  const cta = custom.cta || 'לתיאום סיור'
  const heroImage = prop?.image_urls?.[0] || 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=1600&q=80'
  const galleryImages = [
    ...(prop?.image_urls || []),
  ].filter(Boolean).slice(0, 6)

  const stats = [
    prop?.gross_size && { label: 'מ"ר קרקע', val: `${prop.gross_size}` },
    prop?.gallery_size && { label: 'מ"ר גלריה', val: `${prop.gallery_size}` },
    prop?.net_size && !prop?.gross_size && { label: 'מ"ר נטו', val: `${prop.net_size}` },
    prop?.rooms && { label: 'חדרים', val: `${prop.rooms}` },
    prop?.floor != null && { label: 'קומה', val: `${prop.floor}` },
    prop?.parking_count && prop.parking_count !== 'אין' && { label: 'חניה', val: prop.parking_count },
  ].filter(Boolean) as { label: string; val: string }[]

  const priceDisplay = isRent
    ? prop?.rent_price ? `₪${Number(prop.rent_price).toLocaleString('he-IL')}/חודש` : null
    : prop?.price ? `₪${Number(prop.price).toLocaleString('he-IL')}` : null

  const features = [
    prop?.ac && 'מיזוג אוויר',
    prop?.elevator && 'מעלית',
    prop?.meeting_room && 'חדר ישיבות',
    prop?.furniture && 'ריהוט',
    prop?.gallery && `גלריה${prop.gallery_size ? ` (${prop.gallery_size}מ"ר)` : ''}`,
    prop?.dock_leveler && 'משווה גובה',
    prop?.underground_parking && 'חניון תת-קרקעי',
    prop?.bars && 'סורגים',
  ].filter(Boolean) as string[]

  const suitableFor = [
    { icon: '👥', name: 'משרדים', desc: 'עם קבלת קהל' },
    { icon: '🏥', name: 'קליניקות', desc: 'ובריאות' },
    { icon: '💆', name: 'קוסמטיקה', desc: 'ויופי' },
    { icon: '🛍️', name: 'בוטיק', desc: 'ואופנה' },
    { icon: '🎨', name: 'סטודיו', desc: 'ויצירה' },
    { icon: '🤝', name: 'יועצים', desc: 'ומטפלים' },
  ]

  const agentPhone1 = agent?.phone || ''
  const agentName1 = agent?.full_name || 'שחף נכסים'

  return (
    <>
      <style>{`
        :root { --primary: ${primary}; }
        *,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; direction:rtl; }
        body { font-family:'Heebo',system-ui,sans-serif; background:#06101f; color:#fff; overflow-x:hidden; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:var(--primary); border-radius:3px; }
        .gold { color:var(--primary); }
        .gold-grad { background:linear-gradient(135deg,var(--primary),#e8c76a); }
        .btn-gold { background:linear-gradient(135deg,var(--primary),#e8c76a); color:#06101f; font-weight:800; border:none; cursor:pointer; transition:all .2s; }
        .btn-gold:hover { transform:translateY(-2px); box-shadow:0 6px 24px rgba(201,168,76,.45); }
        .btn-outline { background:transparent; color:var(--primary); border:1.5px solid rgba(201,168,76,.5); cursor:pointer; transition:all .2s; }
        .btn-outline:hover { border-color:var(--primary); background:rgba(201,168,76,.08); }
        .sr { opacity:0; transform:translateY(24px); transition:opacity .6s ease,transform .6s ease; }
        .sr-visible { opacity:1; transform:none; }
        @media(prefers-reduced-motion:reduce) { .sr { transition:none; } }
        .gold-line { height:1px; background:linear-gradient(90deg,transparent,var(--primary),transparent); opacity:.2; }
        .field-input { width:100%; padding:12px 16px; border-radius:9px; background:rgba(255,255,255,.06); border:1px solid rgba(201,168,76,.2); color:#fff; font-family:inherit; font-size:.9rem; outline:none; transition:border-color .2s; }
        .field-input:focus { border-color:var(--primary); }
        .field-input::placeholder { color:rgba(255,255,255,.25); }
      `}</style>

      {/* NAV */}
      <nav style={{
        position:'fixed',top:0,left:0,right:0,zIndex:200,
        display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:'0 40px',height:'64px',
        background: navScrolled ? 'rgba(6,16,31,0.97)' : 'rgba(6,16,31,0.85)',
        backdropFilter:'blur(18px)',
        borderBottom:'1px solid rgba(201,168,76,0.18)',
        transition:'background .3s',
        direction:'rtl',
      }}>
        <div style={{ display:'flex',alignItems:'center',gap:'8px',fontWeight:800,fontSize:'1rem',color:'var(--primary)' }}>
          <svg width="28" height="28" viewBox="0 0 36 36" fill="currentColor">
            <path d="M18 3L3 16v18h10V24h10v10h10V16L18 3z"/>
          </svg>
          {agent?.business_name || 'שחף נכסים'}
        </div>
        <div style={{ display:'flex',gap:'10px' }}>
          {agentPhone1 && (
            <a href={`tel:${agentPhone1}`} className="btn-outline"
               style={{ padding:'9px 20px',borderRadius:'7px',fontSize:'.88rem',fontWeight:700,textDecoration:'none',display:'flex',alignItems:'center',gap:'7px' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.37 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              {agentPhone1}
            </a>
          )}
          <button
            onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold"
            style={{ padding:'9px 20px',borderRadius:'7px',fontSize:'.88rem' }}
          >
            {cta}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header style={{
        minHeight:'100vh',paddingTop:'64px',
        position:'relative',overflow:'hidden',
        display:'flex',alignItems:'center',
      }}>
        {/* BG */}
        <div style={{
          position:'absolute',inset:0,
          background:`linear-gradient(110deg,rgba(6,16,31,.97) 40%,rgba(6,16,31,.7) 70%,rgba(6,16,31,.4) 100%), url('${heroImage}') center/cover no-repeat`,
        }}/>
        <div style={{
          position:'absolute',inset:0,
          background:'radial-gradient(ellipse 55% 55% at 72% 50%,rgba(201,168,76,.07) 0%,transparent 70%)',
        }}/>

        <div style={{ position:'relative',zIndex:2,padding:'80px 48px',maxWidth:'680px' }}>
          {/* Badges */}
          <div style={{ display:'flex',gap:'10px',flexWrap:'wrap',marginBottom:'20px' }}>
            <span style={{ background:'#c0392b',color:'#fff',padding:'5px 14px',borderRadius:'5px',fontSize:'.78rem',fontWeight:800,letterSpacing:'.1em',textTransform:'uppercase' }}>
              {badgeText}
            </span>
            {prop?.property_type && (
              <span style={{ border:`1px solid rgba(201,168,76,.4)`,color:'var(--primary)',padding:'5px 14px',borderRadius:'5px',fontSize:'.75rem',fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase' }}>
                {Array.isArray(prop.property_type) ? prop.property_type.join(', ') : prop.property_type}
              </span>
            )}
          </div>

          <p style={{ fontFamily:'Georgia,serif',fontSize:'.85rem',letterSpacing:'.2em',textTransform:'uppercase',color:'rgba(201,168,76,.75)',marginBottom:'12px' }}>
            {agent?.business_name || 'שחף נכסים'} · המחלקה המסחרית
          </p>

          <h1 style={{ fontSize:'clamp(3.5rem,7vw,6rem)',fontWeight:900,lineHeight:.92,color:'#fff',marginBottom:'16px' }}>
            {headline}<br/>
            <span style={{ background:'linear-gradient(135deg,var(--primary),#f5d98a)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
              {city}
            </span>
          </h1>

          {city && (
            <div style={{ display:'flex',alignItems:'center',gap:'8px',fontSize:'1.1rem',fontWeight:600,color:'rgba(255,255,255,.7)',marginBottom:'16px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {city}
            </div>
          )}

          {desc && (
            <p style={{ fontSize:'1rem',color:'#7a8ea8',lineHeight:1.8,maxWidth:'460px',marginBottom:'20px' }}>
              {desc}
            </p>
          )}

          {/* Stats */}
          {stats.length > 0 && (
            <div style={{ display:'flex',border:'1px solid rgba(201,168,76,.18)',borderRadius:'12px',overflow:'hidden',width:'fit-content',marginBottom:'28px' }}>
              {stats.slice(0, 4).map((s, i) => (
                <div key={i} style={{ padding:'14px 22px',textAlign:'center',borderLeft: i > 0 ? '1px solid rgba(201,168,76,.18)' : 'none' }}>
                  <div style={{ fontSize:'1.8rem',fontWeight:900,color:'var(--primary)',lineHeight:1 }}>{s.val}</div>
                  <div style={{ fontSize:'.7rem',color:'#7a8ea8',marginTop:'4px' }}>{s.label}</div>
                </div>
              ))}
              {priceDisplay && (
                <div style={{ padding:'14px 22px',textAlign:'center',borderLeft:'1px solid rgba(201,168,76,.18)' }}>
                  <div style={{ fontSize:'1.4rem',fontWeight:900,color:'var(--primary)',lineHeight:1 }}>{priceDisplay}</div>
                  <div style={{ fontSize:'.7rem',color:'#7a8ea8',marginTop:'4px' }}>מחיר</div>
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          <div style={{ display:'flex',gap:'12px',flexWrap:'wrap' }}>
            <button
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-gold"
              style={{ padding:'15px 36px',fontSize:'1.05rem',borderRadius:'9px' }}
            >
              {cta}
            </button>
            {agentPhone1 && (
              <a href={`tel:${agentPhone1}`} className="btn-outline"
                 style={{ padding:'14px 32px',fontSize:'1rem',borderRadius:'9px',textDecoration:'none',display:'flex',alignItems:'center',gap:'8px' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.37 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {agentPhone1}
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="gold-line"/>

      {/* DETAILS */}
      <section style={{ padding:'80px 48px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto' }}>
          <p className="sr" style={{ fontFamily:'Georgia,serif',fontSize:'.72rem',letterSpacing:'.22em',textTransform:'uppercase',color:'var(--primary)',marginBottom:'8px' }}>פרטי הנכס</p>
          <h2 className="sr" style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)',fontWeight:800,color:'#fff',marginBottom:'10px' }}>כל מה שצריך לדעת</h2>

          <div className="sr" style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:'16px',marginTop:'40px' }}>
            {/* Specs */}
            {prop && [
              { label: 'שטח קרקע', val: prop.gross_size ? `${prop.gross_size} מ"ר` : null, icon: '📐' },
              { label: 'גלריה', val: prop.gallery_size ? `${prop.gallery_size} מ"ר` : null, icon: '🏢' },
              { label: 'קומה', val: prop.floor != null ? String(prop.floor) : null, icon: '🏗️' },
              { label: 'כניסות', val: prop.entrances ? String(prop.entrances) : null, icon: '🚪' },
              { label: 'חניה', val: prop.parking_count && prop.parking_count !== 'אין' ? `${prop.parking_count} מקומות` : null, icon: '🚗' },
              { label: 'כניסה', val: prop.entry_date || null, icon: '📅' },
              { label: 'גובה תקרה', val: prop.ceiling_height ? `${prop.ceiling_height} מ׳` : null, icon: '📏' },
              { label: 'מחיר', val: priceDisplay, icon: '💰' },
            ].filter(s => s.val).map((s, i) => (
              <div key={i} style={{
                background:'rgba(12,26,48,.6)',border:'1px solid rgba(201,168,76,.15)',
                borderRadius:'12px',padding:'16px 20px',
                display:'flex',alignItems:'center',gap:'12px',
              }}>
                <span style={{ fontSize:'1.4rem' }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize:'.78rem',color:'#7a8ea8' }}>{s.label}</div>
                  <div style={{ fontSize:'1rem',fontWeight:700,color:'#fff' }}>{s.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div className="sr" style={{ marginTop:'24px',display:'flex',flexWrap:'wrap',gap:'8px' }}>
              {features.map((f, i) => (
                <span key={i} style={{ padding:'6px 14px',borderRadius:'20px',background:'rgba(201,168,76,.1)',border:'1px solid rgba(201,168,76,.25)',color:'var(--primary)',fontSize:'.82rem',fontWeight:600 }}>
                  {f}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* GALLERY */}
      {galleryImages.length > 0 && (
        <>
          <div className="gold-line"/>
          <section style={{ padding:'80px 48px',background:'rgba(12,26,48,.4)' }}>
            <div style={{ maxWidth:'1100px',margin:'0 auto' }}>
              <p className="sr" style={{ fontFamily:'Georgia,serif',fontSize:'.72rem',letterSpacing:'.22em',textTransform:'uppercase',color:'var(--primary)',marginBottom:'8px' }}>גלריה</p>
              <h2 className="sr" style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)',fontWeight:800,color:'#fff',marginBottom:'32px' }}>תמונות הנכס</h2>
              <div className="sr" style={{
                display:'grid',
                gridTemplateColumns: galleryImages.length >= 3 ? '2fr 1fr 1fr' : `repeat(${Math.min(galleryImages.length,2)},1fr)`,
                gridTemplateRows: galleryImages.length >= 3 ? '240px 240px' : '300px',
                gap:'12px',borderRadius:'16px',overflow:'hidden',
              }}>
                {galleryImages.map((img, i) => (
                  <div key={i} style={{
                    gridRow: i === 0 && galleryImages.length >= 3 ? 'span 2' : undefined,
                    overflow:'hidden',position:'relative',
                  }}>
                    <img
                      src={img}
                      alt={`תמונה ${i+1}`}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      style={{ width:'100%',height:'100%',objectFit:'cover',display:'block',transition:'transform .4s ease' }}
                      onMouseEnter={e => (e.currentTarget.style.transform='scale(1.06)')}
                      onMouseLeave={e => (e.currentTarget.style.transform='scale(1)')}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* SUITABLE FOR */}
      <div className="gold-line"/>
      <section style={{ padding:'80px 48px' }}>
        <div style={{ maxWidth:'1100px',margin:'0 auto' }}>
          <p className="sr" style={{ fontFamily:'Georgia,serif',fontSize:'.72rem',letterSpacing:'.22em',textTransform:'uppercase',color:'var(--primary)',marginBottom:'8px' }}>התאמה</p>
          <h2 className="sr" style={{ fontSize:'clamp(1.8rem,3.5vw,2.6rem)',fontWeight:800,color:'#fff',marginBottom:'32px' }}>מתאים במיוחד ל-</h2>
          <div className="sr" style={{ display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'14px' }}>
            {suitableFor.map((s, i) => (
              <div key={i} style={{
                padding:'20px 18px',borderRadius:'14px',
                background:'rgba(12,26,48,.6)',border:'1px solid rgba(201,168,76,.15)',
                display:'flex',flexDirection:'column',alignItems:'flex-start',gap:'8px',
                transition:'all .2s',cursor:'default',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor='rgba(201,168,76,.4)'; el.style.transform='translateY(-3px)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor='rgba(201,168,76,.15)'; el.style.transform='none'; }}
              >
                <span style={{ fontSize:'1.6rem' }}>{s.icon}</span>
                <div>
                  <div style={{ fontWeight:700,fontSize:'.95rem',color:'#fff' }}>{s.name}</div>
                  <div style={{ fontSize:'.8rem',color:'#7a8ea8' }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-line"/>

      {/* CONTACT FORM */}
      <section ref={formRef as any} style={{ padding:'80px 48px',background:'rgba(12,26,48,.4)' }} id="contact">
        <div style={{ maxWidth:'1100px',margin:'0 auto' }}>
          <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'start' }}>

            {/* Agent info */}
            <div className="sr">
              <p style={{ fontFamily:'Georgia,serif',fontSize:'.72rem',letterSpacing:'.22em',textTransform:'uppercase',color:'var(--primary)',marginBottom:'8px' }}>צרו קשר</p>
              <h2 style={{ fontSize:'clamp(1.8rem,3vw,2.4rem)',fontWeight:800,color:'#fff',marginBottom:'10px',lineHeight:1.2 }}>
                מוכנים לתיאום סיור?
              </h2>
              <p style={{ color:'#7a8ea8',fontSize:'.93rem',lineHeight:1.75,marginBottom:'32px' }}>
                הצוות שלנו זמין לענות על כל שאלה ולתאם סיור בנכס בהקדם האפשרי
              </p>
              <div style={{ display:'flex',flexDirection:'column',gap:'14px' }}>
                {agentPhone1 && (
                  <div style={{ display:'flex',alignItems:'center',gap:'16px',padding:'18px 20px',background:'rgba(255,255,255,.03)',border:'1px solid rgba(201,168,76,.18)',borderRadius:'14px' }}>
                    <div style={{ width:'46px',height:'46px',borderRadius:'50%',background:'linear-gradient(135deg,var(--primary),#e8c76a)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'1.1rem',color:'#0a1628',flexShrink:0 }}>
                      {agentName1.charAt(0)}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700,fontSize:'.95rem',color:'#fff' }}>{agentName1}</div>
                      {agent?.license_number && <div style={{ fontSize:'.73rem',color:'#7a8ea8' }}>רישיון {agent.license_number}</div>}
                    </div>
                    <a href={`tel:${agentPhone1}`}
                       style={{ display:'flex',alignItems:'center',gap:'7px',background:'linear-gradient(135deg,var(--primary),#e8c76a)',color:'#0a1628',fontWeight:800,fontSize:'.88rem',padding:'9px 16px',borderRadius:'8px',textDecoration:'none',direction:'ltr',whiteSpace:'nowrap' }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.37 2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.1 6.1l1.06-1.06a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      {agentPhone1}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Form */}
            <div className="sr" style={{ background:'rgba(12,26,48,.65)',border:'1px solid rgba(201,168,76,.18)',borderRadius:'20px',padding:'36px',backdropFilter:'blur(12px)' }}>
              <h3 style={{ fontSize:'1.2rem',fontWeight:700,color:'#fff',marginBottom:'4px' }}>השאירו פרטים</h3>
              <p style={{ fontSize:'.85rem',color:'#7a8ea8',marginBottom:'24px' }}>ונחזור אליכם תוך שעות ספורות</p>

              {submitted ? (
                <div style={{ textAlign:'center',padding:'32px 0' }}>
                  <div style={{ fontSize:'3rem',marginBottom:'12px' }}>✅</div>
                  <div style={{ fontSize:'1.1rem',fontWeight:700,color:'#fff',marginBottom:'8px' }}>הפרטים נשלחו!</div>
                  <div style={{ fontSize:'.9rem',color:'#7a8ea8' }}>נחזור אליכם בהקדם</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display:'flex',flexDirection:'column',gap:'12px' }}>
                  <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px' }}>
                    <div>
                      <label style={{ fontSize:'.78rem',fontWeight:600,color:'#7a8ea8',display:'block',marginBottom:'5px' }}>שם מלא *</label>
                      <input className="field-input" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="ישראל ישראלי" required autoComplete="name"/>
                    </div>
                    <div>
                      <label style={{ fontSize:'.78rem',fontWeight:600,color:'#7a8ea8',display:'block',marginBottom:'5px' }}>טלפון *</label>
                      <input className="field-input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="050-0000000" required autoComplete="tel" dir="ltr"/>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize:'.78rem',fontWeight:600,color:'#7a8ea8',display:'block',marginBottom:'5px' }}>אימייל</label>
                    <input className="field-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" autoComplete="email" dir="ltr"/>
                  </div>
                  <div>
                    <label style={{ fontSize:'.78rem',fontWeight:600,color:'#7a8ea8',display:'block',marginBottom:'5px' }}>הודעה</label>
                    <textarea className="field-input" value={message} onChange={e => setMessage(e.target.value)} placeholder="מה מעניין אתכם לדעת?" rows={3} style={{ resize:'vertical',minHeight:'80px' }}/>
                  </div>
                  {error && <div style={{ color:'#e07060',fontSize:'.85rem' }}>{error}</div>}
                  <button type="submit" disabled={submitting} className="btn-gold"
                    style={{ padding:'15px',borderRadius:'10px',fontSize:'1rem',marginTop:'4px',opacity:submitting ? .6 : 1 }}>
                    {submitting ? 'שולח...' : cta}
                  </button>
                  <p style={{ textAlign:'center',fontSize:'.76rem',color:'#7a8ea8' }}>הפרטים נשמרים באופן מאובטח</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background:'#040c18',padding:'24px 48px',display:'flex',alignItems:'center',justifyContent:'space-between',borderTop:'1px solid rgba(201,168,76,.15)',flexWrap:'wrap',gap:'12px',direction:'rtl' }}>
        <span style={{ fontFamily:'Georgia,serif',fontSize:'.9rem',fontWeight:700,color:'var(--primary)' }}>
          {agent?.business_name || 'שחף נכסים'} | Shahaf Real Estate
        </span>
        <span style={{ fontSize:'.77rem',color:'#7a8ea8' }}>המחלקה המסחרית · © {new Date().getFullYear()}</span>
      </footer>
    </>
  )
}
