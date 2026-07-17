const SPECIALTIES = ['משרדים', 'חנויות ומסחר', 'מחסנים ולוגיסטיקה', 'תעשייה', 'קרקעות', 'מגורים', 'מכירת עסקים']

export default function SpecialtiesMarquee() {
  const Row = ({ hidden = false }: { hidden?: boolean }) => (
    <div aria-hidden={hidden || undefined} className="flex items-center shrink-0">
      {SPECIALTIES.map(s => (
        <span key={s} className="flex items-center font-semibold text-sm whitespace-nowrap" style={{ color: '#3a5a78' }}>
          <span className="px-5 md:px-7">{s}</span>
          <span aria-hidden="true" style={{ color: '#C9A84C' }}>◆</span>
        </span>
      ))}
    </div>
  )

  return (
    <section
      aria-label="תחומי ההתמחות שלנו"
      className="overflow-hidden py-3"
      style={{ background: '#f0f6ff', borderBottom: '1px solid #d8eaf8' }}
    >
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </section>
  )
}
