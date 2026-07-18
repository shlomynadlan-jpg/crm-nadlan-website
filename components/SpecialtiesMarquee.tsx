import { getTranslations } from 'next-intl/server'

export default async function SpecialtiesMarquee() {
  const t = await getTranslations()

  const SPECIALTIES = [
    { icon: '🏢', label: t('specialties.offices') },
    { icon: '🛍️', label: t('specialties.retail') },
    { icon: '📦', label: t('specialties.warehouses') },
    { icon: '🔧', label: t('specialties.industrial') },
    { icon: '🌿', label: t('specialties.land') },
    { icon: '🏠', label: t('specialties.residential') },
    { icon: '💼', label: t('specialties.businessSale') },
  ]

  const Row = ({ hidden = false }: { hidden?: boolean }) => (
    <div aria-hidden={hidden || undefined} className="flex items-center shrink-0">
      {SPECIALTIES.map(s => (
        <span key={s.label} className="flex items-center font-semibold text-sm whitespace-nowrap" style={{ color: '#3a5a78' }}>
          <span className="px-5 md:px-7">{s.label}</span>
          <span aria-hidden="true" style={{ color: '#C9A84C' }}>◆</span>
        </span>
      ))}
    </div>
  )

  return (
    <section
      aria-label={t('specialties.ariaLabel')}
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
