import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'

export default async function ProcessSection() {
  const t = await getTranslations('process')

  const STEPS: { num: string; title: string; items: string[] }[] = [
    { num: '01', title: t('step1Title'), items: t.raw('step1Items') as string[] },
    { num: '02', title: t('step2Title'), items: t.raw('step2Items') as string[] },
    { num: '03', title: t('step3Title'), items: t.raw('step3Items') as string[] },
    { num: '04', title: t('step4Title'), items: t.raw('step4Items') as string[] },
    { num: '05', title: t('step5Title'), items: t.raw('step5Items') as string[] },
  ]

  return (
    <section
      className="px-6 py-20"
      style={{ background: 'linear-gradient(160deg, #040d1e 0%, #0a1e3d 55%, #091830 100%)' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: 'rgba(201,168,76,0.8)' }}>
            {t('label')}
          </p>
          <h2 className="text-4xl font-black text-white mb-3">{t('title')}</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)' }} className="text-base max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <ol className="relative">
          {STEPS.map((step) => (
            <li key={step.title} className="relative flex gap-6 pb-10 last:pb-0">
              {/* Number + line */}
              <div className="flex flex-col items-center shrink-0">
                <span
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg z-10"
                  style={{ background: 'rgba(201,168,76,0.15)', border: '2px solid rgba(201,168,76,0.5)', color: '#C9A84C' }}
                  aria-hidden="true"
                >
                  {step.num}
                </span>
                {step.num !== '05' && (
                  <span
                    aria-hidden="true"
                    className="w-px flex-1 mt-2"
                    style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), rgba(201,168,76,0.05))' }}
                  />
                )}
              </div>

              {/* Card */}
              <div
                className="rounded-2xl p-6 flex-1 mb-1"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <h3 className="text-xl font-black text-white mb-4">{step.title}</h3>
                <ul className="space-y-2.5">
                  {step.items.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                      <span aria-hidden="true" className="mt-0.5 shrink-0 font-bold" style={{ color: '#C9A84C' }}>✔</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-block text-base font-black py-4 px-10 rounded-xl transition-all hover:-translate-y-0.5"
            style={{ background: '#C9A84C', color: '#0a1e3d', boxShadow: '0 4px 24px rgba(201,168,76,0.3)' }}
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
