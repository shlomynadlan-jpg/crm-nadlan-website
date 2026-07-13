const SPECIALTIES = ['משרדים', 'חנויות ומסחר', 'מחסנים ולוגיסטיקה', 'תעשייה', 'קרקעות', 'מגורים', 'מכירת עסקים']

export default function SpecialtiesMarquee() {
  const Row = ({ hidden = false }: { hidden?: boolean }) => (
    <div aria-hidden={hidden || undefined} className="flex items-center shrink-0">
      {SPECIALTIES.map(s => (
        <span key={s} className="flex items-center text-white font-semibold text-base md:text-lg whitespace-nowrap">
          <span className="px-5 md:px-8">{s}</span>
          <span aria-hidden="true" style={{ color: '#C9A84C' }}>◆</span>
        </span>
      ))}
    </div>
  )

  return (
    <section aria-label="תחומי ההתמחות שלנו" className="overflow-hidden py-4"
      style={{ background: 'linear-gradient(90deg, #005A8E, #0077B6)' }}>
      <div className="marquee-track flex w-max">
        <Row />
        <Row hidden />
      </div>
    </section>
  )
}
